const XDPToken = artifacts.require("XDPToken");
const XDaiStarterInfo = artifacts.require("XDaiStarterInfo");
const XDaiStarterStaking = artifacts.require("XDaiStarterStaking");

module.exports = async (deployer) => {
  let xdpToken = await XDPToken.deployed();
  let xdsInfo = await XDaiStarterInfo.deployed();
  await deployer.deploy(XDaiStarterStaking, xdpToken.address, xdsInfo.address);
};
