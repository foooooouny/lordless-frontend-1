<template>
  <div class="carousel-box" :class="{ 'shadow': shadow }">
    <div class="d-flex carousel-container">
      <div class="v-flex carousel-content">
        <div class="carousel-loop-box">
          <div v-if="loading" class="d-flex f-auto-center carousel-no-records">
            <span>has loading records...</span>
            <span class="inline-block line-height-0 mar-l1" style="font-size: 24px;">
              <i class="el-icon-loading"></i>
            </span>
          </div>
          <transition name="ld-hide-in-fade">
            <div v-if="!txs.length && !loading" class="d-flex f-auto-center carousel-no-records">There has no records</div>
          </transition>
          <transition name="ld-hide-in-fade">
            <div v-show="txs.length && !loading">
              <div
                v-for="(tx, index) of txs"
                :key="index"
                class="d-flex f-align-center text-nowrap carousel-loop-item"
                :class="{ 'animation is-active': index === 0 }">
                <div class="v-flex d-flex f-justify-center sm-hidden">
                  <span class="inline-block lg-mar-r1">
                    <svg>
                      <use xlink:href="#icon-hourglass"/>
                    </svg>
                  </span>
                  <span class="d-inline-flex col-flex f-justify-center loop-item-text">
                    <span class="inline-block">transactions</span>
                    <span class="inline-block">{{ tx.market[0].txEndAt | timeFormat }}</span>
                  </span>
                </div>
                <div class="v-flex d-flex f-justify-center text-ellipsis">
                  <span class="inline-block lg-mar-r1 sm-hidden">
                    <svg>
                      <use xlink:href="#icon-tx"/>
                    </svg>
                  </span>
                  <span class="d-inline-flex col-flex f-justify-center loop-item-text">
                    <span class="inline-block">Address</span>
                    <span class="inline-block">{{ tx.tx.transactionHash | splitAddress({ before: 7, end: 5 }) }}</span>
                  </span>
                </div>
                <div class="v-flex d-flex f-justify-center text-ellipsis">
                  <span class="inline-block lg-mar-r1 sm-hidden">
                    <svg>
                      <use xlink:href="#icon-price"/>
                    </svg>
                  </span>
                  <span class="d-inline-flex col-flex f-justify-center loop-item-text">
                    <span class="inline-block">Price</span>
                    <span class="inline-block">{{ tx.market[0].price | weiToEth }} ETH</span>
                  </span>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class="d-flex f-align-center carousel-logo color-main" @click.stop="logoEvt">
        <span class="block">
          <svg>
            <use xlink:href="#icon-marketplace"/>
          </svg>
        </span>
        <span class="block sm-hidden"> Marketplace</span>
      </div>
    </div>
  </div>
</template>

