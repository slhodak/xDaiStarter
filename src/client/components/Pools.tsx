import Pool from './Pool';

export default (props: { pools: any[], selectPage: Function }) => {
  const { pools, selectPage } = props;
  return (
    <section className="pools">
      <div className="container_wrap">
        <div className="pools_wrap ">
          <h2 className="pools-title">Featured Pools</h2>
        </div>
        <div className="pools_blocks-wrap">
          {pools.map(pool => <Pool pool={pool} selectPage={selectPage}/>)}
        </div>
      </div>
      <div className="container_wrap">
        <div className="pools_wrap ">
          <h2 className="pools-title">Pools in Voting</h2>
        </div>
        <div className="pools_blocks-wrap">
          {pools.map(pool => <Pool pool={pool} selectPage={selectPage}/>)}
        </div>
      </div>
      <div className="row_wrap">
				<button className="btn all_posts-btn">View all pools</button>
			</div>
    </section>
  )
}
