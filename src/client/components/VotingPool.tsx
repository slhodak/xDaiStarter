import { Link } from 'react-router-dom';
import '../scss/style.scss';
import '../img/blockIcn.png';
import '../img/like.png';
import '../img/tg.png';
import '../img/share.png';

export default (props: any) => {
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
          <div className="progress_bar_container voting">
            <div className="progress_bar_wrap">
              <span className="progress_bar_green2"></span>
              <span className="progress_bar_red"></span>
              <div className="min">
                <p>Min</p>
                <span></span>
              </div>
              <div className="yes">
                <p>Yes: <span>4306</span></p>
              </div>
              <div className="no">
                <p>No: <span>4306</span>  </p>
              </div>
            </div>
          </div>
          <div className="pool_like_container">
            <button className="pool_like btn">
              <img src="img/like.png" alt="img"/>
              <span>5%</span>
            </button>
          </div>
        </div>
        <div className="pool_info_btm">
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
      <div className="pool_links">
        <div className="pool_share">
          <a href="">
            <img src="img/tg.png" alt="img"/>
          </a>
          <a href="">
            <img src="img/share.png" alt="img"/>
          </a>
        </div>
        <Link to='/pooldetail'><button className="btn">Open in 5 Days</button></Link>
      </div>
    </div>
  )
}