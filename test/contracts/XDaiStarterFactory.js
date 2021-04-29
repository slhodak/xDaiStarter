const assert = require("chai").assert;
const XDPresale = artifacts.require("XDPresale");
const XDPToken = artifacts.require("XDPToken");
const XDaiStarterStaking = artifacts.require("XDaiStarterStaking");
const XDaiStarterInfo = artifacts.require("XDaiStarterInfo");
const XDaiStarterFactory = artifacts.require("XDaiStarterFactory");

let xdpToken;
let xdPresale;
let xdsStaking;
let xdsInfo;
let xdsFactory;
let presaleInfo;
let presaleHoneySwapInfo;
let presaleStringInfo;

before(async () => {
  xdpToken = await XDPToken.deployed();
  xdPresale = await XDPresale.deployed();
  xdsStaking = await XDaiStarterStaking.deployed();
  xdsInfo = await XDaiStarterInfo.deployed();
  xdsFactory = await XDaiStarterFactory.deployed();

  // XDPresale Info
  presaleInfo = {
    tokenAddress: xdpToken.address,
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
    assert.equal((await xdsFactory.XDS()), xdsInfo.address);
  });
  it("should reference the XDP Token", async () => {
    assert.equal((await xdsFactory.xdpToken()), xdpToken.address)
  });
  it("should reference the XDS Staking Pool", async () => {
    assert.equal((await xdsFactory.xdsStakingPool()), xdsStaking.address)
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
