import { useCallback, useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import Web3Modal from 'web3modal';
import { addressDisplayed } from '../utils';

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
    providerOptions: {}
  });

  // Open wallet selection modal
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    const provider = new Web3Provider(newProvider);
    console.debug("Web3Modal connecting to provider", provider);
    setProvider(provider);
    const accounts = await provider.listAccounts();
    setAccount(accounts[0]);
  }, [web3Modal]);

  const logoutOfWeb3Modal = useCallback(() => {
    web3Modal.clearCachedProvider();
    setProvider(undefined);
    setAccount(undefined);
  }, [web3Modal]);

  useEffect(() => {
    if (autoLoad && !provider && web3Modal.cachedProvider) {
      console.debug("Loading Web3Modal");
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

function Wallet({ account, toggleWeb3Modal }: WalletConfig) {
  return (
    <button onClick={() => toggleWeb3Modal()}>
      {account ? addressDisplayed(account) : 'Connect Wallet'}
    </button>
  );
}

export { Wallet, useWeb3Modal };
