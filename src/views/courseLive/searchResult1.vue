<template>
  <div class="cl-sr">

    <div class="sr-header">
      <div class="sr-hd-body">
        <div class="sr-hd-item on">全部</div>
        <!--<div class="sr-hd-item" :class="{on:topStatus === 1}" @click="checkStatus(1)">直播中</div>-->
        <!--<div class="sr-hd-item" :class="{on:topStatus === 0}" @click="checkStatus(0)">未开始</div>-->
        <!--<div class="sr-hd-item" :class="{on:topStatus === 2}" @click="checkStatus(2)">已结束</div>-->
      </div>
    </div>
    <div class="sr-num">
      <!--<div class="sr-num-text">{{"共搜到"+total+"个课程"}}</div>-->
    </div>
    <div class="sr-con">

      <div class="sr-con-item" v-for="(item,index) in list" :key="index">
        <div class="sr-item-left"  :style="{backgroundImage: 'url(\''+(item.coverUrl?item.coverUrl:require('../../assets/img/course_cover.png'))+'\')'}"
             @click="goLive(item.id,item.courseId)">
          <!--<div class="sr-type-tag"></div>-->
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
      <!--<div class="sr-type">-->
        <!--<div class="sr-type-btn">全部专业</div>-->
        <!--<div class="sr-type-more">-->
          <!--<div class="more-item-crap" v-for="(item,index) in majorList" :key="index" :label="item.name" :value="item.id">-->
            <!--<div class="more-item" :style="{backgroundImage: 'url('+item.coverUrl+')'}"  @click="majorOpen(item.id)">{{item.name}}</div>-->
            <!--<div class="more-item-con" v-show="moreMajor&&typeParam === item.id" :key="index">-->
            <!--<ul>-->
            <!--<li class="sr-li" v-for="(item,index) in courseList" :key="index" @click="courseDetail(item.id)">{{item.name}}</li>-->

            <!--</ul>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>

  </div>
</template>

<script>
import "../../assets/css/courseLive.less";
import { formatDate } from "../../components/filters.js";
export default {
  data() {
    return {
      id: this.$router.history.current.params.id,
      currentPage: 1,
      moreVisible: false,
      moreMajor: false,
      typeParam: "",
      majorList: [],
      courseList: [],
      list: [],

      //分页
      pageNum: 1,
      pageSize: 10,
      total: 1
    };
  },
  mounted() {
    console.log(this.$router);

    this.getList();
  },
  filters: {
    formatDate(time) {
      var data = new Date(time);
      return formatDate(data, "yy-MM-dd hh:mm:ss");
    }
  },

  methods: {
    //获取直播列表
    getList() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        courseId: this.id
      };
      this.$api.courseLive.list(params).then(res => {
        this.list = res.data.pageList;
        this.total = res.data.total;
        this.pageNum = res.data.pageNum;
        this.pageSize = res.data.pageSize;
        console.log(this.list);
      });
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
      console.log(111);
      this.moreMajor = !this.moreMajor;

      if (this.typeParam === "") {
        this.typeParam = id;
        this.getCourseList(id);
      } else {
        this.typeParam = "";
      }
    },
    courseLive(id) {
      this.$router.push(`/courseLive/liveRoom/${id}`);
    },
    goLive(id, courseId) {
      this.$router.push(`/courseLive/liveRoom/${id}/${courseId}`);
    }
  }
};
</script>
<style scoped>
</style>
