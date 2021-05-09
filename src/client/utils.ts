import { BigNumber } from 'ethers';

const addressDisplayed = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4)
};

const one = BigNumber.from("1000000000000000000");

export {
  addressDisplayed,
  one
};
