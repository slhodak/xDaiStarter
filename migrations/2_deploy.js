const XDaiStarterInfo = artifacts.require("XDaiStarterInfo");
const XDSToken = artifacts.require("XDSToken");
const XDaiStarterStaking = artifacts.require("XDaiStarterStaking");
const XDaiStarterFactory = artifacts.require("XDaiStarterFactory");
const XDSTVesting = artifacts.require("XDSTVesting");

module.exports = async (deployer) => {
  await deployer.deploy(XDSToken);
  let xdsToken = await XDSToken.deployed();
  await deployer.deploy(XDaiStarterInfo, []);
  let xdsInfo = await XDaiStarterInfo.deployed();
  await deployer.deploy(XDaiStarterStaking, xdsToken.address, xdsInfo.address);
  let xdsStakingPool = await XDaiStarterStaking.deployed();
  deployer.deploy(XDaiStarterFactory, xdsToken.address, xdsInfo.address, xdsStakingPool.address);
  deployer.deploy(XDSTVesting);
};
