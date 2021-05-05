import abis from '../../abis';
import addresses from '../../addresses';
import {
  providers,
  Contract
} from 'ethers';
import VotingPool from './VotingPool';
import FeaturedPool from './FeaturedPool';
import { useEffect, useState } from 'react';

export default (props: any) => {
  // Get pools from network, not props
  const [pools, setPools] = useState([]);
  const provider = providers.getDefaultProvider("http://localhost:8545");
  const xdsInfo = new Contract(
    addresses.xdsInfo,
    abis.xdsInfo,
    provider
  );

  useEffect(() => {
    // Dependency array will not work because React Router reloads page on rerender
    if (pools.length === 0) {
      getPools();
    }
  });

  async function getPools() {
    const temp = await xdsInfo.getXdsTokenPresales();
    const presalesCount = await xdsInfo.getPresalesCount();
    const presales = [];
    for (let i = 0; i < presalesCount; i++) {
      // Ignore expired, cancelled; deal with in-voting and past-voting separately...
      // This is not a proper query strategy
      presales.push(await xdsInfo.getPresaleAddress(await xdsInfo.getPresaleAddress(i)));
    }
    
    console.debug(`Found ${temp.length} pools: ${temp}`);
    setPools(temp);
  }

  return (
    <section className="pools">
      <div className="pools_section">
        <h2 className="section_title">Featured Pools</h2>
        <div className="pools_blocks">
          {pools.map((pool) => <FeaturedPool address={pool} />)}
        </div>
      </div>
      <div className="pools_section">
        <h2 className="section_title">Pools in Voting</h2>
        <div className="pools_blocks">
          {pools.map((pool) => <VotingPool address={pool} />)}
        </div>
      </div>
      <div className="pools_section">
				<button className="btn all_pools_btn">View all pools</button>
			</div>
    </section>
  )
}
