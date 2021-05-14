import { BigNumber } from 'ethers';
import { INetworks, __NETWORK__ } from './xds';

const addressDisplayed = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4)
};

const one = BigNumber.from("1000000000000000000");

const getNetwork = () => {
  try {
    if (__NETWORK__) {
      console.log("Getting url for: ", __NETWORK__);
      const networks: INetworks = {
        xdai: "https://dai.poa.network",
        sokol: "https://sokol.poa.network",
        development: "http://localhost:8545"
      };
      return networks[__NETWORK__];
    }
  } catch (error) {
    console.error("Error getting network: ", error);
  }
};

export {
  addressDisplayed,
  one,
  getNetwork
};
