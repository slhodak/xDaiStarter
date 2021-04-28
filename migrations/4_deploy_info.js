const XDaiStarterInfo = artifacts.require("XDaiStarterInfo");

module.exports = async (deployer) => {
  await deployer.deploy(XDaiStarterInfo, []);
};
