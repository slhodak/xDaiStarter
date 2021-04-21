// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./XDPresale.sol";

contract XDaiStarterInfo is Ownable {
    using SafeMath for uint256;

    uint256 private devFeePercentage = 2; // fees going to dev AND XDST hodlers (2% each)
    uint256 private minDevFeeInWei = 5 ether; // min fee amount going to dev AND XDST hodlers
    uint256 private maxRewardQualifyBal = 20000 * 1e18; // max amount to HODL to qualify for xDai fee rewards
    uint256 private minRewardQualifyBal = 1250 * 1e18; // min amount to HODL to qualify for xDai fee rewards
    uint256 private minRewardQualifyPercentage = 10; // percentage of discount on tokens for qualifying holders
    uint256 private presaleGrantAmount = 100 * 1e18; // grant given to 'good' projects 30 days after raise
    address private incubatorMsigAddress; // community address used to release presale incubator grants

    address[] private presaleAddresses; // track all presales created
    address[] private presaleGrantAddresses; // track all presale grants assigned

    uint256 private minInvestorXDPBalance = 100 * 1e18; // min amount to investors HODL XDSt balance
    uint256 private minStakeTime = 24 hours;
    uint256 private minUnstakeTime = 24 hours;
    uint256 private minClaimTime = 7 days;

    address payable[] private xdpTokenPresales;

    address private honeySwapRouter =
        address(0x00);
    address private honeySwapFactory =
        address(0x00);
    address private wxdai = address(0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d);

    address private xdpFactoryAddress;

    constructor(address payable[] memory _xdpTokenPresales) public {
        xdpTokenPresales = _xdpTokenPresales;
    }

    modifier onlyFactory() {
        require(xdpFactoryAddress == msg.sender);
        _;
    }

    function getXdpFactoryAddress() external view returns (address) {
      return xdpFactoryAddress;
    }

    function setXdpFactoryAddress(address _newFactoryAddress)
        external
        onlyOwner
    {
        xdpFactoryAddress = _newFactoryAddress;
    }

    function addPresaleAddress(address _presale)
        external
        onlyFactory
        returns (uint256)
    {
        presaleAddresses.push(_presale);
        return presaleAddresses.length - 1;
    }

    function getPresalesCount() external view returns (uint256) {
        return presaleAddresses.length;
    }

    function getPresaleAddress(uint256 xdpId) external view returns (address) {
        return presaleAddresses[xdpId];
    }

    function addPresaleGrantAddress(address _presaleGrant)
        external
        onlyFactory
        returns (uint256)
    {
        presaleGrantAddresses.push(_presaleGrant);
        return presaleGrantAddresses.length - 1;
    }

    function getPresaleGrantsCount() external view returns (uint256) {
        return presaleGrantAddresses.length;
    }

    function getPresaleGrantAddress(uint256 _id)
        external
        view
        returns (address)
    {
        return presaleGrantAddresses[_id];
    }

    function getDevFeePercentage() external view returns (uint256) {
        return devFeePercentage;
    }

    function setDevFeePercentage(uint256 _devFeePercentage) external onlyOwner {
        devFeePercentage = _devFeePercentage;
    }

    function getMinDevFeeInWei() external view returns (uint256) {
        return minDevFeeInWei;
    }

    function setMinDevFeeInWei(uint256 _minDevFeeInWei) external onlyOwner {
        minDevFeeInWei = _minDevFeeInWei;
    }

    function getPresaleGrantAmount() external view returns (uint256) {
        return presaleGrantAmount;
    }

    function setPresaleGrantAmount(uint256 _presaleGrantAmount)
        external
        onlyOwner
    {
        require(
            _presaleGrantAmount <= 5000 * 1e18,
            "Invalid presale grant amount"
        );
        presaleGrantAmount = _presaleGrantAmount;
    }

    function getIncubatorMsigAddress() external view returns (address) {
        return incubatorMsigAddress;
    }

    function setIncubatorMsigAddress(address _incubatorMsigAddress)
        external
        onlyOwner
    {
        incubatorMsigAddress = _incubatorMsigAddress;
    }

    function getMinRewardQualifyPercentage() external view returns (uint256) {
        return minRewardQualifyPercentage;
    }

    function setMinRewardQualifyPercentage(uint256 _minRewardQualifyPercentage)
        external
        onlyOwner
    {
        minRewardQualifyPercentage = _minRewardQualifyPercentage;
    }

    function getMinRewardQualifyBal() external view returns (uint256) {
        return minRewardQualifyBal;
    }

    function setMinRewardQualifyBal(uint256 _minRewardQualifyBal)
        external
        onlyOwner
    {
        minRewardQualifyBal = _minRewardQualifyBal;
    }

    function getMaxRewardQualifyBal() external view returns (uint256) {
        return maxRewardQualifyBal;
    }

    function setMaxRewardQualifyBal(uint256 _maxRewardQualifyBal)
        external
        onlyOwner
    {
        maxRewardQualifyBal = _maxRewardQualifyBal;
    }

    function getMinInvestorXDPBalance() external view returns (uint256) {
        return minInvestorXDPBalance;
    }

    function setMinInvestorXDPBalance(uint256 _minInvestorXDPBalance)
        external
        onlyOwner
    {
        minInvestorXDPBalance = _minInvestorXDPBalance;
    }

    function getMinStakeTime() external view returns (uint256) {
        return minStakeTime;
    }

    function setMinStakeTime(uint256 _minStakeTime) external onlyOwner {
        minStakeTime = _minStakeTime;
    }

    function getMinUnstakeTime() external view returns (uint256) {
        return minUnstakeTime;
    }

    function setMinUnstakeTime(uint256 _minUnstakeTime) external onlyOwner {
        minUnstakeTime = _minUnstakeTime;
    }

    function getMinClaimTime() external view returns (uint256) {
        return minClaimTime;
    }

    function setMinClaimTime(uint256 _minClaimTime) external onlyOwner {
        minClaimTime = _minClaimTime;
    }

    function getXdpTokenPresales()
        external
        view
        returns (address payable[] memory)
    {
        return xdpTokenPresales;
    }

    function setXdpTokenPresales(address payable[] memory _xdpTokenPresales)
        external
        onlyOwner
    {
        xdpTokenPresales = _xdpTokenPresales;
    }

    function getLockedBalance(address payable sender)
        external
        view
        returns (uint256 totalLockedBalance)
    {
        totalLockedBalance = 0;
        for (uint256 i = 0; i < xdpTokenPresales.length; i++) {
            XDPresale tokenPresale = XDPresale(xdpTokenPresales[i]);

            uint256 senderInvestment = tokenPresale.investments(sender);
            uint256 senderClaimed = tokenPresale.claimed(sender);
            if (senderInvestment > 0 && senderClaimed < 4) {
                uint256 poolTokenPriceInWei = tokenPresale.tokenPriceInWei();
                uint256 poolLockedBalance =
                    senderInvestment
                        .div(4)
                        .mul(4 - senderClaimed)
                        .mul(1e18)
                        .div(poolTokenPriceInWei);
                totalLockedBalance = totalLockedBalance.add(poolLockedBalance);
            }
        }
    }

    function getHoneySwapRouter() external view returns (address) {
        return honeySwapRouter;
    }

    function setHoneySwapRouter(address _honeySwapRouter)
        external
        onlyOwner
    {
        honeySwapRouter = _honeySwapRouter;
    }

    function getHoneySwapFactory() external view returns (address) {
        return honeySwapFactory;
    }

    function setHoneySwapFactory(address _honeySwapFactory)
        external
        onlyOwner
    {
        honeySwapFactory = _honeySwapFactory;
    }

    function getwxdai() external view returns (address) {
        return wxdai;
    }

    function setwxdai(address _wxdai) external onlyOwner {
        wxdai = _wxdai;
    }
}