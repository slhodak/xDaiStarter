// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract XDPresale {
    using SafeMath for uint256;

    address payable public xdsDevAddress; // address of contract dev

    IERC20 public token; // token that will be sold
    address public unsoldTokensDumpAddress; // address where unsold tokens will be transferred to

    mapping(address => uint256) public investments; // total wei invested per address
    mapping(address => bool) public whitelistedAddresses; // addresses eligible in presale
    mapping(address => uint256) public claimed; // if claimed=1, first period is claimed, claimed=2, second period is claimed, claimed=0, nothing claimed.

    uint256 public totalInvestorsCount; // total investors count
    uint256 public totalCollectedWei; // total wei collected
    uint256 public totalTokens; // total tokens to be sold, in 1e18s
    uint256 public tokensLeft; // available tokens to be sold, in 1e18s
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
    bytes32 public linkChat;
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

    constructor(address _xdsDevAddress) public {
        require(
            _xdsDevAddress != address(0),
            "The XDS Dev address cannot be 0"
        );

        xdsDevAddress = payable(_xdsDevAddress);
    }

    modifier onlyXdsDev() {
        require(
            xdsDevAddress == msg.sender,
            "Only the XDS Dev can do this"
        );
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
        require(!presaleCancelled, "Presale has been cancelled");
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
    ) external onlyXdsDev {
        require(_tokenAddress != address(0), "Token address cannot be 0");
        require(_unsoldTokensDumpAddress != address(0), "Burn address cannot be 0");

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
    ) external onlyXdsDev {
        require(_totalTokens > 0);
        require(_tokenPriceInWei > 0);
        require(_openTime > 0);
        require(_closeTime > 0);
        require(_hardCapInWei > 0);

        // Hard cap > (token amount * token price)
        require(_hardCapInWei <= _totalTokens.mul(_tokenPriceInWei), "Hardcap must be less than total tokens * token price");
        // Soft cap > to hard cap
        require(_softCapInWei <= _hardCapInWei, "Softcap must be less than hardcap");
        //  Min. wei investment > max. wei investment
        require(_minInvestInWei <= _maxInvestInWei, "Minimum investment must be less than maximum investment");
        // Open time >= close time
        require(_openTime < _closeTime, "Open time must be earlier than close time");

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
        bytes32 _linkChat,
        bytes32 _linkGithub,
        bytes32 _linkTwitter,
        bytes32 _linkWebsite,
        bytes32 _linkLogo
    ) external onlyXdsDev {
        saleTitle = _saleTitle;
        linkChat = _linkChat;
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
        onlyXdsDev
    {
        for (uint256 i = 0; i < _whitelistedAddresses.length; i++) {
            whitelistedAddresses[_whitelistedAddresses[i]] = true;
        }
    }

    function addAuditorWhitelistedAddresses(
        address[] calldata _whitelistedAddresses
    ) external onlyXdsDev {
        for (uint256 i = 0; i < _whitelistedAddresses.length; i++) {
            auditorWhitelistedAddresses[_whitelistedAddresses[i]] = true;
        }
    }

    function setRefundAllowed(bool _refundAllowed)
        external
        onlyXdsDev
    {
        refundAllowed = _refundAllowed;
    }

    // This adding time could or should be "now".
    function allowClaim(uint256 _honeyLiquidityAddingTime) external onlyXdsDev {
        require(_honeyLiquidityAddingTime > 0, "liquidityAddingTime must be greater than 0");
        require(closeTime > 0, "closeTime must be greater than zero / set");
        require(_honeyLiquidityAddingTime >= closeTime, "liquidityAddingTime must be greater than or equal to closeTime");

        claimAllowed = true;
        honeyLiquidityAddingTime = _honeyLiquidityAddingTime;
    }

    function setClaimCycle(uint256 _claimCycle)
        external
        onlyXdsDev
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
        require(msg.value <= tokensLeft.mul(tokenPriceInWei)); // not enough XDP left to satisfy order
        uint256 totalInvestmentInWei = investments[msg.sender].add(msg.value);
        require(
            totalInvestmentInWei >= minInvestInWei ||
                totalCollectedWei >= hardCapInWei.sub(1 ether),
                // investors can buy less than the minimum investment when presale is within 1 ether of the hardcap
            "Min investment not reached"
        );
        require(
            maxInvestInWei == 0 || // no maximum
            totalInvestmentInWei <= maxInvestInWei,
            "Max investment reached"
        );

        if (investments[msg.sender] == 0) {
            totalInvestorsCount = totalInvestorsCount.add(1);
        }

        totalCollectedWei = totalCollectedWei.add(msg.value); // total investment in the whole presale
        investments[msg.sender] = totalInvestmentInWei; // total investment from this sender
        tokensLeft = tokensLeft.sub(getTokenAmount(msg.value));
    }

    receive() external payable {
        invest();
    }

    function transferUnsoldTokens()
        external
        onlyXdsDev
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

    function cancelAndTransferTokensToDev()
      external
      onlyXdsDev
      presaleIsNotCancelled
    {
        presaleCancelled = true;

        uint256 balance = token.balanceOf(address(this));
        if (balance > 0) {
            token.transfer(xdsDevAddress, balance);
        }
    }

    function collectFundsRaised()
      external
      onlyXdsDev
      presaleIsNotCancelled
    {
        if (address(this).balance > 0) {
            xdsDevAddress.transfer(address(this).balance);
        }
    }
}