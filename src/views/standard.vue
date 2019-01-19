<template>
    <div class="hk_standard_wrap">
        <img src="../assets/img/hk.png" alt="" class="hk_standard_img" v-if="isPc()">
        <img src="../assets/img/hkApp.png" alt="" class="hk_standard_img" v-else>
    </div>
</template>

<script>
export default {
  name: "standard",
  methods: {
    isPc() {
      var userAgentInfo = navigator.userAgent;
      var Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      ];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    }
  },
  mounted() {
      console.log(this.isPc())
  },
  created() {},
  updated() {},
  watch: {}
};
</script>

<style scoped lang="less">
.hk_standard_wrap {
  height: 100vh;
  .hk_standard_img {
    width: 100%;
    display: block;
    height: 100vh;
  }
}
</style>
