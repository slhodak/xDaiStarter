const XDPresale = artifacts.require("XDPresale");
const XDaiStarterInfo = artifacts.require("XDaiStarterInfo");
const { saveContractAddress } = require("../lib/utils");

module.exports = async (deployer, network) => {
  const xdPresale = await XDPresale.deployed();
  await deployer.deploy(XDaiStarterInfo, [ xdPresale.address ]);
  saveContractAddress(XDaiStarterInfo, network);
};
