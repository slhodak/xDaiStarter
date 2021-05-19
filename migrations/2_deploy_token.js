const XDPToken = artifacts.require("XDPToken");
const { saveContractAddress } = require("../lib/utils");

module.exports = async (deployer, network) => {
  await deployer.deploy(XDPToken);
  saveContractAddress(XDPToken, network);
};
