<template>
  <div>
    <div class="kf-curMy-book" v-show="type===0" v-if="headStatus">
      <div class="kf-curMy-book-img" :style="{backgroundImage: 'url('+require('../../public/static/background.png')+')'}"></div>
      <div class="kf-curMy-book-cont">
        <div class="kf-curMy-book-cap">马克思主义基本原理概论（上）</div>
        <div class="kf-curMy-book-tit">作者：孟大爷</div>
        <div class="kf-curMy-book-text">马克思主义基本原理是关于无产阶级和人类解放的科学，物质世界的本质及其发展，认识世界和改造世界，社会结构，社会发展规律与历史主体，资本主义的形成及其本质，资本主义的发展进程，社会主义制度的建立及其发展，共产主义是人类最崇高的社会理想等</div>
        <div class="kf-curMy-book-ft">
          <div class="kf-curMy-book-btn" @click="book_look">开始阅读</div>
          <div class="kf-curMy-book-btn none">下本阅读</div>
        </div>
      </div>
    </div>
    <div class="kf-curMy-kj-list" v-show="type===0">
      <div class="kf-curMy-kj-item" :class="{on: item.on}" @click="book_look(item)" v-for="(item, index) in bookList" :key="index">
        <div class="kf-curMy-kj-left">
          <div class="kf-curMy-kj-cap">第{{index+1}}讲</div>
          <div class="kf-curMy-kj-text">{{item.name}}</div>
        </div>
        <div class="kf-curMy-kj-right">
          <div class="kf-curMy-kj-btn">开始阅读</div>
        </div>
      </div>
      <div class="kf-listNot" v-if="!bookList.length">当前没有书籍</div>
    </div>
    <div class="kf-curMy-bookLook" v-if="type===1">
      <div class="kf-curMy-bookLook-bd">
        <div class="kf-curMy-bookLook-return" @click="book_return">返回目录</div>
        <template v-if="bookImg&&bookStatus">
          <div class="kf-curMy-bookLook-play" @click="bookStatus = false"></div>
          <div class="kf-curMy-bookLook-make" :style="{backgroundImage: 'url('+bookImg+')'}"></div>
        </template>
        <iframe :src="bookSrc" frameborder="0" class="kf-curMy-bookLook-frame"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/css/curriculumLearning.less";
export default {
  data() {
    return {
      type: 0, // 0 列表，1 详情
      bookList: [],
      bookSrc: "",
      bookImg: "",
      bookStatus: true
    };
  },
  props: ["headStatus", "planId", "courseId"],
  watch: {
    planId: function() {
      if (this.planId) {
        this.get_book_list();
      }
    },
    //入学复习书籍
    courseId: function() {
      if (this.courseId) {
        this.get_pertutaor_book_list();
      }
    }
  },
  mounted() {},
  methods: {
    //入学复习获取书籍
    get_pertutaor_book_list() {
      this.$api.preschoolReview
        .get_pertutaor_book_list({
          currentPage: 1,
          limitNum: 10000,
          courseId: this.courseId
        })
        .then(res => {
          res.data.results ? (this.bookList = res.data.results) : this.bookList;
          this.bookList.map(item => (item.on = false));
          this.$emit("update:getList", this.bookList);
        })
        .catch(res => {
          console.log(res);
        });
    },
    //获取书籍
    get_book_list() {
      this.$api.curriculumLearning
        .get_book_list({
          currentPage: 1,
          limitNum: 10000,
          planId: this.planId
        })
        .then(res => {
          res.data.results ? (this.bookList = res.data.results) : this.bookList;
          this.bookList.map(item => (item.on = false));
          this.$emit("update:getList", this.bookList);
        })
        .catch(res => {
          console.log(res);
        });
    },
    book_look(item) {
      if (item.playUrl.indexOf("http://") > -1) {
        item.on = true;
        this.type = 1;
        this.bookSrc = this.planId ? item.url : item.playUrl;
        this.bookImg = item.logo;
        this.bookStatus = true;
        this.$nextTick(() => {
          window.scrollTo(0, 1006);
        });
      } else {
        this.$message.error("书籍地址不合法");
      }
    },
    book_return() {
      this.type = 0;
    }
  }
};
</script>

<style lang="less">
</style>
