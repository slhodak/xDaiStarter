const XDPresale = artifacts.require("XDPresale");
const XDaiStarterInfo = artifacts.require("XDaiStarterInfo");

module.exports = async (deployer) => {
  const xdPresale = await XDPresale.deployed();
  await deployer.deploy(XDaiStarterInfo, [ xdPresale.address ]);
};
