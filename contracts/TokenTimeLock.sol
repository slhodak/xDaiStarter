// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

/**
 * @dev A token holder contract that will allow a beneficiary to extract the
 * tokens after a given release time.
 *
 * Useful for simple vesting schedules like "advisors get all of their tokens
 * after 1 year".
 */
contract TokenTimelock {
    using SafeERC20 for IERC20;

    // ERC20 basic token contract being held
    IERC20 private _token;

    // beneficiary of tokens after they are released
    address private _beneficiary;

    // second beneficiary of tokens after they are released
    // only primary beneficiary can send unlocked tokens to secondary
    address private _secondaryBeneficiary;

    // timestamp when token release is enabled
    uint256 private _releaseTime;

    constructor(
        IERC20 token,
        uint256 releaseTime,
        address beneficiary,
        address secondaryBeneficiary
    ) public {
        // solhint-disable-next-line not-rely-on-time
        require(
            releaseTime > block.timestamp,
            "TokenTimelock: release time is before current time"
        );
        _token = token;
        _beneficiary = beneficiary;
        _releaseTime = releaseTime;
        _secondaryBeneficiary = secondaryBeneficiary;
    }

    /**
     * @return the token being held.
     */
    function token() public view returns (IERC20) {
        return _token;
    }

    /**
     * @return the beneficiary of the tokens.
     */
    function beneficiary() public view returns (address) {
        return _beneficiary;
    }

    /**
     * @return the secondary beneficiary of the tokens.
     */
    function secondaryBeneficiary() public view returns (address) {
        return _secondaryBeneficiary;
    }

    /**
     * @return the time when the tokens are released.
     */
    function releaseTime() public view returns (uint256) {
        return _releaseTime;
    }

    /**
     * @notice Transfers tokens held by timelock to beneficiary.
     */
    function release() public virtual {
        // solhint-disable-next-line not-rely-on-time
        require(
            block.timestamp >= _releaseTime,
            "TokenTimelock: current time is before release time"
        );
        require(msg.sender == _beneficiary, "Only beneficiary can approve");

        uint256 amount = _token.balanceOf(address(this));
        require(amount > 0, "TokenTimelock: no tokens to release");

        _token.safeTransfer(_beneficiary, amount);
    }

    /**
     * @notice Transfers tokens held by timelock to beneficiary.
     */
    function releaseSecondary() public virtual {
        // solhint-disable-next-line not-rely-on-time
        require(
            block.timestamp >= _releaseTime,
            "TokenTimelock: current time is before release time"
        );
        require(msg.sender == _beneficiary, "Only beneficiary can approve");

        uint256 amount = _token.balanceOf(address(this));
        require(amount > 0, "TokenTimelock: no tokens to release");

        _token.safeTransfer(_secondaryBeneficiary, amount);
    }
}
