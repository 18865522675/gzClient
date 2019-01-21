<template>
  <div class="container">
    <div class="my-info">
      <div class="kf-head">
        <div class="kf-head-cap">
          <b>课程成绩</b>
          <small>COURSE SCORE</small>
        </div>
        <!--<div class="kf-head-sel">-->
          <!--<div class="kf-head-sel-cap">{{termIdData.termName}}</div>-->
          <!--<div class="kf-head-sel-group">-->
            <!--<div class="kf-head-sel-item" v-for="(term,index) in allterm" :key="index">-->
              <!--<a href="javascript:;" class="kf-head-sel-item-cap" @click="chooseTerm(term)">{{term.termName}}</a>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <div class="kf-head-sel">
          <div class="kf-head-sel-cap">{{termName}}</div>
          <div class="kf-head-sel-group">
            <div class="kf-head-sel-item">
              <a href="javascript:;" class="kf-head-sel-item-cap" @click="getCurrentTerm()">当前学期</a>
              <a href="javascript:;" class="kf-head-sel-item-cap" @click="getAllTerm()">全部学期</a>
            </div>
          </div>
        </div>
      </div>
      <p class="score">已修学分：
        <span>{{nowScore}}</span>/
        <span>{{totalScore}}</span>
      </p>
      <!--<div class="info" v-show="datas==1">-->
        <!--<div class="videoShow" v-for="(termCourse,index) in CC_list" :key="index">-->
          <!--&lt;!&ndash; <div class="imgDiv" v-bind:style="{backgroundImage: 'url('+termCourse.logo+')'}"> &ndash;&gt;-->
          <!--<div class="imgDiv" v-bind:style="{backgroundImage: 'url('+require('../../assets/img/video2.png')+')'}">-->
          <!--</div>-->
          <!--<p class="viedoName">{{termCourse.courseName}}</p>-->
          <!--<p class="learnPoint">-->
            <!--<span>6</span>学分-->
            <!--<span>({{termCourse.statusName}})</span>-->
          <!--</p>-->
          <!--<div class="learnStatus">-->
            <!--<div>-->
              <!--<p>-->
                <!--<span>{{termCourse.courseClassHour}}</span>课时</p>-->
            <!--</div>-->
            <!--<span class="examWay">{{termCourse.hasScore}}</span>-->
            <!--<span class=" examWay_another ">成绩：</span>-->
          <!--</div>-->
          <!--<p class="mark">{{termCourse.courseType}}</p>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="notData" v-show="noData==1">暂无数据</div>-->

      <div class="ses_list">
        <div class="list_title">课程</div>
        <div class="list_title">学期</div>
        <div class="list_title">学分</div>
        <div class="list_title">课时</div>
        <div class="list_title">成绩</div>
      </div>
      <div class="ses_cont">
        <div class="ses_bar" v-for="(course,index) in  CC_list" :key="index" v-bind:class="{ top_border:index>0}">
          <div class="t_cont" :title="course.courseName">{{course.courseName}}</div>
          <div class="t_cont">{{course.term}}</div>
          <div class="t_cont">{{course.courseCredit}}</div>
          <div class="t_cont">{{course.courseClassHour}}</div>
          <div class="t_cont">{{course.totalScore}}</div>
        </div>
        <div class="notData" v-show="noData==1">暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      // 学期ID
      // termId: this.userInfo.termId,
      termId: "",
      // 当前页
      c_page: 1,
      // 每页数量
      s_page: 10,
      // 学期
      allterm: "",
      //总分
      totalScore: "",
      //当前总分
      nowScore: "",
      //列表数据
      CC_list: [],
      // 当前学期
      termIdData: {},

      termScore: 0,
      datas: 1,
      noData: 0,
      termName: "当前学期"
    };
  },
  computed: mapState(["userInfo"]),
  mounted() {
    // this.getTermList();
    this.getCurrentTerm();
    console.log(this.userInfo.termId);
  },
  methods: {
    // 学期课程列表
    getTermList() {
      // this.termId = this.termIdData.termId;
      this.$api.setInfo
        .get_scoreList({
          termId: 1
          // currentPage: this.c_page,
          // limitNum: this.s_page
        })
        .then(res => {
          if (res.data.results == null || res.data.results.length == 0) {
            // this.datas = 0;
            this.noData = 1;
          } else if (res.data.results.length !== 0) {
            this.datas = 1;
            // this.noData = 0;
            this.CC_list = res.data.results;
            this.totalScore = res.data.extResult.totalScore;
            this.nowScore = res.data.extResult.hasScore;
          }
        });
    },

    //   ********************修改********************
    getAllTerm() {
      this.$api.setInfo
        .get_scoreList({
          termId: 1
        })
        .then(res => {
          this.termName = "全部学期";
          if (res.data.results == null || res.data.results.length == 0) {
            this.noData = 1;
          } else if (res.data.results.length !== 0) {
            this.datas = 1;
            this.CC_list = res.data.results;
            this.totalScore = res.data.extResult.totalScore;
            this.nowScore = res.data.extResult.hasScore;
          }
        });
    },
    getCurrentTerm() {
      this.$api.setInfo
        .get_scoreList({
          // termId: 1
        })
        .then(res => {
          this.termName = "当前学期";
          if (res.data.results == null || res.data.results.length == 0) {
            this.noData = 1;
          } else if (res.data.results.length !== 0) {
            this.datas = 1;
            this.CC_list = res.data.results;
            this.totalScore = res.data.extResult.totalScore;
            this.nowScore = res.data.extResult.hasScore;
          }
        });
    }
    // 获取学期
    // getSem() {
    //   this.$api.setInfo.get_terms().then(res => {
    //     console.log(res.data);
    //     this.allterm = res.data;
    //     this.termIdData = res.data[0];
    //     if (res.data.length) this.getTermList();
    //   });
    // },
    // chooseTerm: function(index) {
    //   this.termIdData = index;
    //   this.getTermList();
    // }
  }
  // filters: {
  //   imgFilter: function(url) {
  //     if (url == "") {
  //       return require('../../assets/img/video2.png');
  //     }
  //   }
  // }
};
</script>
 
