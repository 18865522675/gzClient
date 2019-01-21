<template>
  <div class="main-page">
    <div class="main">
    	<!--<div class="homeMain-left">
    		
    	</div>
    	<div class="homeMain-right">
    		
    	</div>-->
      <!--<div class="block">
        <el-carousel height="420px" class="home-ban">
          <el-carousel-item v-for="(item,index) in photoBox" :key="index" :style="{backgroundImage: 'url('+item.url+')'}"></el-carousel-item>
        </el-carousel>
      </div>-->
      <!--<div class="learn_moudle">
        <div class="moud_chl">
          <router-link to="/preschoolReview/preschoolReview" class="learn_bg" :style="{backgroundImage: 'url('+require('../../assets/img/figure.png')+')'}"></router-link>
          <p class="modu_tit">入学复习</p>
        </div>
        <div class="moud_chl">
          <router-link to="/curriculumLearning/list" class="learn_bg" :style="{backgroundImage: 'url('+require('../../assets/img/figure2.png')+')'}"></router-link>
          <p class="modu_tit">课程学习</p>
        </div>
        <div class="moud_chl">
          <router-link to="/my/graduation" class="learn_bg" :style="{backgroundImage: 'url('+require('../../assets/img/figure3.png')+')'}"></router-link>
          <p class="modu_tit">毕业设计</p>
        </div>
        <div class="moud_chl">
          <router-link to="/my/courseScore" class="learn_bg" :style="{backgroundImage: 'url('+require('../../assets/img/figure4.png')+')'}"></router-link>
          <p class="modu_tit">课程成绩</p>
        </div>
      </div>-->
    </div>
    <!--<div class="footer-small">version: 4.0.1</div>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      photoBox: [
        {
          url: require("../../assets/img/banner1.jpg")
        },
        {
          url: require("../../assets/img/banner2.jpg")
        },
        {
          url: require("../../assets/img/banner3.jpg")
        },
        {
          url: require("../../assets/img/banner4.jpg")
        }
      ]
    };
  },
  components: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="less">
.main {
  width: 1200px;
  display: flex;
  margin: 0 auto;
  .homeMain-left{
  	width: 240px;
  }
  .homeMain-right{
  	
  }
  .learn_moudle {
    width: 100%;
    height: 340px;
    box-sizing: border-box;
    margin: 40px 0 0;
    // background: green;
    .moud_chl {
      float: left;
      width: 290px;
      height: 100%;
      margin-right: 13px;
      border-radius: 3px;
      overflow: hidden;
      &:nth-child(4n) {
        margin-right: 0;
      }
      .learn_bg {
        display: block;
        width: 100%;
        height: 280px;
      }
      .imgStyle {
        display: block;
      }
      .modu_tit {
        height: 60px;
        line-height: 60px;
        text-align: center;
        background: #333;
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 11.25px;
        position: relative;
      }
    }
  }
}
.home-ban {
  margin-top: 30px;
  .el-carousel__container {
    .el-carousel__arrow--left {
      left: 60px;
      background: url("../../assets/img/ico_17.png") no-repeat;
      width: 42px;
      height: 74px;
      i {
        display: none;
      }
    }
    .el-carousel__arrow--right {
      right: 60px;
      background: url("../../assets/img/ico_18.png") no-repeat;
      width: 42px;
      height: 74px;
      i {
        display: none;
      }
    }
  }
  .el-carousel__indicators {
    .el-carousel__indicator {
      margin: 0 6px;
      padding: 15px 4px;
      .el-carousel__button {
        width: 40px;
        height: 10px;
        border-radius: 20px;
        background-color: #fff;
        opacity: 1;
      }
      &.is-active {
        .el-carousel__button {
          background-color: #6c8bfa;
        }
      }
    }
  }
}
.el-carousel__item {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
