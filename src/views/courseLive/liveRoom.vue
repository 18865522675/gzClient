<template>
  <div class="lr-main">
    <div class="lr-header">
      <div class="lr-header-lf">
        <div class="lr-lf-top">{{info.course?info.course:"无"}}</div>
        <div class="lr-lf-bt">{{info.content?info.content:"无"}}</div>
      </div>
      <div class="lr-header-rt" @click="goDetail">课程详情</div>
    </div>
    <div class="lr-con">
      <div class="lr-con-lf">
        <div class="lr-video">
          <video id="myVideo"
                 class="lr-play-video"
                   :src="video.src"
                 v-show="video.type"
                 controls>
          </video>
          <div v-show="!video.type">
            <div class="lr-play-make" :style="{backgroundImage: 'url(\''+(info.coverUrl?info.coverUrl:require('../../assets/img/home_course_img.png'))+'\')'}"></div>
            <div class="lr-play-box">
              <!--<div class="lr-play-cap">{{info.course?info.course:"无"}}</div>-->
              <!--<div class="lr-play-tit">{{info.title?info.title:"无"}}</div>-->
              <div class="lr-play-btn" @click="startLearning">{{info.playbackUrl?"开始学习":"暂无直播"}}</div>
            </div>
          </div>
          <!--<div class="lr-maskLayer"><div class="lr-msg"><div class="lr-msg-btn">直播未开始</div><div class="lr-msg-text">开播时间：07.10 20:00-21:00</div></div></div>-->
        </div>
        <div class="lr-tea">
          <div class="lr-tea-headImg"></div>
          <div class="lr-tea-con">
            <div class="lr-tea-tit">{{"讲师："+(info.teacher?info.teacher:"无")}}</div>
            <div class="lr-tea-cr">{{info.course?info.course:"无"}}</div>
          </div>
          <div class="lr-viewCount">{{info.viewCount}}</div>

        </div>
      </div>
      <div class="lr-live-more">
        <!--<div-->
          <!--class="lr-more-item m-h"-->
          <!--v-for="(item, index) in list"-->
          <!--:key="index"-->
          <!--:style="{backgroundImage: 'url('+item.coverUrl+')'}"-->
          <!--@click="itemClick(item)">-->
          <!--<div class="live-item-tit">{{item.title}}</div>-->
        <!--</div>-->
        <div class="cl-ol-con">
          <div class="cl-ol-item" v-for="(item, index) in list" :key="index">{{index+1}}.  {{item.title}}</div>

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
        type: 0 // 0 未播放，1 播放
      },
      info: {},
      list: [],
      sign: {
        id: ""
      }
    };
  },
  mounted() {
    this.sign = this.$route.params;
    this.getInfo();
    this.getList();
  },
  methods: {
    //获取课程直播
    getInfo() {
      this.$api.courseLive.courseLive({ id: this.sign.id }).then(res => {
        this.info = res.data;
      });
    },
    //获取回放列表
    getList() {
      this.$api.courseLive.playback({ id: this.sign.courseId }).then(res => {
        this.list = res.data;
      });
    },
    //查看详情
    goDetail() {
      this.$router.push(
        `/courseLive/courseDetail/${this.$route.params.courseId}`
      );
    },
    //开始学习
    startLearning() {
      this.startPlay();
    },
    itemClick(row) {
      this.info = row;
      this.startPlay();
    },
    //播放视频
    startPlay() {
      let myVideo = document.getElementById("myVideo");

      //缓存成功
      myVideo.oncanplay = () => {
        myVideo.play();
      };

      this.video = {
        src: this.info.playbackUrl,
        type: 1 // 0 未播放，1 播放
      };
    }
  }
};
</script>

<style scoped>
</style>
