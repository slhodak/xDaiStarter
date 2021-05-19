import { useCallback, useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { networks, getNetwork, Logger } from './utils';

const useWeb3Modal = function() {
  const logger = Logger("Web3Modal");
  const [provider, setProvider] = useState<Web3Provider>();
  const [account, setAccount] = useState<string>();

  logger.log("Connecting on network: ", getNetwork());
  const createWeb3Modal = () => {
    try {
      return new Web3Modal({
        network: getNetwork(),
        cacheProvider: true,
        // Metamask available by default
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              rpc: {
                1337: networks.development,
                77: networks.sokol,
                100: networks.xdai
              }
            }
          }
        }
      });
    } catch (error) {
      logger.error("Error creating web3Modal: ", error)
    }
  };
  const web3Modal = createWeb3Modal();

  // Open wallet selection modal
  const loadWeb3Modal = useCallback(async () => {
    if (web3Modal) {
      try {
        const newProvider = await web3Modal.connect();
        const provider = new Web3Provider(newProvider);
        logger.log("Web3Modal connecting to provider", provider);
        setProvider(provider);
        const accounts = await provider.listAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        logger.error("Following occurred during loadWeb3Modal: ", error);
      }
    }
  }, [web3Modal]);
  
  const logoutOfWeb3Modal = useCallback(() => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      setProvider(undefined);
      setAccount(undefined);
    }
  }, [web3Modal]);

  useEffect(() => {
    if (!provider && web3Modal && web3Modal.cachedProvider) {
      logger.log("Loading Web3Modal");
      loadWeb3Modal();
    }
  });

  const toggleWeb3Modal = () => {
    try {
      if (provider && web3Modal) {
        logoutOfWeb3Modal();
      } else {
        loadWeb3Modal();
      }
    } catch (error) {
      logger.log("Error toggling web3 modal: ", error);
    }
  }

  return { provider, account, toggleWeb3Modal };
}

export default useWeb3Modal;
