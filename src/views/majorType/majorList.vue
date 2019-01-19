<template>
  <div class="cl-sr">
    <!--<div class="sr-result" v-if="!resultHas">-->
    <!--很抱歉，我们没有为您找到“涉及学”相关的课件，为你推荐“设计学”的搜索结果。或者试试其他的搜索词-->
    <!--</div>-->
    <!--<div class="sr-header" style="margin-top: 20px">-->
    <!--<div class="sr-hd-body">-->
    <!--<router-link to="" class="sr-hd-item on">全部</router-link>-->
    <!--<router-link to="" class="sr-hd-item">专业课</router-link>-->
    <!--<router-link to="" class="sr-hd-item">公共课</router-link>-->
    <!--<router-link to="" class="sr-hd-item">选修课</router-link>-->
    <!--</div>-->
    <!--</div>-->
    <div class="hk-in-search">
      <input type="text" v-model="searchVal" class="hk-in-search-in" placeholder="请输入专业名称">
      <div class="hk-in-search-btn" @click="subSearch">搜索</div>
    </div>
    <div class="sr-num">
      <div class="sr-num-text">{{"共搜到"+total+"个专业"}}</div>
    </div>
    <div class="f-cb major-items">
        <div class="major-item" v-for="(item,index) in list" :key="index"
             :style="{backgroundImage: 'url(\''+(item.coverUrl?item.coverUrl:require('../../assets/img/major_cover1.png'))+'\')'}"
             @click="typeDetail(item.id)">
          <div class="s-home-major-name">{{item.name}}</div>
        </div>

    </div>
    <div class="mt-page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[18, 36, 72, 144]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="float: right;">
      </el-pagination>
    </div>
  </div>




</template>

<script>
import "../../assets/css/majorType.less";
export default {
  data() {
    return {
      currentPage: 1,
      moreVisible: false,
      id: this.$router.history.current.params.id,
      list: [],
      pageNum: 1,
      pageSize: 18,
      total: 0,
      searchVal: ""
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    //获取专业列表
    getList() {
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        majorName: this.searchVal
      };
      console.log(this.searchVal);
      this.$api.search.majorList(params).then(res => {
        this.list = res.data.pageList;
        this.pageNum = res.data.pageNum;
        this.pageSize = res.data.pageSize;
        this.total = res.data.total;
        // console.log(this.list)
      });
    },
    subSearch() {
      this.total = 0;
      this.pageSize = 18;
      this.getList();
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
    typeDetail(id) {
      this.$router.push(`/majorType/majorType/${id}`);
    }
  }
};
</script>
<style scoped>
</style>
