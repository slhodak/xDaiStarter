import VotingPool from './VotingPool';
import FeaturedPool from './FeaturedPool';

export default (props: { pools: any[] }) => {
  const { pools } = props;
  return (
    <section className="pools">
      <div className="pools_section">
        <h2 className="section_title">Featured Pools</h2>
        <div className="pools_blocks">
          {pools.map(pool => <FeaturedPool pool={pool} />)}
        </div>
      </div>
      <div className="pools_section">
        <h2 className="section_title">Pools in Voting</h2>
        <div className="pools_blocks">
          {pools.map(pool => <VotingPool pool={pool} />)}
        </div>
      </div>
      <div className="pools_section">
				<button className="btn all_pools_btn">View all pools</button>
			</div>
    </section>
  )
}
