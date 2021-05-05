// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "./XDaiStarterPresale.sol";
import "./XDaiStarterInfo.sol";
import "./XDaiStarterLiquidityLock.sol";
import "./XDPToken.sol";
import "./XDaiStarterStaking.sol";

// Not used?
interface IHoneySwapV2Factory {
    function getPair(address tokenA, address tokenB)
        external
        view
        returns (address pair);
}

contract XDaiStarterFactory is ReentrancyGuard {
    using SafeMath for uint256;

    event PresaleCreated(bytes32 title, uint256 xdsId, address creator);
    event Received(address indexed from, uint256 amount);

    XDaiStarterInfo public immutable XDS;
    XDPToken public xdpToken;

    XDaiStarterStaking public xdsStakingPool;

    mapping(address => uint256) public lastClaimedTimestamp;

    constructor(
        address _xdpToken,
        address _xdsInfoAddress,
        address _xdsStakingPool
    ) public {
        xdpToken = XDPToken(_xdpToken);
        XDS = XDaiStarterInfo(_xdsInfoAddress);
        xdsStakingPool = XDaiStarterStaking(_xdsStakingPool);
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    struct PresaleInfo {
        address tokenAddress;
        address unsoldTokensDumpAddress;
        address[] whitelistedAddresses;
        uint256 tokenPriceInWei;
        uint256 hardCapInWei;
        uint256 softCapInWei;
        uint256 maxInvestInWei;
        uint256 minInvestInWei;
        uint256 openTime;
        uint256 closeTime;
    }

    struct PresaleHoneySwapInfo {
        uint256 listingPriceInWei;
        uint256 liquidityAddingTime;
        uint256 lpTokensLockDurationInDays;
        uint256 liquidityPercentageAllocation;
    }

    struct PresaleStringInfo {
        bytes32 saleTitle;
        bytes32 linkTelegram;
        bytes32 linkGithub;
        bytes32 linkTwitter;
        bytes32 linkWebsite;
        bytes32 linkLogo;
    }

    // from @uniswap/v2-periphery/contracts/libraries/UniswapV2Library.sol
    // returns sorted token addresses, used to handle return values from pairs sorted in this order
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'XDaiStarterFactory: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'XDaiStarterFactory: ZERO_ADDRESS');
    }

    // from @uniswap/v2-periphery/contracts/libraries/UniswapV2Library.sol
    // calculates the CREATE2 address for a pair without making any external calls
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        // tokens sorted within fxn above
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'3f88503e8580ab941773b59034fb4b2a63e86dbc031b3633a925533ad3ed2b93' // honeyswap init code hash
            ))));
    }

    function initializePresale(
        XDaiStarterPresale _presale,
        uint256 _totalTokens,
        uint256 _finalTokenPriceInWei,
        PresaleInfo calldata _info,
        PresaleHoneySwapInfo calldata _honeyInfo,
        PresaleStringInfo calldata _stringInfo
    ) internal {
        _presale.setAddressInfo(
            msg.sender,
            _info.tokenAddress,
            address(xdpToken),
            _info.unsoldTokensDumpAddress
        );
        _presale.setGeneralInfo(
            _totalTokens,
            _finalTokenPriceInWei,
            _info.hardCapInWei,
            _info.softCapInWei,
            _info.maxInvestInWei,
            _info.minInvestInWei,
            _info.openTime,
            _info.closeTime
        );
        _presale.setHoneySwapInfo(
            _honeyInfo.listingPriceInWei,
            _honeyInfo.liquidityAddingTime,
            _honeyInfo.lpTokensLockDurationInDays,
            _honeyInfo.liquidityPercentageAllocation
        );
        _presale.setStringInfo(
            _stringInfo.saleTitle,
            _stringInfo.linkTelegram,
            _stringInfo.linkGithub,
            _stringInfo.linkTwitter,
            _stringInfo.linkWebsite,
            _stringInfo.linkLogo
        );

        _presale.addWhitelistedAddresses(_info.whitelistedAddresses);
        _presale.setMinInvestorXDSBalance(XDS.getMinInvestorXDPBalance());
    }

    function createPresale(
        PresaleInfo calldata _info,
        PresaleHoneySwapInfo calldata _honeyInfo,
        PresaleStringInfo calldata _stringInfo
    ) external {
        IERC20 token = IERC20(_info.tokenAddress);

        XDaiStarterPresale presale =
            new XDaiStarterPresale(
                address(this),
                address(XDS),
                XDS.owner(),
                XDS.getMinRewardQualifyBal(),
                XDS.getMinRewardQualifyPercentage()
            );

        // What pool token on xDai?
        uint256 maxXDaiPoolTokenAmount =
            _info.hardCapInWei.mul(_honeyInfo.liquidityPercentageAllocation).div(100);
        uint256 maxLiqPoolTokenAmount =
            maxXDaiPoolTokenAmount.mul(1e18).div(_honeyInfo.listingPriceInWei);
        uint256 maxTokensToBeSold =
            _info.hardCapInWei.mul(1e18).div(_info.tokenPriceInWei);
        uint256 requiredTokenAmount =
            maxLiqPoolTokenAmount.add(maxTokensToBeSold);

        token.transferFrom(msg.sender, address(presale), requiredTokenAmount);

        uint256 presaleGrantId;
        if (
            xdpToken.balanceOf(address(this)) >= XDS.getPresaleGrantAmount() // Factory must own grant XDP
        ) {
            // locked incubator bonus XDS tokens if presale succeeds
            XDaiStarterLiquidityLock incubatorLock =
                new XDaiStarterLiquidityLock(
                    xdpToken,
                    _honeyInfo.liquidityAddingTime + 30 days,
                    XDS.getIncubatorMsigAddress(),
                    msg.sender
                );
            xdpToken.transfer(
                address(incubatorLock),
                XDS.getPresaleGrantAmount()
            );
            presaleGrantId = XDS.addPresaleGrantAddress(
                address(incubatorLock)
            );
        }

        initializePresale(
            presale,
            maxTokensToBeSold,
            _info.tokenPriceInWei,
            _info,
            _honeyInfo,
            _stringInfo
        );

        IHoneySwapV2Factory honeySwapFactory =
            IHoneySwapV2Factory(XDS.getHoneySwapFactory());

        address pairAddress =
            pairFor(
                address(honeySwapFactory),
                address(token),
                XDS.getWxDai()
            );
        XDaiStarterLiquidityLock liquidityLock =
            new XDaiStarterLiquidityLock(
                IERC20(pairAddress),
                _honeyInfo.liquidityAddingTime +
                    (_honeyInfo.lpTokensLockDurationInDays * 1 days),
                msg.sender,
                address(0)
            );

        uint256 xdsId = XDS.addPresaleAddress(address(presale));
        presale.setXdsInfo(
            address(liquidityLock),
            XDS.getDevFeePercentage(),
            XDS.getMinDevFeeInWei(),
            xdsId,
            presaleGrantId,
            address(xdsStakingPool)
        );

        emit PresaleCreated(_stringInfo.saleTitle, xdsId, msg.sender);
    }

    function claimHodlerFund() external nonReentrant {
        require(address(this).balance > 0, "No rewards to claim");
        require(
            lastClaimedTimestamp[msg.sender] + XDS.getMinClaimTime() <=
                block.timestamp,
            "Invalid Claim Time"
        );

        uint256 balance;
        uint256 lastStakedTimestamp;
        uint256 lastUnstakedTimestamp;
        (balance, lastStakedTimestamp, lastUnstakedTimestamp) = xdsStakingPool
            .accountInfos(msg.sender);
        uint256 minStakeTime = XDS.getMinStakeTime();
        uint256 totalHodlerBalance = XDS.getLockedBalance(msg.sender);

        if (lastStakedTimestamp + minStakeTime <= block.timestamp) {
            totalHodlerBalance = totalHodlerBalance.add(balance);
        }

        require(
            totalHodlerBalance >= XDS.getMinRewardQualifyBal() &&
                totalHodlerBalance <= XDS.getMaxRewardQualifyBal(),
            "Do not qualify for rewards"
        );
        lastClaimedTimestamp[msg.sender] = block.timestamp;
        msg.sender.transfer(
            totalHodlerBalance.div(xdpToken.totalSupply()).mul(
                address(this).balance
            )
        );
    }
}