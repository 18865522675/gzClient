<template>
  <div class="homeWrap">
  	<video :src="url" preload="auto" style="width:100%;height:500px" autoplay="autoplay"></video>
  </div>
</template>
<script>
export default {
  data() {
    return {
    	url:''
    };
  },
  components: {},
  mounted() {
 	this.url=sessionStorage.getItem("videoUrl");
 	console.log(this.url)
  },
  methods: {

  }
};
</script>
<style lang="less">
</style>
