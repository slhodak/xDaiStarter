import Header from './Header';
import Disclaimer from './Disclaimer';

export default (props: { selectPage: Function }) => {
  const { selectPage } = props;
  const sampleDetails = [
    { title: 'Softcap', value: 24, unit: 'XDAI' },{ title: 'Hardcap', value: 500, unit: 'XDAI' },
    { title: 'Min Per Wallet', value: 1, unit: 'XDAI' },{ title: 'Max Per wallet', value: 1, unit: 'XDAI' },
    { title: 'Presale Rate', value: 0.00217, unit: 'XDAI' },{ title: 'Hard HoneySwap Listing Ratio', value: 0.00238, unit: 'XDAI' },
    { title: 'Liquidity Allocation', value: 100, unit: '%' },{ title: 'Liquidity Lock Duration', value: 90, unit: 'Days' }
  ];
  return (
    <div className="detail_card">
      <Header selectPage={selectPage} />
      <div className="pool_detail">
        <div className="pool_detail_top">
          <div className="pool_detail_title">
          <img src="img/blockIcn.png" alt="icn"/>
            <h4>Blockchain cuties</h4>
            <p>asdfasdfasdfasdf</p>
          </div>
          <button className="btn">
            Open in 5 Days
          </button>
        </div>
        <div className="pool_detail_middle">
          {sampleDetails}
        </div>
        <div className="pool_detail_bottom">
          <div className="pool_detail_progress">
            <div className="progress_total">
              <p className="progress_total_title">Total Raise</p>
              <p className="progress_total_value">$330.000 XDAI Raised</p>
            </div>
            <div className="progress_participants">
              0 Participants
            </div>
          </div>
          <div className="progress_bar">
            progress bar
          </div>
          <div className="progress_percent_fraction">
            <p className="percent_value">20.0%</p>
            <p className="fraction_value">0.00/2500.00XDAI</p>
          </div>
        </div>
      </div>
      <div className="your_investment"></div>
      <div className="important_links"></div>
      <Disclaimer />
    </div>
  );
}
