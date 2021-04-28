const XDSVesting = artifacts.require("XDSVesting");

module.exports = async (deployer) => {
  await deployer.deploy(XDSVesting);
};
