<template>
  <div class="g-module">
    <div class="kf-head">
      <!-- 标题栏 -->
      <div class="kf-head-cap">
          <b>入学复习</b>
          <small>PERSCHOOL REVIEW</small>
      </div>
    </div>
    <div class="pre-listMain">
        <router-link :to="'/preschoolReview/preschoolReviewInfo/'+item.courseId" class="pre-listItem" v-for="(item,index) in tableData" :key="index">
          <div class="pre-listItem-img" :style="{backgroundImage: 'url(\''+item.logo+'\')'}">
            <!-- <el-rate 
            v-model="star"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
            </el-rate> -->
          </div>
          <div class="pre-listItem-bd">
            <div class="pre-listItem-cap"></div>
            <div class="pre-listItem-ft">{{item.name}}
              <!-- <div class="pre-listItem-info on">开始学习</div> -->
            </div>
          </div>
        </router-link>
        <div style="margin:0 auto;padding:20px 0;font-size:18px" v-show="tableData === null">暂无复习课程</div>
        <!-- <router-link to="/curriculumLearning/myCourse/0" class="pre-listItem">
          <div class="pre-listItem-img" :style="{backgroundImage: 'url('+require('../../assets/img/video2.png')+')'}">
            <el-rate 
            v-model="star"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
            </el-rate>
          </div>
          <div class="pre-listItem-bd">
            <div class="pre-listItem-cap">语文</div>
            <div class="pre-listItem-ft">
              <div class="pre-listItem-time">已学习时间：— —</div>
              <div class="pre-listItem-info on">开始学习</div>
            </div>
          </div>
        </router-link>
        <router-link to="/curriculumLearning/myCourse/0" class="pre-listItem">
          <div class="pre-listItem-img" :style="{backgroundImage: 'url('+require('../../assets/img/video2.png')+')'}">
            <el-rate 
            v-model="star"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
            </el-rate>
          </div>
          <div class="pre-listItem-bd">
            <div class="pre-listItem-cap">语文</div>
            <div class="pre-listItem-ft">
              <div class="pre-listItem-time">已学习时间：— —</div>
              <div class="pre-listItem-info on">开始学习</div>
            </div>
          </div>
        </router-link>
        <router-link to="/curriculumLearning/myCourse/0" class="pre-listItem">
          <div class="pre-listItem-img" :style="{backgroundImage: 'url('+require('../../assets/img/video2.png')+')'}">
            <el-rate 
            v-model="star"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
            </el-rate>
          </div>
          <div class="pre-listItem-bd">
            <div class="pre-listItem-cap">语文</div>
            <div class="pre-listItem-ft">
              <div class="pre-listItem-time">已学习时间：— —</div>
              <div class="pre-listItem-info on">开始学习</div>
            </div>
          </div>
        </router-link> -->
      <!--<el-pagination-->
        <!--@size-change="handleSizeChange"-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page="currentPage"-->
        <!--:page-sizes="[10, 20, 30, 50]"-->
        <!--:page-size="limitNum"-->
        <!--layout="total, sizes, prev, pager, next, jumper"-->
        <!--:total="total"-->
        <!--class="kf-pagination"-->
        <!--v-if="tableData !== null">-->
      <!--</el-pagination>-->
      </div>
  </div>
</template>
<script>
import "../../assets/css/preschoolReview.less";
export default {
  data() {
    return {
      star: 3.7,
      currentPage: 1,
      limitNum: 100,
      total: 0,
      tableData: []
    };
  },
  mounted() {
    this.get_list();
    console.log(111);
  },
  methods: {
    get_list() {
      this.$api.preschoolReview
        .get_preList({ currentPage: this.currentPage, limitNum: this.limitNum })
        .then(res => {
          this.tableData = res.data.results;
          this.currentPage = res.data.paging.currentPage;
          this.limitNum = res.data.paging.limitNum;
          this.total = res.data.paging.total;
          console.log(this.tableData);
        });
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
.pre-listMain {
  display: flex;
  flex-wrap: wrap;
  padding-left: 15px;
  padding-top: 40px;
}
</style>
