<template>
  <div class="cl-sr f-cb">
    <div class="sr-type">
      <div class="sr-type-btn">全部专业</div>
      <div class="sr-type-more">
        <div class="more-item-crap" v-for="(item,index) in majorList" :key="index" :label="item.name" :value="item.id">
          <div class="more-item" @click="majorOpen(item.id)" :title="item.name">{{item.name}}</div>
          <div class="more-item-con" v-show="typeParam === item.id" :key="index">
            <ul>
              <li class="sr-li" v-for="(item,index) in courseList" :key="index" @click="courseLive(item.id)"
                  :title="item.name">
                {{item.name}}
              </li>

            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="lr-rt-wrap">
      <div class="sr-header">
        <div class="sr-hd-body">
          <div class="sr-hd-item" :class="{on:topStatus === 3||topStatus === null}" @click="checkStatus(3)">全部</div>
          <div class="sr-hd-item" :class="{on:topStatus === 1}" @click="checkStatus(1)">直播中</div>
          <div class="sr-hd-item" :class="{on:topStatus === 0}" @click="checkStatus(0)">未开始</div>
          <div class="sr-hd-item" :class="{on:topStatus === 2}" @click="checkStatus(2)">已结束</div>
        </div>
      </div>
      <div class="sr-num">
        <!--<div class="sr-num-text" v-show="!total">{{"共搜到"+total+"个课程"}}</div>-->
      </div>
      <div class="sr-con" v-show="!total">
        <h6 class="sr-con-h1">暂无直播课程</h6>
      </div>
      <div class="sr-con" v-show="total">

        <div class="sr-con-item" v-for="(item,index) in list" :key="index">
          <div class="sr-item-left"  :style="{backgroundImage: 'url(\''+(item.coverUrl?item.coverUrl:require('../../assets/img/course_cover1.png'))+'\')'}"
               @click="goLive(item.id,item.courseId)">
            <div class="sr-type-text1"><div class="type-img first"></div><div class="sr-type-txt">{{item.type}}</div><div class="type-img last"></div></div>
          </div>
          <div class="sr-item-right">
            <div class="sr-rt-title" @click="goLive(item.id,item.courseId)">{{item.course}}</div>
            <div class="sr-rt-msg">
              <div class="sr-rt-status"
                   :class="{wait:item.playStatus ===0,on:item.playStatus===1,end:item.playStatus===2}"></div>
              <div class="sr-rt-time">开播时间 {{item.startTime | formatDate}}</div>
              <div class="sr-rt-num">{{item.viewCount}}</div>
              <div class="sr-rt-tea">{{"讲师："+item.teacher}}</div>
            </div>
            <div class="sr-rt-des">{{item.title}}</div>
          </div>
        </div>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          class="sr-page">
        </el-pagination>
      </div>


    </div>
  </div>
</template>

<script>
import "../../assets/css/courseLive.less";
import { formatDate } from "../../components/filters.js";

export default {
  data() {
    return {
      currentPage: 1,
      moreVisible: false,
      typeParam: "",
      majorList: [],
      courseList: [],
      list: [],
      //分页
      pageNum: 1,
      pageSize: 10,
      total: 1,
      topStatus: 3,
      id: null,
      playStatus: null,
      courseId: null
    };
  },
  mounted() {
    console.log(this.$router);
    this.getMajorList();
    this.getList();
  },
  filters: {
    formatDate(time) {
      var data = new Date(time);
      return formatDate(data, "yy-MM-dd hh:mm:ss");
    }
  },

  methods: {
    //获取专业列表
    getMajorList() {
      this.$api.courseLive.majorList().then(res => {
        this.majorList = res.data;
      });
    },
    //获取课程列表
    getCourseList(id) {
      this.courseList = [];
      this.$api.courseLive.courseList({ majorId: id }).then(res => {
        console.log(res);
        this.courseList = res.data;
      });
    },
    //获取直播列表
    getList(playStatus, courseId) {
      this.playStatus = playStatus;
      this.courseId = courseId;
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        courseId: courseId,
        playStatus: playStatus
      };
      this.$api.courseLive.list(params).then(res => {
        this.list = res.data.pageList;
        this.total = res.data.total;
        this.pageNum = res.data.pageNum;
        this.pageSize = res.data.pageSize;

        console.log(this.list);
      });
    },
    //切换状态查看
    checkStatus(status) {
      if (status === 3) {
        status = null;
      }
      this.getList(status, this.id);
      this.topStatus = status;
      console.log(this.id);
    },
    //分页start
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList(this.playStatus, this.courseId);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList(this.playStatus, this.courseId);
    },
    more() {
      this.moreVisible = !this.moreVisible;
    },
    majorOpen(id) {
      console.log(id);
      this.typeParam = id;
      this.getCourseList(id);
    },
    courseLive(id) {
      this.id = id;
      this.getList(null, id);
    },
    goLive(id, courseId) {
      this.$router.push(`/courseLive/liveRoom/${id}/${courseId}`);
    }
  }
};
</script>
<style scoped>
</style>
