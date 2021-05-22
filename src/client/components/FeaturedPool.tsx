import abis from '../../abis';
import { PresaleDetails } from '../xds';
import { Contract, providers, utils } from 'ethers';
const {
  formatEther,
  toUtf8String,
  stripZeros
} = utils;
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../scss/style.scss';
import '../img/blockIcn.png';
import '../img/tg.png';
import '../img/share.png';
import { getNetwork, Logger } from '../utils';

export default (props: { address: string }) => {
  const logger = Logger("FeaturedPool");
  const { address } = props;
  const [presaleDetails, setPresaleDetails] = useState<PresaleDetails>();
  
  const provider = providers.getDefaultProvider(getNetwork()?.endpoint);
  const xdPresale = new Contract(
    address,
    abis.xdPresale,
    provider
    );
    useEffect(() => {
      if (provider && !presaleDetails) {
      logger.log(`Getting details for presale at ${address}`);
      getPresaleDetails();
    }
  });

  async function getPresaleDetails() {
    try {
      const saleTitle = await xdPresale.saleTitle();
      const linkTelegram = await xdPresale.linkTelegram();
      const linkTwitter = await xdPresale.linkTwitter();
      const linkGithub = await xdPresale.linkGithub();
      const linkWebsite = await xdPresale.linkWebsite();
      const linkLogo = await xdPresale.linkLogo();
      logger.log("Got string info...");
      const totalInvestorsCount = await xdPresale.totalInvestorsCount();
      const totalCollectedWei = await xdPresale.totalCollectedWei();
      const tokenPriceInWei = await xdPresale.tokenPriceInWei();
      const tokensLeft = await xdPresale.tokensLeft();
      const minInvestInWei = await xdPresale.minInvestInWei();
      const maxInvestInWei = await xdPresale.maxInvestInWei();
      const softcapInWei = await xdPresale.softCapInWei();
      const hardcapInWei = await xdPresale.hardCapInWei();
      // Following not applicable to XDPresale
      logger.log("Got integer info...");
      // const honeyLiquidityPercentageAllocation = await xdPresale.honeyLiquidityPercentageAllocation();
      // const honeyLPTokensLockDurationInDays = await xdPresale.honeyLPTokensLockDurationInDays();
      const details = {
        symbol: "XDP",
        address: address,
        saleTitle: toUtf8String(stripZeros(saleTitle)),
        linkTelegram: toUtf8String(stripZeros(linkTelegram)),
        linkTwitter: toUtf8String(stripZeros(linkTwitter)),
        linkGithub: toUtf8String(stripZeros(linkGithub)),
        linkWebsite: toUtf8String(stripZeros(linkWebsite)),
        linkLogo: toUtf8String(stripZeros(linkLogo)),
        totalInvestorsCount: totalInvestorsCount.toNumber(),
        totalCollectedEther: formatEther(totalCollectedWei),
        tokenPriceInEther: formatEther(tokenPriceInWei),
        tokensLeft: formatEther(tokensLeft),
        minInvestInEther: formatEther(minInvestInWei),
        maxInvestInEther: formatEther(maxInvestInWei),
        softcapInEther: formatEther(softcapInWei),
        hardcapInEther: formatEther(hardcapInWei),
        // Following not applicable to XDPresale
        // honeyLiquidityPercentageAllocation,
        // honeyLPTokensLockDurationInDays,
        percentHardcapInvested: formatEther(totalCollectedWei.div(hardcapInWei))
      };
      logger.log("Found presale details: ", details);
      setPresaleDetails(details);
    } catch (error) {
      logger.error("Error getting all details", error);
    }
  }


  return (
    <div className="pool_block">
      <div className="pool_block_title">
        <div>
          <img src="img/blockIcn.png" alt="icn"/>
        </div>
        <h4>{presaleDetails?.saleTitle || "Loading..."}</h4>
      </div>
      <div className="pool_info">
        <div className="pool_info_top nonvoting">
          <div className="progress_bar_container">
            <div className="progress_bar_wrap">
              <span className="progress_bar_green2">
                <p>{presaleDetails?.percentHardcapInvested || "0"}%</p>
              </span>
              <div className="progress_counter">
                <span>{presaleDetails?.totalCollectedEther || "0.00"} XDAI </span>
              </div>
            </div>
          </div>
        </div>
        <div className="pool_info_btm">
          <div>
            <span>{presaleDetails?.totalCollectedEther || "0.00"} XDAI</span>
            <p>{presaleDetails?.tokenPriceInEther || "0.00"} XDAI Per Token</p>
          </div>
          <div>
            <span>{presaleDetails?.maxInvestInEther || "0.00"} XDAI</span>
            <p>Maximum XDAI</p>
          </div>
        </div>
      </div>
      <div className="pool_links">
        <div className="pool_share">
          <a href="">
            <img src="img/tg.png" alt="img"/>
          </a>
          <a href="">
            <img src="img/share.png" alt="img"/>
          </a>
        </div>
        <Link to={{
          pathname: '/pooldetail',
          state: {
            presaleDetails
          }
        }}><button className="btn">Filled</button></Link>
      </div>
    </div>
  )
}
