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
    <div class="sr-num">
      <div class="sr-num-text">{{"共搜到"+total+"个课程"}}</div>
    </div>
    <div class="sr-con majT-bd f-cb">
      <div class="mt-item" v-for="(item,index) in list" :key="index">
        <div class="mt-item-left m-h"  :style="{backgroundImage: 'url(\''+(item.coverUrl?item.coverUrl:require('../../assets/img/ware_cover.png'))+'\')'}" @click="toDetail(item.id)"></div>
          <div class="mt-item-rt">
          <div class="mt-item-tit m-h" @click="toDetail(item.id)">{{item.name}}</div>
          <div class="mt-item-num">
            <div class="mt-item-mjTag">专业课</div>
            <span>{{item.selectCount+"人在学"}}</span>
          </div>
          <div class="mt-item-des">{{item.summary}}</div>
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
        style="float: right;">
        </el-pagination>
      </div>

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
      pageSize: 10,
      total: 0
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
        majorId: this.id
      };
      this.$api.search.listByMajor(params).then(res => {
        this.list = res.data.pageList;
        this.pageNum = res.data.pageNum;
        this.pageSize = res.data.pageSize;
        this.total = res.data.total;
        // console.log(this.list)
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
    toDetail(id) {
      this.$router.push(`/majorType/courseDetail/${id}`);
    }
  }
};
</script>
<style scoped>
</style>
