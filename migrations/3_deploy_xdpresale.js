const XDPresale = artifacts.require("XDPresale");
const { saveContractAddress } = require("../lib/utils");
require("dotenv").config();

module.exports = async (deployer, network, accounts) => {
  // Dev Address either in .env or first development blockchain account
  let devAddress;
  if (network == "develop" || network == "development") {
    devAddress = accounts[0];
  } else {
    devAddress = process.env[`${network.toUpperCase()}_DEV_ADDRESS`];
  }
  await deployer.deploy(XDPresale, devAddress);
  saveContractAddress(XDPresale);
};
