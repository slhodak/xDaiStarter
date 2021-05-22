import { BigNumber } from 'ethers';
import { INetworks, __NETWORK__ } from './xds';

const logger = Logger("Utils");

function Logger (clazz: string) {
  return {
    log: (message: string, object?: Object) => {
      if (object) {
        console.log(`[${clazz}] ${message}`, object);
      } else {
        console.log(`[${clazz}] ${message}`);
      }
    },
    error: (message: string, error: Error) => {
      console.error(`[${clazz}] ${message}`, error);
    }
  }
};

const networks: INetworks = {
  xdai: {
    endpoint: "https://dai.poa.network",
    chainId: 100
  },
  sokol: {
    endpoint: "https://sokol.poa.network",
    chainId: 77
  },
  development: {
    endpoint: "http://127.0.0.1:8545",
    chainId: 1337
  }
};

const addressDisplayed = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4)
};

const one = BigNumber.from("1000000000000000000");

// Use a method in case __NETWORK__ is undefined or invalid
const getNetwork = () => {
  try {
    return networks[__NETWORK__];
  } catch (error) {
    logger.error("Error getting network: ", error);
  }
};

const SUPPORTED_CHAIN_IDS = Object.values(networks).map(network => network.chainId);

export {
  addressDisplayed,
  one,
  networks,
  getNetwork,
  SUPPORTED_CHAIN_IDS,
  Logger
};