<style scoped lang="less">
.my-info {
  width: 1200px;
  margin: 0 auto;
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
  .score {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    padding-left: 12px;
    margin-top: 20px;
  }
  .info {
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    // float: left;
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
        display: block;
        width: 285px;
        height: 181px;
        margin: 0 auto;
        background-size: cover;
        background-repeat: no-repeat;
      }
      img {
        display: block;
        width: 285px;
        height: 181px;
        margin: 0 auto;
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
        color: #333333;
        letter-spacing: 0;
        margin-top: 5px;
        margin-left: 5px;
        margin-bottom: 6px;
      }
      .learnStatus {
        overflow: hidden;
        div {
          float: left;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #cccccc;
          letter-spacing: 0;
          padding-left: 5px;
        }
        .examWay {
          float: right;
          margin-right: 20px;
          font-size: 16px;
          color: #333333;
        }
        .examWay_another {
          float: right;
          margin-right: 10px;
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

.ses_list {
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin-top: 35px;
  background: #d2dcfd;
  display: flex;
}
.list_title {
  /*flex-grow: 1;*/
  width: 240px;
  height: 100%;
  text-align: center;
  font-size: 18px;
  color: #333;
  box-sizing: border-box;
  border-right: 3px solid #fff;
}
div.list_title:last-child {
  border-right: none;
}
.ses_cont {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  box-shadow: 0 6px 10px 0 #cad5ff;
  .ses_bar {
    width: 100%;
    height: 70px;
    box-sizing: border-box;
    display: flex;
    line-height: 70px;
    font-size: 14px;
    color: #333;
    div.t_cont:first-child {
      width: 230px;
      padding-right: 10px;
      box-sizing: border-box;
      text-align: center;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    div.t_cont:last-child {
      width: 230px;
      padding-left: 10px;
      box-sizing: border-box;
      text-align: center;
    }
    div.t_cont:nth-child(2),
    div.t_cont:nth-child(3),
    div.t_cont:nth-child(4) {
      width: 240px;
      text-align: center;
    }
  }
  .top_border {
    border-top: 2px solid #d2dcfd;
  }
}
</style>
