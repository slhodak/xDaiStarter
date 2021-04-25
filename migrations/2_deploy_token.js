const XDPToken = artifacts.require("XDPToken");

module.exports = async (deployer) => {
  await deployer.deploy(XDPToken);
};
