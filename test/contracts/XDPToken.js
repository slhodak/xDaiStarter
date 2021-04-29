const assert = require("chai").assert;
const XDPToken = artifacts.require("XDPToken");

let xdpToken;

before(async () => {
  xdpToken = await XDPToken.deployed();
});

contract("XDPToken", async accounts => {
  it("should be named", async () => {
    const name = await xdpToken.name();
    assert.equal(name, "xDaiStarter");
  });
  it("should have a symbol", async() => {
    const symbol = await xdpToken.symbol();
    assert.equal(symbol, "XDP");
  });
});
