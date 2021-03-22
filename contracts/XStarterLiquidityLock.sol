pragma solidity 0.6.12;

import "./TimeTokenLock.sol";

// SPDX-License-Identifier: MIT
contract XDaiStarterLiquidityLock is TokenTimelock {
    constructor(
        IERC20 _token,
        uint256 _releaseTime,
        address primaryBeneficiary,
        address secondaryBeneficiary
    ) public TokenTimelock(_token, _releaseTime, primaryBeneficiary, secondaryBeneficiary) {}
}