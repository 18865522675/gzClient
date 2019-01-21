<template>
  <div class="g-module">
    <div class="kf-head">
      <div class="kf-head-cap">
        <b>考场查询</b>
        <small>INQUIRY</small>
      </div>
    </div>
    <div class="kf-listMain-test">
      <ul class="kf-listItem-test" v-for="(item,index) in message" :key="index" :data-index='index'>
        <li class="testQueries-li">
          <p class="testQueries-content">科&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;目&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.courseName}}&nbsp;({{item.termName}})</p>
        </li>
        <li class="testQueries-li">
          <p class="testQueries-content">考试状态&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.status}}</p>
        </li>
        <li class="testQueries-li">
          <p class="testQueries-content">考试时间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.time}}</p>
        </li>
        <li class="testQueries-li">
          <p class="testQueries-content">考试地点&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.address}}</p>
        </li>
        <li class="testQueries-li">
          <p class="testQueries-content">考场座位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.snumber}}</p>
        </li>
      </ul>
     <div class="kf-listNot" v-if="!message" style="margin:0 auto">暂无考场安排</div>
      
      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="limitNum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="kf-pagination"
        v-if="message">
      </el-pagination>
     </div>
  </div>
  
</template>

<script>
import "../../assets/css/testQueries.less";
export default {
  data() {
    return {
      activeName2: "first",
      dialogAddVisible: false,
      currentPage: 1,
      limitNum: 10,
      total: 10,
      message: "",
      statusList: [{ value: 1, name: "正考" }, { value: 2, name: "补考" }]
    };
  },
  components: {},
  mounted() {
    this.get_List();
  },
  methods: {
    get_List() {
      this.$api.testQueries
        .get_exam({
          currentPage: this.currentPage,
          limitNum: this.limitNum,
          type: 2
        })
        .then(res => {
          console.log(res.data.results);
          this.message = res.data.results;
          this.total = res.data.paging.total;
          this.message.forEach((item, index) => {
            console.log(index);
            // console.log(this.$fun.table.time(null, null, item.startTime));
            item.time = this.$fun.table.time(null, null, item.startTime);
            for (let i of this.statusList) {
              if (i.value == item.status) {
                item.status = i.name;
              }
            }
            index = (this.currentPage - 1) * this.limitNum + (index + 1);
          });
        })
        .catch(res => {
          console.log(res);
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    show() {
      this.dialogAddVisible = true;
    },
    handleSizeChange(val) {
      this.limitNum = val;
      this.get_List();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.get_List();
    }
  }
};
</script>
<style lang="less" scoped>
.nav {
  margin-top: 40px;
}
</style>
