<template>
    <div class="footer">
        <div class="footer-content">
            <div class="footer-left">
                <div class="footer-left-link">
                    <router-link to="/home" class="footer-left-top-items">网站首页</router-link>
                    <router-link to="/home" class="footer-left-top-items">网站首页</router-link>
                    <router-link to="/home" class="footer-left-top-items">网站首页</router-link>
                    <router-link to="/home" class="footer-left-top-items">网站首页</router-link>
                    <router-link to="/home" class="footer-left-top-items">网站首页</router-link>
                    <router-link to="/home" class="footer-left-top-items">网站首页</router-link>
                    <router-link to="/home" class="footer-left-top-items">网站首页</router-link>
                    <router-link to="/home" class="footer-left-top-items">网站首页</router-link>
                    <router-link to="/home" class="footer-left-top-items">网站首页</router-link>
                </div>
                <div class="footer-left-desc">Copyright @ 2018 imooc.com All Rights Reserved | 京ICP备案 12003892号-11</div>
            </div>
            <div class="footer-right">
                <div class="footer-right-img" :style="{backgroundImage: 'url('+require('../assets/img/footer_img_01.png')+')'}"></div>
                <div class="footer-right-img" :style="{backgroundImage: 'url('+require('../assets/img/footer_img_02.png')+')'}"></div>
                <div class="footer-right-img" :style="{backgroundImage: 'url('+require('../assets/img/footer_img_03.png')+')'}"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "footer"
};
</script>

<style lang="less">
.footer {
  height: 100px;
  width: 100%;
  background-color: #1c1f21;
  position: absolute;
  bottom: 0;
  left: 0;
}
.footer-content {
  width: 1200px;
  margin: 0 auto;
  justify-content: space-between;
  display: flex;
  .footer-left {
    height: 54px;
    width: 710px;
    padding-top: 23px;
  }
  .footer-left-link {
    a.footer-left-top-items {
      float: left;
      padding-right: 30px;
      color: #fff;
      height: 27px;
      font-size: 12px;
    }
  }
  .footer-left-desc {
    color: #525563;
    height: 27px;
    line-height: 27px;
    font-size: 12px;
  }
  .footer-right {
    display: flex;
    align-items: center;
    .footer-right-img {
      float: left;
      margin-right: 10px;
      width: 33px;
      height: 33px;
      border-radius: 50%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }
}
</style>
