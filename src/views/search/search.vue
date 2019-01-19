<template>
  <div class="cl-sr">
    <div class="sr-result" :style="{backgroundImage: 'url('+require('../../assets/img/sr_search.png')+')'}" v-if="!resultHas">
      {{"很抱歉，我们没有为您找到“"+keyWord+"”相关的课程，试试其他的搜索词"}}
    </div>
    <div class="sr-header" v-if="resultHas">
      <div class="sr-hd-body">
        <a href="javascript:;" class="sr-hd-item on">课程</a>
      </div>
    </div>
    <div class="sr-num" v-if="resultHas">
      <div class="sr-num-text">{{"共搜到"+total+"个课程"}}</div>
    </div>
    <div class="sr-con">
      <div class="sr-con-item" v-for="(item,index) in list" :key="index">
        <div class="sr-item-left"  :style="{backgroundImage: 'url(\''+(item.coverUrl?item.coverUrl:require('../../assets/img/course_cover1.png'))+'\')'}">
          <!--<div class="sr-type-text1"><div class="type-img first"></div><div class="sr-type-txt">{{item.type}}</div><div class="type-img last"></div></div>-->
        </div>
        <div class="sr-item-right">
          <div class="sr-rt-title">{{item.name }}</div>
          <div class="sr-rt-msg">
            <div class="sr-rt-time">{{item.wareCount+"课时"}}</div>
            <div class="sr-rt-num">{{item.selectCount}}人在学</div>
            <!--<div class="sr-rt-tea">讲师:齐江华</div>-->
          </div>
          <div class="sr-rtt-des">{{item.summary}}</div>
          <div class="sr-rt-group">
            <div class="sr-rt-btn" @click="courseDetail(item.id)">课程详情</div>
            <div class="sr-rt-btn" @click="courseList(item.id)">课程直播</div>
          </div>
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
        class="sr-page"
        v-if="resultHas">
      </el-pagination>

    </div>

  </div>
</template>

<script>
import "../../assets/css/search.less";
export default {
  data() {
    return {
      currentPage: 1,
      moreVisible: false,
      resultHas: true,
      list: [],
      keyWord: "",
      pageSize: 10,
      pageNum: 1,
      total: 1
    };
  },
  mounted() {
    this.keyWord = this.$route.params.keyWord;
    this.getList();
    console.log(this.keyWord);
  },
  methods: {
    //获取搜索结果列表
    getList() {
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        keyword: this.keyWord === "null" ? "" : this.keyWord
      };
      this.$api.search.listBykeyWord(params).then(res => {
        this.list = res.data.pageList;
        this.pageSize = res.data.pageSize;
        this.pageNum = res.data.pageNum;
        this.total = res.data.total;
        if (res.data.total === 0) {
          this.resultHas = false;
        } else {
          this.resultHas = true;
        }
        console.log(res.data.total);
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    },
    more() {
      this.moreVisible = !this.moreVisible;
    },
    courseDetail(id) {
      this.$router.push(`/majorType/courseDetail/${id}`);
    },
    courseList(id) {
      this.$router.push(`/courseLive/searchResult1/${id}`);
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.keyWord = to.params.keyWord;
    this.getList();
    next();
  }
};
</script>
<style scoped>
</style>
