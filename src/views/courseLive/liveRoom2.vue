<template>
  <div class="lr-main">
    <div class="lr-header">
      <div class="lr-header-lf">
        <div class="lr-lf-top">{{list.course?list.course:"无"}}</div>
        <div class="lr-lf-bt">{{list.content?list.content:"无"}}</div>
      </div>
      <div class="lr-header-rt" @click="goDetail">课程详情</div>
    </div>
    <div class="lr-con">
      <div class="lr-con-lf">
        <div class="lr-video"  :style="{backgroundImage: 'url('+list.coverUrl+')'}">
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
          <!--<div class="lr-maskLayer"><div class="lr-msg"><div class="lr-msg-btn">直播未开始</div><div class="lr-msg-text">开播时间：07.10 20:00-21:00</div></div></div>-->
        </div>
        <div class="lr-tea">
          <div class="lr-tea-headImg"></div>
          <div class="lr-tea-con">
            <div class="lr-tea-tit">{{"讲师："+list.teacher?list.teacher:"无"}}</div>
            <div class="lr-tea-cr">{{list.course?list.course:"无"}}</div>
          </div>
          <div class="lr-viewCount">{{list.viewCount}}</div>

        </div>
      </div>
      <div class="lr-live-more">
        <div class="lr-more-item" v-for="(item, index) in playbackList" :key="index">
          <div class="live-item-tit">{{item.title}}</div>
        </div>
        <div class="lr-more-item">
          <div class="live-item-tit">第1讲：静物摄影理论</div>
        </div>


      </div>
      <!--<div class="lr-con-rt">-->
        <!--<div class="lr-rt-record"></div>-->
        <!--<div class="lr-rt-editor">-->
          <!--<el-input type="textarea" :rows="2" placeholder="我要发言……"></el-input>-->
          <!--<el-button type="text" class="lr-rt-btn">发布</el-button>-->
        <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
import "../../assets/css/courseLive.less";
export default {
  data() {
    return {
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
      id: this.$router.history.current.params.id,
      ableStatus: null,
      ablePlay: true,
      learnBtn: null
    };
  },
  mounted() {
    this.getList();
    this.getPlayBack();
  },
  methods: {
    //获取课程直播
    getList() {
      this.$api.courseLive.courseLive({ id: this.id }).then(res => {
        this.list = res.data;
        if (res.data === null) {
          this.learnBtn = 0;
          return;
        } else {
          this.learnBtn = 1;
        }
        this.ableStatus = res.data.ableStatus;
        this.video = {
          src: this.list.playUrl,
          upLookTime: 0,
          title: this.list.title,
          img: this.list.coverUrl,
          type: 0 // 0 未播放，1 播放
        };
        console.log(this.video.img);
      });
    },
    //获取回放列表
    getPlayBack() {
      this.$api.courseLive.playback({ id: this.id }).then(res => {
        this.playbackList = res.data;
        console.log(this.playbackList);
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
