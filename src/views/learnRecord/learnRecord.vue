<template>
  <div class="learnRecord">
      <!--学生习题笔记-->
      <div v-if="userInfo.clientRoleType===1">
      <ul class="learnRecord-content">
        <li class="learnRecord-content-items" v-for="(item,index) in stuList" :key="index">
        <div class="learnRecord-content-items-top">
          <div class="learnRecord-content-items-left" :style="{backgroundImage: 'url('+require('../../assets/img/course_cover.png')+')'}" v-if="item.coverUrl==''"></div>
          <div class="learnRecord-content-items-left" :style="{backgroundImage: 'url(\''+item.coverUrl+'\')'}" v-else></div>
          <div class="learnRecord-content-items-right">
            <div class="learnRecord-content-items-right-name">{{item.name}}</div>
            <!--<div class="learnRecord-content-items-right-mark"></div>-->
            <div class="learnRecord-content-items-right-num">{{item.wareCount}}课时</div>
            <div class="learnRecord-content-items-right-time">
              <el-progress :percentage="item.wareSchedule" color="#5e4eaa" class="lr-ep"></el-progress>
            </div>
            <div class="learnRecord-content-items-right-record">
              <div class="learnRecord-content-items-right-exe">登录{{item.studyTimes }}/{{stuNum.studyCount }}</div>
              <div class="learnRecord-content-items-right-exe">习题{{item.finishTaskCount}}/{{stuNum.taskCount}}</div>
              <div class="learnRecord-content-items-right-exe">笔记{{item.finishNoteCount}}/{{stuNum.noteCount}}</div>
            </div>
          </div>
        </div>
          <router-link
            :to="'/learnRecord/commonCourseDetail/'+item.courseId"
            class="learnRecord-content-items-right-button m-h">开始学习</router-link>
        </li>
      </ul>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="limitNum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="kf-pagination">
      </el-pagination>
    </div>



      <!--教师笔记-->
    <div v-if="userInfo.clientRoleType==2">
      <div class="hk-in-search-bd" style="width: 820px;margin: 0 auto">
        <div class="hk-in-search">
          <input type="text" v-model="searchVal" class="hk-in-search-in" placeholder="请输入学生昵称或手机号">
          <div class="hk-in-search-btn" @click="subSearch">搜索</div>
        </div>
      </div>
        <ul class="learnRecord-Th-content-text" v-for="(item,index) in thList" :key="index">
          <li class="learnRecord-Th-content-text-items" @click="bjClick(item.id)">
            <div class="learnRecord-Th-content-text-items-cont">
              <div class="learnRecord-Th-content-text-items-cont-img" :style="{backgroundImage: 'url('+$config.HOST_API+item.avatar+')'}" v-if="item.avatar"></div>
              <div class="learnRecord-Th-content-text-items-cont-img" :style="{backgroundImage: 'url('+require('../../assets/img/home_course_userphoto.png')+')'}" v-else></div>
              <div class="learnRecord-Th-content-text-items-cont-name">{{item.nick}}
                <img src="../../assets/img/course_pro_down.png" alt="" class="learnRecord-Th-content-text-items-cont-tri">
              </div>
            </div>
          </li>
          <ul class="learnRecord-Th-content-text-hidden" v-show="detail===item.id">
            <li class="learnRecord-Th-content-text-hidden-items" v-for="(item,index) in thListDetail" :key="index">
              <div class="learnRecord-Th-content-text-hidden-items-left">{{item.name}}</div>
              <!--<div class="learnRecord-Th-content-text-hidden-items-right">测评成绩100分</div>-->
              <div class="learnRecord-Th-content-text-hidden-items-right">
                <div class="learnRecord-Th-content-text-hidden-items-right-item">登录 {{item.studyTimes }}/{{thNum.studyCount }}</div>
                <div class="learnRecord-Th-content-text-hidden-items-right-item">习题 {{item.finishTaskCount  }}/{{thNum.taskCount}}</div>
                <div class="learnRecord-Th-content-text-hidden-items-right-item">笔记 {{item.finishNoteCount  }}/{{thNum.noteCount}}</div>
              </div>
            </li>
          </ul>
        </ul>
      <div v-if="thList.length===0" style="width: 100%;height: 100px;text-align: center">暂无学生</div>
      <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="currentPage1"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="limitNum1"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total1"
              class="kf-pagination"
      v-if="thList.length!==0">
      </el-pagination>
      </div>
    <!--</div>-->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      searchVal: "",
      currentPage: 1,
      limitNum: 10,
      total: 10,
      tabVisible: false,
      data: 1,
      detail: "",
      thList: "",
      thListDetail: "",
      stuList: "",
      thNum: "",
      stuNum: ""
    };
  },
  computed: mapState(["userInfo"]),
  mounted() {
    if (this.userInfo.clientRoleType === 2) {
      this.get_thList();
    } else if (this.userInfo.clientRoleType === 1) {
      this.get_stuList();
    }
  },
  methods: {
    get_thList() {
      this.$api.learnRecord
        .thLearnList({
          pageNum: this.currentPage1,
          pageSize: this.limitNum1,
          keyword: this.searchVal
        })
        .then(res => {
          this.thList = res.data.pageList;
          this.total1 = res.data.total;
          this.thNum = res.data.extra;
          console.log(this.thList);
        });
    },
    subSearch() {
      this.thList = [];
      this.total = 0;
      this.pageSize = 1;
      this.get_thList();
    },
    bjClick(id) {
      this.$api.learnRecord
        .thLearnDetail({
          id: id
        })
        .then(res => {
          this.thListDetail = res.data;
        });
      if (this.detail === id) {
        this.detail = "";
      } else {
        this.detail = id;
      }
    },
    get_stuList() {
      this.$api.commonCourse
        .getCourseList({
          pageNum: this.currentPage,
          pageSize: this.limitNum,
          studyStatus: ""
        })
        .then(res => {
          this.stuList = res.data.pageList;
          this.total = res.data.total;
          this.stuNum = res.data.extra;
          console.log(this.thList);
        });
    },
    handleSizeChange(val) {
      this.limitNum = val;
      this.get_stuList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.get_stuList();
    },
    handleSizeChange1(val) {
      this.limitNum1 = val;
      this.get_thList();
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val;
      this.get_thList();
    },
    tabCheck(type) {
      if (type === 1) {
        this.tabVisible = false;
      } else {
        this.tabVisible = true;
      }
    }
  }
};
</script>

