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
