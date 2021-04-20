// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract XDSToken is ERC20 {

    constructor() public ERC20("xDaiStarter", "XDST") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }
}