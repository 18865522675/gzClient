<template>
  <div class="sq-main">
    <div class="sq-top">
      <div class="sq-img" :style="{backgroundImage: 'url(\''+$config.HOST_API+userInfo.avatar+'\')'}"  v-if="userInfo.avatar"></div>
      <div class="sq-img" :style="{backgroundImage: 'url('+require('../../assets/img/course_pro_userphoto.png')+')'}" v-else></div>
      <div class="sq-top-msg">
        <div class="sq-msg-tit">{{courseName}}</div>
        <div class="sq-msg-code">课程编码 111215101</div>
      </div>
      <div class="sq-total">总分 ：{{resultInfo.totalScore }}分</div>
    </div>
    <div class="sq-con">
      <div class="sq-item sq-course">
        <div class="sq-item-name">课程学习（{{resultInfo.courseScore}}分）</div>
        <div class="sq-item-name sq-item-name1">平时成绩  {{resultInfo.usualScore  }}分</div>
        <div class="sq-item-name sq-item-name2">学习笔记  {{resultInfo.noteScore }}分</div>
      </div>
      <div class="sq-item sq-net">
        <div class="sq-item-name">网上学习（{{resultInfo.stdyScore }}分）</div>
        <div class="sq-item-name sq-item-name1">登录  {{resultInfo.loginScore}}分</div>
        <div class="sq-item-name"></div>
      </div>
      <div class="sq-item sq-work">
        <div class="sq-item-name">平时作业  {{resultInfo.workScore   }}分</div>
        <div class="sq-item-name sq-item-name1">作业提交 {{resultInfo.taskScore  }}分</div>
        <div class="sq-item-name"></div>
      </div>
      <div class="sq-item sq-test">
        <div class="sq-item-name">综合测评（{{resultInfo.examTotalScore}}分）</div>
        <div class="sq-item-name sq-item-name1">测评成绩  {{resultInfo.examScore}} 分</div>
        <div class="sq-item-name"></div>
      </div>
    </div>
    <div class="sq-btn" @click="detailShow">成绩构成</div>
    <div class="sq-msg" v-show="detailVisible">
      <div class="sq-msg-tit">温馨提示：</div>
      <div class="sq-msg-con">
        <div class="sq-msg-con-item">
          <div class="sq-msg-item-tit">1. 课程学习</div>
          <div class="sq-msg-item-an">A. 平时成绩：根据课程面授、课程辅导给出成绩，满分{{resultInfo.usualScore  }}分</div>
          <div class="sq-msg-item-an">B. 学习笔记：单门课程提交1次学习笔记得2分，满分{{resultInfo.noteScore }}分</div>
        </div>
        <div class="sq-msg-con-item">
          <div class="sq-msg-item-tit">2. 网上学习</div>
          <div class="sq-msg-item-an">a. 登录：登录平台1次得1分，满分{{resultInfo.loginScore}}分</div>
        </div>
        <div class="sq-msg-con-item">
          <div class="sq-msg-item-tit">3. 平时作业</div>
          <div class="sq-msg-item-an">A. 单门课程提交1次作业得10分，满分{{resultInfo.workScore   }}分</div>
        </div>
        <div class="sq-msg-con-item">
          <div class="sq-msg-item-tit">4. 综合测评</div>
          <div class="sq-msg-item-an">A. 测评平台上完成综合测试的成绩30%，满分{{resultInfo.examTotalScore}}分</div>
        </div>
        <div class="sq-msg-con-item">
          <div class="sq-msg-item-tit">5. 测评结果</div>
          <div class="sq-msg-item-an">A. 测评结果的30%，将计入自考课程成绩</div>
        </div>
      </div>
      <div class="sq-msg-btn" @click="detailHidden">知道了</div>
      <div class="sq-msg-ft"></div>
    </div>
  </div>
</template>

<script>
import "../../assets/css/examResult.less";
export default {
  data() {
    return {
      resultInfo: {},
      assessmentId: this.$route.params.assessmentId,
      courseName: this.$route.params.courseName,
      detailVisible: false
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$api.applyTest
        .applyDetail({ assessmentId: this.assessmentId })
        .then(res => {
          this.resultInfo = res.data;
        });
    },
    detailShow() {
      this.detailVisible = true;
    },
    detailHidden() {
      this.detailVisible = false;
    }
  }
};
</script>

<style scoped>
</style>
