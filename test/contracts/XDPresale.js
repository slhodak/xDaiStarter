const assert = require("chai").assert;
const XDPresale = artifacts.require("XDPresale");
const XDPToken = artifacts.require("XDPToken");

// see migrations/3_deploy_xdpresale.js
DEV_ADDRESS = "0xea562aDfA72E2c402470c79a478bb6ff1FD982b9"

before(async () => {
  xdpToken = await XDPToken.deployed();
  xdpresale = await XDPresale.deployed();
});

// Test everything
// After doing so, deploy will be trivial
contract("XDPresale", async accounts => {
  it("should contain the dev address", async () => {
    asset.equal((await xdpresale.xdsDevAddress()), DEV_ADDRESS);
  });
  it("should reference a token", async () => {
    assert.equal((await xdpresale.token()), xdpToken.address)
  });
  it("should ", async() => {
  });
});
