/**
 * More information about configuration can be found at:
 * trufflesuite.com/docs/advanced/configuration
 */

const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
  contracts_directory: './src/contracts',
  plugins: [
    "truffle-contract-size"
  ],
  networks: {
    xdai: {
      provider: function() {
        return new HDWalletProvider(
        process.env.XDAI_MNEMONIC,
        "https://dai.poa.network")
      },
      network_id: "100",
      gas: 500000,
      gasPrice: 1000000000
    },
    sokol: {
      provider: function() {
        return new HDWalletProvider({
          mnemonic: {
            phrase: process.env.SOKOL_MNEMONIC
          },
          providerOrUrl: "https://sokol.poa.network",
          numberOfAddresses: 1,
          shareNone: true,
          chainId: 77
        })
      },
      port: 443,
      skipDryRun: true,
      network_id: "77",
      // gas: 500000,
      // gasPrice: 1000000000
    },
    development: {
     host: "127.0.0.1",  // Localhost (default: none)
     port: 8545,
     network_id: "*",    // Any network (default: none)
     gasPrice: 1,
     gas: 6000000,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.6.12",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 200
       },
      //  evmVersion: "byzantium"
      }
    }
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled: false to enabled: true
  //
  // Note: if you migrated your contracts prior to enabling this field in your Truffle project and want
  // those previously migrated contracts available in the .db directory, you will need to run the following:
  // $ truffle migrate --reset --compile-all

  db: {
    enabled: false
  }
};
