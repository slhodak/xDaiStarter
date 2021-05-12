import { BigNumber } from 'ethers';

const addressDisplayed = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4)
};

const one = BigNumber.from("1000000000000000000");

const getNetwork = () => {
  const network = process.env.NETWORK;
  console.log("Getting url for: ", network);
  interface INetworks {
    [key: string]: string;
  }
  const networks: INetworks = {
    xdai: "https://dai.poa.network",
    sokol: "https://sokol.poa.network",
    development: "http://localhost:8545"
  };
  if (network) {
    return networks[network];
  } else {
    return networks.development;
  }
};

export {
  addressDisplayed,
  one,
  getNetwork
};
