const assert = require("chai").assert;
const XDPresale = artifacts.require("XDPresale");
const XDPToken = artifacts.require("XDPToken");
const XDaiStarterFactory = artifacts.require("XDaiStarterFactory");

// see migrations/3_deploy_xdpresale.js
DEV_ADDRESS = "0xea562aDfA72E2c402470c79a478bb6ff1FD982b9"

before(async () => {
  xdpToken = await XDPToken.deployed();
  xdpresale = await XDPresale.deployed();
  xdsFactory = await XDaiStarterFactory.deployed();


  presaleInfo = {
    tokenAddress = "0x01",
    unsoldTokensDumpAddress = "0x00",
    whitelistedAddresses = ["0x02"],
    tokenPriceInWei = 0,
    hardCapInWei = 0,
    softCapInWei = 0,
    maxInvestInWei = 0,
    minInvestInWei = 0,
    openTime = 0,
    closeTime = 0,
  }

  presaleHoneySwapInfo = {
    listingPriceInWei = 0,
    liquidityAddingTime = 0,
    lpTokensLockDurationInDays = 0,
    liquidityPercentageAllocation = 0,
  }

  presaleStringInfo = {
    saleTitle = "token_presale",
    linkTelegram = "telegran.com/project",
    linkGithub = "github.com/project",
    linkTwitter = "twitter.com/project",
    linkWebsite = "project.com",
    linkLogo = "project.com/logo",
  }
});

// Test everything
// After doing so, deploy will be trivial
contract("XDaiStarterFactory", async accounts => {
  it("should reference the XDS Info", async () => {
    asset.equal((await xdpresale.xdsDevAddress()), DEV_ADDRESS);
  });
  it("should reference the XDP Token", async () => {
    assert.equal((await xdpresale.token()), xdpToken.address)
  });
  it("should reference the XDS Staking Pool", async () => {
  });
  it("should receive value", async () => {
  });
  it("should emit the Presale Created event", async () => {
  });
  it("create a presale that can be found using the id in the Presale Created event", async () => {
  });
  it("should allow hodlers to claim rewards", async () => {
  });
  it("should save the timestamp of the most recent hodler rewards claim per address", async () => {
  });
});
