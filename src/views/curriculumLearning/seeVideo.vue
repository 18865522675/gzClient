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
  computed:{
  	"planId":function(){
  		return this.$route.params.planId
  	},
  	"wareId":function(){
  		return this.$route.params.wareId
  	}
  },
  methods: {

  },
  beforeDestroy(){
	this.$api.curriculumLearning.save_wareTime(this.wareId,{
		planId:this.planId,
		position:20
	}).then(()=>{
		
	})
  }
};
</script>
<style lang="less">
</style>
