import abis from '../../abis';
import _addresses from '../../addresses.json';
import {
  providers,
  Contract
} from 'ethers';
import VotingPool from './VotingPool';
import FeaturedPool from './FeaturedPool';
import { useEffect, useState } from 'react';
import { getNetwork, Logger } from '../utils';
import { __NETWORK__, INetworkContracts } from '../xds';
const addresses: INetworkContracts = _addresses;

export default (props: any) => {
  const logger = Logger("Pools");
  const [pools, setPools] = useState([]);

  const provider = providers.getDefaultProvider(getNetwork());
  const networkAddresses: any = addresses[__NETWORK__];
  const xdsInfoAddress = networkAddresses.XDaiStarterInfo;
  const xdsInfo = new Contract(
    xdsInfoAddress,
    abis.xdsInfo,
    provider
  );
  useEffect(() => {
    if (provider && pools.length === 0) {
      // Dependency array not working with other values because (?) React Router reloads page on rerender
      logger.log("Fetching pools with provider", provider);
      getPools();
    }
  });

  async function getPools() {
    try {
      const temp = await xdsInfo.getXdsTokenPresales();
      const presalesCount = await xdsInfo.getPresalesCount();
      const presales = [];
      for (let i = 0; i < presalesCount; i++) {
        // Ignore expired, cancelled; deal with in-voting and past-voting separately...
        // This is not a proper query strategy
        presales.push(await xdsInfo.getPresaleAddress(await xdsInfo.getPresaleAddress(i)));
      }
      
      logger.log(`Found ${temp.length} pools: ${temp}`);
      setPools(temp);
    } catch(error) {
      logger.error("Error getting pools: ", error);
    }
  }

  return (
    <section className="pools">
      <div className="pools_section">
        <h2 className="section_title">Featured Pools</h2>
        <div className="pools_blocks">
          {pools.map((pool) => <FeaturedPool address={pool} key={pool} />)}
        </div>
      </div>
      <div className="pools_section">
        <h2 className="section_title">Pools in Voting</h2>
        <div className="pools_blocks">
          {pools.map((pool) => <VotingPool address={pool} key={pool} />)}
        </div>
      </div>
      <div className="pools_section">
				<button className="btn all_pools_btn">View all pools</button>
			</div>
    </section>
  )
}
