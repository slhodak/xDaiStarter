import { addressDisplayed } from '../utils';
import { WalletConfig } from '../xds';

function Wallet({ account, toggleWeb3Modal }: WalletConfig) {
  return (
    <button onClick={() => toggleWeb3Modal()}>
      {account ? addressDisplayed(account) : 'Connect Wallet'}
    </button>
  );
}

export default Wallet;
