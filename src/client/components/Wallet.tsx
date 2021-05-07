import { useCallback, useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import Web3Modal from 'web3modal';
import Torus from '@toruslabs/torus-embed';

type UseWeb3ModalConfig = {
  autoLoad: boolean,
  infuraId: string,
  NETWORK: string
};

const useWeb3Modal = function({ autoLoad, infuraId, NETWORK }: UseWeb3ModalConfig) {
  const [provider, setProvider] = useState<Web3Provider>();
  const [account, setAccount] = useState<string>();

  const web3Modal = new Web3Modal({
    network: NETWORK,
    cacheProvider: true,
    // Metamask available by default
    providerOptions: {
      torus: {
        package: Torus,
        options: {
          // networkParams: {
          //   host: "https://localhost:8545", // optional
          //   chainId: 1337, // optional
          //   networkId: 1337 // optional
          // },
          config: {
            buildEnv: "development" // optional
          }
        }
      }
    }
  });

  const addressDisplayed = (address: string) => {
    return address.slice(0, 6) + "..." + address.slice(-4)
  };

  // Open wallet selection modal
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    const provider = new Web3Provider(newProvider);
    console.debug('Connecting to provider', provider);
    setProvider(provider);
    const accounts = await provider.listAccounts();
    setAccount(addressDisplayed(accounts[0]));
  }, [web3Modal]);

  const logoutOfWeb3Modal = useCallback(async () => {
    await web3Modal.clearCachedProvider();
    setProvider(undefined);
  }, [web3Modal]);

  useEffect(() => {
    console.debug('Using Wallet Effect');
    if (autoLoad && !provider && web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  });

  const toggleWeb3Modal = () => {
    if (provider) {
      logoutOfWeb3Modal();
    } else {
      loadWeb3Modal();
    }
  }

  return { provider, account, toggleWeb3Modal };
}

type WalletConfig = {
  provider?: Web3Provider,
  account?: string,
  toggleWeb3Modal: Function
}

function Wallet({ provider, account, toggleWeb3Modal}: WalletConfig) {
  return (
    <button onClick={() => toggleWeb3Modal()}>
      {provider ? account : 'Connect Wallet'}
    </button>
  );
}

export { Wallet, useWeb3Modal };
