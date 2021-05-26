const XDPToken = artifacts.require("XDPToken");
const XDPresale = artifacts.require("XDPresale");
const { BigNumber } = require("ethers");
const {
  stringToPaddedBytes32,
  one,
  oneMillion,
  secondsInADay
} = require("../lib/utils");

module.exports = async (deployer, network, accounts) => {
  /////////////////////
  // Migration Setup //
  /////////////////////
  const generalInfo = {
    totalTokens:     oneMillion,                            // 1M tokens
    tokenPriceInWei: one,                                   // 1 xDai per token
    hardCapInWei:    one.mul(BigNumber.from("100000")),     // 100,000 xDai
    softCapInWei:    one.mul(BigNumber.from("25000")),      // 25,000 xDai
    maxInvestInWei:  one.mul(BigNumber.from("5000")),       // 5000 xDai
    minInvestInWei:  one,                                   // 1 xDai
    openTime: Math.floor(Date.now() / 1000),                // Javascript time is in milliseconds by default
    closeTime: Math.floor(Date.now() / 1000) + (30 * secondsInADay),
  };
  const stringInfo = {
    saleTitle: stringToPaddedBytes32("xDaiStarter"),
    linkTelegram: stringToPaddedBytes32("telegram.com/project"),
    linkGithub: stringToPaddedBytes32("github.com/project"),
    linkTwitter: stringToPaddedBytes32("twitter.com/project"),
    linkWebsite: stringToPaddedBytes32("project.com"),
    linkLogo: stringToPaddedBytes32("project.com/logo"),
  };

  const xdPresale = await XDPresale.deployed();
  const xdpToken = await XDPToken.deployed();
  
  // Address(es) derived from mnemonic given by .env to truffle-config
  const devAddress = accounts[0];
  const unsoldTokensDumpAddress = accounts[accounts.length - 1];

  ///////////////////////
  // Migration Actions //
  ///////////////////////
  
  try {
    // Presale must own all tokens
    await xdpToken.transfer(xdPresale.address, oneMillion);
    // Set Address Info
    await xdPresale.setAddressInfo(xdpToken.address, unsoldTokensDumpAddress, { from: devAddress });
    // Set General Info
    await xdPresale.setGeneralInfo(
      generalInfo.totalTokens,
      generalInfo.tokenPriceInWei,
      generalInfo.hardCapInWei,
      generalInfo.softCapInWei,
      generalInfo.maxInvestInWei,
      generalInfo.minInvestInWei,
      generalInfo.openTime,
      generalInfo.closeTime,
      { from: devAddress }
    );
    // Set String Info
    await xdPresale.setStringInfo(
      stringInfo.saleTitle,
      stringInfo.linkTelegram,
      stringInfo.linkGithub,
      stringInfo.linkTwitter,
      stringInfo.linkWebsite,
      stringInfo.linkLogo,
      { from: devAddress }
    );
    
    // Users get whitelisted when they connect their wallets to the site
    await xdPresale.addWhitelistedAddresses([ devAddress ], { from: devAddress });
    // Allow refunds
    await xdPresale.setRefundAllowed(true, { from: devAddress });
  } catch(error) {
    console.error("Error setting up XDPresale: ", error);
  }
};
      