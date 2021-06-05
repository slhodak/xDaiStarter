const assert = require("chai").assert;
const {
  BigNumber,
  providers
} = require("ethers");
const {
  one,
  oneMillion,
  stringToPaddedBytes32,
  evmNumberOfTokens
} = require("../../lib/utils");
const XDPresale = artifacts.require("XDPresale");
const XDPToken = artifacts.require("XDPToken");

////////
// Test as if presale is not cancelled (test in event of cancellation below)
contract("XDPresale (successful)", async accounts => {
  let xdpToken;
  let xdPresale;
  let generalInfo;
  let stringInfo;
  let auditorInfo;
  let provider;
  let devAddress;
  let mainInvestor;
  let unsoldTokensDumpAddress;

  before(async () => {
    xdpToken = await XDPToken.deployed();
    xdPresale = await XDPresale.deployed();
    generalInfo = {
      totalTokens:     oneMillion,                         // 1M tokens
      tokenPriceInWei: one,                                // 1 xDai per token
      hardCapInWei:    one.mul(BigNumber.from("100000")),  // 100,000 xDai
      softCapInWei:    one.mul(BigNumber.from("50000")),   // 50,000 xDai
      maxInvestInWei:  one.mul(BigNumber.from("5")),       // 5 tokens
      minInvestInWei:  one.div(BigNumber.from("2")),       // half a token
      openTime: Math.floor(Date.now() / 1000),             // Javascript time is in milliseconds by default
      closeTime: Math.floor(Date.now() / 1000) + 500,
    };
    stringInfo = {
      saleTitle: stringToPaddedBytes32("token_presale"),
      linkChat: stringToPaddedBytes32("chat.com/project"),
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
    provider = providers.getDefaultProvider("http://localhost:9545");
    devAddress = accounts[0];
    mainInvestor = accounts[1];
    unsoldTokensDumpAddress = accounts[accounts.length - 1];

    console.log(`Starting balance for devAddress: ${await provider.getBalance(devAddress)}`);
  });
  // This assumes all migrations have been run!
  it("should own all XDP tokens", async () => {
    assert.equal((await xdpToken.balanceOf(xdPresale.address)).toString(), generalInfo.totalTokens.toString());
  });
  it("should contain the dev address", async () => {
    assert.equal((await xdPresale.xdsDevAddress()), devAddress);
  });
  it("should allow the dev to set Address Info", async () => {
    await xdPresale.setAddressInfo(xdpToken.address, unsoldTokensDumpAddress);
  });
  it("should not allow any other address to set Address Info", async () => {
    let error = null;
    try {
      await xdPresale.setAddressInfo(xdpToken.address, unsoldTokensDumpAddress, { from: mainInvestor });
    } catch (err) {
      error = err;
    }
    assert.isNotNull(error);
  });
  it("should reference a token", async () => {
    assert.equal((await xdPresale.token()), xdpToken.address)
  });
  it("should allow the dev to set General Info", async () => {
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
  it("should allow the dev to set String Info", async () => {
    await xdPresale.setStringInfo(
      stringInfo.saleTitle,
      stringInfo.linkChat,
      stringInfo.linkGithub,
      stringInfo.linkTwitter,
      stringInfo.linkWebsite,
      stringInfo.linkLogo
    );
  });
  it("should allow the dev to set whitelistedAddresses", async () => {
    await xdPresale.addWhitelistedAddresses([ mainInvestor, unsoldTokensDumpAddress ]);
  });
  it("should allow the dev to set auditorWhitelistedAddresses", async () => {
    await xdPresale.addAuditorWhitelistedAddresses([ devAddress ]);
  });
  it("should allow an auditorWhitelistedAddress to set Auditor Info", async () => {
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
  it("should allow the dev to set whether refunds are allowed", async () => {
    await xdPresale.setRefundAllowed(false);
    await xdPresale.setRefundAllowed(true);
  });
  it("should have a default claim cycle rate of 30 days", async () => {
    assert.equal((await xdPresale.claimCycle()), 60 * 60 * 24 * 30);
  });
  it("should let the dev set the claim cycle rate", async () => {
    await xdPresale.setClaimCycle(86400);
  });
  it("should receive and invest xDai from whitelisted addresses", async () => {
    const startBalance = await provider.getBalance(xdPresale.address); // 0
    const signer = provider.getSigner(mainInvestor);
    const transactionResponse = await signer.sendTransaction({ to: xdPresale.address, value: generalInfo.minInvestInWei });
    await transactionResponse.wait();
    const endBalance = await provider.getBalance(xdPresale.address);
    assert.equal(startBalance.add(generalInfo.minInvestInWei).toString(), endBalance.toString());
  });
  it("should remove sold tokens from the tokens left", async () => {
    const tokensLeft = generalInfo.totalTokens.sub(evmNumberOfTokens(generalInfo.minInvestInWei, generalInfo.tokenPriceInWei));
    assert.equal((await xdPresale.tokensLeft()).toString(), tokensLeft.toString());
  });
  it("should keep track of investors' investments", async () => {
    assert.equal((await xdPresale.investments(mainInvestor)).toString(), generalInfo.minInvestInWei.toString());
  });
  it("should track the total collected funds", async () => {
    assert.equal((await xdPresale.totalCollectedWei()).toString(), generalInfo.minInvestInWei.toString());
  });
  it("--Move close time to now to test claims--", async () => {
    await xdPresale.setGeneralInfo(
      generalInfo.totalTokens,
      generalInfo.tokenPriceInWei,
      generalInfo.hardCapInWei,
      generalInfo.softCapInWei,
      generalInfo.maxInvestInWei,
      generalInfo.minInvestInWei,
      Math.floor(Date.now() / 1000) - 2,
      Math.floor(Date.now() / 1000) - 1,
    );
  });
  // The open, close, and liquidity adding time need to be this way to ensure investors can claim by next test
  it("should let claims become allowed by sending the liquidity adding time", async () => {
    await xdPresale.allowClaim(Math.floor(Date.now() / 1000) - 1);
  });
  it("should allow investors to claim 1/4 of their bought tokens when the presale is over", async () => {
    await xdPresale.claimTokens({ from: mainInvestor });
    assert.equal((await xdpToken.balanceOf(mainInvestor)).toString(), evmNumberOfTokens(generalInfo.minInvestInWei, generalInfo.tokenPriceInWei).div(4).toString());
  });
  it("should not allow investors to claim twice during the same claim period", async () => {
    let error = null;
    try {
      await xdPresale.claimTokens({ from: mainInvestor });
    } catch (err) {
      error = err;
    }
    assert.isNotNull(error);
  });
  it("should allow the xds dev to transfer the unsold tokens to the dump address", async () => {
    // Bug in transferUnsoldTokens
    // XDPresale will end up with unburnt, unsold tokens if investors claim tokens before transferUnsoldTokens is called
    // Implication is that transferUnsoldTokens must be called BEFORE claims begin
    //    Since this is not enforced by the contract--should it be?
    // Sold = Claimed + Unclaimed
    // Therefore:
    //    Unsold = Total - Sold
    // In Contract:
    //    "Unsold" = Total - Claimed - Sold
    //    "Unsold" = Total - Claimed - Claimed - Unsold
    const tokensLeft = generalInfo.totalTokens
      .sub(
        evmNumberOfTokens(generalInfo.minInvestInWei, generalInfo.tokenPriceInWei).div(4).mul(5)
      );
    await xdPresale.transferUnsoldTokens();
    assert.equal((await xdpToken.balanceOf(unsoldTokensDumpAddress)).toString(), tokensLeft.toString());
  });
  it("should allow the xds dev team to collect the funds raised", async () => {
    const devStartingBalance = await provider.getBalance(devAddress);
    const transactionResult = await xdPresale.collectFundsRaised();
    const gasUsed = BigNumber.from(transactionResult.receipt.gasUsed.toString());
    const tx = await provider.getTransaction(transactionResult.tx);
    const gasPrice = tx.gasPrice;
    assert.equal(
      (await provider.getBalance(devAddress)).toString(),
      devStartingBalance.add(generalInfo.minInvestInWei).sub(gasUsed.mul(gasPrice)).toString()
    );
  });
});

/////////
// Test presale cancellation
contract("XDPresale (cancelled)", async accounts => {
  let xdpToken;
  let xdPresale;
  let generalInfo;
  let provider;
  let devAddress;
  let mainInvestor;

  before(async () => {
    xdpToken = await XDPToken.deployed();
    xdPresale = await XDPresale.deployed();
    generalInfo = {
      totalTokens:     oneMillion,                         // 1M tokens
      tokenPriceInWei: one,                                // 1 xDai per token
      hardCapInWei:    one.mul(BigNumber.from("100000")),  // 100,000 xDai
      softCapInWei:    one.mul(BigNumber.from("50000")),   // 50,000 xDai
      maxInvestInWei:  one.mul(BigNumber.from("5")),       // 5 tokens
      minInvestInWei:  one.div(BigNumber.from("2")),       // half a token
      openTime: Math.floor(Date.now() / 1000),             // Javascript time is in milliseconds by default
      closeTime: Math.floor(Date.now() / 1000) + 500,
    };
    provider = providers.getDefaultProvider("http://localhost:9545");
    devAddress = accounts[0];
    mainInvestor = accounts[1];
    unsoldTokensDumpAddress = accounts[accounts.length - 1];
    // Dev transfers all tokens to Presale's custody
    await xdPresale.addWhitelistedAddresses([ mainInvestor ]);
    await xdPresale.addAuditorWhitelistedAddresses([ mainInvestor ]);
    const transactionResponse = await provider.getSigner(mainInvestor).sendTransaction({ to: xdPresale.address, value: generalInfo.minInvestInWei })
    await transactionResponse.wait();
  });
  it("should allow the dev to cancel the presale and claim the unclaimed tokens", async () => {
    await xdPresale.cancelAndTransferTokensToDev();
    assert.equal((await xdpToken.balanceOf(devAddress)).toString(), generalInfo.totalTokens.toString());
  });
  it("should allow an investor to get a refund if the presale is cancelled", async () => {
    const investorBalanceBeforeRefund = await provider.getBalance(mainInvestor);
    const transactionResult = await xdPresale.getRefund({ from: mainInvestor });
    const gasUsed = BigNumber.from(transactionResult.receipt.gasUsed.toString());
    const tx = await provider.getTransaction(transactionResult.tx)
    const gasPrice = tx.gasPrice;
    assert.equal(
      (await provider.getBalance(mainInvestor)).toString(),
      investorBalanceBeforeRefund.add(generalInfo.minInvestInWei).sub(gasUsed.mul(gasPrice)).toString());
  });
});
