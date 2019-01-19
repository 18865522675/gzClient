<template>
  <div class="er-main f-cb">
    <div class="er-wrap" v-show="resultList.length ===0"><h1>暂无测评结果数据</h1></div>
    <div class="er-item" v-show="resultList" v-for="(item,index) in resultList" :key="index">
      <div class="item-left" :style="{backgroundImage: 'url(\''+(item.coverUrl?item.coverUrl:require('../../assets/img/course_cover.png'))+'\')'}"></div>
      <div class="item-right">
        <div class="item-tit">{{item.courseName }}</div>
        <div class="item-type">专业课</div>
        <div class="item-time">{{item.wareCount }}课时</div>
        <div class="item-score">得分:{{item.totalScore }}分  申请日期:{{item.applyTime| formatDate}}</div>
        <div class="item-btn m-h" @click="goalDetail(item.assessmentId,item.courseName)">成绩查询</div>
      </div>
    </div>

    <div class="mt-page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="float: right;"
      v-if="resultList.length!==0">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import "../../assets/css/examResult.less";
import { formatDate } from "../../components/filters.js";
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      resultList: []
    };
  },
  filters: {
    formatDate(time) {
      var data = new Date(time);
      return formatDate(data, "MM-dd");
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$api.applyTest
        .applyResult({
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          this.resultList = res.data.pageList;
          this.pageSize = res.data.pageSize;
          this.pageNum = res.data.pageNum;
          this.total = res.data.total;
        });
    },
    //成绩查询
    goalDetail(assessmentId, courseName) {
      this.$router.push(`/examResult/scoreQuery/${assessmentId}/${courseName}`);
    },
    //分页start
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    }
  }
};
</script>

<style scoped>
</style>
