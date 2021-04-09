import Header from './Header';
import Footer from './Footer';
import Disclaimer from './Disclaimer';
import '../img/litepaper_diagram_1.png';
import '../img/litepaper_diagram_2.png';

export default (props: any) => {
  return (
    <div className="litepaper_page">
      <Header />
      <div className="litepaper_main">
        <section className="large_title litepaper">
          <h1>
            Community governed launchpad for <span className="highlighted_title_text">X</span>Dai <span className="highlighted_title_text">Starter</span>
          </h1>
        </section>
        <section className="page_description">
          <p>Innovation for bootstrapped projects has been grinding to a halt on the Ethereum blockchain. Exorbitant gas
            fees have nearly caused new project launches to stall and existing projects to lose user engagement -
            staking, claiming, and normal trades are costing ETH users hundreds in transaction fees.</p>
          <p>And this trend will likely continue.</p>
          <p>But innovation cannot be stopped. Over the past several months, developers have sought lower-cost options
            to deploy their experiments. xDaiStarter has become the go-to platform for new product launches based on
            Solidity, and for existing projects looking to stay alive.</p>
          <p>Presale launchpads today are too bureaucratic - they require KYC and a manual selection process that is a
            reminder of the old barriers that have traditionally kept new innovation only accessible to the rich.
          </p>
          <p>We believe communities are an important contributor to addressing many of the worlds problems. We
            believe, that given the correct tools, communities can come together and take matters into their own
            hands.</p>
          <p>That is why we have developed xDaiStarter - it is a community-governed launchpad for raising capital for
            xDai projects, that isn't filled with government red tape and KYC rules. Instead, it is the xDaiStarter
            community that will determine which projects to list. It is the xDaiStarter community that uses their
            collective due diligence and DYOR skills to vote Yes or No on projects coming through xDaiStarter looking
            for funds.</p>
          <p>Let us filter through the messy landscape where rugs overshadow the great potential of our growing
            ecosystem on xDai.</p>
          <p>Join the first community-owned network for raising capital that will quickly become the go-to place to
            find the next high quality gems who are looking for an affordable place to call home for their smart
            contracts</p>
        </section>
        <section className="xds_section">
          <div className="row_md_column">
            <div className="statistics_block left_block">
              <h2 className="medium_title">XDP Tokenomics</h2>
              <div className="block_content">
                <div className="block_item">
                  <span>1m</span>
                  <p>Total Supply</p>
                </div>
                <div className="block_item">
                  <span>450k</span>
                  <p>Presale Supply</p>
                </div>
                <div className="block_item">
                  <span>225k</span>
                  <p>Liquidity</p>
                </div>
                <div className="block_item">
                  <span>25k</span>
                  <p>Marketing</p>
                </div>
                <div className="block_item">
                  <span>50k</span>
                  <p>Incubator Grant</p>
                </div>
                <div className="block_item">
                  <span>75k</span>
                  <p>Development</p>
                </div>
                <div className="block_item">
                  <span>125k</span>
                  <p>Partnerships</p>
                </div>
                <div className="block_item">
                  <span>50k</span>
                  <p>Team</p>
                </div>
              </div>
            </div>
            <div className="statistics_block right_block">
              <h2 className="medium_title">XDP Token Offering</h2>
              <div className="block_content">
                <div className="block_item">
                  <span>450k</span>
                  <p>Presale Supply</p>
                </div>
                <div className="block_item">
                  <span>xDai</span>
                  <p>Purchase Option</p>
                </div>
                <div className="block_item">
                  <span>$1.30</span>
                  <p>Presale Price</p>
                </div>
                <div className="block_item">
                  <span>$1.75</span>
                  <p>Listing Price</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="xds_section">
          <h2 className="medium_title">How It Works - Applying</h2>
          <p className="medium_descriptor">Applying for a sale on xDaiStarter is very simple, and more importantly, very affordable! Here is how:</p>
          <div className="diagram">
            <img src="img/litepaper_diagram_1.png" alt="img"/>
          </div>
        </section>
        <section className="xds_section">
          <h2 className="medium_title">How It Works - Sale</h2>
          <p className="medium_descriptor">Participating in a presale is a simple as 1.2.3! Just follow the steps below.</p>
          <div className="diagram">
            <img src="img/litepaper_diagram_2.png" alt="img"/>
          </div>
        </section>
        <Disclaimer />
      </div>
      <Footer />
    </div>
  )
}