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
                <!--<div class="cr-tit-eng">WEB DESIGN <span>专业课</span></div>-->
                <div class="cr-code">{{"课程编码："+info.code}}</div>
                <div class="cr-courseLen">{{"【免费】"+info.wareCount+"课时"}}</div>
                <div class="cr-btn-group">
                    <div class="cr-btn-item2" :class="{rocket:(joinStatus===1&&info.clientRoleType==1)||(info.clientRoleType==2)}" @click="addEnterCourse">{{(joinStatus===1&&info.clientRoleType==1)||(info.clientRoleType==2)?"进入课程":"加入学习"}}</div>
                </div>
                <div class="cr-rt-num"><div class="cr-btn-dis" v-if="joinStatus==1&&info.clientRoleType==1" @click="cancelCourse">取消课程</div><div class="cr-num">{{info.selectCount+"人在学习"}}</div></div>

            </div>
        </div>
        <div class="cr-btm">
            <div class="cr-btm-nav">
                <div class="cr-nav-btn cl-on" @click="checked">简介</div>
                <!--<div :class="typeVisible?'cr-nav-btn':'cr-nav-btn cl-on'" @click="checked">目录</div>-->
            </div>
            <div class="cr-btm-main">
                <div class="cl-btm-ov">
                    <div class="cl-btm-tit">课程概述</div>
                    <div class="cl-ov-con">{{info.summary}}</div>
                </div>
                <div class="cl-btm-ol">
                    <div class="cl-btm-tit">课程大纲（{{waresNum}}）</div>
                    <div class="cl-ol-con">
                        <div class="cl-ol-item" v-for="(item,index) in wares" :key="index">{{item}}</div>
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
                            <div class="cr-item-des"></div>
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
import "../../assets/css/majorType.less";
import { mapState } from "vuex";
export default {
  data() {
    return {
      courseChecked: false,
      info: {
        name: "",
        code: "",
        wareCount: "",
        clientRoleType: "",
        summary: "",
        coverUrl: 2
      },
      teachers: [],
      wares: [], //课程大纲
      joinStatus: null,
      id: this.$router.history.current.params.id,
      waresNum: "",
      lastWareId: "",
      courseName: ""
    };
  },
  computed: mapState(["userInfo"]),
  mounted() {
    console.log(this.$route.fullPath);
    this.getInfo();
    console.log(this.userInfo);
  },
  methods: {
    getInfo() {
      if(this.userInfo.clientRoleType===1){
        this.$api.search.detail({ id: this.id }).then(res => {
          this.info = res.data;
          this.teachers = res.data.teachers;
          this.wares = res.data.wares;
          this.waresNum = this.wares.length;
          this.joinStatus = res.data.joinStatus;
          this.lastWareId = res.data.lastWareId;
          this.courseName = res.data.name;
        });
      }else if(this.userInfo.clientRoleType===2){
        this.$api.search.thDetail({ id: this.id }).then(res => {
          this.info = res.data;
          this.teachers = res.data.teachers;
          this.wares = res.data.wares;
          this.waresNum = this.wares.length;
          this.joinStatus = res.data.joinStatus;
          this.lastWareId = res.data.lastWareId;
          this.courseName = res.data.name;
        });
      }

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
    addEnterCourse() {
      if (this.info.clientRoleType == 2) {
        this.$router.push(
          `/commonCourse/commonCourseCata/${this.id}/${this.lastWareId}/${
            this.courseName
          }`
        );
      } else if (this.joinStatus === 1 && this.info.clientRoleType == 1) {
        this.$router.push(
          `/myStudy/commonCourseCata/${this.id}/${this.lastWareId}/${
            this.courseName
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
