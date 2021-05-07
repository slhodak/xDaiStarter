import abis from '../../abis';
import addresses from '../../addresses.json';
import {
  providers,
  Contract
} from 'ethers';
import VotingPool from './VotingPool';
import FeaturedPool from './FeaturedPool';
import { useWeb3Modal } from './Wallet';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const web3ModalOptions = {
  autoLoad: true, infuraId: "", NETWORK: "development"
};

export default (props: any) => {
  // Get pools from network, not props
  const [pools, setPools] = useState([]);
  const location = useLocation();

  let xdsInfo: Contract;
  const { provider } = useWeb3Modal(web3ModalOptions);
  useEffect(() => {
    if (provider && pools.length === 0) {
      console.log("Provider for Pools:", provider);
      xdsInfo = new Contract(
        addresses.XDaiStarterInfo,
        abis.xdsInfo,
        provider
      );
      // Dependency array not working with other values because (?) React Router reloads page on rerender
      console.log("Fetching pools");
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
