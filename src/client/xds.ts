import { BigNumber } from 'ethers';

export interface PresaleDetails {
  saleTitle: string,
  linkTelegram: string,
  linkTwitter: string,
  linkGithub: string,
  linkWebsite: string,
  linkLogo: string,
  totalInvestorsCount: number,
  totalCollectedWei: BigNumber,
  tokenPriceInWei: BigNumber,
  tokensLeft: BigNumber,
  minInvestInWei: BigNumber,
  maxInvestInWei: BigNumber,
  softCapInWei: BigNumber,
  hardCapInWei: BigNumber,
  // Following not applicable to XDPresale
  honeyLiquidityPercentageAllocation: BigNumber,
  honeyLPTokensLockDurationInDays: BigNumber,
  // what is "Hard Honeyswap Listing Ratio"?
};

export interface InvestmentDetails {
  // why softcap again?
  // Calculate # of tokens from this and token price
  totalInvestment: BigNumber,
};