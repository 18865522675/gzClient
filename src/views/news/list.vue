<template>
  <div class="g-module">
    <div class="kf-head">
      <div class="kf-head-cap">
        <b>我的消息</b>
        <small>MESSAGES</small>
      </div>
    </div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" class="nav">
      <el-tab-pane label="全部" name="first">
        <ul class="line" style="margin-bottom:20px">
          <li v-on:mouseenter="dataDetails" v-on:mouseleave="hiddenDetail" v-for="(item,index) in newsList"
              :key="index">
            <!-- <router-link :to="{name:'myCourse',params:{tabInd:3,planId:item.planId,wareCourseId:item.wareCourseId,courseName:item.courseName}}" v-if="item.type==3" class="title">【留言回复】{{item.title}}</router-link> -->
            <div class="title" style="cursor:pointer"
                 @click="goDetail_List_reply(item.id,item.planId,item.wareCourseId,item.courseName)"
                 v-if="item.type==3">【留言回复】{{item.title}}
            </div>
            <router-link :to="{name:'systemNews',params:{id:item.id,type:item.type}}" class="title"
                         v-if="item.type==1||item.type==2">【系统消息】{{item.title}}
            </router-link>
            <p>
              <el-badge is-dot class="item" v-if="item.readed==false"></el-badge>
              <span class="concent1" v-if="item.type==3">{{item.userName}}：{{item.content}}</span>
              <span class="concent1" v-if="item.type==1||item.type==2">{{item.content}}</span>
              <img src="../../assets/img/cancel.png" alt="" class="pic" @click="del(item.id,item.type)" v-show="show"
                   v-if="item.type==0||item.type==2||item.type==1">
              <img src="../../assets/img/cancel.png" alt="" class="pic" @click="del_reply(item.id)" v-show="show"
                   v-if="item.type==3">
            </p>
            <p>{{item.newsListTime}}</p>
          </li>
        </ul>
        <div class="kf-listNot" v-if="!newsList.length">暂无内容</div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="limitNum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          class="kf-pagination"
          v-if="newsList.length!==0">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="系统消息" name="second">
        <ul class="line" style="margin-bottom:20px;">
          <li v-on:mouseenter="dataDetails(index)" v-on:mouseleave="hiddenDetail(index)" v-for="(item,index) in sysNews"
              :key="index">
            <router-link :to="{name:'systemNews',params:{id:item.id,type:item.type}}" class="title">
              【系统消息】{{item.name}}
            </router-link>
            <p>
              <el-badge is-dot class="item" v-if="item.readed==0"></el-badge>
              <span class="concent1">{{item.content}}</span>
              <img src="../../assets/img/cancel.png" alt="" class="pic" @click="del1(item.id,item.type)" v-show="show">
            </p>
            <p>{{item.sysTime}}</p>
          </li>
        </ul>
        <div class="kf-listNot" v-if="!sysNews">暂无内容</div>
        <el-pagination
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :current-page="currentPage1"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="limitNum1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total1"
          class="kf-pagination"
          v-if="sysNews">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="留言回复" name="third">
        <ul class="line" style="margin-bottom:20px">
          <li v-on:mouseenter="dataDetails" v-on:mouseleave="hiddenDetail" v-for="(item,index) in newsReply"
              :key="index">
            <!-- <router-link :to="{name:'myCourse',params:{tabInd:3,planId:item.planId,wareCourseId:item.wareCourseId,courseName:item.courseName}}" class="title">【留言回复】{{item.questionContent}}</router-link> -->
            <div class="title" style="cursor:pointer"
                 @click="goDetail_reply(item.id,item.planId,item.wareCourseId,item.courseName)">
              【留言回复】{{item.questionContent}}
            </div>
            <p>
              <el-badge is-dot class="item" v-if="item.readed==0"></el-badge>
              <span class="concent">{{item.userName}}：{{item.answerContent}}</span>
              <img src="../../assets/img/cancel.png" alt="" class="pic" @click="del2(item.id)" v-show="show">
            </p>
            <p>2018-05-16 18:32:01</p>
          </li>
        </ul>
        <div class="kf-listNot" v-if="!newsReply">暂无内容</div>
        <el-pagination
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page="currentPage2"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="limitNum2"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total2"
          class="kf-pagination"
          v-if="newsReply">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>

    <!-- <el-dialog title="温馨提示" :visible.sync="dialogAddVisible" width="35%" left>
        <div class="dia_content-news">
          <p>你确定要删除这条消息？</p>
          <div class="know-news">
            <span @click="dialogAddVisible = false">取消</span>
            <span @click="comfirm">确定</span>
          </div>
        </div>
      </el-dialog> -->
  </div>

