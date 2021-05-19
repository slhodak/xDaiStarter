const XDSVesting = artifacts.require("XDSVesting");
const { saveContractAddress } = require("../lib/utils");

module.exports = async (deployer, network) => {
  await deployer.deploy(XDSVesting);
  saveContractAddress(XDSVesting, network);
};
