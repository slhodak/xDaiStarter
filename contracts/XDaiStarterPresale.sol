// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./XDaiStarterStaking.sol";
import "./XDaiStarterInfo.sol";

interface IHoneySwapV2Router02 {
    function addLiquidityETH(
        address token,
        uint256 amountTokenDesired,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    )
        external
        payable
        returns (
            uint256 amountToken,
            uint256 amountETH,
            uint256 liquidity
        );
}

contract XDaiStarterPresale {
    using SafeMath for uint256;

    address payable internal xdsFactoryAddress; // address that creates the presale contracts
    address payable public xdsDevAddress; // address where dev fees will be transferred to
    address public xdsLiqLockAddress; // address where LP tokens will be locked
    XDaiStarterStaking public xdsStakingPool;
    XDaiStarterInfo public xDaiStarterInfo;

    IERC20 public token; // token that will be sold
    IERC20 public xdpToken; // system token
    address payable public presaleCreatorAddress; // address where percentage of invested wei will be transferred to
    address public unsoldTokensDumpAddress; // address where unsold tokens will be transferred to

    mapping(address => uint256) public investments; // total wei invested per address
    mapping(address => bool) public whitelistedAddresses; // addresses eligible in presale
    mapping(address => bool) public claimed; // if true, it means investor already claimed the tokens or got a refund

    uint256 private xdsDevFeePercentage; // dev fee to support the development of XDaiStarter
    uint256 private xdsMinDevFeeInWei; // minimum fixed dev fee to support the development of XDaiStarter
    uint256 public xdsId; // used for fetching presale without referencing its address
    uint256 public presaleGrantId; // tracks any incubator grants given

    uint256 public totalInvestorsCount; // total investors count
    uint256 public presaleCreatorClaimWei; // wei to transfer to presale creator per investor claim
    uint256 public presaleCreatorClaimTime; // time when presale creator can collect funds raise
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
    uint256 public honeyListingPriceInWei; // token price when listed in HoneySwap
    uint256 public honeyLiquidityAddingTime; // time when adding of liquidity in HoneySwap starts, investors can claim their tokens afterwards
    uint256 public honeyLPTokensLockDurationInDays; // how many days after the liquity is added the presale creator can unlock the LP tokens
    uint256 public honeyLiquidityPercentageAllocation; // how many percentage of the total invested wei that will be added as liquidity

    mapping(address => uint256) public voters; // addresses voting on sale
    uint256 public noVotes; // total number of no votes
    uint256 public yesVotes; // total number of yes votes
    uint256 public minYesVotesThreshold = 100000 * 1e18; // minimum number of yes votes needed to pass
    uint256 public minVoterXDSBalance = 1000 * 1e18; // minimum number of XDS tokens to hold to vote
    uint256 public minInvestorXDSBalance; // minimum number of XDS tokens to hold to invest
    uint256 public minRewardQualifyBal; // min amount to HODL to qualify for token discounts
    uint256 public minRewardQualifyPercentage; // percentage of discount on tokens for qualifying holders

    bool public honeyLiquidityAdded = false; // if true, liquidity is added in HoneySwap and lp tokens are locked
    bool public onlyWhitelistedAddressesAllowed = false; // if true, only whitelisted addresses can invest
    bool public xdsDevFeesExempted = false; // if true, presale will be exempted from dev fees
    bool public presaleCancelled = false; // if true, investing will not be allowed, investors can withdraw, presale creator can withdraw their tokens

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

    constructor(
        address _xdsFactoryAddress,
        address _xDaiStarterInfo,
        address _xdsDevAddress,
        uint256 _minRewardQualifyBal,
        uint256 _minRewardQualifyPercentage
    ) public {
        require(_xdsFactoryAddress != address(0));
        require(_xdsDevAddress != address(0));

        xdsFactoryAddress = payable(_xdsFactoryAddress);
        xdsDevAddress = payable(_xdsDevAddress);
        minRewardQualifyBal = _minRewardQualifyBal;
        minRewardQualifyPercentage = _minRewardQualifyPercentage;
        xDaiStarterInfo = XDaiStarterInfo(_xDaiStarterInfo);
    }

    modifier onlyXdsDev() {
        require(
            xdsFactoryAddress == msg.sender || xdsDevAddress == msg.sender
        );
        _;
    }

    modifier onlyPresaleCreatorOrXdsFactory() {
        require(
            presaleCreatorAddress == msg.sender ||
                xdsFactoryAddress == msg.sender,
            "Not presale creator or factory"
        );
        _;
    }

    modifier onlyPresaleCreatorOrXdsDev() {
        require(
            presaleCreatorAddress == msg.sender || xdsDevAddress == msg.sender,
            "Not presale creator or dev"
        );
        _;
    }

    modifier onlyPresaleCreator() {
        require(presaleCreatorAddress == msg.sender, "Not presale creator");
        _;
    }

    modifier whitelistedAddressOnly() {
        require(
            !onlyWhitelistedAddressesAllowed ||
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

    modifier notYetClaimedOrRefunded() {
        require(!claimed[msg.sender], "Already claimed or refunded");
        _;
    }

    modifier votesPassed() {
        require(
            yesVotes > noVotes && yesVotes >= minYesVotesThreshold,
            "Votes not passed"
        );
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
        address _presaleCreator,
        address _tokenAddress,
        address _xdpTokenAddress,
        address _unsoldTokensDumpAddress
    ) external onlyPresaleCreatorOrXdsFactory {
        require(_presaleCreator != address(0));
        require(_tokenAddress != address(0));
        require(_unsoldTokensDumpAddress != address(0));

        presaleCreatorAddress = payable(_presaleCreator);
        token = IERC20(_tokenAddress);
        xdpToken = IERC20(_xdpTokenAddress);
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
    ) external onlyPresaleCreatorOrXdsFactory {
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

    function setHoneySwapInfo(
        uint256 _honeyListingPriceInWei,
        uint256 _honeyLiquidityAddingTime,
        uint256 _honeyLPTokensLockDurationInDays,
        uint256 _honeyLiquidityPercentageAllocation
    ) external onlyPresaleCreatorOrXdsFactory {
        require(_honeyListingPriceInWei > 0);
        require(_honeyLiquidityAddingTime > 0);
        require(_honeyLPTokensLockDurationInDays > 0);
        require(_honeyLiquidityPercentageAllocation > 0);

        require(closeTime > 0);
        // Listing time < close time
        require(_honeyLiquidityAddingTime >= closeTime);

        honeyListingPriceInWei = _honeyListingPriceInWei;
        honeyLiquidityAddingTime = _honeyLiquidityAddingTime;
        honeyLPTokensLockDurationInDays = _honeyLPTokensLockDurationInDays;
        honeyLiquidityPercentageAllocation = _honeyLiquidityPercentageAllocation;
    }

    function setStringInfo(
        bytes32 _saleTitle,
        bytes32 _linkTelegram,
        bytes32 _linkGithub,
        bytes32 _linkTwitter,
        bytes32 _linkWebsite,
        bytes32 _linkLogo
    ) external onlyPresaleCreatorOrXdsFactory {
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

    function setXdsInfo(
        address _xdsLiqLockAddress,
        uint256 _xdsDevFeePercentage,
        uint256 _xdsMinDevFeeInWei,
        uint256 _xdsId,
        uint256 _presaleGrantId,
        address _xdsStakingPool
    ) external onlyXdsDev {
        xdsLiqLockAddress = _xdsLiqLockAddress;
        xdsDevFeePercentage = _xdsDevFeePercentage;
        xdsMinDevFeeInWei = _xdsMinDevFeeInWei;
        xdsId = _xdsId;
        presaleGrantId = _presaleGrantId;
        xdsStakingPool = XDaiStarterStaking(_xdsStakingPool);
    }

    function setXdsDevFeesExempted(bool _xdsDevFeesExempted)
        external
        onlyXdsDev
    {
        xdsDevFeesExempted = _xdsDevFeesExempted;
    }

    function setOnlyWhitelistedAddressesAllowed(
        bool _onlyWhitelistedAddressesAllowed
    ) external onlyPresaleCreatorOrXdsFactory {
        onlyWhitelistedAddressesAllowed = _onlyWhitelistedAddressesAllowed;
    }

    function setMinVoterXDSBalance(uint256 _minVoterXDSBalance)
        external
        onlyXdsDev
    {
        require(_minVoterXDSBalance >= 10 * 1e18);
        minVoterXDSBalance = _minVoterXDSBalance * 1e18;
    }

    function setMinYesVotesThreshold(uint256 _minYesVotesThreshold)
        external
        onlyXdsDev
    {
        require(_minYesVotesThreshold >= 10000 * 1e18); // cannot be < 1% of supply
        minYesVotesThreshold = _minYesVotesThreshold * 1e18;
    }

    function setMinInvestorXDSBalance(uint256 _minInvestorXDSBalance) 
        external 
        onlyXdsDev 
    {
        minInvestorXDSBalance = _minInvestorXDSBalance;
    }

    function addWhitelistedAddresses(address[] calldata _whitelistedAddresses)
        external
        onlyPresaleCreatorOrXdsFactory
    {
        onlyWhitelistedAddressesAllowed = _whitelistedAddresses.length > 0;
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

    function getTokenAmount(uint256 _weiAmount)
        internal
        view
        returns (uint256)
    {
        uint256 balance;
        uint256 lastStakedTimestamp;
        uint256 lastUnstakedTimestamp;
        (balance, lastStakedTimestamp, lastUnstakedTimestamp) = xdsStakingPool
            .accountInfos(msg.sender);
        uint256 minStakeTime = xDaiStarterInfo.getMinStakeTime();
        uint256 xdsBalance = xDaiStarterInfo.getLockedBalance(msg.sender);

        if (lastStakedTimestamp + minStakeTime <= block.timestamp) {
            xdsBalance = xdsBalance.add(balance);
        }
        if (xdsBalance >= minRewardQualifyBal) {
            uint256 pctQualifyingDiscount =
                tokenPriceInWei.mul(minRewardQualifyPercentage).div(100);
            return
                _weiAmount.mul(1e18).div(
                    tokenPriceInWei.sub(pctQualifyingDiscount)
                );
        } else {
            return _weiAmount.mul(1e18).div(tokenPriceInWei);
        }
    }

    function invest()
        public
        payable
        whitelistedAddressOnly
        presaleIsNotCancelled
        votesPassed
    {
        require(block.timestamp >= openTime, "Not yet opened");
        require(block.timestamp < closeTime, "Closed");
        require(totalCollectedWei < hardCapInWei, "Hard cap reached");
        require(tokensLeft > 0);
        require(msg.value > 0);

        uint256 balance;
        uint256 lastStakedTimestamp;
        uint256 lastUnstakedTimestamp;
        (balance, lastStakedTimestamp, lastUnstakedTimestamp) = xdsStakingPool
            .accountInfos(msg.sender);
        uint256 minStakeTime = xDaiStarterInfo.getMinStakeTime();
        uint256 xdsBalance = xDaiStarterInfo.getLockedBalance(msg.sender);

        if (lastStakedTimestamp + minStakeTime <= block.timestamp) {
            xdsBalance = xdsBalance.add(balance);
        }
        if (xdsBalance >= minRewardQualifyBal) {
            // apply discount to qualifying hodlers
            uint256 pctQualifyingDiscount =
                tokenPriceInWei.mul(minRewardQualifyPercentage).div(100);
            require(
                msg.value <=
                    tokensLeft
                        .mul(tokenPriceInWei.sub(pctQualifyingDiscount))
                        .div(1e18),
                "Not enough tokens left"
            );
        } else {
            require(
                msg.value <= tokensLeft.mul(tokenPriceInWei).div(1e18),
                "Not enough tokens left"
            );
        }
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

        if (minInvestorXDSBalance > 0) {
            require(
                xdsBalance >= minInvestorXDSBalance,
                "Not enough XDS on account"
            );
        }

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

    function addLiquidityAndLockLPTokens() external presaleIsNotCancelled {
        require(totalCollectedWei > 0);
        require(!honeyLiquidityAdded, "Liquidity already added");
        require(
            !onlyWhitelistedAddressesAllowed ||
                whitelistedAddresses[msg.sender] ||
                msg.sender == presaleCreatorAddress,
            "Not whitelisted or not presale creator"
        );

        if (
            totalCollectedWei >= hardCapInWei.sub(1 ether) &&
            block.timestamp < honeyLiquidityAddingTime
        ) {
            require(msg.sender == presaleCreatorAddress, "Not presale creator");
        } else if (block.timestamp >= honeyLiquidityAddingTime) {
            require(
                msg.sender == presaleCreatorAddress ||
                    investments[msg.sender] > 0,
                "Not presale creator or investor"
            );
            require(totalCollectedWei >= softCapInWei, "Soft cap not reached");
        } else {
            revert("Liquidity cannot be added yet");
        }

        honeyLiquidityAdded = true;

        uint256 finalTotalCollectedWei = totalCollectedWei;
        uint256 xdsDevFeeInWei;
        if (!xdsDevFeesExempted) {
            uint256 pctDevFee =
                finalTotalCollectedWei.mul(xdsDevFeePercentage).div(100);
            xdsDevFeeInWei = pctDevFee > xdsMinDevFeeInWei ||
                xdsMinDevFeeInWei >= finalTotalCollectedWei
                ? pctDevFee
                : xdsMinDevFeeInWei;
        }
        if (xdsDevFeeInWei > 0) {
            finalTotalCollectedWei = finalTotalCollectedWei.sub(
                xdsDevFeeInWei
            );
            xdsDevAddress.transfer(xdsDevFeeInWei);
            // factory manages XDS hodlers fund where they can claim earned xDai rewards
            finalTotalCollectedWei = finalTotalCollectedWei.sub(
                xdsDevFeeInWei
            );
            xdsFactoryAddress.transfer(xdsDevFeeInWei);
        }

        // xDai amount
        uint256 liqPoolEthAmount =
            finalTotalCollectedWei.mul(honeyLiquidityPercentageAllocation).div(
                100
            );
        uint256 liqPoolTokenAmount =
            liqPoolEthAmount.mul(1e18).div(honeyListingPriceInWei);

        IHoneySwapV2Router02 honeySwapRouter =
            IHoneySwapV2Router02(
                address(xDaiStarterInfo.getHoneySwapRouter())
            );

        token.approve(address(honeySwapRouter), liqPoolTokenAmount);

        honeySwapRouter.addLiquidityETH{value: liqPoolEthAmount}(
            address(token),
            liqPoolTokenAmount,
            0,
            0,
            xdsLiqLockAddress,
            block.timestamp.add(15 minutes)
        );

        presaleCreatorClaimWei = address(this).balance.mul(1e18).div(
            totalInvestorsCount.mul(1e18)
        );
        presaleCreatorClaimTime = block.timestamp + 1 days;
    }

    function vote(bool yes) external presaleIsNotCancelled {
        uint256 balance;
        uint256 lastStakedTimestamp;
        uint256 lastUnstakedTimestamp;
        (balance, lastStakedTimestamp, lastUnstakedTimestamp) = xdsStakingPool
            .accountInfos(msg.sender);
        uint256 minStakeTime = xDaiStarterInfo.getMinStakeTime();
        uint256 voterBalance = xDaiStarterInfo.getLockedBalance(msg.sender);

        if (lastStakedTimestamp + minStakeTime <= block.timestamp) {
            voterBalance = voterBalance.add(balance);
        }

        require(voterBalance >= minVoterXDSBalance, "Not enough XDS to vote");
        require(voters[msg.sender] == 0, "Vote already casted");

        voters[msg.sender] = voterBalance;
        if (yes) {
            yesVotes = yesVotes.add(voterBalance);
        } else {
            noVotes = noVotes.add(voterBalance);
        }
    }

    function claimTokens()
        external
        whitelistedAddressOnly
        presaleIsNotCancelled
        investorOnly
        notYetClaimedOrRefunded
    {
        require(honeyLiquidityAdded, "Liquidity not yet added");

        claimed[msg.sender] = true; // make sure this goes first before transfer to prevent reentrancy
        token.transfer(msg.sender, getTokenAmount(investments[msg.sender]));

        uint256 balance = address(this).balance;
        if (balance > 0) {
            uint256 funds =
                presaleCreatorClaimWei > balance
                    ? balance
                    : presaleCreatorClaimWei;
            presaleCreatorAddress.transfer(funds);
        }
    }

    function getRefund()
        external
        whitelistedAddressOnly
        investorOnly
        notYetClaimedOrRefunded
    {
        if (!presaleCancelled) {
            require(block.timestamp >= openTime, "Not yet opened");
            require(block.timestamp >= closeTime, "Not yet closed");
            require(softCapInWei > 0, "No soft cap");
            require(totalCollectedWei < softCapInWei, "Soft cap reached");
        }

        claimed[msg.sender] = true; // make sure this goes first before transfer to prevent reentrancy
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

    function cancelAndTransferTokensToPresaleCreator() external {
        if (
            !honeyLiquidityAdded &&
            presaleCreatorAddress != msg.sender &&
            xdsDevAddress != msg.sender
        ) {
            revert();
        }
        if (honeyLiquidityAdded && xdsDevAddress != msg.sender) {
            revert();
        }

        require(!presaleCancelled);
        presaleCancelled = true;

        uint256 balance = token.balanceOf(address(this));
        if (balance > 0) {
            token.transfer(presaleCreatorAddress, balance);
        }
    }

    function collectFundsRaised() external onlyPresaleCreator {
        require(honeyLiquidityAdded);
        require(!presaleCancelled);
        require(block.timestamp >= presaleCreatorClaimTime);

        if (address(this).balance > 0) {
            presaleCreatorAddress.transfer(address(this).balance);
        }
    }

    function burnUnsoldTokens() external onlyPresaleCreatorOrXdsDev {
        require(honeyLiquidityAdded);
        require(!presaleCancelled);
        require(block.timestamp >= presaleCreatorClaimTime + 1 days); // wait 2 days before allowing burn

        uint256 unsoldTokensAmount = token.balanceOf(address(this));
        if (unsoldTokensAmount > 0) {
            token.transfer(unsoldTokensDumpAddress, unsoldTokensAmount);
        }
    }
}