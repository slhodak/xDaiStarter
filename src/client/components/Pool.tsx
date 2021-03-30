import '../scss/style.scss';
import '../img/blockIcn.png';
import '../img/like.png';
import '../img/tg.png';
import '../img/share.png';

export default (props: any) => {
  const { selectPage } = props;
  return (
    <div className="pool_block">
      <div className="pool_block_title">
        <div>
          <img src="img/blockIcn.png" alt="icn"/>
        </div>
        <h4>Blockchain <br/>
          cuties</h4>
      </div>
      <div className="pool_info">
        <div className="pool_info_top">
          <div className="progress_bar_wrap">
            <span className="progress_bar_green2">
              <p>20%</p>
            </span>
            <div className="progress_counter">
              <span>0.00/2500.00 XDAI </span>
            </div>
          </div>
          <button className="pool_like btn">
            <img src="img/like.png" alt="img"/>
            <span>5%</span>
          </button>
        </div>
        <div className="pool_info_btm">
          <div>
            <span>0.00 XDAI</span>
            <p>0.006 XDAI Per Token</p>
          </div>
          <div>
            <span>40.00 XDAI</span>
            <p>Maximum XDAI</p>
          </div>
        </div>
      </div>
      <div className="pool_links">
        <div className="pool_share">
          <a href="">
            <img src="img/tg.png" alt="img"/>
          </a>
          <a href="">
            <img src="img/share.png" alt="img"/>
          </a>
        </div>
        <button className="btn" onClick={() => selectPage('DetailCard')}>
          Open in 5 Days
        </button>
      </div>
    </div>
  )
}
