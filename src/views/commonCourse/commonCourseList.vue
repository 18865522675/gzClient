<template>
    <div class="commonCourseList">
        <!--学生列表-->
        <div v-if="userInfo.clientRoleType===1">
            <div class="commonCourseList-header">
                <div class="commonCourseList-header-body">
                    <div class="commonCourseList-header-item" :class="{on:chooseStatus ===null}" @click="checkStatus(null)">全部</div>
                    <div class="commonCourseList-header-item " :class="{on:chooseStatus ===1}" @click="checkStatus(1)">未开始</div>
                    <div class="commonCourseList-header-item " :class="{on:chooseStatus ===2}" @click="checkStatus(2)">学习中</div>
                    <div class="commonCourseList-header-item " :class="{on:chooseStatus ===3}" @click="checkStatus(3)">已完成</div>
                </div>
            </div>
            <ul class="commonCourseList-content" v-show="!list"><h1>暂无学习课程</h1></ul>
            <ul class="commonCourseList-content" v-show="list">
                <li class="commonCourseList-content-items" v-for="(item,index) in list" :key="index">
                    <div class="commonCourseList-content-items-left" :style="{backgroundImage: 'url(\''+item.coverUrl+'\')'}" v-if="item.coverUrl"></div>
                    <div class="commonCourseList-content-items-left" :style="{backgroundImage: 'url('+require('../../assets/img/course_cover.png')+')'}" v-else></div>
                    <div class="commonCourseList-content-items-right">
                        <div class="commonCourseList-content-items-right-name">{{item.name}}</div>
                        <div class="commonCourseList-content-items-right-mark"></div>
                        <div class="commonCourseList-content-items-right-num">{{item.wareCount+"课时"}}</div>
                        <div class="commonCourseList-content-items-right-time" v-show="item.lastStudyTime">上次学习时间:{{item.lastStudyTime | formatDate}}</div>
                        <div class="commonCourseList-content-items-right-time" v-show="!item.lastStudyTime">上次学习时间:</div>
                        <div class="commonCourseList-content-items-right-button m-h" @click="goDetail(item.courseId)">开始学习</div>
                    </div>
                </li>

            </ul>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                class="kf-pagination">
            </el-pagination>
        </div>
        <!--教师列表-->
        <div v-if="userInfo.clientRoleType===2">
            <ul class="commonCourseList-content">
                <li class="commonCourseList-content-items" v-for="(item,index) in thList" :key="index">
                    <div class="commonCourseList-content-items-left" :style="{backgroundImage: 'url(\''+item.coverUrl+'\')'}" v-if="item.coverUrl"></div>
                    <div class="commonCourseList-content-items-left" :style="{backgroundImage: 'url('+require('../../assets/img/course_cover.png')+')'}" v-else></div>
                    <div class="commonCourseList-content-items-right">
                        <div class="commonCourseList-content-items-right-name">{{item.course}}</div>
                        <div class="commonCourseList-content-items-right-mark"></div>
                        <div class="commonCourseList-content-items-right-num">{{item.wareCount}}课时</div>
                        <div class="commonCourseList-content-items-right-time" v-if="item.lastReferTime===null">上次查阅时间: --</div>
                        <div class="commonCourseList-content-items-right-time" v-else>上次查阅时间: {{item.time}}</div>
                        <div class="commonCourseList-content-items-right-button m-h" @click="goDetail(item.id)">开始查阅</div>
                    </div>
                </li>
            </ul>
            <div style="text-align: center;padding: 20px 0;" v-if="thList.length===0">暂无课程</div>
            <el-pagination
              v-if="thList.length!==0"
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page="currentPage1"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="limitNum1"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total1"
                    class="kf-pagination">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { formatDate } from "../../components/filters.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      currentPage: 1,
      limitNum: 10,
      total: 10,
      currentPage1: 1,
      limitNum1: 10,
      total1: 10,
      pageSize: 10,
      pageNum: 1,
      list: {},
      chooseStatus: null,
      thList: ""
    };
  },
  computed: mapState(["userInfo"]),
  mounted() {
    if (this.userInfo.clientRoleType === 1) {
      this.getList();
    } else {
      this.get_th_list();
    }
  },
  filters: {
    formatDate(time) {
      var data = new Date(time);
      return formatDate(data, "MM-dd");
    }
  },
  methods: {
    //获取课程列表
    getList(type) {
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        studyStatus: type
      };
      this.$api.commonCourse.getCourseList(params).then(res => {
        this.list = res.data.pageList;
        this.pageNum = res.data.pageNum;
        this.pageSize = res.data.pageSize;
        this.total = res.data.total;
        console.log(this.list);
      });
    },
    get_th_list() {
      this.$api.commonCourse
        .getThCourseList({
          pageNum: this.currentPage1,
          pageSize: this.limitNum1
        })
        .then(res => {
          this.thList = res.data.pageList;
          this.total1 = res.data.total;
          this.thList.forEach(item => {
            item.time = this.$fun.table.time(null, null, item.lastReferTime);
          });
        });
    },
    checkStatus(type) {
      this.chooseStatus = type;
      console.log(type);
      this.getList(type);
    },
    goDetail(id) {
      console.log(555);
      if (this.userInfo.clientRoleType === 1) {
        this.$router.push(`/myStudy/commonCourseDetail/${id}`);
      } else if (this.userInfo.clientRoleType === 2) {
        this.$router.push(`/commonCourse/commonCourseDetail/${id}`);
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    },
    handleSizeChange1(val) {
      this.limitNum1 = val;
      this.get_th_list();
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val;
      this.get_th_list();
    }
  }
};
</script>

