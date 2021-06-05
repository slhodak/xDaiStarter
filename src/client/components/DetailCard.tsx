import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BigNumber, Contract, Signer, utils } from 'ethers';
const { formatEther } = utils;
import abis from '../../abis.js';
import Footer from './Footer';
import Disclaimer from './Disclaimer';
import DetailInfoBlock from './DetailInfoBlock';
import BuyModal from './BuyModal';
import InvestmentDetailBlock from './InvestmentDetailBlock';
import ImportantLink from './ImportantLinks';
import useWeb3Modal from '../useWeb3Modal';
import { one, Logger } from '../utils';
import { __NETWORK__, PresaleDetails } from '../xds';

export default (props: any) => {
  const logger = Logger("DetailCard");
  const location = useLocation<{ presaleDetails: PresaleDetails, percentHardcapInvested: string }>();
  const { state } = location;
  const { presaleDetails, percentHardcapInvested } = state;

  const [amount, setAmount] = useState<BigNumber>(BigNumber.from("0"));
  const [buying, setBuying] = useState(false);
  const [walletInvestment, setWalletInvestment] = useState<BigNumber>(BigNumber.from("0"));
  const [xdPresale, setXDPresale] = useState<Contract>();
  const [signer, setSigner] = useState<Signer>();
  const [signerAddress, setSignerAddress] = useState<string>();

  const { provider } = useWeb3Modal();
  logger.log("Provider for DetailCard: ", provider);

  useEffect(() => {
    logger.log("Using effect...");
    if (provider) {
      const xdPresale = new Contract(
        presaleDetails.address,
        abis.xdPresale,
        provider
      );
      const signer = provider.getSigner();
      logger.log("Connecting to XDPresale with signer: ", signer);
      setSigner(signer);
      const connectedXDPresale = xdPresale.connect(signer);
      setXDPresale(connectedXDPresale);
      getSignerAddress(signer);
    }
  }, [provider]);

  async function getSignerAddress(signer: Signer) {
    const address = await signer.getAddress()
    logger.log("Got signer address: ", address);
    setSignerAddress(address);
  }

  useEffect(() => {
    getWalletInvestmentDetails();
  }, [xdPresale, signerAddress]);

  async function getWalletInvestmentDetails() {
    try {
      if (xdPresale && signerAddress) {
        const walletInvestment = await xdPresale.investments(signerAddress);
        logger.log("Got wallet total investment: ", walletInvestment);
        setWalletInvestment(walletInvestment);
      } else {
        logger.log("No XDPresale available to read investment");
      }
    } catch (error) {
      logger.error("Error getting investment details: ", error)
    }
  }

  // Transacts with blockchain
  async function invest() {
    logger.log("Investing");
    if (signer && xdPresale) {
      const value = amount.mul(presaleDetails.tokenPriceInWei);
      logger.log(`Address ${signerAddress} spending ${value.toString()} wei for ${amount.toString()} ${presaleDetails.symbol} tokens`);
      const tx = {
        to: xdPresale.address,
        value: value._hex
      };
      await signer.sendTransaction(tx);
    }
  }

  // Handle the click within the buying modal
  async function handleBuy() {
    try {
      await invest();
      setBuying(false);
      setAmount(presaleDetails.minInvestInWei);
    } catch (error) {
      logger.error("Error handling buy: ", error);
    }
  }

  // Unit should be gotten from presale / token symbol
  const details = [
    { title: 'Softcap', value: presaleDetails.softcapInWei, unit: presaleDetails.symbol },
    { title: 'Hardcap', value: presaleDetails.hardcapInWei, unit: presaleDetails.symbol },
    { title: 'Min Per Wallet', value: presaleDetails.minInvestInWei, unit: presaleDetails.symbol },
    { title: 'Max Per wallet', value: presaleDetails.maxInvestInWei, unit: presaleDetails.symbol },
    { title: 'Presale Rate', value: presaleDetails.tokenPriceInWei, unit: presaleDetails.symbol   },
    { title: 'Hard HoneySwap Listing Ratio', value: BigNumber.from('0'), unit: presaleDetails.symbol },
    { title: 'Liquidity Allocation', value: BigNumber.from('0'), unit: '%' },
    { title: 'Liquidity Lock Duration', value: BigNumber.from('0'), unit: 'Days' }
  ];
  // Get user's investment details
  const investment = [
    {
      title: 'Softcap',
      value: presaleDetails.softcapInWei,
      unit: presaleDetails.symbol,
      button: { text: 'Vote', emphasis: 0 }
    },
    {
      title: 'Your Tokens',
      value: walletInvestment.div(presaleDetails.tokenPriceInWei),
      unit: presaleDetails.symbol,
      button: { text: 'Claim Token', emphasis: 2 }
    },
    {
      title: 'Your XDAI Investment',
      value: walletInvestment,
      unit: "XDAI",
      button: { text: 'Buy', emphasis: 1 },
      handleClick: () => setBuying(true)
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
      {buying && <BuyModal
                    symbol={presaleDetails.symbol}
                    tokenPriceInWei={presaleDetails.tokenPriceInWei}
                    amount={amount}
                    setAmount={setAmount}
                    handleBuy={handleBuy}
                    setBuying={setBuying}
                />}
      <div className="detail_card">
        <section className="pool_detail detail_section">
          <div className="pool_detail_top">
            <div className="pool_detail_top_left">
              <img src="img/blockIcn.png" alt="icn"/>
              <div className="pool_detail_title">
                <h4>{presaleDetails.saleTitle}</h4>
                <p>Presale Subheader</p>
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
                <p className="detail_title">Total Raised</p>
                <p className="detail_value">{formatEther(presaleDetails.totalCollectedWei)} {presaleDetails.symbol} Raised</p>
              </div>
              <div className="detail_value">
                {presaleDetails.totalInvestorsCount.toNumber()} Participants
              </div>
            </div>
            <div className="progress_bar">
              <div className="progress_bar-wrap">
                <span className="progress_bar-green2" style={{width: `${percentHardcapInvested}%`}}>
                </span>
              </div>
            </div>
            <div className="progress_percent_fraction">
              <p className="detail_title">{percentHardcapInvested}%</p>
              <p className="detail_title">{formatEther(presaleDetails.totalCollectedWei)}/{formatEther(presaleDetails.hardcapInWei)} {presaleDetails.symbol}</p>
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
