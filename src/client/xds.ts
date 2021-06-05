import { BigNumber } from 'ethers';

declare global {
  interface Window { xds: any; }
}
window.xds = window.xds || {};

export type WalletConfig = {
  account?: string,
  toggleWeb3Modal: Function
}

export interface PresaleDetails {
  symbol: string,
  address: string,
  saleTitle: string,
  linkChat: string,
  linkTwitter: string,
  linkGithub: string,
  linkWebsite: string,
  linkLogo: string,
  totalInvestorsCount: BigNumber,
  totalCollectedWei: BigNumber,
  tokenPriceInWei: BigNumber,
  tokensLeft: BigNumber,
  minInvestInWei: BigNumber,
  maxInvestInWei: BigNumber,
  softcapInWei: BigNumber,
  hardcapInWei: BigNumber,
  // Following not applicable to XDPresale
  honeyLiquidityPercentageAllocation?: BigNumber,
  honeyLPTokensLockDurationInDays?: BigNumber,
  // what is "Hard Honeyswap Listing Ratio" in UI?
}

export interface InvestmentDetails {
  // why softcap again?
  // Calculate # of tokens from this and token price
  totalInvestment: BigNumber,
}

export interface UIDetail {
  title: string,
  value: number,
  unit: string
}

export interface UIInvestmentDetail {
  icon?: string,
  title: string, 
  value: number,
  unit: string, 
  button: {
    text: string,
    emphasis: 0 | 1 | 2
  } 
}

export interface UIImportantLink {
  title: string,
  address?: string
}

export interface INetworks {
  [key: string]: {
    endpoint: string,
    chainId: number
  }
}

export interface INetworkContracts {
  [key: string]: Object
}

declare const __NETWORK__: string;
const network: string = __NETWORK__;
export { network as __NETWORK__ };
