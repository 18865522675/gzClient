<template>
  <div class="lr-main">
    <div class="lr-header">
      <div class="lr-header-lf">
        <div class="lr-lf-top">马克思主义基本原理概论</div>
        <div class="lr-lf-bt">马克思主义基本原理概论核心思想</div>
      </div>
      <div class="lr-header-rt">课程详情</div>
    </div>
    <div class="lr-con pb-bg">
      <div class="lr-con-lf">
        <div class="lr-video">
          <video id="myVideo"
                 class="lr-play-video"
                 :src="video.src"
                 controls>

          </video>
          <div class="lr-play-make" :style="{backgroundImage: 'url('+(video.img?video.img:require('../../assets/img/home_course_img.png'))+')'}" v-show="ablePlay"></div>
          <div class="lr-play-box" v-show="ablePlay">
            <div class="lr-play-cap">{{list.course?list.course:"无"}}</div>
            <div class="lr-play-tit">{{list.title?list.title:"无"}}</div>
            <div class="lr-play-btn" @click="startLearning">{{learnBtn?"开始学习":"暂无直播"}}</div>
          </div>
        </div>
        <div class="lr-tea">
          <div class="lr-tea-headImg"></div>
          <div class="lr-tea-con">
            <div class="lr-tea-tit">讲师：李校瑾  </div>
            <div class="lr-tea-cr">马克思主义基本原理概论核心思想</div>
          </div>
          <div class="lr-tea-num">8653</div>
        </div>
      </div>
      <div class="lr-con-rt pb-rt pb-bg">
        <div class="lr-rt-item"> <div class="lr-topTag">回放</div>1.马克思主义基本原理概论</div>
        <div class="lr-rt-item pb-on"> <div class="lr-topTag tag-on">回放</div>1.马克思主义基本原理概论</div>
        <div class="lr-rt-item"> <div class="lr-topTag">回放</div>1.马克思主义基本原理概论</div>
        <div class="lr-rt-item"> <div class="lr-topTag">回放</div>1.马克思主义基本原理概论</div>
        <div class="lr-rt-item"> <div class="lr-topTag">回放</div>1.马克思主义基本原理概论</div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/css/courseLive.less";
export default {
  data() {
    return {
      id: this.$route.params.id,
      video: {
        src: "",
        upLookTime: 0,
        title: "",
        img: "",
        type: 0 // 0 未播放，1 播放
      },
      sign: {
        planId: "",
        wareCourseId: "",
        courseName: "",
        tabInd: 0 // 0 课件，1 书籍，2 作业，3 留言，4 评价
      },
      list: {},
      playbackList: [],
      ableStatus: null,
      ablePlay: true,
      learnBtn: null
    };
  },
  mounted() {
    console.log(this.$route.params.id);
    this.getPlayBackList();
  },
  methods: {
    getPlayBackList() {
      this.$api.courseLive.playback({ id: this.id }).then(res => {
        this.backList = res.data;
      });
    },
    goDetail() {
      this.$router.push(`/courseLive/courseDetail/${this.id}`);
    },
    //开始学习
    startLearning() {
      this.ablePlay = false;
      if (this.learnBtn === 1) {
        this.startPlay();
      } else {
        alert("无对应视频");
      }
    },
    //播放视频
    startPlay() {
      let myVideo = document.getElementById("myVideo");

      //缓存成功
      myVideo.oncanplay = () => {
        myVideo.play();
      };
      //暂停
      myVideo.onpause = () => {
        this.savePlayTime(myVideo.currentTime);
      };
      //播放结束
      myVideo.onended = () => {
        this.savePlayTime(myVideo.currentTime);
      };
    },
    //保存播放事件
    savePlayTime(playedTime) {
      playedTime = parseInt(playedTime);
      if (playedTime) {
        this.watchForm.playedTime = playedTime;
        this.$api.curriculumLearning
          .savePlayTime(this.watchForm)
          .then(() => {})
          .catch(res => {
            console.log(res);
          });
      }
    }
  }
};
</script>

<style scoped>
</style>
