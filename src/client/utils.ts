import { BigNumber } from 'ethers';
import { INetworks, __NETWORK__ } from './xds';

const networks: INetworks = {
  XDAI: "https://dai.poa.network",
  SOKOL: "https://sokol.poa.network",
  DEVELOPMENT: "http://127.0.0.1:8545"
};

const addressDisplayed = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4)
};

const one = BigNumber.from("1000000000000000000");

// Use a method in case __NETWORK__ is undefined or invalid
// Also avoid importing ./xds into more files. Utils is a common import
const getNetwork = () => {
  try {
    console.log("Getting url for: ", __NETWORK__);
    return networks[__NETWORK__];
  } catch (error) {
    console.error("Error getting network: ", error);
  }
};

export {
  addressDisplayed,
  one,
  networks,
  getNetwork
};
