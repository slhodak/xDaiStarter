const XDPresale = artifacts.require("XDPresale");
const { saveContractAddress } = require("../lib/utils");

module.exports = async (deployer, network, accounts) => {
  // Address(es) derived from mnemonic given by .env to truffle-config
  const devAddress = accounts[0];
  await deployer.deploy(XDPresale, devAddress);
  saveContractAddress(XDPresale);
};
