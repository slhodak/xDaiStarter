const XDPresale = artifacts.require("XDPresale");

// take from ganache when testing
DEV_ADDRESS = "0xea562aDfA72E2c402470c79a478bb6ff1FD982b9"

module.exports = async (deployer) => {
  // TODO: get first address of local blockchain accounts for dev address
  await deployer.deploy(XDPresale, DEV_ADDRESS);
};
