const assert = require("chai").assert;
const XDPresale = artifacts.require("XDPresale");
const XDPToken = artifacts.require("XDPToken");
const XDaiStarterStaking = artifacts.require("XDaiStarterStaking");
const XDaiStarterInfo = artifacts.require("XDaiStarterInfo");
const XDaiStarterFactory = artifacts.require("XDaiStarterFactory");

// see migrations/3_deploy_xdpresale.js
DEV_ADDRESS = "0xea562aDfA72E2c402470c79a478bb6ff1FD982b9"

before(async () => {
  xdpToken = await XDPToken.deployed();
  xdPresale = await XDPresale.deployed();
  xdsStaking = await XDaiStarterStaking.deployed();
  xdsInfo = await XDaiStarterInfo.deployed();
  xdsFactory = await XDaiStarterFactory.deployed();

  presaleInfo = {
    tokenAddress: "0xE65E201679606400edB5493139A728dB219E53bE",
    unsoldTokensDumpAddress: "0x0000000000000000000000000000dEad",
    whitelistedAddresses: [],
    tokenPriceInWei: 1000000000000000000,        // 1 xDai per token
    softCapInWei:    50000000000000000000000,    // 50,000 xDai
    hardCapInWei:    100000000000000000000000,   // 100,000 xDai
    minInvestInWei:  500000000000000000,         // half a token
    maxInvestInWei:  5000000000000000000,        // 5 tokens
    openTime: Date.now(),
    closeTime: Date.now() + 10_000,
  }

  presaleHoneySwapInfo = {
    listingPriceInWei: 2000000000000000000,      // double presale price
    liquidityAddingTime: Date.now() + 10_001,
    lpTokensLockDurationInDays: 7,
    liquidityPercentageAllocation: 15,
  }

  presaleStringInfo = {
    saleTitle: "token_presale",
    linkTelegram: "telegran.com/project",
    linkGithub: "github.com/project",
    linkTwitter: "twitter.com/project",
    linkWebsite: "project.com",
    linkLogo: "project.com/logo",
  }
});

// Test everything
contract("XDaiStarterFactory", async accounts => {
  it("should reference the XDS Info", async () => {
    asset.equal((await xdsFactory.XDS()), xdsInfo.address);
  });
  it("should reference the XDP Token", async () => {
    assert.equal((await xdsFactory.xdpToken()), xdpToken.address)
  });
  it("should reference the XDS Staking Pool", async () => {
    assert.equal((await xdsFactory.xdsStakingPool()), xdpToken.address)
  });
  xit("should receive value", async () => {
  });
  xit("should emit the Presale Created event", async () => {
  });
  xit("create a presale that can be found using the id in the Presale Created event", async () => {
  });
  xit("should allow hodlers to claim rewards", async () => {
  });
  xit("should save the timestamp of the most recent hodler rewards claim per address", async () => {
  });
});
