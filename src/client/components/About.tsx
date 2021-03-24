import Header from './Header';
import Footer from './Footer';
import '../img/way1.png';
import '../img/way2.png';

export default (props: any) => {
  const { selectPage } = props;
  return (
    <div>
      <Header selectPage={selectPage} />
      <div>
        <section className="about_text">
          <div className="header_title">
            <h1>Community governed launchpad
              for <span>X</span>Dai <span>Starter</span></h1>
          </div>
        </section>
        <section className="page_description">
          <div className="container">
            <p>Innovation for bootstrapped projects has been grinding to a halt on the Ethereum blockchain. Exorbitant
              gas
              fees has nearly caused new project launches to stall and existing projects to lose user engagement -
              staking, claiming, and normal trades are costing ETH users hundreds in transaction fees.</p>
            <p>And this trend will likely continue.</p>
            <p>But innovation cannot be stopped. Over the past several months, developers have sought lower-cost options
              to deploy their experiments. xdaistarter has become the go-to platform for new product launches based on
              Solidity, and for existing projects looking to stay alive.</p>
            <p>BSC launchpads today are too bureaucratic - they require KYC and a manual selection process that is a
              reminder of the old barriers that have traditionally kept new innovation only accessible to the rich.
            </p>
            <p>We believe communities are an important contributor to addressing many of the worlds problems. We
              believe, that given the correct tools, communities can come together and take matters into their own
              hands.</p>
            <p>That is why we have developed BSCstarter - it is a community-governed launchpad for raising capital for
              BSC projects, that isn't filled with government red tape and KYC rules. Instead, it is the BSCstarter
              community that will determine which projects to list. It is the BSCstarter community that uses their
              collective due diligence and DYOR skills to vote Yes or No on projects coming through BSCstarter looking
              for funds.</p>
            <p>Let us filter through the messy landscape where rugs overshadow the great potential of our growing
              ecosystem on BSC.</p>
            <p>Join the first community-owned network for raising capital that will quickly become the go-to place to
              find the next high quality gems who are looking for an affordable place to call home for their smart
              contracts</p>

          </div>

        </section>
        <section className="page_statistic">
          <div className="container">
            <div className="page_statistic-row">
              <div className="page_statistic-block page_statistic-block1">
                <h2 className="pools-title">Start Tokenomics</h2>
                <div className="statistic_block-content">
                  <div className="statistic_block-item">
                    <span>1m</span>
                    <p>Total Supply</p>
                  </div>
                  <div className="statistic_block-item">
                    <span>450k</span>
                    <p>Presale Supply</p>
                  </div>
                  <div className="statistic_block-item">
                    <span>225k</span>
                    <p>Liquidity</p>
                  </div>
                  <div className="statistic_block-item">
                    <span>25k</span>
                    <p>Marketing</p>
                  </div>
                  <div className="statistic_block-item">
                    <span>50k</span>
                    <p>Incubator Grant</p>
                  </div>
                  <div className="statistic_block-item">
                    <span>75k</span>
                    <p>Development</p>
                  </div>
                  <div className="statistic_block-item">
                    <span>125k</span>
                    <p>Partnerships</p>
                  </div>
                  <div className="statistic_block-item">
                    <span>50k</span>
                    <p>Team</p>
                  </div>
                </div>
              </div>
              <div className="page_statistic-block page_statistic-block2">
                <h2 className="pools-title">Start Token Offering</h2>
                <div className="statistic_block-content">
                  <div className="statistic_block-item">
                    <span>450k</span>
                    <p>Presale Supply</p>
                  </div>
                  <div className="statistic_block-item">
                    <span>BNB</span>
                    <p>Purchase Option</p>
                  </div>
                  <div className="statistic_block-item">
                    <span>$1.30</span>
                    <p>Presale Price</p>
                  </div>
                  <div className="statistic_block-item">
                    <span>$1.75</span>
                    <p>Listing Price</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page_graph">
          <div className="container">
            <div className="page_graph-wrap">
              <h2 className="pools-title">How It Works - Applying</h2>
              <p className="pools-title-descr">Applying for a sale on BSCstarter is very simple, and more importantly, very affordable! Here is how:</p>
              <div className="page_graph-banner page_graph-banner2">
                <img src="img/way2.png" alt="img"/>
              </div>
            </div>
          </div>
        </section>
        <section className="page_graph">
          <div className="container">
            <div className="page_graph-wrap">
              <h2 className="pools-title">How It Works -Sale</h2>
              <p className="pools-title-descr">Participating in a presale is a simple as 1.2.3! Just follow the steps
                below.</p>
              <div className="page_graph-banner">
                <img src="img/way1.png" alt="img"/>
              </div>
            </div>
          </div>
        </section>
        <section className="page_graph">
          <div className="container">
            <div className="page_graph-disc">
              <h2 className="pools-title">Disclaimer</h2>
              <p className="pools-title-descr">The BSCstarter team does not endorse, support or otherwise perform any due diligence on the projects listed on its platform.
                As always, please DO YOUR OWN RESEARCH before investing any of your hard-earned BNB into these projects and never invest
                more than you are willing to lose.</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}