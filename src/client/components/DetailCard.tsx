import Header from './Header';
import Footer from './Footer';
import Disclaimer from './Disclaimer';
import DetailInfoBlock from './DetailInfoBlock';
import InvestmentDetailBlock from './InvestmentDetailBlock';
import ImportantLink from './ImportantLink';

export default (props: any) => {
  const sampleDetails = [
    { title: 'Softcap', value: 24, unit: 'XDAI' },{ title: 'Hardcap', value: 500, unit: 'XDAI' },
    { title: 'Min Per Wallet', value: 1, unit: 'XDAI' },{ title: 'Max Per wallet', value: 1, unit: 'XDAI' },
    { title: 'Presale Rate', value: 0.00217, unit: 'XDAI' },{ title: 'Hard HoneySwap Listing Ratio', value: 0.00238, unit: 'XDAI' },
    { title: 'Liquidity Allocation', value: 100, unit: '%' },{ title: 'Liquidity Lock Duration', value: 90, unit: 'Days' }
  ];
  const sampleInvestment = [
    { title: 'Softcap', value: 24, unit: 'XDAI', button: { text: 'Vote', emphasis: 0 } },
    { title: 'Your Token', value: 0, unit: '', button: { text: 'Claim Token', emphasis: 2 } },
    { title: 'Your XDAI Investment', value: 0, unit: '', button: { text: 'Vote', emphasis: 1 } },
    { image: '', button: { text: 'Lock Liq and List', emphasis: 2 } }
  ];
  const sampleLinks = [
    { title: 'Token Contract Address', link: 'feksuhugyeft9ewyroi5373759745745' },
    { title: 'Token Contract Address', link: 'feksuhugyeft9ewyroi5373759745745' },
    { title: 'Connect', images: [ { image: '', link: '' }, { image: '', link: '' }, { image: '', link: '' }, { image: '', link: '' } ] },
    { title: 'Token Contract Address', link: 'feksuhugyeft9ewyroi5373759745745' },
    { title: 'Token Contract Address', link: 'feksuhugyeft9ewyroi5373759745745' },
    { title: 'Token Contract Address', link: 'feksuhugyeft9ewyroi5373759745745' }
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
                <h4>Blockchain cuties</h4>
                <p>asdfasdfasdfasdf</p>
              </div>
            </div>
            <button className="btn">Open in 5 Days</button>
          </div>
          <div className="pool_detail_middle">
            {sampleDetails.map((info, index) => <DetailInfoBlock info={info} index={index} totalBlocks={sampleDetails.length} />)}
          </div>
          <div className="pool_detail_bottom">
            <div className="pool_detail_progress">
              <div className="progress_total">
                <p className="detail_title">Total Raise</p>
                <p className="detail_value">$330.000 XDAI Raised</p>
              </div>
              <div className="detail_value">
                0 Participants
              </div>
            </div>
            <div className="progress_bar">
              <div className="progress_bar-wrap">
                <span className="progress_bar-green2">
                </span>
              </div>
            </div>
            <div className="progress_percent_fraction">
              <p className="detail_title">20.0%</p>
              <p className="detail_title">0.00/2500.00XDAI</p>
            </div>
          </div>
        </section>
        <section className="your_investment detail_section">
          <div className="detail_section_title">
            <h4>Your Investment</h4>
          </div>
          <div className="investment_detail_middle">
            {sampleInvestment.map((info, index) => <InvestmentDetailBlock info={info} handleClick={() => {}} index={index} />)}
          </div>
        </section>
        <section className="important_links detail_section">
          <div className="detail_section_title">
            <h4>Important Links</h4>
          </div>
          <div className="important_links_blocks">
            {sampleLinks.map(info => <ImportantLink info={info} />)}
          </div>
        </section>
        <Disclaimer />
      </div>
      <Footer />
    </div>
  );
}
