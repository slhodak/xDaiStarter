const assert = require("chai").assert;
const XDPresale = artifacts.require("XDPresale");
const XDPToken = artifacts.require("XDPToken");
const { utils, BigNumber } = require("ethers");

let xdpToken;
let xdPresale;
let generalInfo;
let stringInfo;
let auditorInfo;

function stringToPaddedBytes32(value) {
  let hex = Buffer.from(value).toString('hex');
  return utils.hexZeroPad("0x" + hex, 32);
}

before(async () => {
  xdpToken = await XDPToken.deployed();
  xdPresale = await XDPresale.deployed();
  generalInfo = {
    totalTokens: 1_000_000,
    tokenPriceInWei: BigNumber.from("1000000000000000000"),       // 1 xDai per token
    hardCapInWei:    BigNumber.from("100000000000000000000000"),  // 100,000 xDai
    softCapInWei:    BigNumber.from("50000000000000000000000"),   // 50,000 xDai
    maxInvestInWei:  BigNumber.from("5000000000000000000"),       // 5 tokens
    minInvestInWei:  BigNumber.from("500000000000000000"),        // half a token
    openTime: Date.now(),
    closeTime: Date.now() + 10_000,
  };
  stringInfo = {
    saleTitle: stringToPaddedBytes32("token_presale"),
    linkTelegram: stringToPaddedBytes32("telegram.com/project"),
    linkGithub: stringToPaddedBytes32("github.com/project"),
    linkTwitter: stringToPaddedBytes32("twitter.com/project"),
    linkWebsite: stringToPaddedBytes32("project.com"),
    linkLogo: stringToPaddedBytes32("project.com/logo"),
  };
  auditorInfo = {
    auditor: stringToPaddedBytes32("the_auditor"),
    isVerified: true, // Audit passed
    isWarning: false, // Audit passed
    // Just a random sha-256 hash
    verifiedHash: "6980cd3d391756c21a7a3fc64deb1ed89b39609cf768e2e32b940c5025cd5e78385033d43b8b5a2ece9f08039f1cf497b91d9e3746c834e28d920ae57a70653990a13102ced4d5cb74b2f64bdd8c0e3661d44435f96c1af9453234c8b7349b871e588ffd195ce726afe6cf22b14ee54ef3ea513599edf9d5f3ca300e1b0d1ea3c36d28e957a7c2130b777561022cb551f61eb058c46eb0de98807fc21e410aef294db9b5eb0721846f481a29ad778a90575895694e088343eae6120dd1987801171a3dbe8a773dcee62d59c3b6138441171ce0f5f96e862ff4aaa330d1220f58e3f24054bd8b6adb258bf51086daae20c54e4214cbb64ecb2760f276ec4104cd25170bc5d568a00ad99707ff572a51951bc2b820d5bfe594a5edec0edd31d7d0d66b0e10c6f50267c8d8c781c19024f8614ce4fbf8240b70d8eee8a4577f1220",
    warningHash: ""
  };
});

// Test everything
contract("XDPresale", async accounts => {
  it("should contain the dev address", async () => {
    assert.equal((await xdPresale.xdsDevAddress()), accounts[0]);
  });
  it("should let Address Info be set", async () => {
    await xdPresale.setAddressInfo(xdpToken.address, accounts[1]);
  });
  it("should reference a token", async () => {
    assert.equal((await xdPresale.token()), xdpToken.address)
  });
  it("should let General Info be set", async () => {
    await xdPresale.setGeneralInfo(
      generalInfo.totalTokens,
      generalInfo.tokenPriceInWei,
      generalInfo.hardCapInWei,
      generalInfo.softCapInWei,
      generalInfo.maxInvestInWei,
      generalInfo.minInvestInWei,
      generalInfo.openTime,
      generalInfo.closeTime
    );
  });
  it("should let String Info be set", async () => {
    await xdPresale.setStringInfo(
      stringInfo.saleTitle,
      stringInfo.linkTelegram,
      stringInfo.linkGithub,
      stringInfo.linkTwitter,
      stringInfo.linkWebsite,
      stringInfo.linkLogo
    );
  });
  it("should let Auditor Info be set", async () => {
    await xdPresale.setAuditorInfo(
      auditorInfo.auditor,
      auditorInfo.isVerified,
      auditorInfo.isWarning,
      auditorInfo.verifiedHash,
      auditorInfo.warningHash,
    );
  });
  it("should return stored Auditor Info", async () => {
    const savedAuditorInfo = await xdPresale.auditInformation();
    let  {
      auditor,
      isVerified,
      isWarning,
      verifiedHash,
      warningHash
    } = savedAuditorInfo;
    assert.equal(auditor, auditorInfo.auditor);
    assert.equal(isVerified, auditorInfo.isVerified);
    assert.equal(isWarning, auditorInfo.isWarning);
    assert.equal(verifiedHash, auditorInfo.verifiedHash);
    assert.equal(warningHash, auditorInfo.warningHash);
  });

});
