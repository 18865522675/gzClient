<template>
  <div class="cr-main">
    <div class="cr-top">
      <div class="top-img">
        <!--<div class="top-img-banner">正在直播：{{list.name}} <span>进入</span></div>-->
        <div class="commonCourseList-content-items-left"  :style="{backgroundImage: 'url(\''+info.coverUrl+'\')'}" v-if="info.coverUrl"></div>
        <div class="commonCourseList-content-items-left" :style="{backgroundImage: 'url('+require('../../assets/img/commonCourseDetailBanner.png')+')'}" v-else></div>
      </div>
      <div class="top-rt">
        <div class="cr-tit"><a :title="info.name">{{info.name}}</a></div>
        <!--<div class="cr-tit-eng"> <span>专业课</span></div>-->
        <div class="cr-code">{{"课程编码："+info.code}}</div>
        <div class="cr-courseLen">{{"【免费】"+info.wareCount+"课时"}}</div>
        <div class="cr-btn-group">
          <div class="cr-btn-item2" :class="{rocket:(joinStatus===1&&info.clientRoleType===1)||(info.clientRoleType===2)}" @click="addEnterCourse">{{(joinStatus===1&&info.clientRoleType===1)||(info.clientRoleType===2)?"进入课程":"加入学习"}}</div>
        </div>
        <div class="cr-rt-num"><div class="cr-btn-dis" v-if="joinStatus===1&&info.clientRoleType===1" @click="cancelCourse">取消课程</div><div class="cr-num">{{info.selectCount+"人在学习"}}</div></div>
        <div class="cakeChart-box" v-if="info.clientRoleType===1">
          <el-progress
            type="circle"
            width="38"
            stroke-width="6"
            :percentage="info.wareSchedule"
            color="#ffba4e"
            class="cakeChart"></el-progress>
          <div class="cakeChart-text">已学{{info.wareSchedule}}%</div>
        </div>
      </div>
    </div>
    <div class="cr-btm">
      <div class="cr-btm-nav">
        <div :class="typeVisible?'cr-nav-btn cl-on':'cr-nav-btn'" @click="checked">简介</div>
        <div :class="typeVisible?'cr-nav-btn':'cr-nav-btn cl-on'" @click="checked">目录</div>
      </div>
      <div class="cr-btm-main" v-show="typeVisible">
        <div class="cl-btm-ov">
          <div class="cl-btm-tit">课程概述</div>
          <div class="cl-ov-con">{{info.summary}}</div>
        </div>
        <div class="cl-btm-ol">
          <div class="cl-btm-tit">课程大纲（{{info.wareCount}}）</div>
          <div class="cl-ol-con">
            <div class="cl-ol-item" v-for="(item,index) in wares" :key="index">{{index+1}}.  {{item}}</div>

          </div>
        </div>
      </div>
      <div class="cr-btm-main" v-show="!typeVisible">
        <div class="cl-btm-ov">
          <div class="cl-btm-tit">课程目录（{{direList.length}}）</div>
          <div class="cl-ov-con">
            <div class="cl-ol-item m-h" :class="{livewait:item.playStatus === 0,liveon:item.playStatus ===1,liveback:item.playStatus === 2}" v-for="(item,index) in direList" :key="index" @click="goWareDetail(item.id,item.playStatus, item.courseId)">
              <div class="cl-item-tit ">{{index+1}}.【{{item.type}}】{{item.title}}</div>
              <div class="cl-item-time">{{item.playStatus|FormatStatus}} {{item.startTime|formatDate}}-{{item.endTime|formatDate}}</div>
            </div>

          </div>
        </div>
      </div>
      <div class="cr-btm-tea">
        <div class="cr-tea-tit">授课教师</div>
        <div class="cr-tea-ul">
          <div class="cr-tea-item" v-for="(item,index) in teachers" :key="index">
            <div class="cr-item-img"></div>
            <div class="cr-item-con">
              <div class="cr-item-tit">{{item.name}}</div>
              <!--<div class="cr-item-des">院长/教授/博士生导师</div>-->
            </div>
          </div>

        </div>
        <div class="cr-tea-school">
          <div class="cr-school-tit">授课学校</div>
          <div class="cr-school-logo"></div>
          <div class="cr-school-name">华中科技大学</div>
          <div class="cr-school-des">HUAZHONG UNIVERSITY OF SCIENCE AND TECHNOLOGYTECHNOLOGY</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/css/courseLive.less";
import { mapState } from "vuex";
import { formatDate } from "../../components/filters.js";
export default {
  data() {
    return {
      typeVisible: true, //显示简介
      info: {
        name: "",
        code: "",
        wareCount: "",
        clientRoleType: "",
        summary: "",
        coverUrl: 2
      },
      teachers: [],
      wares: [],
      direList: [],
      joinStatus: null,
      id: this.$router.history.current.params.id
    };
  },
  filters: {
    formatDate(time) {
      let data = new Date(time);
      return formatDate(data, "MM月dd日 hh:mm");
    },
    FormatStatus(status) {
      switch (status) {
        case 0:
          return "未开始";
        case 1:
          return "正在直播";
        case 2:
          return "结束";
      }
    }
  },
  computed: mapState(["userInfo"]),
  mounted() {
    console.log(this.userInfo);
    this.getInfo();
    this.getDirectory();
    this.cakeChart();
  },
  methods: {
    //获取详情列表
    getInfo() {
      this.$api.search.detail({ id: this.id }).then(res => {
        this.info = res.data;
        this.teachers = res.data.teachers;
        this.wares = res.data.wares;
        this.joinStatus = res.data.joinStatus;

        if(this.info.wareSchedule===null) this.info.wareSchedule = 0;
      });
    },
    //目录
    getDirectory() {
      this.$api.courseLive.directory({ id: this.id }).then(res => {
        this.direList = res.data;
      });
    },
    //加入课程
    addCourse() {
      this.$api.courseLive.addCourse({ courseId: this.id }).then(() => {
        this.$message({
          type: "success",
          message: "加入课程成功！"
        });
        this.getInfo();
      });
    },
    cancelCourse() {
      this.$api.courseLive.cancelCourse({ courseId: this.id }).then(() => {
        this.$message({
          type: "success",
          message: "取消加入课程成功！"
        });
        this.getInfo();
      });
    },
    checked() {
      this.typeVisible = !this.typeVisible;
    },
    goWareDetail(id, type, courseId) {
      switch (type) {
        case 0:
          alert("直播未开始！");
          return;
        case 1:
        case 2:
          this.$router.push(`/courseLive/liveRoom/${id}/${courseId}`);
          return;
        // case 2:
        // this.$router.push(`/courseLive/playBack/${id}`);
      }
    },
    addEnterCourse() {
      if (this.info.clientRoleType == null) {
        this.$message({
          type: "error",
          message: "您还未登录，请先登录！"
        });
        setTimeout(function() {
          this.$router.push(`/login`);
        }, 1000);
      } else if (this.joinStatus === 1 && this.info.clientRoleType === 1) {
        this.$router.push(
          `/courseLive/commonCourseCata/${this.id}/${this.info.lastWareId}/${
            this.info.name
          }`
        );
      } else if (this.joinStatus === null && this.info.clientRoleType === 2) {
        console.log(123);
        this.$router.push(
          `/majorType/courseDetailCata/${this.id}/${this.info.lastWareId}/${
            this.info.name
          }`
        );
      } else {
        this.addCourse();
      }
    }
  }
};
</script>

<style scoped>
</style>
