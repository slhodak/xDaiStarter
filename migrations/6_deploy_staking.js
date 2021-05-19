const XDPToken = artifacts.require("XDPToken");
const XDaiStarterInfo = artifacts.require("XDaiStarterInfo");
const XDaiStarterStaking = artifacts.require("XDaiStarterStaking");
const { saveContractAddress } = require("../lib/utils");

module.exports = async (deployer, network) => {
  let xdpToken = await XDPToken.deployed();
  let xdsInfo = await XDaiStarterInfo.deployed();
  await deployer.deploy(XDaiStarterStaking, xdpToken.address, xdsInfo.address);
  saveContractAddress(XDaiStarterStaking, network);
};
