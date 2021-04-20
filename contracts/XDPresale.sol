// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract XDPresale {
    using SafeMath for uint256;

    address payable public xdpDevAddress; // address of contract dev

    IERC20 public token; // token that will be sold
    address public unsoldTokensDumpAddress; // address where unsold tokens will be transferred to

    mapping(address => uint256) public investments; // total wei invested per address
    mapping(address => bool) public whitelistedAddresses; // addresses eligible in presale
    mapping(address => uint256) public claimed; // if claimed=1, first period is claimed, claimed=2, second period is claimed, claimed=0, nothing claimed.

    uint256 public totalInvestorsCount; // total investors count
    uint256 public totalCollectedWei; // total wei collected
    uint256 public totalTokens; // total tokens to be sold
    uint256 public tokensLeft; // available tokens to be sold
    uint256 public tokenPriceInWei; // token presale wei price per 1 token
    uint256 public hardCapInWei; // maximum wei amount that can be invested in presale
    uint256 public softCapInWei; // minimum wei amount to invest in presale, if not met, invested wei will be returned
    uint256 public maxInvestInWei; // maximum wei amount that can be invested per wallet address
    uint256 public minInvestInWei; // minimum wei amount that can be invested per wallet address
    uint256 public openTime; // time when presale starts, investing is allowed
    uint256 public closeTime; // time when presale closes, investing is not allowed
    uint256 public honeyLiquidityAddingTime; // time when adding of liquidity in HoneySwap starts, investors can claim their tokens afterwards

    uint256 public claimCycle = 30 days;

    bool public presaleCancelled = false; // if true, investing will not be allowed, investors can withdraw, presale creator can withdraw their tokens
    bool public refundAllowed = false; // if true, investor can get refund his investment.
    bool public claimAllowed = false; // if true, investory can claim tokens.

    bool public isAudited = false; // if true, it's passed, false, it's not failed.
    bytes32 public saleTitle;
    bytes32 public linkTelegram;
    bytes32 public linkTwitter;
    bytes32 public linkGithub;
    bytes32 public linkWebsite;
    bytes32 public linkLogo;

    mapping(address => bool) public auditorWhitelistedAddresses; // addresses eligible to perform audit
    struct AuditorInfo {
        bytes32 auditor; // auditor name
        bool isVerified; // if true -> passed, false -> failed
        bool isWarning; // if true -> warning, false -> no warning
        string verifiedHash; // stores content of audit summary (actual text)
        string warningHash; // stores content of warnings
    }

    AuditorInfo public auditInformation;

    constructor(address _xdpDevAddress) public {
        require(_xdpDevAddress != address(0));

        xdpDevAddress = payable(_xdpDevAddress);
    }

    modifier onlyXdpDev() {
        require(xdpDevAddress == msg.sender);
        _;
    }

    modifier whitelistedAddressOnly() {
        require(
            whitelistedAddresses[msg.sender],
            "Address not whitelisted"
        );
        _;
    }

    modifier presaleIsNotCancelled() {
        require(!presaleCancelled, "Cancelled");
        _;
    }

    modifier investorOnly() {
        require(investments[msg.sender] > 0, "Not an investor");
        _;
    }

    modifier isValidClaimPeriod() {
        uint256 currentPeriod = 0;
        if (
            now >= honeyLiquidityAddingTime &&
            now < honeyLiquidityAddingTime + claimCycle
        ) {
            currentPeriod = 1;
        }
        if (
            now >= honeyLiquidityAddingTime + claimCycle &&
            now < honeyLiquidityAddingTime + claimCycle * 2
        ) {
            currentPeriod = 2;
        }
        if (
            now >= honeyLiquidityAddingTime + claimCycle * 2 &&
            now < honeyLiquidityAddingTime + claimCycle * 3
        ) {
            currentPeriod = 3;
        }
        if (now >= honeyLiquidityAddingTime + claimCycle * 3) {
            currentPeriod = 4;
        }
        require(currentPeriod > 0, "Listing not started");

        require(
            claimed[msg.sender] < currentPeriod,
            "Already claimed or refunded"
        );
        _;
    }

    modifier onlyRefundAllowed() {
        require(refundAllowed, "Refund is disallowed");
        _;
    }

    modifier onlyClaimAllowed() {
        require(claimAllowed, "Claim is disallowed");
        _;
    }

    modifier whitelistedAuditorOnly() {
        require(
            auditorWhitelistedAddresses[msg.sender],
            "Auditor Address not whitelisted"
        );
        _;
    }

    function setAddressInfo(
        address _tokenAddress,
        address _unsoldTokensDumpAddress
    ) external onlyXdpDev {
        require(_tokenAddress != address(0));
        require(_unsoldTokensDumpAddress != address(0));

        token = IERC20(_tokenAddress);
        unsoldTokensDumpAddress = _unsoldTokensDumpAddress;
    }

    function setGeneralInfo(
        uint256 _totalTokens,
        uint256 _tokenPriceInWei,
        uint256 _hardCapInWei,
        uint256 _softCapInWei,
        uint256 _maxInvestInWei,
        uint256 _minInvestInWei,
        uint256 _openTime,
        uint256 _closeTime
    ) external onlyXdpDev {
        require(_totalTokens > 0);
        require(_tokenPriceInWei > 0);
        require(_openTime > 0);
        require(_closeTime > 0);
        require(_hardCapInWei > 0);

        // Hard cap > (token amount * token price)
        require(_hardCapInWei <= _totalTokens.mul(_tokenPriceInWei));
        // Soft cap > to hard cap
        require(_softCapInWei <= _hardCapInWei);
        //  Min. wei investment > max. wei investment
        require(_minInvestInWei <= _maxInvestInWei);
        // Open time >= close time
        require(_openTime < _closeTime);

        totalTokens = _totalTokens;
        tokensLeft = _totalTokens;
        tokenPriceInWei = _tokenPriceInWei;
        hardCapInWei = _hardCapInWei;
        softCapInWei = _softCapInWei;
        maxInvestInWei = _maxInvestInWei;
        minInvestInWei = _minInvestInWei;
        openTime = _openTime;
        closeTime = _closeTime;
    }

    function setStringInfo(
        bytes32 _saleTitle,
        bytes32 _linkTelegram,
        bytes32 _linkGithub,
        bytes32 _linkTwitter,
        bytes32 _linkWebsite,
        bytes32 _linkLogo
    ) external onlyXdpDev {
        saleTitle = _saleTitle;
        linkTelegram = _linkTelegram;
        linkGithub = _linkGithub;
        linkTwitter = _linkTwitter;
        linkWebsite = _linkWebsite;
        linkLogo = _linkLogo;
    }

    function setAuditorInfo(
        bytes32 _auditor,
        bool _isVerified,
        bool _isWarning,
        string calldata _verifiedHash,
        string calldata _warningHash
    ) external whitelistedAuditorOnly {
        auditInformation.auditor = _auditor;
        auditInformation.isVerified = _isVerified;
        auditInformation.isWarning = _isWarning;
        auditInformation.verifiedHash = _verifiedHash;
        auditInformation.warningHash = _warningHash;
    }

    function addWhitelistedAddresses(address[] calldata _whitelistedAddresses)
        external
        onlyXdpDev
    {
        for (uint256 i = 0; i < _whitelistedAddresses.length; i++) {
            whitelistedAddresses[_whitelistedAddresses[i]] = true;
        }
    }

    function addAuditorWhitelistedAddresses(
        address[] calldata _whitelistedAddresses
    ) external onlyXdpDev {
        for (uint256 i = 0; i < _whitelistedAddresses.length; i++) {
            auditorWhitelistedAddresses[_whitelistedAddresses[i]] = true;
        }
    }

    function setRefundAllowed(bool _refundAllowed)
        external
        onlyXdpDev
    {
        refundAllowed = _refundAllowed;
    }

    function allowClaim(uint256 _honeyLiquidityAddingTime) external onlyXdpDev {
        require(_honeyLiquidityAddingTime > 0);
        require(closeTime > 0);
        require(_honeyLiquidityAddingTime >= closeTime);

        claimAllowed = true;
        honeyLiquidityAddingTime = _honeyLiquidityAddingTime;
    }

    function setClaimCycle(uint256 _claimCycle)
        external
        onlyXdpDev
    {
        claimCycle = _claimCycle;
    }

    function getTokenAmount(uint256 _weiAmount)
        internal
        view
        returns (uint256)
    {
        return _weiAmount.mul(1e18).div(tokenPriceInWei);
    }

    function invest()
        public
        payable
        whitelistedAddressOnly
        presaleIsNotCancelled
    {
        require(block.timestamp >= openTime, "Not yet opened");
        require(block.timestamp < closeTime, "Closed");
        require(totalCollectedWei < hardCapInWei, "Hard cap reached");
        require(tokensLeft > 0);
        require(msg.value <= tokensLeft.mul(tokenPriceInWei));
        uint256 totalInvestmentInWei = investments[msg.sender].add(msg.value);
        require(
            totalInvestmentInWei >= minInvestInWei ||
                totalCollectedWei >= hardCapInWei.sub(1 ether),
            "Min investment not reached"
        );
        require(
            maxInvestInWei == 0 || totalInvestmentInWei <= maxInvestInWei,
            "Max investment reached"
        );

        if (investments[msg.sender] == 0) {
            totalInvestorsCount = totalInvestorsCount.add(1);
        }

        totalCollectedWei = totalCollectedWei.add(msg.value);
        investments[msg.sender] = totalInvestmentInWei;
        tokensLeft = tokensLeft.sub(getTokenAmount(msg.value));
    }

    receive() external payable {
        invest();
    }

    function transferUnsoldTokens()
        external
        onlyXdpDev
        presaleIsNotCancelled
    {
        uint256 unsoldTokensAmount =
            token.balanceOf(address(this)).sub(
                getTokenAmount(totalCollectedWei)
            );
        if (unsoldTokensAmount > 0) {
            token.transfer(unsoldTokensDumpAddress, unsoldTokensAmount);
        }
    }

    function claimTokens()
        external
        whitelistedAddressOnly
        presaleIsNotCancelled
        investorOnly
        isValidClaimPeriod
        onlyClaimAllowed
    {
        claimed[msg.sender] = claimed[msg.sender].add(1); // make sure this goes first before transfer to prevent reentrancy
        token.transfer(
            msg.sender,
            getTokenAmount(investments[msg.sender].div(4))
        );
    }

    function getRefund()
        external
        whitelistedAddressOnly
        investorOnly
        onlyRefundAllowed
    {
        if (!presaleCancelled) {
            require(block.timestamp >= openTime, "Not yet opened");
            require(block.timestamp >= closeTime, "Not yet closed");
            require(softCapInWei > 0, "No soft cap");
            require(totalCollectedWei < softCapInWei, "Soft cap reached");
            require(claimed[msg.sender] == 0, "Already claimed");
        }

        claimed[msg.sender] = 4; // make sure this goes first before transfer to prevent reentrancy
        uint256 investment = investments[msg.sender];
        uint256 presaleBalance = address(this).balance;
        require(presaleBalance > 0);

        if (investment > presaleBalance) {
            investment = presaleBalance;
        }

        if (investment > 0) {
            msg.sender.transfer(investment);
        }
    }

    function cancelAndTransferTokensToDev() external onlyXdpDev {
        if (xdpDevAddress != msg.sender) {
            revert();
        }

        require(!presaleCancelled);
        presaleCancelled = true;

        uint256 balance = token.balanceOf(address(this));
        if (balance > 0) {
            token.transfer(xdpDevAddress, balance);
        }
    }

    function collectFundsRaised() external onlyXdpDev {
        require(!presaleCancelled);

        if (address(this).balance > 0) {
            xdpDevAddress.transfer(address(this).balance);
        }
    }
}