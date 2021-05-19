import { BigNumber } from 'ethers';

export type WalletConfig = {
  account?: string,
  toggleWeb3Modal: Function
}

export interface PresaleDetails {
  address: string,
  saleTitle: string,
  linkTelegram: string,
  linkTwitter: string,
  linkGithub: string,
  linkWebsite: string,
  linkLogo: string,
  totalInvestorsCount: number,
  totalCollectedEther: string,
  tokenPriceInEther: string,
  tokensLeft: string,
  minInvestInEther: string,
  maxInvestInEther: string,
  softcapInEther: string,
  hardcapInEther: string,
  // Following not applicable to XDPresale
  honeyLiquidityPercentageAllocation?: string,
  honeyLPTokensLockDurationInDays?: string,
  // what is "Hard Honeyswap Listing Ratio" in UI?
  percentHardcapInvested: string
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
  [key: string]: string;
}

export interface INetworkContracts {
  [key: string]: Object
}

declare const __NETWORK__: string;
const network: string = __NETWORK__;
export { network as __NETWORK__ };
