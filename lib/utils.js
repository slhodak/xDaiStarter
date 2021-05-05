const { readFile, writeFile } = require("fs").promises;
const { resolve } = require("path");
const { BigNumber, utils } = require("ethers");

module.exports = {
  one:        BigNumber.from("1000000000000000000"),  // 1e18
  oneMillion: BigNumber.from("1000000000000000000000000"), // 1e24
  stringToPaddedBytes32: (value) => {
    let hex = Buffer.from(value).toString('hex');
    return utils.hexZeroPad("0x" + hex, 32);
  },
  // The number of tokens for a given investment in wei, to evm-compatible 1e18 decimals
  evmNumberOfTokens: (amountInWei, tokenPriceInWei) => {
    return amountInWei.mul(BigNumber.from("1000000000000000000")).div(tokenPriceInWei);
  },
  saveContractAddress: async (contractAbstraction) => {
    const addressesPath = resolve(__dirname, "../src/addresses.json");
    let addresses = JSON.parse((await readFile(addressesPath)));
    addresses[contractAbstraction.contractName] = contractAbstraction.address;
    await writeFile(addressesPath, JSON.stringify(addresses));
  }
};
