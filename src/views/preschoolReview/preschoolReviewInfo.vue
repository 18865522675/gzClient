<template>
  <div class="g-module" style="padding-bottom: 60px;">
    <div class="kf-head">
      <div class="kf-head-cap">
        <b>入学复习</b>
        <small>PERSCHOOL REVIEW</small>
      </div>
    </div>
    <!--有内容-->
    <div class="kf-curMy-play" v-if="waresList.length">
      <video
        id="myVideo"
        class="kf-curMy-play-video"
        :src="video.src"
        controls>
      </video>
      <div class="kf-curMy-play-make" :style="{backgroundImage: 'url('+require('../../../public/static/background.png')+')'}" v-show="video.src === '无'||video.type===0"></div>
      <div class="kf-curMy-play-box" v-show="video.src === '无'||video.type === 0">
        <div class="kf-curMy-play-cap" v-show="video.type === 0">{{sign.courseName}}</div>
        <div class="kf-curMy-play-tit" v-show="video.type === 0">{{video.title}}</div>
        <div class="kf-curMy-play-btn" v-show="video.type === 0" @click="startLearning">开始学习</div>
        <div class="kf-curMy-play-tit" v-show="video.src === '无'">无</div>
      </div>
    </div>
    <!--无内容-->
    <div class="kf-curMy-play" v-else>
      <div class="kf-curMy-play-make" :style="{backgroundImage: 'url('+require('../../assets/img/ico_15.jpg')+')'}"></div>
      <div class="kf-curMy-play-box">
        <div class="kf-curMy-play-tit">暂无{{waresList.length?"":"课件"}}{{bookList.length?"":"、书籍"}} </div>
      </div>
    </div>
    <div class="kf-curMy-tab">
      <div class="kf-curMy-tab-item" :class="{on: tabInd==0}" @click="tab_change(0)" v-if="waresList.length">课件</div>
      <div class="kf-curMy-tab-item" :class="{on: tabInd==1}" @click="tab_change(1)" v-if="bookList.length">书籍</div>
    </div>
    <!--课件-->
    <div class="kf-curMy-bd" v-show="tabInd==0">
      <div class="kf-curMy-kj-list">
        <div class="kf-curMy-kj-item" :class="{on: item.on}" v-for="(item, index) in waresList" :key="index" @click="startPlay(item)">
          <div class="kf-curMy-kj-left">
            <div class="kf-curMy-kj-cap">第{{index+1}}讲</div>
            <div class="kf-curMy-kj-text">{{item.wareName}}</div>
          </div>
          <div class="kf-curMy-kj-right">
            <div class="kf-curMy-kj-ico"></div>
            <div class="kf-curMy-kj-time">{{$fun.time_m(item.times)}}</div>
            <div class="kf-curMy-kj-btn">{{item.on?"继续学习":"开始学习"}}</div>
          </div>
        </div>
      </div>
      <div class="kf-listNot" v-if="!waresList.length">当前没有课件</div>
    </div>
    <!--书籍-->
    <div class="kf-curMy-bd" v-show="tabInd==1" >
      <bookLook :headStatus="false" :planId="sign.planId" :courseId="sign.courseId" :getList.sync="bookList"/>
    </div>
  </div>
</template>

<script>
import bookLook from "../../components/bookLook";
import "../../assets/css/curriculumLearning.less";

export default {
  data() {
    return {
      rate: 3.7,
      courseId: "",
      tabInd: 0, // 0 课件，1 书籍，2 作业，3 留言，4 评价
      sign: {
        courseId: ""
      },
      video: {
        src: "",
        upLookTime: 0,
        title: "",
        type: 0 // 0 未播放，1 播放
      },
      watchForm: {
        wareId: "",
        playedTime: ""
      },
      waresList: [], //课件
      bookList: [] //书籍
    };
  },
  components: {
    bookLook
  },
  mounted() {
    this.sign = this.$route.params;

    console.log(this.sign);
    this.get_courseware_list();
  },
  methods: {
    tab_change(ind) {
      this.tabInd = ind;
    },
    //获取课件列表
    get_courseware_list() {
      this.$api.preschoolReview
        .get_pertutaor_ware_list({
          currentPage: 1,
          limitNum: 10000,
          courseId: this.sign.courseId
        })
        .then(res => {
          let lookItem = "";

          res.data.results
            ? (this.waresList = res.data.results)
            : (this.waresList = []);
          this.waresList.map(item => {
            item.on = item.upLookTime ? true : false;
            if (item.upLookTime) {
              lookItem = item;
            }
          });
          if (lookItem) {
            this.video.title = "最近学到：" + lookItem.wareName;
          } else {
            this.video.title = `未开始学习`;
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    startPlay(item) {
      let myVideo = document.getElementById("myVideo");

      //切换视频
      if (this.video.src) {
        this.savePlayTime(myVideo.currentTime);
      }

      //从指定时间开始播放
      if (item.upLookTime) {
        myVideo.currentTime = item.upLookTime;
        setTimeout(() => {
          myVideo.currentTime = item.upLookTime;
        }, 100);
      }

      item.on = true;
      this.video.img = item.logo;
      this.video.src = item.playUrl;
      this.watchForm.wareId = item.wareId;
      this.video.type = 1;

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
      console.log(this.video.src);
    },
    //开始学习
    startLearning() {
      let lookItem = "";

      this.waresList.map(item => {
        if (item.upLookTime) {
          lookItem = item;
        }
      });
      if (lookItem) {
        this.video.title = "最近学到：" + lookItem.wareName;
      } else {
        this.video.title = `未开始学习`;
        lookItem = this.waresList[0];
      }
      this.startPlay(lookItem);
    },
    //保存播放事件
    savePlayTime(playedTime) {
      playedTime = parseInt(playedTime);
      if (playedTime) {
        this.watchForm.playedTime = playedTime;
        this.$api.preschoolReview
          .saveTime(this.watchForm)
          .then(() => {})
          .catch(res => {
            console.log(res);
          });
      }
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
