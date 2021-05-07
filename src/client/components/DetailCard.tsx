import abis from '../../abis';
import Header from './Header';
import Footer from './Footer';
import Disclaimer from './Disclaimer';
import DetailInfoBlock from './DetailInfoBlock';
import InvestmentDetailBlock from './InvestmentDetailBlock';
import ImportantLink from './ImportantLinks';
import { useWeb3Modal } from './Wallet';
import { Contract, utils } from 'ethers';
const { formatEther } = utils;
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const web3ModalOptions = {
  autoLoad: true, infuraId: "", NETWORK: "development"
};

export default (props: any) => {
  const [walletInvestment, setWalletInvestment] = useState<string>();
  const location = useLocation();
  const { state } = location;
  console.log("Location state", state);
  const { presaleDetails } = state;
  const { provider, account } = useWeb3Modal(web3ModalOptions);  
  let xdPresale: Contract;

  useEffect(() => {
    if (provider && account && !walletInvestment) {
      console.log("Getting wallet investment with provider", provider);
      xdPresale = new Contract(
        presaleDetails.address,
        abis.xdPresale,
        provider
      );
      getWalletInvestmentDetails();
    }
  }, [location])

  async function getWalletInvestmentDetails() {
    try {
      const walletInvestment = await xdPresale.investments(account);
      console.log(walletInvestment);
      setWalletInvestment(formatEther(walletInvestment));
    } catch (error) {
      console.error("Error getting investment details: ", error)
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
    { title: 'Softcap', value: presaleDetails.softCapInEther, unit: 'XDAI', button: { text: 'Vote', emphasis: 0 } },
    { title: 'Your Tokens', value: 2, unit: '', button: { text: 'Claim Token', emphasis: 2 } },
    { title: 'Your XDAI Investment', value: walletInvestment, unit: '', button: { text: 'Vote', emphasis: 1 } },
    { icon: 'lock', button: { text: 'Lock Liq and List', emphasis: 2 } }
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
            {investment.map((info, index) => <InvestmentDetailBlock info={info} handleClick={() => {}} index={index} />)}
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
