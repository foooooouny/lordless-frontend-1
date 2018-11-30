'use strict'
const merge = require('webpack-merge')
const contract = JSON.stringify(merge(require('../.contract/mainnet.json'), require('../.contract/airdrop/mainnet.json')))

module.exports = {
  NODE_ENV: '"production"',
  LDBICON_ORIGIN: '"//lordless.oss-cn-hongkong.aliyuncs.com"',
  // LDBICON_ORIGIN: '"http://lordless.oss-cn-hongkong.aliyuncs.com"',
  OSSFOLDERPATH: 'dist',
  BACKEND_SERVER: '"//lordless.games"',
  ETHERSCANURL: '"https://etherscan.io/"',
  APPROVED_NETWORK_ID: 1,
  contract,
  tgBot: '"LORDLESS_bot"'
}
