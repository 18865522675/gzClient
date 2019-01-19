<template>
    <div class="commonCourseCata">
        <!--未播放状态-->
        <div class="commonCourseCata-video" v-if="!videoUrl">
            <div class="commonCourseCata-video-shade">
                <div class="commonCourseCata-video-courseName">{{$route.params.courseName}}</div>
                <!--第一次学习-->
                <div>
                    <div class="commonCourseCata-video-startstudy" @click="playVideo(wareList[0],true)">开始学习</div>
                    <div class="commonCourseCata-video-beginstudy">未开始学习</div>
                </div>
            </div>

            <!--<div class="commonCourseCata-video-shade">-->
            <!--视频链接失效啦！！！！-->
            <!--</div>-->
        </div>
        <!--已播放状态-->
        <div class="hk-video-wrap" v-else>
            <video :src="videoUrl" ref="hkVideo" id="hkVideo"  controls="controls"  @loadstart="loadMethod" @error="errorMethod"  class="hk-ware-video"  v-show="videoCanUse"></video>
            <div class="videoNoUse" v-show="!videoCanUse">
                很抱歉，您访问的视频连接失效了
            </div>
            <div class="commonCourseCata-autoPlay">
                <span>自动播放</span>
                <el-switch
                  v-model="autoPlay"
                  active-color="#13ce66"
                  @change="autoPlayChange">
                </el-switch>
            </div>
        </div>
        <div class="commonCourseCata-content">
            <ul  class="commonCourseCata-content-header">
                <li :class="typeList ==1?'commonCourseCata-content-header-items-active':'commonCourseCata-content-header-items'" @click="msgList(1)">目录</li>
                <!--<li :class="typeList ==2?'commonCourseCata-content-header-items-active':'commonCourseCata-content-header-items'" @click="msgList(2)">习题</li>-->
                <!--<li :class="typeList ==3?'commonCourseCata-content-header-items-active':'commonCourseCata-content-header-items'" @click="msgList(3)">笔记</li>-->
                <!--<li :class="typeList ==4?'commonCourseCata-content-header-items-active':'commonCourseCata-content-header-items'" @click="msgList(4)">留言</li>-->
            </ul>
            <!--教师目录-->
            <ul class="commonCourseCata-content-cata" v-show="show1" v-if="typeList ==1">
                <li class="commonCourseCata-content-cata-one" v-for="(item,index) in wareList" :key="index" @mouseover="wareItemAction(index,true)" @mouseout="wareItemAction(index,false)">
                    <div class="commonCourseCata-content-cata-one-left">
                        <span class="commonCourseCata-content-cata-one-round"></span>
                        <span class="commonCourseCata-content-cata-one-title">{{item.name}}</span>
                    </div>
                    <div class="commonCourseCata-content-cata-one-time">
                        <span class="commonCourseCata-content-cata-one-timeplay" v-if="item.id==nowVideoId">
                            <span  class="playingGif">
                                <img src="../../assets/img/playing.gif" style="width:100%;height:100%"  alt="" >
                            </span>
                        </span>
                        <div v-else>
                            <!--未划过-->
                            <div  v-show="!item.isShowSee">
                            <span class="commonCourseCata-content-cata-one-timeplay">
                            <img src="../../assets/img/common_course_cata_play.png" alt=""
                                 class="commonCourseCata-content-cata-one-timeplay-img">
                        </span>
                                <span class="commonCourseCata-content-cata-one-timeplay-time">{{calWareTime(item.duration)}}</span>
                            </div>

                            <!--划过-->
                            <span class="commonCourseCata-content-cata-one-timeplay" @click="playVideo(item)" v-show="item.isShowSee&&item.playTime!=item.duration">
                            <div class="kf-startPlay-btn">
                                开始播放
                            </div>
                        </span>
                            <span class="commonCourseCata-content-cata-one-timeplay" @click="playVideo(item,null,true)" v-show="item.isShowSee&&item.playTime==item.duration">
                            <div class="kf-startPlay-btn">
                                继续播放
                            </div>
                        </span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import "../../assets/css/commonCourseCata.less";