<style lang="less">
.commonCourseList {
  width: 1200px;
  margin: 34px auto 0;
  .commonCourseList-header {
    display: block;
    width: 100%;
    height: 66px;
    background: #ffba4e;
    border-radius: 5px;
  }
  .commonCourseList-header-body {
    display: flex;
    align-items: center;
    width: 972px;
    padding-left: 40px;
    height: 100%;
    margin: 0 auto;
  }
  .commonCourseList-header-item {
    height: 48px;
    line-height: 48px;
    color: #ffffff;
    font-size: 18px;
    margin-right: 75px;
    cursor: pointer;
  }
  .on {
    color: #2a2e43;
  }
  .commonCourseList-content {
    width: 100%;
    overflow: hidden;
    h1 {
      width: 100%;
      height: 100px;
      font-size: 30px;
      text-align: center;
      line-height: 100px;
    }
    .commonCourseList-content-items {
      float: left;
      height: 220px;
      width: 380px;
      margin: 30px 30px 0 0;
      border-radius: 10px;
      background-color: #fff;
      display: flex;
      align-items: center;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .commonCourseList-content-items-left {
        width: 122px;
        height: 185px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        border-radius: 10px;
        margin: 0 10px 0 17px;
      }
      .commonCourseList-content-items-right {
        height: 185px;
        width: 231px;
        .commonCourseList-content-items-right-name {
          height: 32px;
          line-height: 32px;
          font-size: 16px;
          width: 206px;
          /*white-space: nowrap;*/
          /*text-overflow: ellipsis;*/
          /*overflow: hidden;*/
        }
        .commonCourseList-content-items-right-mark {
          height: 16px;
          width: 47px;
          line-height: 16px;
          text-align: center;
          /*border: 1px solid #e84c45;*/
          color: #e84c45;
          font-size: 12px;
          margin: 9px 0;
        }
        .commonCourseList-content-items-right-num {
          height: 28px;
          line-height: 28px;
          font-size: 16px;
          color: #989898;
          font-size: 12px;
          margin-bottom: 6px;
        }
        .commonCourseList-content-items-right-time {
          height: 37px;
          line-height: 37px;
          font-size: 13px;
        }
        .commonCourseList-content-items-right-button {
          width: 217px;
          height: 45px;
          background-color: #ffba4e;
          line-height: 45px;
          text-align: center;
          font-size: 18px;
          border-radius: 6px;
          display: block;
          color: #000;
          cursor: pointer;
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
