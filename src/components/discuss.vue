<template>
	<div>
		<div class="kf-curMy-kj-list">
        <div class="kf-curMy-kj-item" :class="{on: item.on}" v-for="(item, index) in discussList" :key="index" @click="goDetail(item)">
          <div class="kf-curMy-kj-left">
            <div class="kf-curMy-kj-cap">主题{{index+1}}</div>
            <div class="kf-curMy-kj-text">{{item.name}}</div>
          </div>
          <div class="kf-curMy-kj-right">
            <!--<div class="kf-curMy-kj-ico"></div>-->
            <div class="kf-curMy-kj-time">{{$fun.time_m(item.times)}}</div>
            <!--<div class="kf-curMy-kj-btn" v-if="item.times-item.upLookTime>5">{{item.on?"继续学习":"开始学习"}}</div>-->
            <!--<div class="kf-curMy-kj-btn" v-else>播放完成</div>-->
          </div>
        </div>
      </div>
      <div class="kf-listNot" v-if="!discussList.length">当前没有主题</div>
	</div>
</template>

<script>
	export default {
  data() {
    return {
      discussList:[]
    };
  },
  mounted() {
    this.get_discuss_list();
  },
  computed:{
  	"courseIds":function(){
  		return this.$route.params.courseId
  	},
  	"planId":function(){
  		return this.$route.params.planId
  	}
  },
  methods: {
    //获取课件列表
    get_discuss_list() {
      this.$api.curriculumLearning
        .get_discuss_list(this.planId,{
        	pageNum:1,
        	pageSize:1000
        })
        .then(res => {
        		this.discussList=res.data.pageList
        })
        .catch(res => {
          console.log(res);
        });
    },
    goDetail(item){
    	this.$router.push('/curriculumLearning/discussDetail/'+item.id+'/'+item.name)
    }

  }
  // //监听页面离开
  // beforeRouteLeave(to, from, next) {
  //   let myVideo = document.getElementById("myVideo");
  //
  //   if (this.video.type === 1) {
  //     console.log(123);
  //     this.savePlayTime(myVideo.currentTime);
  //   }
  //   next();
  // }
};
</script>

<style lang="less">
	.kf-curMy-kj-item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  &.on{
    .kf-curMy-kj-cap{
      color: #333333;
    }
    .kf-curMy-kj-text{
      color: #333333;
    }
  }
  &:hover{
    background-color: rgba(108,139,250,.3);
    padding-top: 15px;
    padding-bottom: 15px;
    border-radius: 10px;
    .kf-curMy-kj-cap{
      color: #333333;
    }
    .kf-curMy-kj-text{
      color: #333333;
    }
    .kf-curMy-kj-btn{
      display: block;
    }
    .kf-curMy-kj-ico{
      display: none;
    }
    .kf-curMy-kj-time{
      display: none;
    }
  }
}
</style>