</template>

<script>
import "../../assets/css/system/news.less";

export default {
  data() {
    return {
      activeName2: "first",
      dialogAddVisible: false,
      news: "",
      show: false,
      sysNews: "",
      jsonStr: [],
      currentPage: 1,
      limitNum: 10,
      total: 10,
      currentPage1: 1,
      limitNum1: 10,
      total1: 10,
      currentPage2: 1,
      limitNum2: 10,
      total2: 10,
      newsList: "",
      newsReply: ""
    };
  },
  components: {},
  mounted() {
    this.get_List();
  },
  methods: {
    get_List() {
      this.$api.news
        .get_news({
          currentPage: this.currentPage,
          limitNum: this.limitNum
        })
        .then(res => {
          console.log(res);
          this.newsList = res.data.results;
          this.total = res.data.paging.total;
          this.newsList.forEach(item => {
            item.newsListTime = this.$fun.table.time(
              null,
              null,
              item.createTime
            );
          });
          console.log(this.newsList);
        })
        .catch(res => {
          console.log(res);
        });
      this.$api.news
        .get_sys({
          currentPage: this.currentPage1,
          limitNum: this.limitNum1
        })
        .then(res => {
          console.log(res);
          this.sysNews = res.data.results;
          this.total1 = res.data.paging.total;
          console.log(this.sysNews.index);

          console.log(this.sysNews);
          this.sysNews.forEach(item => {
            item.sysTime = this.$fun.table.time(null, null, item.createTime);
          });
        })
        .catch(res => {
          console.log(res);
        });
      this.$api.news
        .get_reply({
          type: 2,
          currentPage: this.currentPage2,
          limitNum: this.limitNum2
        })
        .then(res => {
          console.log(res.data.results);
          this.newsReply = res.data.results;
          this.total2 = res.data.paging.total;
          // this.news = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    dataDetails(id) {
      console.log(id);
      this.show = true;
    },
    hiddenDetail() {
      this.show = false;
    },
    del_reply(id) {
      console.log(id);
      this.$confirm("你确定要删除这条消息？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$api.news
            .get_reply_del({
              answerId: id
            })
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.get_List();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    del(id, type) {
      console.log(id, type);
      this.$confirm("你确定要删除这条消息？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.jsonStr.push({ id: id, type: type });
          this.$api.news
            .get_sys_del({
              jsonStr: JSON.stringify(this.jsonStr)
            })
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.get_List();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    del1(id, type) {
      console.log(123);
      this.$confirm("你确定要删除这条消息？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.jsonStr.push({ id: id, type: type });
          this.$api.news
            .get_sys_del({
              jsonStr: JSON.stringify(this.jsonStr)
            })
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.get_List();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    del2(id) {
      console.log(id);
      this.$confirm("你确定要删除这条消息？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          // this.del_ajax({ jsonStr: this.jsonStr });
          this.$api.news
            .get_reply_del({
              answerId: id
            })
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.get_List();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    goDetail_reply(id, planId, wareCourseId, courseName) {
      this.$api.news
        .get_reply_update({
          answerId: id
        })
        .then(res => {
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
      console.log(planId, wareCourseId, courseName);
      this.$router.push({
        name: "myCourse",
        params: {
          tabInd: 3,
          planId: planId,
          wareCourseId: wareCourseId,
          courseName: courseName
        }
      });
    },
    goDetail_List_reply(id, planId, wareCourseId, courseName) {
      this.$api.news
        .get_reply_update({
          answerId: id
        })
        .then(res => {
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
      console.log(planId, wareCourseId, courseName);
      this.$router.push({
        name: "myCourse",
        params: {
          tabInd: 3,
          planId: planId,
          wareCourseId: wareCourseId,
          courseName: courseName
        }
      });
    },
    handleSizeChange(val) {
      this.limitNum = val;
      this.get_List();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.get_List();
    },
    handleSizeChange1(val) {
      this.limitNum1 = val;
      this.get_List();
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val;
      this.get_List();
    },
    handleSizeChange2(val) {
      this.limitNum2 = val;
      this.get_List();
    },
    handleCurrentChange2(val) {
      this.currentPage2 = val;
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
