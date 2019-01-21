<template>
  <div class="container">
    <div class="my-info">
      <div class="kf-head">
        <div class="kf-head-cap">
          <b>教学计划</b>
          <small>TEACHING PROGRAM</small>
        </div>
        <!--<div class="kf-head-sel">-->
          <!--<div class="kf-head-sel-cap">{{termNam.termName}}</div>-->
          <!--<div class="kf-head-sel-group">-->
            <!--<div class="kf-head-sel-item" v-for="(semes,index) in semesArr" :key="index" @click="choiceSemester(semes)">-->
              <!--<a href="javascript:;" class="kf-head-sel-item-cap">{{semes.termName}}</a>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      </div>

      <!--<div class="info" v-show="datas==1">-->
        <!--<div class="videoShow" v-for="(course,index) in myCourse" :key="index">-->
          <!--<div class="imgDiv" :style="{backgroundImage: 'url('+require('../../assets/img/video2.png')+')'}">-->
          <!--</div>-->
          <!--<p class="viedoName">{{course.courseName}}</p>-->
          <!--<p class="learnPoint">-->
            <!--<span>{{course.courseCredit}}</span>学分</p>-->
          <!--<div class="learnStatus">-->
            <!--<div>-->
              <!--<p>总课时：-->
                <!--&lt;!&ndash; <span>0-->
                <!--</span>/ &ndash;&gt;-->
                <!--<span>{{course.courseClassHour}}</span>课时</p>-->
              <!--<p class="hidStatus">已学习时间：-->
                <!--<span>&#45;&#45;</span>/-->
                <!--<span>&#45;&#45;</span>课时</p>-->
            <!--</div>-->
            <!--<span class="examWay">{{course.examKindName}}</span>-->
          <!--</div>-->
          <!--<p class="mark">{{course.courseType }}-->
          <!--</p>-->
        <!--</div>-->
      <!--</div>-->
      <div class="ses_list">
        <div class="list_title">课程</div>
        <div class="list_title">学期</div>
        <div class="list_title">考试形式</div>
        <div class="list_title">学分</div>
        <div class="list_title">课时</div>
      </div>
      <div class="ses_cont">
        <div class="ses_bar" v-for="(course,index) in  myCourse" :key="index" v-bind:class="{ top_border:index>0}">
          <div class="t_cont" :title="course.courseName">{{course.courseName}}</div>
          <div class="t_cont">{{course.term}}</div>
          <div class="t_cont">{{course.examKindName}}</div>
          <div class="t_cont">{{course.courseCredit}}</div>
          <div class="t_cont">{{course.courseClassHour}}</div>
        </div>
        <div class="notData" v-show="noData==1">暂无数据</div>
        <!--<div class="ses_bar top_border">-->
          <!--<div class="t_cont">马克思主义基本原理概论</div>-->
          <!--<div class="t_cont">第一学期</div>-->
          <!--<div class="t_cont">线上考试</div>-->
          <!--<div class="t_cont">100</div>-->
          <!--<div class="t_cont">20</div>-->
        <!--</div>-->
      </div>
      <!--<div class="notData" v-show="noData==1">暂无数据</div>-->
    </div>
  </div>
</template>

<script>
import "../../assets/css/curriculumLearning.less";
export default {
  data() {
    return {
      //列表数据-我的课程
      myCourse: [],
      //学期列表
      semesArr: [],
      // 当前学期
      termNam: {},
      term_id: "",
      // 当前页
      c_page: 1,
      // 每页数量
      s_page: 10,
      datas: 1,
      noData: 0
    };
  },
  mounted() {
    // this.getSemester();
    this.getCourse_list();
  },
  methods: {
    // 教学计划列表
    getCourse_list() {
      this.$api.setInfo
        .get_course({
          // type: 2,
          // termId: this.termNam.termId,
          // currentPage: this.c_page,
          // limitNum: this.s_page
        })
        .then(res => {
          if (res.data.results == null || res.data.results.length == 0) {
            // this.datas = 0;
            this.noData = 1;
          } else if (res.data.results.length !== 0) {
            // this.datas = 1;
            this.noData = 0;
              this.myCourse = res.data.results;
          }
          console.log(this.myCourse);
        });
    },
    //获取学期
    getSemester() {
      this.$api.setInfo.get_terms().then(res => {
        console.log(res.data);
        this.semesArr = res.data;
        this.termNam = res.data[0];
        this.getCourse_list();
      });
    },
    // 选择学期
    choiceSemester: function(semes) {
      this.termNam = semes;
      this.getCourse_list();
    }
  }
};
</script>

