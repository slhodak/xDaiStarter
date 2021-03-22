// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import "./lib/SafeMath.sol";
import "./lib/Address.sol";
import "./lib/SafeERC20.sol";
import "./lib/ReentrancyGuard.sol";
import "./STARToken.sol";
import "./XDaiStarterInfo.sol";

contract XDaiStarterStaking is ReentrancyGuard {
    using SafeMath for uint256;
    using Address for address;
    using SafeERC20 for IERC20;

    STARToken public xdpToken;
    XDaiStarterInfo public xDaiStarterInfo;

    event Staked(address indexed from, uint256 amount);
    event Unstaked(address indexed from, uint256 amount);

    struct AccountInfo {
        uint256 balance;
        uint256 lastStakedTimestamp;
        uint256 lastUnstakedTimestamp;
    }
    mapping(address => AccountInfo) public accountInfos;

    constructor(address _xdpToken, address _xDaiStarterInfo) public {
        xdpToken = STARToken(_xdpToken);
        xDaiStarterInfo = XDaiStarterInfo(_xDaiStarterInfo);
    }

    function stake(uint256 _amount) public nonReentrant {
        require(_amount > 0, "Invalid amount");
        require(xdpToken.balanceOf(msg.sender) >= _amount, "Invalid balance");

        AccountInfo storage account = accountInfos[msg.sender];
        xdpToken.transferFrom(msg.sender, address(this), _amount);
        account.balance = account.balance.add(_amount);
        account.lastStakedTimestamp = block.timestamp;
        if (account.lastUnstakedTimestamp == 0) {
            account.lastUnstakedTimestamp = block.timestamp;
        }
        emit Staked(msg.sender, _amount);
    }

    function unstake(uint256 _amount, uint256 _burnFeePercent)
        external
        nonReentrant
    {
        AccountInfo storage account = accountInfos[msg.sender];
        uint256 minUnstakeTime = xDaiStarterInfo.getMinUnstakeTime();
        require(
            account.lastUnstakedTimestamp + minUnstakeTime <= block.timestamp,
            "Invalid unstake time"
        );
        require(account.balance > 0, "Nothing to unstake");
        require(_amount > 0, "Invalid amount");
        if (account.balance < _amount) {
            _amount = account.balance;
        }
        account.balance = account.balance.sub(_amount);
        account.lastUnstakedTimestamp = block.timestamp;

        uint256 burnAmount = _amount.mul(_burnFeePercent);
        if (burnAmount > 0) {
            _amount = _amount.sub(burnAmount);
            xdpToken.transfer(
                address(0x000000000000000000000000000000000000dEaD),
                burnAmount
            );
        }

        xdpToken.transfer(msg.sender, _amount);
        emit Unstaked(msg.sender, _amount);
    }
}
