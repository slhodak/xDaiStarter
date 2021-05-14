import abis from '../../abis';
import Header from './Header';
import { useWeb3Modal } from './Wallet';
import { useState } from 'react';
import { Contract, Signer, BigNumber } from 'ethers';
import { one } from '../utils';

export default (props: any) => {
  const [signer, setSigner] = useState<Signer>();
  const [xdPresaleAddress, setXDPresaleAddress] = useState<string>("");
  const [whitelistAddress, setWhitelistAddress] = useState<string>("");
  const [xdPresale, setXDPresale] = useState<Contract>();
  const [whitelistedAddressToBeChecked, setWhitelistedAddressToBeChecked] = useState<string>("");
  const [isWhitelistedAddress, setIsWhitelistedAddress] = useState<boolean>();
  const [etherToSend, setEtherToSend] = useState<BigNumber>();
  const { provider } = useWeb3Modal();
  console.log("Provider for Dev: ", provider);

  async function connectToXDPresale() {
    if (provider) {
      // create contract instance
      const xdPresale = new Contract(
        xdPresaleAddress,
        abis.xdPresale,
        provider
      );
      // connect contract to signer
      const signer = provider.getSigner();
      setSigner(signer);
      const connectedXDPresale = xdPresale.connect(signer);
      // save connected contract
      setXDPresale(connectedXDPresale);
      setXDPresaleAddress("");
    } else {
      console.error("Need provider");
    }
  }

  async function whitelistAddressForPresale() {
    try {
      if (xdPresale) {
        await xdPresale.addWhitelistedAddresses([whitelistAddress]);
        setWhitelistAddress("");
      }
    } catch(error) {
      console.error("Error whitelisting address: ", error);
    }
  }
  
  async function checkIsWhitelistedAddress() {
    if (xdPresale) {
      setIsWhitelistedAddress(await xdPresale.whitelistedAddresses(whitelistedAddressToBeChecked));
    }
  }

  async function sendEther() {
    try {
      if (signer && xdPresale && etherToSend) {
        const value = etherToSend.mul(one);
        console.debug("Sending value: ", value);
        const tx = {
          to: xdPresale.address,
          value: value
        }
        await signer.sendTransaction(tx);
      }
    } catch (error) {
      console.error("Error sending Ether: ", error);
    }
  }

  return(
    <div>
      <Header />
      <div className="dev">
        <div>
          <h3>XDPresale</h3>
          <p>Connect to XDPresale at address:</p>
          <input type="text" onChange={(e) => setXDPresaleAddress(e.target.value)} value={xdPresaleAddress}></input>
          <button onClick={connectToXDPresale}>Connect</button>
          <p>Whitelist address:</p>
          <input onChange={(e) => setWhitelistAddress(e.target.value)} value={whitelistAddress}></input>
          <button onClick={whitelistAddressForPresale}>Add</button>
          <p>Is Whitelisted Address?</p>
          <input onChange={(e) => setWhitelistedAddressToBeChecked(e.target.value)} value={whitelistedAddressToBeChecked}></input>
          <button onClick={checkIsWhitelistedAddress}>Check</button>
          <p>{JSON.stringify(isWhitelistedAddress)}</p>
          <p>Send Ether:</p>
          <input type="number" onChange={(e) => setEtherToSend(BigNumber.from(e.target.value))} value={etherToSend?.toNumber() || 0}></input>
          <button onClick={sendEther}>Send</button>
        </div>
        <div>
          <h3>XDPresale</h3>
          <p>{xdPresale?.address}</p>
          <textarea className="presale" value={JSON.stringify(xdPresale, null, 2)}></textarea>
        </div>
      </div>
    </div>
  )
}
