const assert = require("chai").assert;
const XDaiStarterInfo = artifacts.require("XDaiStarterInfo");

let xDaiStarterInfo;

before(async () => {
  xDaiStarterInfo = await XDaiStarterInfo.deployed();
});

contract("XDaiStarterInfo", async accounts => {
  xit("know of the xdsToken (XDP) Presales", async () => {
  });
  xit("get a sender's locked XDPToken balance", async() => {
  });
  xit("save new presale addresses", async () => {
  });
  xit("return saved presale addresses", async () => {
  });
});
