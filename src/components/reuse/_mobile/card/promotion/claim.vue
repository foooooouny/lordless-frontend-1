<template>
  <div class="promotion-claim-box">
    <div class="promotion-claim-left">
      <p class="d-flex f-align-center f-justify-between">
        <span>{{ '32,163,956' }}&nbsp;dropping</span>
        <span class="promotion-left-num">3,956&nbsp;&nbsp;left</span>
      </p>
      <div class="promotion-progress-bar">
        <lordless-progress
          :current="3931256"
          :max="32162956"
          :underColor="progress.underColor"
          :gradient="progress.gradient"/>
      </div>
    </div>
    <div class="d-flex f-align-center promotion-claim-candy">
      <!-- <p class="v-flex d-flex f-align-center">
        <span class="inline-block line-height-0 home-candy-icon promotion-candy-coin">
          <svg>
            <use xlink:href="#coin-less"/>
          </svg>
        </span>
        <span class="inline-block">LESS</span>
      </p> -->
      <p class="TTFontBolder v-flex d-flex f-justify-start promotion-claim-num">
        <span class="inline-block">+ 10</span>
        <span class="inline-block text-upper promotion-claim-symbol">LESS</span>
      </p>
      <lordless-btn class="TTFontBold promotion-claim-btn" theme="promotion" inverse @click="claimPromotion">Claim now</lordless-btn>
    </div>
    <lordless-authorize
      ref="authorize"
      @blurs="dialogSetBlurs($event, metamaskChoose ? 1 : 0)"/>
  </div>
</template>

<script>
import { metamaskMixins, dialogMixins } from '@/mixins'
import { mapState } from 'vuex'
export default {
  name: 'promotion-claim-card',
  mixins: [metamaskMixins, dialogMixins],
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data: () => {
    return {
      progress: {
        underColor: '#ddd',
        gradient: {
          direction: '-45deg',
          start: '#F5515F',
          end: '#9F041B'
        }
      }
    }
  },
  computed: {
    ...mapState('contract', [
      'Airdrop'
    ]),
    ...mapState('web3', [
      'web3Opt'
    ])
  },
  methods: {
    async claimPromotion (info = this.info, Airdrop = this.Airdrop, web3Opt = this.web3Opt) {
      console.log('claimPromotion')
      let pId = ''
      try {
        // 检查市场权限
        const authorize = this.$refs.authorize.checkoutAuthorize({ guide: true })

        if (!authorize) return

        pId = (await Airdrop.methods('getAirdropIds') || [])[0]

        if (!pId) return

        this.metamaskChoose = true

        const { gasPrice, address } = web3Opt

        // 传输的合约参数
        const claimParams = {
          name: 'claim',
          values: [ pId ]
        }

        // 估算 gas
        // const gas = await NFTsCrowdsale.payByEth.estimateGas(tokenId)
        const gas = (await Airdrop.estimateGas(claimParams.name, claimParams.values)) || 100000

        console.log('--- gas', gas, gasPrice)
        // 根据链上信息 claim 糖果
        const params = {
          gas,
          gasPrice,
          data: Airdrop.claim.getData(pId),
          // memo: 'buy a tavern by lordless',
          // feeCustomizable: true,
          to: Airdrop.address,
          from: address
        }

        // Airdrop.methods(claimParams.name, claimParams.values.concat([{ gas, gasPrice }]))
        //   .then(tx => {
        //     console.log('----- buyHandle tx', tx)
        //     // this.buyPending = true
        //     this.metamaskChoose = false

        //     this.checkTxEvent({ tx, action: claimParams.name, pId }, () => {
        //       this.$router.push('/owner/activity')
        //     })
        //   })
        //   .catch((err) => {
        //     console.log('err', err)
        //     this.metamaskChoose = false
        //   })

        // 使用自有封装对象
        window.lordlessMethods.buy(params).then(tx => {
          console.log('----- claimHandle tx', tx)
          // this.buyPending = true
          this.metamaskChoose = false

          this.checkTxEvent({ tx, action: claimParams.name, pId: info._id }, () => {
            // this.$router.push('/owner/activity')
          })
        })
          .catch((err) => {
            console.log('err', err)
            this.metamaskChoose = false
          })
      } catch (err) {
        this.$notify.error({
          title: 'Error!',
          message: err.message || 'unknow error',
          position: 'bottom-right',
          duration: 3500
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .promotion-claim-left {
    font-size: 16px;
    color: #777;
  }
  .promotion-progress-bar {
    margin-top: 6px;
    height: 28px;
    border-radius: 5px;
    overflow: hidden;
  }
  .promotion-claim-candy {
    margin-top: 20px;
    font-size: 16px;
    color: #777;
  }
  .promotion-left-num {
    // color: #EB8785;
  }
  .promotion-claim-num {
    font-size: 24px;
    color: #F5515F;
  }
  .promotion-claim-symbol {
    margin-left: 3px;
    font-size: 16px;
  }
  // .promotion-candy-coin {
  //   margin-right: 6px;
  //   padding: 6px;
  //   width: 29px;
  //   height: 29px;
  //   border-radius: 100%;
  //   box-sizing: border-box;
  //   background-image: linear-gradient(-45deg, #00C0EB 0%, #0079FF 100%);
  //   fill: #fff;
  // }
  .promotion-claim-btn {
    padding: 8px 14px;
    font-size: 14px;
    border: none;
  }
</style>
