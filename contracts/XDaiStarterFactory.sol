// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import "./interfaces/IERC20.sol";
import "./XDaiStarterPresale.sol";
import "./XDaiStarterInfo.sol";
import "./XDaiStarterLiquidityLock.sol";
import "./lib/ReentrancyGuard.sol";
import "./STARToken.sol";
import "./XDaiStarterStaking.sol";

interface IHoneySwapV2Factory {
    function getPair(address tokenA, address tokenB)
        external
        view
        returns (address pair);
}

contract XDaiStarterFactory is ReentrancyGuard {
    using SafeMath for uint256;

    event PresaleCreated(bytes32 title, uint256 xdpId, address creator);
    event Received(address indexed from, uint256 amount);

    XDaiStarterInfo public immutable XDP;
    STARToken public xdpToken;

    XDaiStarterStaking public xdpStakingPool;

    mapping(address => uint256) public lastClaimedTimestamp;

    constructor(
        address _xdpInfoAddress,
        address _xdpToken,
        address _xdpStakingPool
    ) public {
        XDP = XDaiStarterInfo(_xdpInfoAddress);
        xdpToken = STARToken(_xdpToken);
        xdpStakingPool = XDaiStarterStaking(_xdpStakingPool);
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

    // copied from https://github.com/honeyswap/honey-swap-periphery/blob/master/contracts/libraries/HoneyLibrary.sol
    // calculates the CREATE2 address for a pair without making any external calls
    function honeyV2LibPairFor(
        address factory,
        address tokenA,
        address tokenB
    ) internal pure returns (address pair) {
        (address token0, address token1) =
            tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        pair = address(
            uint256(
                keccak256(
                    abi.encodePacked(
                        hex"ff",
                        factory,
                        keccak256(abi.encodePacked(token0, token1)),
                        hex"d0d4c4cd0848c93cb4fd1f498d7013ee6bfb25783ea21593d5834f5d250ece66" // init code hash
                    )
                )
            )
        );
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
        _presale.setMinInvestorXDPBalance(XDP.getMinInvestorXDPBalance());
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
                address(XDP),
                XDP.owner(),
                XDP.getMinRewardQualifyBal(),
                XDP.getMinRewardQualifyPercentage()
            );
        IHoneySwapV2Factory honeySwapFactory =
            IHoneySwapV2Factory(XDP.getHoneySwapFactory());

        uint256 maxBnbPoolTokenAmount =
            _info.hardCapInWei.mul(_honeyInfo.liquidityPercentageAllocation).div(
                100
            );
        uint256 maxLiqPoolTokenAmount =
            maxBnbPoolTokenAmount.mul(1e18).div(_honeyInfo.listingPriceInWei);

        uint256 maxTokensToBeSold =
            _info.hardCapInWei.mul(1e18).div(_info.tokenPriceInWei);
        uint256 requiredTokenAmount =
            maxLiqPoolTokenAmount.add(maxTokensToBeSold);
        token.transferFrom(msg.sender, address(presale), requiredTokenAmount);

        uint256 presaleGrantId;
        if (
            xdpToken.balanceOf(address(this)) >= XDP.getPresaleGrantAmount()
        ) {
            // locked incubator bonus XDP tokens if presale succeeds
            XDaiStarterLiquidityLock incubatorLock =
                new XDaiStarterLiquidityLock(
                    xdpToken,
                    _honeyInfo.liquidityAddingTime + 30 days,
                    XDP.getIncubatorMsigAddress(),
                    msg.sender
                );
            xdpToken.transfer(
                address(incubatorLock),
                XDP.getPresaleGrantAmount()
            );
            presaleGrantId = XDP.addPresaleGrantAddress(
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

        address pairAddress =
            honeyV2LibPairFor(
                address(honeySwapFactory),
                address(token),
                XDP.getWBNB()
            );
        XDaiStarterLiquidityLock liquidityLock =
            new XDaiStarterLiquidityLock(
                IERC20(pairAddress),
                _honeyInfo.liquidityAddingTime +
                    (_honeyInfo.lpTokensLockDurationInDays * 1 days),
                msg.sender,
                address(0)
            );

        uint256 xdpId = XDP.addPresaleAddress(address(presale));
        presale.setXdpInfo(
            address(liquidityLock),
            XDP.getDevFeePercentage(),
            XDP.getMinDevFeeInWei(),
            xdpId,
            presaleGrantId,
            address(xdpStakingPool)
        );

        emit PresaleCreated(_stringInfo.saleTitle, xdpId, msg.sender);
    }

    function claimHodlerFund() external nonReentrant {
        require(address(this).balance > 0, "No rewards to claim");
        require(
            lastClaimedTimestamp[msg.sender] + XDP.getMinClaimTime() <=
                block.timestamp,
            "Invalid Claim Time"
        );

        uint256 balance;
        uint256 lastStakedTimestamp;
        uint256 lastUnstakedTimestamp;
        (balance, lastStakedTimestamp, lastUnstakedTimestamp) = xdpStakingPool
            .accountInfos(msg.sender);
        uint256 minStakeTime = XDP.getMinStakeTime();
        uint256 totalHodlerBalance = XDP.getLockedBalance(msg.sender);

        if (lastStakedTimestamp + minStakeTime <= block.timestamp) {
            totalHodlerBalance = totalHodlerBalance.add(balance);
        }

        require(
            totalHodlerBalance >= XDP.getMinRewardQualifyBal() &&
                totalHodlerBalance <= XDP.getMaxRewardQualifyBal(),
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