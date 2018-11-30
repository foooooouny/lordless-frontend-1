<template>
  <div class="mobile-tavern-detail">
    <ldb-detail ref="ldbDetail" theme="light" @tClose="tCloseHandle"/>
  </div>
</template>

<script>
import LdbDetail from '@/components/content/ldb/detail'
export default {
  data: () => {
    return {}
  },
  components: {
    LdbDetail
  },
  methods: {
    tCloseHandle () {
      if (history.length) {
        history.go(-1)
      } else {
        this.$router.push('/market')
      }
    }
  },
  mounted () {
    const { tavernId } = this.$route.params
    this.$nextTick(() => this.$refs.ldbDetail.init(tavernId))
  }
}
</script>