import { mapState } from "vuex";
import { formatDate } from "../../components/filters.js";
export default {
  data() {
    return {
      autoPlay: false,
      typeList: 1,
      show: false,
      show1: true,
      showPro: false,
      showPro2: false,
      proDetail: false,
      proShow: true,
      proShowStu: true,
      msgVisible: false,
      spreadVisible: false,
      msgViewVisible: false,
      anserShow: false,
      topShow: false,
      delVisible: false,
      itemVisible: false,
      otherShow: false,
      msgDetailList: [],
      reply: true,
      thanserShow: false,
      thReplyShow: false,
      stuNoteListVisible: true, //学生笔记列表展示
      stuNoteDetail: false, //学生笔记详情
      stuAddNote: false, //添加学生笔记
      id: this.$router.history.current.params.id,
      noteList: {},
      noteForm: {
        title: "",
        content: "",
        courseId: this.$router.history.current.params.id
      },
      noteDetailForm: {
        title: "",
        content: ""
      },
      quizList: {},
      StuQuiz: "", //新增留言
      delQuizId: null, //删除的留言id
      answerContent: null, //回复内容
      studentList: [], //教师列表,
      // 课件目录
      wareList: [],
      wareLoading: false,
      isVideoPlay: false,
      // 视频url
      videoUrl: "",
      // 当前视频id
      nowVideoId: 0,
      timer: "",
      videoCanUse: true
    };
  },
  filters: {
    formatDate(time) {
      var data = new Date(time);
      return formatDate(data, "MM-dd hh:mm:ss");
    }
  },
  computed: {
    ...mapState(["userInfo"]),
    courseId() {
      return this.$route.params.id;
    }
  },
  // watch(){
  //
  // },
  mounted() {
    let autoPlay = localStorage.getItem("autoPlay");

    this.autoPlay = autoPlay==="true"?true:false;

    if (this.userInfo === 1) {
      this.getNoteList();
    }
    console.log(this.userInfo);
    this.getWareList();
  },
  methods: {
    msgList(type) {
      if (type == 1) {
        this.typeList = 1;
      } else if (type == 2) {
        if (this.userInfo.clientRoleType === 2) {
          this.getStuNoteList();
        }
        this.typeList = 2;
      } else if (type == 3) {
        this.typeList = 3;
        this.stuNoteListVisible = true;
        if (this.userInfo.clientRoleType === 2) {
          this.getStuNoteList();
        }
      } else {
        this.typeList = 4;
        if (this.userInfo.clientRoleType === 1) {
          this.getQuizList();
        } else if (this.userInfo.clientRoleType === 2) {
          this.getTeaQuizList();
        }
      }
    },
    more() {
      this.show = !this.show;
      this.show1 = !this.show1;
    },
    courseDown() {
      this.showPro = !this.showPro;
    },
    courseDown2() {
      this.showPro2 = !this.showPro2;
    },
    proDetailClick() {
      this.proShow = false;
      this.proDetail = true;
    },
    proDetailClickStu() {
      this.proShowStu = false;
      this.proDetail = true;
    },
    proDetailBack() {
      this.proShow = true;
      this.proShowStu = true;
      this.proDetail = false;
    },
    addNote() {
      this.stuAddNote = true;
      this.stuNoteListVisible = false;
    },
    changeSpread() {},
    msgView() {
      this.msgViewVisible = !this.msgViewVisible;
    },
    anserShowFun() {
      this.anserShow = !this.anserShow;
    },
    delAnser(id) {
      this.delVisible = true;
      this.delQuizId = id;
      console.log(999);
    },
    deleteQuiz() {
      this.$api.commonCourse.deleteQuiz({ id: this.delQuizId }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功！"
        });
        this.delVisible = false;
        this.delQuizId = null;
        this.getQuizList();
      });
    },
    canDel() {
      this.delVisible = !this.delVisible;
    },
    itemAnser() {
      this.itemVisible = true;
    },
    thotherShowFunNo() {
      this.thReplyShow = !this.thReplyShow;
    },
    thotherShowFun() {
      this.thanserShow = !this.thanserShow;
    },
    otherShowFun() {
      this.otherShow = !this.otherShow;
    },
    getWareList() {
      this.wareLoading = true;
      this.$api.commonCourse
        .getThWareList({
          courseId: this.courseId
        })
        .then(res => {
          this.wareLoading = false;
          this.wareList = res.data;
          this.wareList.map(item => {
            item.isShowSee = false;
          });
          if(this.autoPlay){
            this.playVideo(this.wareList[0],true)
          }
        });
    },
    // 格式化课件时间
    calWareTime(value) {
      let secondTime = parseInt(value); // 秒
      let minuteTime = 0;
      let hourTime = 0;
      if (secondTime > 60) {
        minuteTime = parseInt(secondTime / 60);
        secondTime = parseInt(secondTime % 60);
        if (minuteTime > 60) {
          hourTime = parseInt(minuteTime / 60);
          minuteTime = parseInt(minuteTime % 60);
        }
      }
      let result =
        "" + parseInt(secondTime) < 10
          ? "0" + parseInt(secondTime)
          : parseInt(secondTime);
      //			console.log(result1)
      if (minuteTime > 0) {
        result = "" + parseInt(minuteTime) + ":" + result;
      }
      if (hourTime > 0) {
        result = "" + parseInt(hourTime) + ":" + result;
      }
      return result;
    },
    playVideo(row, isFirstTime) {
      if (isFirstTime) {
        if (!row) {
          return this.$message({
            type: "warning",
            message: "此课程暂无视频"
          });
        }
      }
      this.videoUrl = row.playUrl;
      this.nowVideoId = row.id;
      this.$nextTick(() => {
        this.$refs.hkVideo.currentTime = 0;
        this.$refs.hkVideo.play();
      });
    },
    wareItemAction(index, type) {
      // type :true划过  false 划出
      let row = this.wareList[index];
      if (type) {
        row.isShowSee = true;
        this.$set(this.wareList, index, row);
      } else {
        row.isShowSee = false;
        this.$set(this.wareList, index, row);
      }
    },
    errorMethod() {
      console.log(12456);
      this.videoCanUse = false;
    },
    loadMethod() {
      console.log(78465);
      this.videoCanUse = true;
    },
    autoPlayChange(){
      localStorage.setItem("autoPlay", this.autoPlay);
    }
  }
};
</script>