<style scoped lang="less">
.my-info {
  width: 1200px;
  margin: 0 auto;
  // padding-top: 20px;
  .info_bar {
    width: 1200px;
    height: 60px;
    box-sizing: border-box;
    line-height: 60px;
    background: #6d8bfa;
    margin-top: 9px;
    padding-left: 40px;
    ul {
      overflow: hidden;
      li {
        // height: 60px;
        float: left;
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #ffffff;
        letter-spacing: 0;
      }
      li:nth-child(2) {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0;
        margin-left: 5px;
      }
      li:last-child {
        float: right;
        select {
          width: 92px;
          height: 36px;
          border: 0;
          font-size: 14px;
          background: #4f6edc;
          color: #fff;
          position: relative;
          top: -4px;
          left: -20px;
          padding-left: 5px;
          option {
            height: 30px;
            line-height: 30px;
          }
        }
      }
    }
  }
  .info {
    width: 100%;
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    .videoShow {
      width: 285px;
      height: 291px;
      box-sizing: border-box;
      margin-left: 12px;
      margin-bottom: 20px;
      box-shadow: 0 1px 2px 0 #cccccc;
      border-radius: 4px;
      border-bottom: 1px solid #e9e9e9;
      position: relative;
      .imgDiv {
        width: 285px;
        height: 181px;
        margin: 0 auto;
        background-size: cover;
        background-repeat: no-repeat;
      }
      .viedoName {
        width: 212px;
        margin-top: 15px;
        margin-left: 5px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
        letter-spacing: -0px;
      }
      .learnPoint {
        height: 20px;
        line-height: 20px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        margin-left: 5px;
        color: #333333;
        letter-spacing: 0;
        margin-top: 5px;
        margin-bottom: 6px;
      }
      .learnStatus {
        overflow: hidden;
        div {
          float: left;
          margin-left: 5px;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #cccccc;
          letter-spacing: 0;
        }
        .examWay {
          float: right;
          margin-right: 20px;
          font-size: 16px;
          color: #333333;
        }
        .hidStatus {
          display: none;
        }
      }
      .mark {
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: rgba(51, 51, 51, 0.6);
        position: absolute;
        top: 0;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 0;
      }
    }
  }
  .notData {
    width: 100%;
    height: 300px;
    line-height: 300px;
    text-align: center;
  }
}
.btnstyle {
  width: 180px;
  height: 48px;
  border: 0;
  background: #6d8bfa;
  border-radius: 4px;
  font-family: PingFangSC-Regular;
  font-size: 18px;
  color: #ffffff;
  letter-spacing: 0;
}

  .ses_list{
    width:100%;
    height:40px;
    line-height: 40px;
    margin-top:35px;
    background:#D2DCFD;
    display: flex;
  }
  .list_title{
    /*flex-grow: 1;*/
    width:240px;
    height:100%;
    text-align: center;
    font-size: 18px;
    color:#333;
    box-sizing: border-box;
    border-right:3px solid #fff;
  }
  div.list_title:last-child{
    border-right:none;
  }
  .ses_cont{
    width:100%;
    padding:0 10px;
    box-sizing: border-box;
    box-shadow: 0 6px 10px 0 #CAD5FF;
    .ses_bar{
      width:100%;
      height:70px;
      box-sizing: border-box;
      display: flex;
      line-height: 70px;
      font-size: 14px;
      color:#333;
      div.t_cont:first-child{
        width:230px;
        padding-right:10px;
        box-sizing: border-box;
        text-align: center;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }

      div.t_cont:last-child{
        width:230px;
        padding-left:10px;
        box-sizing: border-box;
        text-align: center;
      }
      div.t_cont:nth-child(2),div.t_cont:nth-child(3),div.t_cont:nth-child(4){
        width:240px;
        text-align: center;
      }
    }
    .top_border{
      border-top: 2px solid #D2DCFD;
    }
  }


</style>
