<template>
  <div class="g-module" style="padding-bottom: 60px;">
    <div class="kf-head">
      <div class="kf-head-cap">
        <b>课程学习</b>
        <small>COURSE STUDY</small>
      </div>
    </div>
    <!--有内容-->
    <!--<div class="kf-curMy-play" v-if="waresList.length">
      <video
        id="myVideo"
        class="kf-curMy-play-video"
        :src="video.src"
        controls>
      </video>
      <div class="kf-curMy-play-make" :style="{backgroundImage: 'url('+require('../../../public/static/background.png')+')'}" v-show="video.type===0"></div>
      <div class="kf-curMy-play-box" v-show="video.type === 0">
        <div class="kf-curMy-play-cap">{{sign.courseName}}</div>
        <div class="kf-curMy-play-tit">{{video.title}}</div>
      </div>
    </div>-->



    <!--<div class="kf-curMy-play" v-else>
      <div class="kf-curMy-play-make" :style="{backgroundImage: 'url('+require('../../assets/img/ico_15.jpg')+')'}"></div>
      <div class="kf-curMy-play-box">
        <div class="kf-curMy-play-tit">暂无{{waresList.length?"":"课件"}}{{bookList.length?"":"、书籍"}} </div>
      </div>
    </div>-->
    <div class="kf-curMy-tab">
      <div class="kf-curMy-tab-item" :class="{on: showTab==0}" @click="tab_change(0)" >课件</div>
      <div class="kf-curMy-tab-item" :class="{on: showTab==1}" @click="tab_change(1)">书籍</div>
      <div class="kf-curMy-tab-item" :class="{on: showTab==2}" @click="tab_change(2)">作业</div>
      <!--<div class="kf-curMy-tab-item" :class="{on: showTab==3}" @click="tab_change(3)">留言</div>-->
      <!--<div class="kf-curMy-tab-item" :class="{on: showTab==4}" @click="tab_change(4)">评价</div>-->
       <div class="kf-curMy-tab-item" :class="{on: showTab==5}" @click="tab_change(5)">主题讨论</div>
        <div class="kf-curMy-tab-item" :class="{on: showTab==6}" @click="tab_change(6)">问答</div>
    </div>
    <!--课件-->
    <div class="kf-curMy-bd" v-if="showTab==0">
      <div class="kf-curMy-kj-list">
        <div class="kf-curMy-kj-item" :class="{on: item.on}" v-for="(item, index) in waresList" :key="index" @click="startPlay(item)">
          <div class="kf-curMy-kj-left">
            <div class="kf-curMy-kj-cap">第{{index+1}}讲</div>
            <div class="kf-curMy-kj-text">{{item.name}}</div>
          </div>
          <div class="kf-curMy-kj-right">
            <div class="kf-curMy-kj-ico"></div>
            <div class="kf-curMy-kj-time">{{$fun.time_m(item.times)}}</div>
            <div class="kf-curMy-kj-btn" v-if="item.times-item.upLookTime>5">{{item.on?"继续学习":"开始学习"}}</div>
            <div class="kf-curMy-kj-btn" v-else>播放完成</div>
          </div>
        </div>
      </div>
      <div class="kf-listNot" v-if="!waresList.length">当前没有课件</div>
    </div>
    <!--书籍-->
    <div class="kf-curMy-bd" v-if="showTab==1" >
      <bookLook :headStatus="false" :planId="sign.planId" :courseId="courseIds" :getList.sync="bookList"/>
    </div>
    <!--作业-->
    <div class="kf-curMy-bd" v-if="showTab==2">
      <task :planId="sign.planId" :getList.sync="worksList"></task>
    </div>
    <!--留言-->
    <div class="kf-curMy-bd" v-if="showTab==3">
      <!--<leavingMessage :planId="sign.planId" :getList.sync="questionList"></leavingMessage>-->
    </div>
    <!--评价-->
    <!--<div class="kf-curMy-bd" v-if="showTab==4">
   		<evaluate :wareCourseId="sign.wareCourseId" :planId="sign.planId" :getList.sync="starsList"></evaluate>
    </div>-->
     <div class="kf-curMy-bd" v-if="showTab==5">
     	<discuss></discuss>
      <!--<evaluate :wareCourseId="sign.wareCourseId" :planId="sign.planId" :getList.sync="starsList"></evaluate>-->
    </div>
     <div class="kf-curMy-bd" v-if="showTab==6">
     	<aq></aq>
      <!--<evaluate :wareCourseId="sign.wareCourseId" :planId="sign.planId" :getList.sync="starsList"></evaluate>-->
    </div>
  </div>
</template>

<script>
import bookLook from "../../components/bookLook";
import discuss from "../../components/discuss";
import task from "../../components/task";
import leavingMessage from "../../components/leavingMessage";
import evaluate from "../../components/evaluate";
import aq from "../../components/aq";
import "../../assets/css/curriculumLearning.less";

export default {
  data() {
    return {
      rate: 3.7,
      courseId: "",
      sign: {
        planId: "",
        wareCourseId: "",
        courseName: "",
        tabInd: 0 // 0 课件，1 书籍，2 作业，3 留言，4 评价
      },
      video: {
        src: "",
        upLookTime: 0,
        title: "",
        type: 0 // 0 未播放，1 播放
      },
      watchForm: {
        id: "",
        planId: "",
        wareId: "",
        wareTimes: "",
        playedTime: ""
      },
      waresList: [], //课件
      bookList: [], //书籍
      worksList: [], //作业
      questionList: [], //留言
      starsList: [], //评价
      showTab:0
    };
  },
  components: {
    bookLook,
    task,
    leavingMessage,
    evaluate,
    discuss,
    aq
  },
  mounted() {
    this.sign = this.$route.params;
    this.sign.tabInd=0	
//		console.log(this.sign)
//  this.watchForm.id = this.sign.wareCourseId;
//  this.watchForm.planId = this.sign.planId;
    this.get_courseware_list();
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
    tab_change(ind) {
      this.showTab = ind;
    },
    //获取课件列表
    get_courseware_list() {
      this.$api.curriculumLearning
        .get_courseware_list(this.courseIds)
        .then(res => {
          let lookItem = "";

          res.data
            ? (this.waresList = res.data)
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
    	sessionStorage.setItem("videoUrl",item.url);
//  	this.$api.curriculumLearning.add_ware_point(this.courseIds,{
//  		planId:this.planId
//  	}).then(()=>{
//	this.$router.push('/curriculumLearning/seeVideo');
//  	})
		
		this.$router.push(`/curriculumLearning/seeVideo/${item.id}/${this.planId}`);
    	
//    let myVideo = document.getElementById("myVideo");
//
//    //切换视频
//    if (this.video.src) {
//      this.savePlayTime(myVideo.currentTime);
//    }
//
//    item.on = true;
//    this.video.img = item.logo;
//    this.video.src = item.url;
//    this.watchForm.wareId = item.wareId;
//    this.watchForm.wareTimes = item.times;
//    this.video.type = 1;
//
//    //从指定时间开始播放
//    if (item.upLookTime) {
//      myVideo.currentTime = item.upLookTime;
//      setTimeout(() => {
//        myVideo.currentTime = item.upLookTime;
//      }, 100);
//    }
//    //缓存成功
//    myVideo.oncanplay = () => {
//      myVideo.play();
//    };
//    //暂停
//    myVideo.onpause = () => {
//      this.savePlayTime(myVideo.currentTime);
//    };
//    //播放结束
//    myVideo.onended = () => {
//      this.savePlayTime(myVideo.currentTime);
//    };
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
        this.$api.curriculumLearning
          .savePlayTime(this.watchForm)
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
