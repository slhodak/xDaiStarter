const XDPresale = artifacts.require("XDPresale");
require("dotenv").config();

module.exports = async (deployer, network, accounts) => {
  // Dev Address either in .env or first development blockchain account
  let devAddress;
  if (network != "develop" && network != "development") {
    devAddress = process.env[`${network.toUpperCase()}_DEV_ADDRESS`];
  } else {
    devAddress = accounts[0];
  }
  await deployer.deploy(XDPresale, devAddress);
};
