import xdpTokenJson from "../build/contracts/XDPToken.json";
import xdPresaleJson from "../build/contracts/XDPresale.json";
import xdsInfoJson from "../build/contracts/XDaiStarterInfo.json";
import xdsStakingJson from "../build/contracts/XDaiStarterStaking.json";
import xdsFactoryJson from "../build/contracts/XDaiStarterFactory.json";

const abis = {
  xdpToken: xdpTokenJson.abi,
  xdPresale: xdPresaleJson.abi,
  xdsInfo: xdsInfoJson.abi,
  xdsStaking: xdsStakingJson.abi,
  xdsFactory: xdsFactoryJson.abi,
};

export default abis;
