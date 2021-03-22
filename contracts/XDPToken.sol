// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "./lib/ERC20.sol";

contract XDPToken is ERC20 {

    constructor() public ERC20("xDaiStarter", "XDP") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }
}