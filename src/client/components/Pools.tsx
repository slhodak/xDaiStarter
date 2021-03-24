import Pool from './Pool';

export default (props: { pools: any[] }) => {
  const { pools } = props;
  return (
    <section className="f_pools">
      <div className="container_wrap">
        <div className="f_pools_wrap ">
          <h2 className="pools-title">Pools in Voting</h2>
        </div>
        <div className="pools_blocks-wrap">
          {pools.map(pool => <Pool pool={pool}/>)}
        </div>
      </div>
    </section>
  )
}