<style lang="less">
.commonCourseCata {
  width: 1200px;
  margin: 0 auto;
  margin-top: 27px;
  padding-bottom: 100px;
  .playingGif {
    display: inline-block;
    width: 30px;
    height: 30px;
    transform: translate(50%, 25%);
  }
  .hk-video-wrap {
    height: 520px;
    width: 100%;
    background: black;
      position: relative;
      &:hover{
          .commonCourseCata-autoPlay{
              display: flex;
          }
      }
      .hk-ware-video {
      height: 100%;
      width: 100%;
    }
  }
  .videoNoUse {
    height: 100%;
    background: black;
    text-align: center;
    vertical-align: middle;
    color: white;
    line-height: 520px;
  }
  .kf-startPlay-btn {
    width: 90px;
    height: 40px;
    background: #ffba4e;
    text-align: center;
    margin-top: 5px;
    line-height: 40px;
    border-radius: 8px;
    font-size: 14px;
    transform: translateX(-15%);
  }
  .commonCourseCata-video {
    height: 520px;
    width: 100%;
    background: url("../../assets/img/common_course_cata_attachment.jpg")
      no-repeat;
    background-position: center;
    background-size: cover;
    margin-bottom: 14px;
    .commonCourseCata-video-shade {
      height: 520px;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      .commonCourseCata-video-courseName {
        height: 100px;
        line-height: 100px;
        font-size: 22px;
        padding-top: 114px;
        text-align: center;
      }
      .commonCourseCata-video-startstudy {
        width: 210px;
        height: 60px;
        line-height: 60px;
        background-color: rgba(0, 0, 0, 0.5);
        text-align: center;
        margin: 0 auto;
        border-radius: 30px;
        font-size: 18px;
        cursor: pointer;
      }
      .commonCourseCata-video-beginstudy {
        font-size: 18px;
        height: 60px;
        line-height: 60px;
        text-align: center;
      }
    }
  }
  .commonCourseCata-content {
    .commonCourseCata-content-header {
      height: 66px;
      background-color: #fff;
      border-bottom: 1px solid #e5e5e5;
      .commonCourseCata-content-header-items {
        height: 64px;
        line-height: 64px;
        float: left;
        margin: 0 38px;
        cursor: pointer;
      }
      .commonCourseCata-content-header-items-active {
        height: 64px;
        line-height: 64px;
        float: left;
        margin: 0 38px;
        border-bottom: 2px solid #5e4eaa;
        cursor: pointer;
      }
    }
    .commonCourseCata-content-cata {
      background-color: #fff;
      .commonCourseCata-content-cata-one {
        height: 58px;
        /*width: 1117px;*/
        padding: 0 42px;
        border-bottom: 1px solid #e5e5e5;
        line-height: 58px;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        .commonCourseCata-content-cata-one-left {
          width: 1058px;
          position: relative;
          .commonCourseCata-content-cata-one-round {
            display: block;
            width: 8px;
            height: 8px;
            margin-right: 18px;
            background-color: #000;
            border-radius: 50%;
            position: absolute;
            top: 25px;
            left: 0;
          }
          .commonCourseCata-content-cata-one-title {
            padding-left: 18px;
          }
        }
        .commonCourseCata-content-cata-one-time {
          width: 70px;
          position: relative;
          /*.commonCourseCata-content-cata-one-time-img{*/
          /*width: 19px;*/
          /*height: 19px;*/
          /*margin-top: 21px;*/
          /*}*/
          .commonCourseCata-content-cata-one-timeplay {
            width: 19px;
            height: 19px;
            position: absolute;
            top: 4px;
            .commonCourseCata-content-cata-one-timeplay-img {
              width: 19px;
              height: 19px;
            }
          }
          .commonCourseCata-content-cata-one-timeplay-time {
            font-size: 12px;
            display: block;
            margin-left: 25px;
          }
        }
        &:hover {
          background-color: #efedf6;
        }
      }
      .commonCourseCata-content-cata-one-last {
        height: 58px;
        /*width: 1117px;*/
        padding: 0 56px;
        border-bottom: 1px solid #e5e5e5;
        line-height: 58px;
        display: flex;
        justify-content: center;
        cursor: pointer;
        color: #5e4eaa;
      }
    }

    .commonCourseCata-content-pro {
      background-color: #fff;
      .commonCourseCata-content-item {
      }
      .commonCourseCata-content-pro-one {
        height: 58px;
        /*width: 1117px;*/
        padding: 0 42px;
        border-bottom: 1px solid #e5e5e5;
        line-height: 58px;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        .commonCourseCata-content-pro-one-left {
          width: 1058px;
          position: relative;
          .commonCourseCata-content-pro-one-round {
            display: block;
            width: 34px;
            height: 34px;
            margin-right: 18px;
            position: absolute;
            top: 12px;
            left: 0;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
          }
          .commonCourseCata-content-pro-one-title {
            padding-left: 48px;
          }
        }
        .commonCourseCata-content-proone-time {
          width: 70px;
          position: relative;
          /*.commonCourseCata-content-pro-one-time-img{*/
          /*width: 19px;*/
          /*height: 19px;*/
          /*margin-top: 21px;*/
          /*}*/
          .commonCourseCata-content-pro-one-timeplay {
            width: 19px;
            height: 19px;
            position: absolute;
            top: 14px;
            .commonCourseCata-content-pro-one-timeplay-img {
              width: 13px;
              height: 9px;
            }
          }
          .commonCourseCata-content-pro-one-timeplay-time {
            font-size: 12px;
            display: block;
            margin-left: 25px;
          }
        }
        &:hover {
          background-color: #efedf6;
        }
      }
      .commonCourseCata-content-pro-one-last {
        height: 58px;
        width: 1117px;
        padding: 0 56px;
        border-bottom: 1px solid #e5e5e5;
        line-height: 58px;
        display: flex;
        justify-content: center;
        cursor: pointer;
        color: #5e4eaa;
      }
    }

    .commonCourseCata-content-pro-down {
      background-color: #fff;
      .commonCourseCata-content-pro-down-one {
        height: 58px;
        width: 1148px;
        padding: 0 10px 0px 42px;
        border-bottom: 1px solid #e5e5e5;
        line-height: 58px;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        .commonCourseCata-content-pro-down-one-left {
          width: 1058px;
          position: relative;
          .commonCourseCata-content-pro-down-one-round {
            display: block;
            width: 8px;
            height: 8px;
            margin-right: 18px;
            background-color: #000;
            border-radius: 50%;
            position: absolute;
            top: 25px;
            left: 44px;
          }
          .commonCourseCata-content-pro-down-one-round-orange {
            display: block;
            width: 8px;
            height: 8px;
            margin-right: 18px;
            background-color: #ffba4e;
            border-radius: 50%;
            position: absolute;
            top: 25px;
            left: 44px;
          }
          .commonCourseCata-content-pro-down-one-title {
            padding-left: 68px;
          }
        }
        .commonCourseCata-content-pro-down-one-time {
          width: 70px;
          position: relative;
          text-align: center;
          margin-left: 20px;
          /*.commonCourseCata-content-pro-down-one-timeplay {*/
          /*width: 19px;*/
          /*height: 19px;*/
          /*position: absolute;*/
          /*top: 14px;*/
          /*.commonCourseCata-content-pro-down-one-timeplay-img {*/
          /*width: 13px;*/
          /*height: 9px;*/
          /*}*/
          /*}*/
          .commonCourseCata-content-pro-down-one-timeplay-time {
            font-size: 12px;
            display: block;
            margin-left: 25px;
          }
        }
        .commonCourseCata-content-pro-down-one-time-orange {
          width: 68px;
          height: 39px;
          line-height: 39px;
          background-color: #ffba4e;
          text-align: center;
          border-radius: 4px;
          margin-top: 10px;
        }
        &:hover {
          background-color: #efedf6;
        }
      }
      .commonCourseCata-content-pro-one-last {
        height: 58px;
        width: 1117px;
        padding: 0 56px;
        border-bottom: 1px solid #e5e5e5;
        line-height: 58px;
        display: flex;
        justify-content: center;
        cursor: pointer;
        color: #5e4eaa;
      }
    }
    .commonCourseCata-content-pro-down-stu {
      background-color: #fff;
      .commonCourseCata-content-pro-down-one-stu {
        height: 58px;
        width: 1190px;
        padding: 0 10px 0px 0px;
        border-bottom: 1px solid #e5e5e5;
        line-height: 58px;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        .commonCourseCata-content-pro-down-one-left {
          width: 1058px;
          position: relative;
          .commonCourseCata-content-pro-down-one-round {
            display: block;
            width: 8px;
            height: 8px;
            margin-right: 18px;
            background-color: #000;
            border-radius: 50%;
            position: absolute;
            top: 25px;
            left: 44px;
          }
          .commonCourseCata-content-pro-down-one-round-orange {
            display: block;
            width: 8px;
            height: 8px;
            margin-right: 18px;
            background-color: #ffba4e;
            border-radius: 50%;
            position: absolute;
            top: 25px;
            left: 44px;
          }
          .commonCourseCata-content-pro-down-one-title {
            padding-left: 68px;
          }
        }
        .commonCourseCata-content-pro-down-one-time {
          width: 70px;
          position: relative;
          text-align: center;
          margin-left: 20px;
          /*.commonCourseCata-content-pro-down-one-timeplay {*/
          /*width: 19px;*/
          /*height: 19px;*/
          /*position: absolute;*/
          /*top: 14px;*/
          /*.commonCourseCata-content-pro-down-one-timeplay-img {*/
          /*width: 13px;*/
          /*height: 9px;*/
          /*}*/
          /*}*/
          .commonCourseCata-content-pro-down-one-timeplay-time {
            font-size: 12px;
            display: block;
            margin-left: 25px;
          }
        }
        .commonCourseCata-content-pro-down-one-time-orange {
          width: 68px;
          height: 39px;
          line-height: 39px;
          background-color: #ffba4e;
          text-align: center;
          border-radius: 4px;
          margin-top: 10px;
        }
        &:hover {
          background-color: #efedf6;
        }
      }
      .commonCourseCata-content-pro-one-last {
        height: 58px;
        width: 1117px;
        padding: 0 56px;
        border-bottom: 1px solid #e5e5e5;
        line-height: 58px;
        display: flex;
        justify-content: center;
        cursor: pointer;
        color: #5e4eaa;
      }
    }
    .commonCourseCata-content-pro-datail {
      .commonCourseCata-content-pro-datail-title {
        height: 38px;
        width: 100%;
        background-color: #fff1dc;
        .commonCourseCata-content-pro-datail-title-left {
          position: relative;
          float: left;
          .commonCourseCata-content-pro-datail-title-left-img {
            height: 34px;
            width: 34px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            display: block;
            position: absolute;
            top: 2px;
            left: 37px;
          }
          .commonCourseCata-content-pro-datail-title-left-name {
            margin-left: 85px;
            line-height: 38px;
          }
        }
        .commonCourseCata-content-pro-datail-title-right {
          position: relative;
          float: right;
          .commonCourseCata-content-pro-datail-title-right-img {
            height: 32px;
            width: 32px;
            background: url("../../assets/img/common_course_detail_back.png")
              no-repeat;
            background-position: center;
            background-size: cover;
            display: block;
            position: absolute;
            top: 2px;
            right: 94px;
          }
          .commonCourseCata-content-pro-datail-title-right-name {
            margin-right: 20px;
            line-height: 38px;
            cursor: pointer;
          }
        }
      }
      .comCourCata-content-pro-detail-sub {
        background: #fff;
        padding-bottom: 60px;
        .comCourCata-content-pro-detail-subType {
          padding: 37px 0 0 24px;
        }
        .comCourCata-content-pro-detail-cont {
          .comCourCata-content-pro-detail-ques {
            padding-top: 24px;
            padding-left: 50px;
          }
          .comCourCata-content-pro-detail-ans {
            margin-left: 70px;
            height: 86px;
            .comCourCata-content-pro-detail-ans-form-checkBox {
              width: 377px;
              padding-top: 24px;
              float: left;
            }
          }
          .comCourCata-content-pro-detail-ans-pd {
            margin-left: 70px;
            height: 43px;
            .comCourCata-content-pro-detail-ans-form-checkBox {
              width: 377px;
              padding-top: 24px;
              float: left;
            }
          }
        }
      }
    }
  }
}
.commonCourseCata-autoPlay{
    display: none;
    position: absolute;
    top: 20px;
    right: 20px;
    align-items: center;
    span{
        color: #fff;
        font-size: 12px;
        margin-right: 5px;
    }
}
</style>
