import abis from '../../abis';
import {
  providers,
  Contract
} from 'ethers';
import { PresaleDetails } from '../xds';
import { BigNumber } from 'ethers';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import '../scss/style.scss';
import '../img/blockIcn.png';
import '../img/tg.png';
import '../img/share.png';
let deets = {
  saleTitle: 'string',
  linkTelegram: 'string',
  linkTwitter: 'string',
  linkGithub: 'string',
  linkWebsite: 'string',
  linkLogo: 'string',
  totalInvestorsCount: 0,
  totalCollectedWei: BigNumber.from("10"),
  tokenPriceInWei: BigNumber.from("10"),
  tokensLeft: BigNumber.from("10"),
  minInvestInWei: BigNumber.from("10"),
  maxInvestInWei: BigNumber.from("10"),
  softCapInWei: BigNumber.from("10"),
  hardCapInWei: BigNumber.from("10"),
  // Following not applicable to XDPresale
  honeyLiquidityPercentageAllocation: BigNumber.from("10"),
  honeyLPTokensLockDurationInDays: BigNumber.from("10"),
  // what is "Hard Honeyswap Listing Ratio" in UI?
};

export default (props: { address: string }) => {
  const { address } = props;
  console.debug(`Creating pool block for presale at ${address}`);

  const [saleTitle, setSaleTitle] = useState();
  const [linkTelegram, setLinkTelegram] = useState();
  const [linkTwitter, setLinkTwitter] = useState();
  const [linkGithub, setLinkGithub] = useState();
  const [linkWebsite, setLinkWebsite] = useState();
  const [linkLogo, setLinkLogo] = useState();
  const [totalInvestorsCount, setTotalInvestorsCount] = useState();
  const [totalCollectedWei, setTotalCollectedWei] = useState();
  const [tokenPriceInWei, setTokenPriceInWei] = useState();
  const [tokensLeft, setTokensLeft] = useState();
  const [minInvestInWei, setMinInvestInWei] = useState();
  const [maxInvestInWei, setMaxInvestInWei] = useState();
  const [softCapInWei, setSoftCapInWei] = useState();
  const [hardCapInWei, setHardCapInWei] = useState();
  // Following not applicable to XDPresale
  const [honeyLiquidityPercentageAllocation, setHoneyLiquidityPercentageAllocation] = useState();
  const [honeyLPTokensLockDurationInDays, setHoneyLPTokensLockDurationInDays] = useState();

  const provider = providers.getDefaultProvider("http://localhost:8545");
  const xdPresale = new Contract(
    address,
    abis.xdPresale,
    provider
  );

  useEffect(() => {
    if (!saleTitle) {
      getPresaleDetails();
    }
  });

  async function getPresaleDetails() {
    console.debug(`Found presale details: ${await xdPresale.saleTitle()}`);
    // Parse padded bytes32 of string infos
    setSaleTitle(await xdPresale.saleTitle());
    setLinkTelegram(await xdPresale.linkTelegram());
    setLinkTwitter(await xdPresale.linkTwitter());
    setLinkGithub(await xdPresale.linkGithub());
    setLinkWebsite(await xdPresale.linkWebsite());
    setLinkLogo(await xdPresale.linkLogo());
    // Parse BigNumbers & format in UI
    setTotalInvestorsCount(await xdPresale.totalInvestorsCount());
    setTotalCollectedWei(await xdPresale.totalCollectedWei());
    setTokenPriceInWei(await xdPresale.tokenPriceInWei());
    setTokensLeft(await xdPresale.tokensLeft());
    setMinInvestInWei(await xdPresale.minInvestInWei());
    setMaxInvestInWei(await xdPresale.maxInvestInWei());
    setSoftCapInWei(await xdPresale.softCapInWei());
    setHardCapInWei(await xdPresale.hardCapInWei());
    // Following not applicable to XDPresale
    // setHoneyLiquidityPercentageAllocation(await xdPresale.honeyLiquidityPercentageAllocation());
    // setHoneyLPTokensLockDurationInDays(await xdPresale.honeyLPTokensLockDurationInDays();
  }

  return (
    <div className="pool_block">
      <div className="pool_block_title">
        <div>
          <img src="img/blockIcn.png" alt="icn"/>
        </div>
        <h4>{saleTitle}</h4>
      </div>
      <div className="pool_info">
        <div className="pool_info_top nonvoting">
          <div className="progress_bar_container">
            <div className="progress_bar_wrap">
              <span className="progress_bar_green2">
                <p>20%</p>
              </span>
              <div className="progress_counter">
                <span>0.00/2500.00 XDAI </span>
              </div>
            </div>
          </div>
        </div>
        <div className="pool_info_btm">
          <div>
            <span>0.00 XDAI</span>
            <p>0.006 XDAI Per Token</p>
          </div>
          <div>
            <span>40.00 XDAI</span>
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
