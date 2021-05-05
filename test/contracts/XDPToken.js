const assert = require("chai").assert;
const {
  oneMillion
} = require("../../lib/utils");
const XDPToken = artifacts.require("XDPToken");
const XDPresale = artifacts.require("XDPresale");

let xdpToken;

before(async () => {
  xdpToken = await XDPToken.deployed();
  xdPresale = await XDPresale.deployed();
});

contract("XDPToken", async accounts => {
  it("should be named", async () => {
    assert.equal((await xdpToken.name()), "xDaiStarter");
  });
  it("should have a symbol", async () => {
    assert.equal((await xdpToken.symbol()), "XDP");
  });
  it("should have one million tokens", async () => {
    assert.equal((await xdpToken.totalSupply()).toString(), oneMillion.toString());
  });
  // This assumes all migrations have been run!
  it("should have one million tokens belonging to the XDPresale", async () => {
    assert.equal((await xdpToken.balanceOf(xdPresale.address)).toString(), oneMillion.toString());
  });
});
