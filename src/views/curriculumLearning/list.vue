<template>
  <div class="g-module">
    <div class="kf-head">
      <div class="kf-head-cap">
        <b>课程学习</b>
        <small>COURSE STUDY</small>
      </div>
      <div class="kf-head-sel">
        <div class="kf-head-sel-cap">{{termName}}</div>
        <div class="kf-head-sel-group">
          <div class="kf-head-sel-item">
            <a href="javascript:;" class="kf-head-sel-item-cap" @click="get_all()">全部学期</a>
            <a href="javascript:;" class="kf-head-sel-item-cap" v-for="(item, index) in termList" :key="index" @click="termChange(item)">{{item.termName}}</a>
          </div>
        </div>
      </div>

      <!--<div class="kf-head-sel">-->
        <!--<div class="kf-head-sel-cap">{{currTerm}}</div>-->
        <!--<div class="kf-head-sel-group">-->
          <!--<div class="kf-head-sel-item">-->
            <!--<a href="javascript:;" class="kf-head-sel-item-cap" @click="currentTerm()">{{currTerm}}</a>-->
            <!--<a href="javascript:;" class="kf-head-sel-item-cap" @click="get_all()">全部学期</a>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <div class="kf-listMain" v-if="list.length">
      <router-link :to="'/curriculumLearning/myCourse/0/'+item.planId+'/'+item.wareCourseId+'/'+item.courseName" class="kf-listItem" v-for="(item, index) in list" :key="index">
        <div class="kf-listItem-img" :style="{backgroundImage: 'url('+require('../../assets/img/a.png')+')'}">
          <div class="kf-listItem-tab">{{item.courseType}}</div>
          <el-rate :value="item.finalScore" disabled></el-rate>
        </div>
        <div class="kf-listItem-bd">
          <div class="kf-listItem-cap">{{item.courseName}}</div>
          <div class="kf-listItem-tit">{{item.courseCredit}}学分</div>
          <div class="kf-listItem-ft">
            <div class="kf-listItem-time">学习时间：{{item.lastStudyTime?$fun.time(item.lastStudyTime):'— —'}}</div>
            <div class="kf-listItem-info" v-if="item.studyRate">已学{{item.studyRate}}%</div>
            <div class="kf-listItem-info on" v-else>开始学习</div>
          </div>
        </div>
      </router-link>
    </div>
    <div class="kf-listNot" v-else>当前暂无课程</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import "../../assets/css/curriculumLearning.less";
export default {
  data() {
    return {
      rate: 3.7,
      termList: [],
      termValue: {},
      list: [],
      termName: "",
      currTerm: ""
    };
  },
  components: {},
  computed: mapState(["userInfo"]),
  mounted() {
    this.get_List();
    //   this.currentTerm();
  },
  methods: {
    //获取我的课程
    get_ajax() {
      this.$api.curriculumLearning
        .get_course({
          type: 1,
          termId: this.termValue.termId
        })
        .then(res => {
          res.data.results ? (this.list = res.data.results) : (this.list = []);
        })
        .catch(res => {
          console.log(res);
        });
    },

    // 获取学期列表
    get_List() {
      this.$api.curriculumLearning
        .get_item()
        .then(res => {
          if (res.data.length) {
            this.termList = res.data;
            console.log(this.termList);
            this.termValue = this.userInfo;
            console.log(this.userInfo.termId);
            this.termList.map(item => {
              if (item.termId === this.userInfo.termId) {
                this.termName = item.termName;
              }
            });
            console.log(this.termName);

            this.get_ajax();
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 切换学期
    termChange(item) {
      this.termValue = item;
      this.termName = item.termName;
      this.get_ajax();
    },
    // *******************修改**************************
    get_all() {
      this.$api.curriculumLearning
        .get_course({
          type: 1,
          termId: 1
        })
        .then(res => {
          res.data.results ? (this.list = res.data.results) : (this.list = []);
          this.termName = "全部学期";
        })
        .catch(res => {
          console.log(res);
        });
    },
    currentTerm() {
      this.$api.curriculumLearning
        .get_course({
          type: 1
          // termId: 1
        })
        .then(res => {
          res.data.results ? (this.list = res.data.results) : (this.list = []);
          this.currTerm = res.data.extResult.termName;
          // this.termName = "当前学期";
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>
