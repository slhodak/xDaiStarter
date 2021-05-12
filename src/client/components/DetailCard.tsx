import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BigNumber, Contract, Signer, utils } from 'ethers';
const { formatEther } = utils;
import abis from '../../abis';
import Header from './Header';
import Footer from './Footer';
import Disclaimer from './Disclaimer';
import DetailInfoBlock from './DetailInfoBlock';
import InvestmentDetailBlock from './InvestmentDetailBlock';
import ImportantLink from './ImportantLinks';
import { useWeb3Modal } from './Wallet';
import { one } from '../utils';

export default (props: any) => {
  const [walletInvestment, setWalletInvestment] = useState<string>();
  const [xdPresale, setXDPresale] = useState<Contract>();
  const [signer, setSigner] = useState<Signer>();
  const [signerAddress, setSignerAddress] = useState<string>();
  // If the below line is giving you an error about properties that do not exist on type "unknown",
  // go to useLocation definition, then H.LocationState, and change History's LocationState type from "unknown" to "any"
  // or solve this in a better way if you are more familiar with Typescript than I was
  const location = useLocation();
  const { state } = location;
  const { presaleDetails } = state;
  const { provider } = useWeb3Modal({
    autoLoad: true, infuraId: "", NETWORK: process.env.NETWORK || "development"
  });
  console.log("Provider for DetailCard: ", provider);

  useEffect(() => {
    console.log("Using effect...");
    if (provider) {
      const xdPresale = new Contract(
        presaleDetails.address,
        abis.xdPresale,
        provider
      );
      const signer = provider.getSigner();
      console.debug("Connecting to XDPresale with signer: ", signer);
      setSigner(signer);
      const connectedXDPresale = xdPresale.connect(signer);
      setXDPresale(connectedXDPresale);
      getSignerAddress(signer);
    }
  }, [provider]);

  async function getSignerAddress(signer: Signer) {
    const address = await signer.getAddress()
    console.debug("Got signer address: ", address);
    setSignerAddress(address);
  }

  useEffect(() => {
    getWalletInvestmentDetails();
  }, [xdPresale, signerAddress]);

  async function getWalletInvestmentDetails() {
    try {
      if (xdPresale && signerAddress) {
        const walletInvestment = await xdPresale.investments(signerAddress);
        console.log("Got wallet total investment: ", walletInvestment);
        setWalletInvestment(formatEther(walletInvestment));
      } else {
        console.debug("No XDPresale available to read investment");
      }
    } catch (error) {
      console.error("Error getting investment details: ", error)
    }
  }

  // Clicking "buy" button just tries to buy 1 token for now
  // Or opens Metamask where you can say how much value you're sending
  async function invest() {
    try {
      console.log("Investing");
      if (signer && xdPresale) {
        const minInvestInWei = BigNumber.from("500").mul(one);
        console.debug("Sending min investment in wei: ", minInvestInWei);
        const tx = {
          to: xdPresale.address,
          // TODO: use minInvestInWei (having it in Ether on presale details... advisable?)
          value: minInvestInWei._hex
        };
        await signer.sendTransaction(tx);
      } else {
        console.debug("No XDPresale available to send investment");
      }
    } catch (error) {
      console.error("Error sending investment: ", error);
    }
  }

  const details = [
    { title: 'Softcap', value: presaleDetails.softCapInEther, unit: 'XDAI' },{ title: 'Hardcap', value: presaleDetails.hardCapInEther, unit: 'XDAI' },
    { title: 'Min Per Wallet', value: presaleDetails.minInvestInWei, unit: 'XDAI' },{ title: 'Max Per wallet', value: presaleDetails.maxInvestInWei, unit: 'XDAI' },
    { title: 'Presale Rate', value: presaleDetails.pricePerToken, unit: 'XDAI' },{ title: 'Hard HoneySwap Listing Ratio', value: 0, unit: 'XDAI' },
    { title: 'Liquidity Allocation', value: 0, unit: '%' },{ title: 'Liquidity Lock Duration', value: 0, unit: 'Days' }
  ];
  // Get user's investment details
  const investment = [
    {
      title: 'Softcap',
      value: presaleDetails.softCapInEther,
      unit: 'XDAI',
      button: { text: 'Vote', emphasis: 0 }
    },
    {
      title: 'Your Tokens',
      value: '2',
      unit: '',
      button: { text: 'Claim Token', emphasis: 2 }
    },
    {
      title: 'Your XDAI Investment',
      value: walletInvestment,
      unit: 'XDAI',
      button: { text: 'Buy', emphasis: 1 },
      handleClick: invest
    },
    {
      icon: 'lock',
      button: { text: 'Lock Liq and List', emphasis: 2 }
    }
  ];
  const links = [
    { title: 'Token Contract Address', address: presaleDetails.address },
    { title: 'Token Contract Address', address: 'feksuhugyeft9ewyroi5373759745745' },
    { title: 'Connect' },
    { title: 'Token Contract Address', address: 'feksuhugyeft9ewyroi5373759745745' },
    { title: 'Token Contract Address', address: 'feksuhugyeft9ewyroi5373759745745' },
    { title: 'Token Contract Address', address: 'feksuhugyeft9ewyroi5373759745745' }
  ];
  return (
    <div>
      <Header />
      <div className="detail_card">
        <section className="pool_detail detail_section">
          <div className="pool_detail_top">
            <div className="pool_detail_top_left">
              <img src="img/blockIcn.png" alt="icn"/>
              <div className="pool_detail_title">
                <h4>{presaleDetails.saleTitle}</h4>
                <p>asdfasdfasdfasdf</p>
              </div>
            </div>
            <button className="btn">Open in 5 Days</button>
          </div>
          <div className="pool_detail_middle">
            {details.map((info, index) => <DetailInfoBlock info={info} index={index} totalBlocks={details.length} />)}
          </div>
          <div className="pool_detail_bottom">
            <div className="pool_detail_progress">
              <div className="progress_total">
                <p className="detail_title">Total Raise</p>
                <p className="detail_value">${presaleDetails.totalCollectedEther} XDAI Raised</p>
              </div>
              <div className="detail_value">
                {presaleDetails.totalInvestorsCount} Participants
              </div>
            </div>
            <div className="progress_bar">
              <div className="progress_bar-wrap">
                <span className="progress_bar-green2">
                </span>
              </div>
            </div>
            <div className="progress_percent_fraction">
              <p className="detail_title">{presaleDetails.percentHardcapInvested}%</p>
              <p className="detail_title">{presaleDetails.totalCollectedEther}/{presaleDetails.hardcapInEther} XDAI</p>
            </div>
          </div>
        </section>
        <section className="your_investment detail_section">
          <div className="detail_section_title">
            <h4>Your Investment</h4>
          </div>
          <div className="investment_detail_middle">
            {investment.map((info, index) => <InvestmentDetailBlock info={info} index={index} />)}
          </div>
        </section>
        <section className="important_links detail_section">
          <div className="detail_section_title">
            <h4>Important Links</h4>
          </div>
          <div className="important_links_blocks">
            {links.map(info => <ImportantLink info={info} />)}
          </div>
        </section>
        <Disclaimer />
      </div>
      <Footer />
    </div>
  );
}
