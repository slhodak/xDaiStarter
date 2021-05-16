# Overview
Community-governed fundraising for projects on xDai chain.

## Development Set-up
#### Requirements
[TypeScript](https://www.typescriptlang.org/download), [Webpack](https://webpack.js.org/guides/installation/), [Truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation), and [PM2](https://pm2.keymetrics.io/) installed globally  
[Ganache](https://www.trufflesuite.com/ganache)

### Run Locally
1. `yarn install`
2. `pm2 start src/server/index.js --name xDaiStarter` or `yarn run server-start`
3. `yarn run react-dev`
4. Start Ganache
5. Open `localhost:4040`

### Test Contracts
1. `truffle develop`
2. `truffle(develop)> test`

## Deploy & Build
When the frontend is built, it will use the most recent contract addresses and ABIs.

`truffle migrate` will add newly deployed contract addresses to `src/addresses.json`. The links in `src/abis.js` always point to the most recent contract ABIs.

Update the frontend after updates to the backend using the following commands; keep in mind that migration includes compilation if the contract code has changed.
### Development / Local
`yarn run migrate-development && yarn run build-development`  
### POA Sokol Testnet
`yarn run migrate-testnet && yarn run build-development`  
### xDai Mainnet
`yarn run migrate-production && yarn run build-development`
