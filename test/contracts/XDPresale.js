const assert = require("chai").assert;
const XDPresale = artifacts.require("XDPresale");
const XDPToken = artifacts.require("XDPToken");

let xdpToken;
let xdPresale;
let unsoldTokensDumpAddress;

before(async () => {
  xdpToken = await XDPToken.deployed();
  xdPresale = await XDPresale.deployed();
});

// Test everything
contract("XDPresale", async accounts => {
  it("should contain the dev address", async () => {
    assert.equal((await xdPresale.xdsDevAddress()), accounts[0]);
  });
  it("should let addressInfo be set", async() => {
    console.log(accounts[1]);
    await xdPresale.setAddressInfo(xdpToken.address, accounts[1]);
  });
  it("should reference a token", async () => {
    assert.equal((await xdPresale.token()), xdpToken.address)
  });
});
