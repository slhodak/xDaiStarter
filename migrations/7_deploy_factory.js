const XDPToken = artifacts.require("XDPToken");
const XDaiStarterInfo = artifacts.require("XDaiStarterInfo");
const XDaiStarterStaking = artifacts.require("XDaiStarterStaking");
const XDaiStarterFactory = artifacts.require("XDaiStarterFactory");
const { saveContractAddress } = require("../lib/utils");

module.exports = async (deployer) => {
  let xdpToken = await XDPToken.deployed();
  let xdsInfo = await XDaiStarterInfo.deployed();
  let xdsStakingPool = await XDaiStarterStaking.deployed();
  await deployer.deploy(XDaiStarterFactory, xdpToken.address, xdsInfo.address, xdsStakingPool.address);
  saveContractAddress(XDaiStarterFactory);
};