<style lang="less">
.learnRecord {
  width: 1200px;
  margin: 34px auto 0;
  .learnRecord-header {
    display: block;
    width: 100%;
    height: 66px;
    background: #ffffff;
    border-radius: 5px;
  }
  .icon1 {
    background: url("../../assets/img/lr_dot.png");
  }
  .learnRecord-header-body {
    display: flex;
    align-items: center;
    width: 972px;
    padding-left: 40px;
    height: 100%;
  }
  .learnRecord-header-item {
    height: 48px;
    line-height: 48px;
    color: #989898;
    font-size: 18px;
    margin-right: 75px;
    cursor: pointer;
  }
  .on {
    color: #000000;
  }
  .learnRecord-content1 {
    width: 100%;
    height: 430px;
    background: #ffffff;
    margin-top: 10px;
    border-radius: 5px;
    .content1-con {
      margin: 0 auto;
      padding: 130px 0;
      padding-left: 70px;
      width: 1130px;
      height: 80px;
    }
    .content1-footer {
      float: right;
      width: 280px;
      height: 70px;
      margin-right: 28px;
      .content1-footer-tit {
        width: 100%;
        height: 35px;
        text-align: right;
        line-height: 35px;
      }
      .content1-footer-des {
        width: 100%;
        height: 35px;
        line-height: 35px;
        color: #989898;
        font-size: 16px;
      }
    }
  }
  .learnRecord-content {
    width: 100%;
    overflow: hidden;
    .learnRecord-content-items {
      width: 380px;
      height: 270px;
      margin: 30px 30px 0 0;
      border-radius: 10px;
      background-color: #fff;
      float: left;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .learnRecord-content-items-top {
        float: left;
        height: 220px;
        width: 380px;
        display: flex;
        align-items: center;
        .learnRecord-content-items-left {
          width: 122px;
          height: 185px;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          border-radius: 10px;
          margin: 0 10px 0 17px;
        }
        .learnRecord-content-items-right {
          height: 185px;
          width: 231px;
          .learnRecord-content-items-right-name {
            height: 64px;
            line-height: 32px;
            font-size: 16px;
          }
          .learnRecord-content-items-right-mark {
            height: 16px;
            width: 47px;
            line-height: 16px;
            text-align: center;
            border: 1px solid #e84c45;
            color: #e84c45;
            font-size: 12px;
            margin: 9px 0;
          }
          .learnRecord-content-items-right-num {
            height: 28px;
            line-height: 28px;
            /*font-size: 16px;*/
            color: #989898;
            font-size: 12px;
            margin-bottom: 6px;
          }
          .learnRecord-content-items-right-time {
            height: 37px;
            line-height: 37px;
            font-size: 16px;
          }
          .lr-ep {
            margin-top: 30px;
          }
          .learnRecord-content-items-right-record {
            height: 26px;
            width: 96%;
            font-size: 16px;
            display: flex;
            justify-content: space-between;
            .learnRecord-content-items-right-exe {
              /*height: 100%;*/
              /*width: 33%;*/
              line-height: 26px;
              /*float: left;*/
              font-size: 12px;
              /*margin-right: 3%;*/
            }
            .learnRecord-content-items-right-note {
              height: 100%;
              width: 33%;
              line-height: 26px;
              float: left;
              font-size: 14px;
              margin-right: 3%;
            }
          }
        }
      }
      .learnRecord-content-items-right-button {
        clear: both;
        width: 346px;
        height: 45px;
        margin: 0 auto;
        background-color: #ffba4e;
        line-height: 45px;
        text-align: center;
        font-size: 18px;
        border-radius: 6px;
        display: block;
        color: #000;
      }
    }
  }
  .learnRecord-Th-content {
    width: 110%;
    overflow: hidden;
    .learnRecord-Th-content-items {
      float: left;
      width: 180px;
      height: 210px;
      background-color: #fff;
      margin: 17px 24px 0 0;
      border-radius: 10px;
      .learnRecord-Th-content-items-photo {
        height: 80px;
        width: 80px;
        border-radius: 50%;
        margin: 34px auto 6px;
        font-size: 0;
        .learnRecord-Th-content-items-photo-img {
          border-radius: 50%;
          width: 80px;
          height: 80px;
        }
      }
      .learnRecord-Th-content-items-name {
        height: 47px;
        width: 100%;
        line-height: 47px;
        text-align: center;
      }
      .learnRecord-Th-content-items-num {
        width: 74px;
        height: 29px;
        text-align: center;
        line-height: 29px;
        background: #ffba4e;
        border-radius: 30px;
        margin: 0 auto;
      }
    }
  }
  .learnRecord-Th-content-text {
    width: 820px;
    margin: 0 auto;
    .learnRecord-Th-content-text-items {
      width: 100%;
      height: 60px;
      margin-top: 16px;
      background: #fff;
      cursor: pointer;
      .learnRecord-Th-content-text-items-cont {
        width: 90%;
        height: 60px;
        /*margin:0 7% 0 3%;*/
        margin-left: 3%;
        position: relative;
        .learnRecord-Th-content-text-items-cont-img {
          width: 34px;
          height: 34px;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          position: absolute;
          top: 13px;
        }
        .learnRecord-Th-content-text-items-cont-name {
          line-height: 60px;
          margin-left: 56px;
        }
        .learnRecord-Th-content-text-items-cont-tri {
          width: 12px;
          height: 10px;
          float: right;
          margin-top: 24px;
        }
      }
    }
    .learnRecord-Th-content-text-hidden-items {
      height: 64px;
      line-height: 64px;
      background: #f6ebdb;
      .learnRecord-Th-content-text-hidden-items-left {
        width: 40%;
        float: left;
        margin-left: 3%;
      }
      .learnRecord-Th-content-text-hidden-items-right {
        width: 57%;
        float: left;
        display: flex;
        justify-content: space-between;
        .learnRecord-Th-content-text-hidden-items-right-item {
          float: left;
          width: 24%;
          margin-left: 5%;
        }
      }
    }
  }
}
.kf-pagination {
  float: right;
  padding: 20px 0;
}
</style>
