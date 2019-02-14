<template>
  <div class="videoWrap">
  	<video :src="url" preload="auto" controls="controls" style="width:100%;height:500px" autoplay="autoplay"></video>
  </div>
</template>
<script>
export default {
  data() {
    return {
    	url:'',
    	wareId:"",
    	planId:''
    };
  },
  components: {},
  mounted() {
 	this.url=sessionStorage.getItem("videoUrl");
	this.wareId=this.$route.params.wareId;
	this.planId=this.$route.params.planId;
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
  destroyed(){
  	console.log(this.wareId)
	this.$api.curriculumLearning.save_wareTime(this.wareId,{
		planId:this.planId,
		position:20
	}).then(()=>{
		
	})
  }
};
</script>
<style lang="less">
	.videoWrap{
		background: black;
	}
</style>
