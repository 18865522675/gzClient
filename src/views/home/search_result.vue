<template>
  <div class="container">
    <!-- <headModule></headModule> -->
    <div class="my-info">
      <div class="alertMes">
        没有找到“
        <span class="">计算器</span>”相关的书籍，为你推荐“
        <span class="">计算器</span>”的搜索结果。或者试试其他的搜索词。
      </div>
      <div class="info_bar">
        <span class="">默认</span>
        <span class="res_choose">人气</span>
        <span class="res_choose">最新</span>
      </div>
      <div class="book_result">
        <div>
          <!-- <img src="../../assets/img/textbook.png" alt=""> -->
          <div class="bgDiv" :style="{backgroundImage: 'url('+require('../../assets/img/textbook.png')+')'}">
          </div>
          <p>大学计算基础</p>
          <span>1298</span>
        </div>
        <div>
          <div class="bgDiv" :style="{backgroundImage: 'url('+require('../../assets/img/textbook.png')+')'}">
          </div>
          <p>大学计算基础</p>
          <span>1298</span>
        </div>
        <div>
          <div class="bgDiv" :style="{backgroundImage: 'url('+require('../../assets/img/textbook.png')+')'}">
          </div>
          <p>大学计算基础</p>
          <span>1298</span>
        </div>
        <div>
          <div class="bgDiv" :style="{backgroundImage: 'url('+require('../../assets/img/textbook.png')+')'}">
          </div>
          <p>大学计算基础</p>
          <span>1298</span>
        </div>
      </div>
      <!-- 分页 -->
      <div class="block pagin">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="10" layout="total, prev, pager, next" :total="14">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// import headModule from "./header";
export default {
  data() {
    return {
      centerDialogVisible: false
      // currentPage1: 1
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
  // components: { headModule }
};
</script>

<style lang="less">
.my-info {
  width: 1200px;
  margin: 0 auto;
  // padding-top: 20px;
  .info_bar {
    width: 1200px;
    height: 60px;
    box-sizing: border-box;
    line-height: 60px;
    background: #6d8bfa;
    margin-top: 6px;
    padding-left: 40px;
    span {
      font-family: PingFangSC-Regular;
      font-size: 18px;
      color: #ffffff;
      letter-spacing: 0;
      line-height: 33px;
      margin-left: 5px;
      margin-right: 38px;
      cursor: pointer;
    }
    .res_choose {
      padding-right: 18px;
      background-image: url("../../assets/img/down.png");
      background-repeat: no-repeat;
      background-position: 42px 10px;
    }
  }
  .alertMes {
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    font-size: 12px;
    background: #ccc;
    margin-top: 14px;
    padding-left: 40px;
    color: #333;
    span {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #151515;
    }
  }
  .book_result {
    width: 100%;
    margin-top: 40px;
    display: flex;
    div {
      width: 285px;
      height: 400px;
      box-sizing: border-box;
      margin-left: 12px;
      padding-top: 10px;
      box-shadow: 0 1px 2px 0 #cccccc;
      border-radius: 4px;
      border-bottom: 1px solid #e9e9e9;
      .bgDiv {
        width: 212px;
        height: 300px;
        margin: 0 auto;
        background-size: cover;
        background-repeat: no-repeat;
      }
      p {
        width: 212px;
        margin: 28px auto 5px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
        letter-spacing: -0px;
      }
      span {
        display: block;
        width: 212px;
        height: 22px;
        line-height: 22px;
        box-sizing: border-box;
        margin: 0 auto;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #333333;
        letter-spacing: -0px;
        padding-left: 14px;
        // background: green;
        background-image: url("../../assets/img/peoples.png");
        background-repeat: no-repeat;
        background-position: 1px 5px;
      }
    }
  }
  .pagin {
    border-top: 1px solid #e4e4e4;
    text-align: right;
    margin: 50px auto 70px;
    padding-top: 20px;
  }
  .el-pagination__total {
    float: left;
  }
}
.btnstyle {
  width: 180px;
  height: 48px;
  border: 0;
  background: #6d8bfa;
  border-radius: 4px;
  font-family: PingFangSC-Regular;
  font-size: 18px;
  color: #ffffff;
  letter-spacing: 0;
}
</style>
