import { Link } from 'react-router-dom';
import { Wallet, useWeb3Modal } from './Wallet';
import '../img/l2.png';

const INFURA_ID = '026977bc41064333a6c70afe674a9b99';

const NETWORK_NAME = 'kovan';

const web3ModalOptions = {
  autoLoad: true, infuraId: INFURA_ID, NETWORK: NETWORK_NAME
};

export default (props: any) => {
  const { provider, account, toggleWeb3Modal } = useWeb3Modal(web3ModalOptions);

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
            <Wallet provider={provider} account={account} toggleWeb3Modal={toggleWeb3Modal} />
          </div>
        </div>
      </div>
    </header>
  )
}
