const XDSTVesting = artifacts.require("XDSTVesting");

module.exports = async (deployer) => {
  await deployer.deploy(XDSTVesting);
};
