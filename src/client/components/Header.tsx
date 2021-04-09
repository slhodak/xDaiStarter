import { Link } from 'react-router-dom';
import '../img/l2.png';

export default (props: any) => {
  return (
    <header className="header_container">
      <div className="header_background">
        <div className="header_objects">
          <Link className="header_logo" to='/'>
            <img src="img/l2.png" alt="img"/>
          </Link>
          <div className="header_links">
            <a href="#">Pools</a>
            <a href="#">Stake</a>
            <a href="#">Create Pool</a>
            <button>Connect Wallet</button>
          </div>
        </div>
      </div>
    </header>
  )
}
