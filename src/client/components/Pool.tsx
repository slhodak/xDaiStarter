import '../scss/style.scss';
import '../img/blockIcn.png';
import '../img/like.png';
import '../img/tg.png';
import '../img/share.png';

export default (props: any) => {
  return (
    <div className="pools_block col-md-4">
      <div className="pools_block-title">
        <div>
          <img src="img/blockIcn.png" alt="icn"/>
        </div>
        <h4>Blockchain <br/>
          cuties</h4>
      </div>
      <div className="pools_info">
        <div className="pools_info-top">
          <div className="progres_bar-wrap">
            <span className="progres_bar-green2">
              <p>20%</p>
            </span>
            <div className="progres_counter">
              <span>0.00/2500.00 XDAI </span>
            </div>

          </div>
          <button className="pools_like btn">
            <img src="img/like.png" alt="img"/>
            <span>5%</span>
          </button>
        </div>
        <div className="pools_info-btm">
          <div>
            <span>0.00 XDAI</span>
            <p>0.006 XDAI Per Token</p>
          </div>
          <div>
            <span>40.00 XDAI</span>
            <p>Maximun XDAI</p>
          </div>
        </div>
      </div>
      <div className="pools_links">
        <div className="pools_share">
          <a href="">
            <img src="img/tg.png" alt="img"/>
          </a>
          <a href="">
            <img src="img/share.png" alt="img"/>
          </a>
        </div>
        <button className="btn">
          Open in 5 Days
        </button>
      </div>
    </div>
  )
}
