const assert = require("chai").assert;
const XDaiStarterInfo = artifacts.require("XDaiStarterInfo");
const XDPresale = artifacts.require("XDPresale");

let xDaiStarterInfo;
let xdPresale;

before(async () => {
  xDaiStarterInfo = await XDaiStarterInfo.deployed();
  xdPresale = await XDPresale.deployed();
});

contract("XDaiStarterInfo", async accounts => {
  it("should know of the xdsToken (XDP) Presales", async () => {
    assert.equal((await xDaiStarterInfo.getXdsTokenPresales())[0], xdPresale.address);
  });
  xit("should get a sender's locked XDPToken balance", async() => {
  });
  xit("should save new presale addresses", async () => {
  });
  xit("should return saved presale addresses", async () => {
  });
});
