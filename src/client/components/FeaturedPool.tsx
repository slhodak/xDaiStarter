import abis from '../../abis.js';
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
  const [percentHardcapInvested, setPercentHardcapInvested] = useState<string>("0");

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
      const saleTitle = toUtf8String(stripZeros(await xdPresale.saleTitle()));
      const linkChat = toUtf8String(stripZeros(await xdPresale.linkChat()));
      const linkTwitter = toUtf8String(stripZeros(await xdPresale.linkTwitter()));
      const linkGithub = toUtf8String(stripZeros(await xdPresale.linkGithub()));
      const linkWebsite = toUtf8String(stripZeros(await xdPresale.linkWebsite()));
      const linkLogo = toUtf8String(stripZeros(await xdPresale.linkLogo()));
      logger.log("Got string info...");
      const totalInvestorsCount = await xdPresale.totalInvestorsCount();
      const totalCollectedWei = await xdPresale.totalCollectedWei();
      const tokenPriceInWei = await xdPresale.tokenPriceInWei();
      const tokensLeft = await xdPresale.tokensLeft();
      const minInvestInWei = await xdPresale.minInvestInWei();
      const maxInvestInWei = await xdPresale.maxInvestInWei();
      const softcapInWei = await xdPresale.softCapInWei();
      const hardcapInWei = await xdPresale.hardCapInWei();
      logger.log("Got investment info...");
      // Following not applicable to XDPresale
      // const honeyLiquidityPercentageAllocation = await xdPresale.honeyLiquidityPercentageAllocation();
      // const honeyLPTokensLockDurationInDays = await xdPresale.honeyLPTokensLockDurationInDays();
      // logger.log("Got swap info...");
      const details = {
        symbol: "XDP",
        address,
        saleTitle,
        linkChat,
        linkTwitter,
        linkGithub,
        linkWebsite,
        linkLogo,
        totalInvestorsCount,
        totalCollectedWei,
        tokenPriceInWei,
        tokensLeft,
        minInvestInWei,
        maxInvestInWei,
        softcapInWei,
        hardcapInWei,
        // Following not applicable to XDPresale
        // honeyLiquidityPercentageAllocation,
        // honeyLPTokensLockDurationInDays,
      };
      logger.log("Found presale details: ", details);
      setPresaleDetails(details);
      setPercentHardcapInvested(formatEther(totalCollectedWei.div(hardcapInWei)));
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
              <span className="progress_bar_green2" style={{width: `${percentHardcapInvested}%`}}>
                <p>{percentHardcapInvested}%</p>
              </span>
              <div className="progress_counter">
                <span>{presaleDetails ? formatEther(presaleDetails.totalCollectedWei) : "0.00"} {presaleDetails?.symbol} </span>
              </div>
            </div>
          </div>
        </div>
        <div className="pool_info_btm">
          <div>
            <span>{presaleDetails ? formatEther(presaleDetails.totalCollectedWei) : "0.00"} {presaleDetails?.symbol}</span>
            <p>{presaleDetails ? formatEther(presaleDetails.tokenPriceInWei) : "0.00"} {presaleDetails?.symbol} Per Token</p>
          </div>
          <div>
            <span>{presaleDetails ? formatEther(presaleDetails.maxInvestInWei) : "0.00"} {presaleDetails?.symbol}</span>
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
            presaleDetails,
            percentHardcapInvested
          }
        }}><button className="btn">Filled</button></Link>
      </div>
    </div>
    )
}
