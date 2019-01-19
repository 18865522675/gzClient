<template>
  <div class="tt-main">

    <div class="tt-con">
      <div class="tt-item" v-for="(item,index) in courseList"  :key="index">
        <div class="tt-item-left" :style="{backgroundImage: 'url(\''+(item.coverUrl?item.coverUrl:require('../../assets/img/course_cover.png'))+'\')'}"></div>
        <div class="tt-item-right">
          <div class="tt-item-tit">{{item.name}}</div>
          <div class="tt-item-tag"></div>
          <div class="tt-item-time">{{item.wareCount}}课时</div>
          <div class="tt-item-length">
            <div class="tt-item-exe">习题 {{item.finishTaskCount}}/{{extraInfo.taskCount}}</div>
            <div class="tt-item-btn m-h" @click="viewDetal(item.courseId)">查看</div>
          </div>
        </div>
      </div>
      
    </div>
    <div class="at-page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="float:right;">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import "../../assets/css/tutoring.less";
export default {
  data() {
    return {
      // currentPage: 1,
      // dialogVisible: false,
      // dateMsgVisible: false,
      form: {},
      pageNum: 1,
      pageSize: 10,
      courseList: [],
      extraInfo: {},
      total: 10
    };
  },
  mounted() {
    this.getCourseList();
  },
  methods: {
    getCourseList(status) {
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        studyStatus: status
      };
      this.$api.applyTest.courseList(params).then(res => {
        this.extraInfo = res.data.extra;
        this.courseList = res.data.pageList;
        this.pageNum = res.data.pageNum;
        this.pageSize = res.data.pageSize;
        this.total = res.data.total;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getCourseList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getCourseList();
    },
    viewDetal(courseId) {
      this.$router.push(`/tutoring/tutoringDetail/${courseId}`);
    },
    pickOk() {
      // this.dialogVisible = false;
    },
    diaBuyClose() {
      // this.dialogVisible = false;
    },
    dateMsgShow() {
      this.dateMsgVisible = true;
    },
    closeDateMsg() {
      this.dateMsgVisible = false;
    }
  }
};
</script>

<style scoped>
</style>
