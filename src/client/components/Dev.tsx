import abis from '../../abis';
import useWeb3Modal from '../useWeb3Modal';
import { useState } from 'react';
import { Contract, Signer, BigNumber } from 'ethers';
import { one, Logger } from '../utils';
import { XDSPresaleDetails, __NETWORK__, INetworkContracts } from '../xds';
import _addresses from '../../addresses.json';
const addresses: INetworkContracts = _addresses;
const networkAddresses: any = addresses[__NETWORK__];
const xdsFactoryAddress = networkAddresses.XDaiStarterFactory;

export default (props: any) => {
  const logger = Logger("Dev");
  const [signer, setSigner] = useState<Signer>();
  const [xdPresaleAddress, setXDPresaleAddress] = useState<string>("");
  const [whitelistAddress, setWhitelistAddress] = useState<string>("");
  const [xdPresale, setXDPresale] = useState<Contract>();
  const [xdsPresale, setXDSPresale] = useState<any>();
  const [whitelistedAddressToBeChecked, setWhitelistedAddressToBeChecked] = useState<string>("");
  const [isWhitelistedAddress, setIsWhitelistedAddress] = useState<boolean>();
  const [etherToSend, setEtherToSend] = useState<BigNumber>();
  const { provider } = useWeb3Modal();
  logger.log("Provider for Dev: ", provider);

  async function chooseXDSPresale(files?: FileList) {
    if (files) {
      const text = await files[0].text();
      logger.log(text);
      setXDSPresale(text);
    }
  }
  
  async function createXDSPresale() {
    logger.log("Beginning create XDSPresale");
    if (!provider) {
      return logger.error("Error while connecting to XDSFactory", new Error("No provider"));
    } else if (!xdsPresale) {
      return logger.error("Error while connecting to XDSFactory", new Error("No XDSPresale details"));
    } else {
      logger.log("Mid-begin XDSPresale");
      // Parse json application into PresaleInfo, HoneySwapInfo, and StringInfo
      const presaleInfo = {
        tokenAddress: xdsPresale.tokenAddress,
        unsoldTokensDumpAddress: xdsPresale.unsoldTokensDumpAddress,
        whitelistedAddresses: [xdsPresale.whitelistedAddresses],
        tokenPriceInWei: xdsPresale.tokenPriceInWei,
        hardCapInWei: xdsPresale.hardCapInWei,
        softCapInWei: xdsPresale.softCapInWei,
        maxInvestInWei: xdsPresale.maxInvestInWei,
        minInvestInWei: xdsPresale.minInvestInWei,
        openTime: xdsPresale.openTime,
        closeTime: xdsPresale.closeTime
      };
      const honeySwapInfo = {
        listingPriceInWei: xdsPresale.listingPriceInWei,
        liquidityAddingTime: xdsPresale.liquidityAddingTime,
        lpTokensLockDurationInDays: xdsPresale.lpTokensLockDurationInDays,
        liquidityPercentageAllocation: xdsPresale.liquidityPercentageAllocation
      };
      const StringInfo = {
        saleTitle: xdsPresale.saleTitle,
        linkChat: xdsPresale.linkChat,
        linkGithub: xdsPresale.linkGithub,
        linkTwitter: xdsPresale.linkTwitter,
        linkWebsite: xdsPresale.linkWebsite,
        linkLogo: xdsPresale.linkLogo
      };
      // Initialize XDSFactory Contract
      logger.log("Creating Signer for XDSPresale");
      const xdsFactoryContract = new Contract(
        xdsFactoryAddress,
        abis.xdsFactory,
        provider
      );
      const signer = provider.getSigner();
      const signingXdsFactoryContract = xdsFactoryContract.connect(signer);
      logger.log("About to create XDSPresale");
      // Send PresaleInfo, HoneySwapInfo, and StringInfo to XDSFactory.createPresale
      signingXdsFactoryContract.createPresale(presaleInfo, honeySwapInfo, StringInfo);
    }
  }

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
      logger.error("Error while connecting to XDPresale", new Error("No provider"));
    }
  }

  async function whitelistAddressForPresale() {
    try {
      if (xdPresale) {
        await xdPresale.addWhitelistedAddresses([whitelistAddress]);
        setWhitelistAddress("");
      }
    } catch(error) {
      logger.error("Error whitelisting address: ", error);
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
        logger.log("Sending value: ", value);
        const tx = {
          to: xdPresale.address,
          value: value
        }
        await signer.sendTransaction(tx);
      }
    } catch (error) {
      logger.error("Error sending Ether: ", error);
    }
  }

  return(
    <div>
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
        <div>
          <h3>Create Presale</h3>
          <input type="file" onChange={(e) => chooseXDSPresale(e.target.files ? e.target.files : undefined)}></input>
          <button onClick={createXDSPresale}>Create</button>
        </div>
      </div>
    </div>
  )
}
