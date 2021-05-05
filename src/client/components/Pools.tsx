import abis from '../../abis';
import {
  BigNumber,
  providers,
  Contract
} from 'ethers';
import VotingPool from './VotingPool';
import FeaturedPool from './FeaturedPool';
import { useEffect } from 'react';

export default (props: any) => {
  // Get pools from network, not props
  const pools = [{
    saleTitle: 'string',
    linkTelegram: 'string',
    linkTwitter: 'string',
    linkGithub: 'string',
    linkWebsite: 'string',
    linkLogo: 'string',
    totalInvestorsCount: 0,
    totalCollectedWei: BigNumber.from("10"),
    tokenPriceInWei: BigNumber.from("10"),
    tokensLeft: BigNumber.from("10"),
    minInvestInWei: BigNumber.from("10"),
    maxInvestInWei: BigNumber.from("10"),
    softCapInWei: BigNumber.from("10"),
    hardCapInWei: BigNumber.from("10"),
    // Following not applicable to XDPresale
    honeyLiquidityPercentageAllocation: BigNumber.from("10"),
    honeyLPTokensLockDurationInDays: BigNumber.from("10"),
    // what is "Hard Honeyswap Listing Ratio" in UI?
  }];
  const provider = providers.getDefaultProvider("http://localhost:8545");
  const xdsInfo = new Contract(
    "0xc60077c98F6296F71d65796Bbf1F4FAFd21aB4bF",
    abis.xdsInfo,
    provider
  );

  useEffect(() => {
    getXdpresaleInfo();
  }, [xdsInfo]);

  async function getXdpresaleInfo() {
    console.log(await xdsInfo.getXdsTokenPresales());
  }
  return (
    <section className="pools">
      <div className="pools_section">
        <h2 className="section_title">Featured Pools</h2>
        <div className="pools_blocks">
          {pools.map((pool) => <FeaturedPool details={pool} />)}
        </div>
      </div>
      <div className="pools_section">
        <h2 className="section_title">Pools in Voting</h2>
        <div className="pools_blocks">
          {pools.map((pool) => <VotingPool details={pool} />)}
        </div>
      </div>
      <div className="pools_section">
				<button className="btn all_pools_btn">View all pools</button>
			</div>
    </section>
  )
}
