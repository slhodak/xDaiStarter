import { BigNumber } from 'ethers';

export interface PresaleDetails {
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
  softCapInEther: string,
  hardCapInEther: string,
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
