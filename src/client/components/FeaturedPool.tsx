import abis from '../../abis';
import {
  providers,
  Contract
} from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import { PresaleDetails } from '../xds';
import { utils } from 'ethers';
const {
  formatEther,
  toUtf8String,
  stripZeros
} = utils;
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import '../scss/style.scss';
import '../img/blockIcn.png';
import '../img/tg.png';
import '../img/share.png';


export default (props: { address: string }) => {
  const { address } = props;
  console.debug(`Creating pool block for presale at ${address}`);
  const location = useLocation();

  const provider = providers.getDefaultProvider("http://localhost:8545");
  const xdPresale = new Contract(
    address,
    abis.xdPresale,
    provider
  );

  const [presaleDetails, setPresaleDetails] = useState<PresaleDetails>();

  useEffect(() => {
    console.log('calling for details');
    getPresaleDetails();
  }, [location]);

  async function getPresaleDetails() {
    try {
      console.debug("About to get details...");
      const saleTitle = await xdPresale.saleTitle();
      const linkTelegram = await xdPresale.linkTelegram();
      const linkTwitter = await xdPresale.linkTwitter();
      const linkGithub = await xdPresale.linkGithub();
      const linkWebsite = await xdPresale.linkWebsite();
      const linkLogo = await xdPresale.linkLogo();
      console.debug("Got logo link...");
      const totalInvestorsCount = await xdPresale.totalInvestorsCount();
      const totalCollectedWei = await xdPresale.totalCollectedWei();
      const tokenPriceInWei = await xdPresale.tokenPriceInWei();
      const tokensLeft = await xdPresale.tokensLeft();
      console.debug("Got tokensLeft...");
      const minInvestInWei = await xdPresale.minInvestInWei();
      const maxInvestInWei = await xdPresale.maxInvestInWei();
      const softCapInWei = await xdPresale.softCapInWei();
      const hardCapInWei = await xdPresale.hardCapInWei();
      // Following not applicable to XDPresale
      console.debug("Got hardcap...");
      // const honeyLiquidityPercentageAllocation = await xdPresale.honeyLiquidityPercentageAllocation();
      // const honeyLPTokensLockDurationInDays = await xdPresale.honeyLPTokensLockDurationInDays();
      const details = {
        saleTitle,
        linkTelegram,
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
        softCapInWei,
        hardCapInWei,
        // Following not applicable to XDPresale
        // honeyLiquidityPercentageAllocation,
        // honeyLPTokensLockDurationInDays,
      };
      console.debug("Found presale details: ", details);
      setPresaleDetails(details);
    } catch (error) {
      console.error("Error getting all details", error);
    }
  }

  const percentageOfHardcapInvested = formatEther((presaleDetails?.totalCollectedWei.div(presaleDetails?.hardCapInWei)) || "500000000000000000000");

  return (
    <div className="pool_block">
      <div className="pool_block_title">
        <div>
          <img src="img/blockIcn.png" alt="icn"/>
        </div>
        <h4>{presaleDetails?.saleTitle ? toUtf8String(stripZeros(presaleDetails.saleTitle)) : ""}</h4>
      </div>
      <div className="pool_info">
        <div className="pool_info_top nonvoting">
          <div className="progress_bar_container">
            <div className="progress_bar_wrap">
              <span className="progress_bar_green2">
                <p>{percentageOfHardcapInvested}%</p>
              </span>
              <div className="progress_counter">
                <span>{presaleDetails?.totalCollectedWei ? formatEther(presaleDetails.totalCollectedWei) : "0.00"}/{presaleDetails?.hardCapInWei ? formatEther(presaleDetails.hardCapInWei) : "0.00"} XDAI </span>
              </div>
            </div>
          </div>
        </div>
        <div className="pool_info_btm">
          <div>
            <span>{presaleDetails?.totalCollectedWei ? formatEther(presaleDetails.totalCollectedWei) : "0.00"} XDAI</span>
            <p>{presaleDetails?.tokenPriceInWei ? formatEther(presaleDetails.tokenPriceInWei) : "0.00"} XDAI Per Token</p>
          </div>
          <div>
            <span>{presaleDetails?.maxInvestInWei ? formatEther(presaleDetails.maxInvestInWei) : "0.00"} XDAI</span>
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
        <Link to='/pooldetail'><button className="btn">Filled</button></Link>
      </div>
    </div>
  )
}
