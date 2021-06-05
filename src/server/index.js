const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const app = express();
const port = 4040;

// Blockchain
const { Contract, providers } = require("ethers");
// Upgrading to node 14 may help with importing this, see
//  https://stackoverflow.com/questions/58384179/syntaxerror-cannot-use-import-statement-outside-a-module
import { xdsFactory as xdsFactoryAbi } from "../abis.js";
import addresses from "../addresses.json";
const { XDaiStarterFactory } = addresses[process.env.ENV || "development"];

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../public/index.html"), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

// Recieve and save JSON of the application
// This path is navigated to as form action, so must redirect to a valid React Router route
app.post("/application", async (req, res) => {
  console.log(req.body);
  let returnQuery = "";
  if (req.body.github == "") {
    const githubMissing = encodeURI("Invalid Submission: Github URL missing");
    returnQuery = `?status=400&message=${githubMissing}`;
  } else {
    try {
      const fileName = req.body.github.replace(/\//g, "_");
      await fs.writeFile(
              path.join(__dirname, `./data/projects/${fileName}.json`),
              JSON.stringify(req.body)
            );
      const success = encodeURI("Application submitted successfully.");
      returnQuery = `?status=200&message=${success}`;
    } catch (err) {
      console.error("Error writing submission file", err);
    }
  }
  res.redirect(`/apply${returnQuery}`);
});

// Data api endpoint; not navigated to 
app.post("/presale", async (req, res) => {
  // Accept json application doc
  console.log(req.body);
  const presaleDetails = req.body;
  // Parse json application into PresaleInfo, HoneySwapInfo, and StringInfo
  const presaleInfo = {
    tokenAddress: presaleDetails.tokenAddress,
    unsoldTokensDumpAddress: presaleDetails.unsoldTokensDumpAddress,
    whitelistedAddresses: presaleDetails.whitelistedAddresses,
    tokenPriceInWei: presaleDetails.tokenPriceInWei,
    hardCapInWei: presaleDetails.hardCapInWei,
    softCapInWei: presaleDetails.softCapInWei,
    maxInvestInWei: presaleDetails.maxInvestInWei,
    minInvestInWei: presaleDetails.minInvestInWei,
    openTime: presaleDetails.openTime,
    closeTime: presaleDetails.closeTime
  };
  const honeySwapInfo = {
    listingPriceInWei: presaleDetails.listingPriceInWei,
    liquidityAddingTime: presaleDetails.liquidityAddingTime,
    lpTokensLockDurationInDays: presaleDetails.lpTokensLockDurationInDays,
    liquidityPercentageAllocation: presaleDetails.liquidityPercentageAllocation
  };
  const StringInfo = {
    saleTitle: presaleDetails.saleTitle,
    linkChat: presaleDetails.linkChat,
    linkGithub: presaleDetails.linkGithub,
    linkTwitter: presaleDetails.linkTwitter,
    linkWebsite: presaleDetails.linkWebsite,
    linkLogo: presaleDetails.linkLogo
  };
  // Initialize XDSFactory Contract
  // Get provider and signer in backend--?
  const networks = {
    development: "127.0.0.1:8545",
    sokol: "127.0.0.1:8545",
    xdai: "127.0.0.1:8545",
  };
  // Need chainId? ChainId instead?
  const network = networks[process.env.ENV || "development"];
  const provider = providers.JsonRpcProvider(network);
  const signer = provider.getSigner();
  const xdsFactoryContract = new Contract(
                              XDaiStarterFactory,
                              xdsFactoryAbi,
                              signer
                            );
  // Send PresaleInfo, HoneySwapInfo, and StringInfo to XDSFactory.createPresale
  xdsFactoryContract.createPresale(presaleInfo, honeySwapInfo, StringInfo);
  res.send(200);
})


app.listen(port, () => {
  // tslint:disable-next-line:no-console
    console.log(`server started at ${port}`);
});