<script>
import { hasClass, addClass, removeClass, hasContent } from 'utils/tool'
import { getRecords } from 'api'
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    dulation: {
      type: Number,
      default: 5000
    },
    direction: {
      type: Number,
      default: 1
    },
    shadow: {
      type: Boolean,
      default: true
    }
  },
  data: () => {
    return {
      loopInstance: null,
      // timeoutTx: null,
      loading: true,
      loop: true,
      loopStart: false,
      txs: []
    }
  },
  methods: {

    async getTxs () {
      const res = await getRecords({ pn: 1, ps: 10 })
      if (res.code === 1000) {
        this.txs = res.data.list
        return res.data.list
      }
      return []
    },

    loopTxs () {
      let timeoutTx
      const func = () => {
        timeoutTx = setTimeout(() => {
          if (!this.loopStart) this.initLoop()
          else this.getTxs()
          func()
        }, 15000)
      }
      this.$once('hook:beforeDestroy', () => {
        clearTimeout(timeoutTx)
        timeoutTx = null
      })
    },

    /**
     * 初始化循环
     */
    async initLoop () {
      const txs = await this.getTxs()
      console.log('initLoop txs', txs)
      if (txs.length < 3) return
      this.loopStart = true
      const height = document.querySelector('.carousel-loop-box').offsetHeight
      const loops = document.querySelectorAll('.carousel-loop-item')

      let aIndex = 0
      for (let i = 0; i < loops.length; i++) {
        if (hasClass('is-active', loops[i])) {
          aIndex = i
          break
        }
      }
      addClass('is-prev', loops[loops.length - 1])
      addClass('is-next', loops[aIndex + 1])

      this.initTransform(height, aIndex)
      this.loopFunc(height)
      this.boxMouseEvt()
    },

    /**
     * 初始化
     */
    async init () {
      this.loading = true
      await this.initLoop()
      // this.loopTxs()
      this.loading = false
    },

    /**
     * 改变 dom transform 值
     */
    initTransform (height, aIndex = 0) {
      const items = document.querySelectorAll('.carousel-loop-item')
      const direction = this.direction
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (hasClass('is-next', item)) {
          item.style = `transform: translateY(${height * direction}px)`
        } else if (hasClass('is-prev', item)) {
          item.style = `transform: translateY(${-height * direction}px)`
        } else {
          item.style = `transform: translateY(${(i - aIndex) * height * direction}px)`
        }
      }
    },

    /**
     * 改变dom状态
     */
    change (height) {
      if (!this.loop) return
      const items = document.querySelectorAll('.carousel-loop-item')
      const classes = Array.from(items).map(item => item.className)
      let aIndex = 0
      for (let i = 0; i < items.length; i++) {
        const itemClass = classes[i]
        const item = items[i]
        if (hasContent('is-next', itemClass)) {
          removeClass('is-next', item)
          addClass('animating', item)
          addClass('is-active', item)
          addClass('is-next', items[i + 1] || items[0])
          aIndex = i
        } else if (hasContent('is-active', itemClass)) {
          removeClass('is-active', item)
          addClass('is-prev', item)
        } else if (hasContent('is-prev', itemClass)) {
          removeClass('animating', item)
          removeClass('is-prev', item)
        }
      }
      this.initTransform(height, aIndex)
    },

    /**
     * 循环执行
     */
    loopFunc (height) {
      let instance
      const func = () => {
        if (instance) instance = this.clearLoop(instance)
        instance = setTimeout(() => {
          this.clearLoop(instance)
          this.change(height)
          return func()
        }, this.dulation)
        return instance
      }
      func()
      this.loopInstance = instance
    },

    /**
     * carousel box 鼠标事件
     */
    boxMouseEvt () {
      const loopBox = document.querySelector('.carousel-loop-box')
      const toggleLoop = (loop = this.loop) => {
        return () => {
          this.loop = !loop
        }
      }
      loopBox.addEventListener('mouseenter', toggleLoop(true))
      loopBox.addEventListener('mouseleave', toggleLoop(false))
    },

    /**
     * carousel logo 点击事件
     */
    logoEvt () {
      this.$emit('logoEvt')
    },

    clearLoop (loop = this.loopInstance) {
      if (loop) {
        clearTimeout(loop)
        loop = null
        this.loopInstance = null
      }
      return null
    }
  },
  beforeDestroy () {
    this.clearLoop()
  }
}
</script>

<style lang="scss" scoped>

  .carousel-box {
    position: relative;
    width: inherit;
    height: inherit;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
    &.shadow {
      box-shadow: 2.5px 5px 20px 0 rgba(0, 0, 0, .25);
    }
    // @include padding(-1, 20px, 1);
  }
  .carousel-container {

  }
  .carousel-content {
    @include padding('left', 20px, 1, -2);
  }
  .carousel-loop-box {
    position: relative;
    height: 100px;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #fff;
    @include height(100px, 1.25);
    // @include padding-around(15px, 0, 15px, 0, 1);
  }
  .carousel-no-records {
    height: 100%;
    font-size: 18px;
  }
  .carousel-loop-item {
    font-size: 16px;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: inherit;
    svg {
      width: 50px;
      height: 50px;
    }
    &.animating {
      transition: transform .35s ease-in-out;
    }
    &.is-active {
      z-index: 2;
    }
  }
  .loop-item-text {
    >span {
      &:not(:first-of-type) {
        margin-top: 8px;
      }
    }
  }
  .carousel-logo {
    padding: 0 20px;
    position: relative;
    color: $--map-blue-pink-color;
    cursor: pointer;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 20%;
      width: 1px;
      height: 60%;
      background-color: #ccc;
    }
    svg {
      width: 40px;
      height: 40px;
      fill: $--map-blue-pink-color;
    }
  }
</style>
