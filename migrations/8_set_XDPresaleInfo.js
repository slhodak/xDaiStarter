const XDPToken = artifacts.require("XDPToken");
const XDPresale = artifacts.require("XDPresale");
require("dotenv").config();
const { BigNumber } = require("ethers");
const {
  stringToPaddedBytes32,
  one,
  oneMillion
} = require("../lib/utils");

module.exports = async (deployer, network, accounts) => {
  /////////////////////
  // Migration Setup //
  /////////////////////
  const generalInfo = {
    totalTokens:     oneMillion,                         // 1M tokens
    tokenPriceInWei: one,                                // 1 xDai per token
    hardCapInWei:    one.mul(BigNumber.from("100000")),  // 100,000 xDai
    softCapInWei:    one.mul(BigNumber.from("50000")),   // 50,000 xDai
    maxInvestInWei:  one.mul(BigNumber.from("5")),       // 5 tokens
    minInvestInWei:  one.div(BigNumber.from("2")),       // half a token
    openTime: Math.floor(Date.now() / 1000),             // Javascript time is in milliseconds by default
    closeTime: Math.floor(Date.now() / 1000) + 500,
  };
  const stringInfo = {
    saleTitle: stringToPaddedBytes32("token_presale"),
    linkTelegram: stringToPaddedBytes32("telegram.com/project"),
    linkGithub: stringToPaddedBytes32("github.com/project"),
    linkTwitter: stringToPaddedBytes32("twitter.com/project"),
    linkWebsite: stringToPaddedBytes32("project.com"),
    linkLogo: stringToPaddedBytes32("project.com/logo"),
  };
  const auditorInfo = {
    auditor: stringToPaddedBytes32("the_auditor"),
    isVerified: true, // Audit passed
    isWarning: false, // Audit passed
    // Just a random sha-256 hash
    verifiedHash: "6980cd3d391756c21a7a3fc64deb1ed89b39609cf768e2e32b940c5025cd5e78385033d43b8b5a2ece9f08039f1cf497b91d9e3746c834e28d920ae57a70653990a13102ced4d5cb74b2f64bdd8c0e3661d44435f96c1af9453234c8b7349b871e588ffd195ce726afe6cf22b14ee54ef3ea513599edf9d5f3ca300e1b0d1ea3c36d28e957a7c2130b777561022cb551f61eb058c46eb0de98807fc21e410aef294db9b5eb0721846f481a29ad778a90575895694e088343eae6120dd1987801171a3dbe8a773dcee62d59c3b6138441171ce0f5f96e862ff4aaa330d1220f58e3f24054bd8b6adb258bf51086daae20c54e4214cbb64ecb2760f276ec4104cd25170bc5d568a00ad99707ff572a51951bc2b820d5bfe594a5edec0edd31d7d0d66b0e10c6f50267c8d8c781c19024f8614ce4fbf8240b70d8eee8a4577f1220",
    warningHash: ""
  };
  
  const xdPresale = await XDPresale.deployed();
  const xdpToken = await XDPToken.deployed();
  
  // Dev Address either in .env or first development blockchain account
  let devAddress;
  if (network == "develop" || network == "development") {
    devAddress = accounts[0];
    unsoldTokensDumpAddress = accounts[accounts.length - 1];
  } else {
    devAddress = process.env[`${network.toUpperCase()}_DEV_ADDRESS`];
    unsoldTokensDumpAddress = process.env[`${network.toUpperCase()}_DUMP_ADDRESS`];
  }

  ///////////////////////
  // Migration Actions //
  ///////////////////////
  
  // Presale must own all tokens
  await xdpToken.transfer(xdPresale.address, oneMillion);
  // Set Address Info
  await xdPresale.setAddressInfo(xdpToken.address, unsoldTokensDumpAddress);
  // Set General Info
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
  // Set String Info
  await xdPresale.setStringInfo(
    stringInfo.saleTitle,
    stringInfo.linkTelegram,
    stringInfo.linkGithub,
    stringInfo.linkTwitter,
    stringInfo.linkWebsite,
    stringInfo.linkLogo
  );

  // Users get whitelisted when they connect their wallets to the site
  await xdPresale.addWhitelistedAddresses([ devAddress ]);
  // Allow refunds
  await xdPresale.setRefundAllowed(true);
};
