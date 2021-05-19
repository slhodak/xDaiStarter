import { Link } from 'react-router-dom';
import Wallet from './Wallet';
import useWeb3Modal from '../useWeb3Modal';
import '../img/l2.png';

export default (props: any) => {
  const { account, toggleWeb3Modal } = useWeb3Modal();

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
            <Link to="/apply">Create Pool</Link>
            <Wallet account={account} toggleWeb3Modal={toggleWeb3Modal} />
          </div>
        </div>
      </div>
    </header>
  )
}
