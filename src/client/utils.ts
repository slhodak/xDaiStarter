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
  xdai: "https://dai.poa.network",
  sokol: "https://sokol.poa.network",
  development: "http://127.0.0.1:8545"
};

const addressDisplayed = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4)
};

const one = BigNumber.from("1000000000000000000");

// Use a method in case __NETWORK__ is undefined or invalid
// Also avoid importing ./xds into more files. Utils is a common import
const getNetwork = () => {
  try {
    logger.log(`Getting url for: ${__NETWORK__}`);
    return networks[__NETWORK__];
  } catch (error) {
    logger.error("Error getting network: ", error);
  }
};

export {
  addressDisplayed,
  one,
  networks,
  getNetwork,
  Logger
};
