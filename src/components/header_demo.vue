<template>
  <div>
    <header class="header">
      <router-link to="/home" class="m-logo">
        <img src="../assets/img/logo.png" alt="" class="m-logo-img">
      </router-link>
      <div class="header-right">
        <div class="header-search">
          <input type="text" class="header-search-in" @keyup.enter="keyEnter">
          <div class="header-search-btn"></div>
        </div>
        <router-link to="/home" class="header-ico ico-video"></router-link>
        <router-link to="/home" class="header-ico ico-tel"></router-link>
        <router-link to="/home" class="header-ico ico-msg"></router-link>
        <div class="header-user">
          <router-link to="/home" class="header-user-ico" :style="{backgroundImage: 'url('+require('../assets/img/photo.png')+')'}"></router-link>
          <div class="header-user-group">
            <div class="header-user-item">菜单1</div>
            <div class="header-user-item">菜单1</div>
            <div class="header-user-item">菜单1</div>
            <div class="header-user-item">菜单1</div>
            <div class="header-user-item">菜单1</div>
          </div>
        </div>
      </div>
    </header>
    <label class="form-checkBox">
      <input type="radio" name="a1">
      <i></i>
      国际物流考古见闻录可归结为
    </label>
    <label class="form-checkBox">
      <input type="radio" name="a1">
      <i></i>
      国际物流考古见闻录可归结为
    </label>
    <label class="form-checkBox">
      <input type="radio" name="a1">
      <i></i>
      国际物流考古见闻录可归结为
    </label>
    <label class="form-checkBox">
      <input type="radio" name="a1">
      <i></i>
      国际物流考古见闻录可归结为
    </label>
    <!--<div class="top-header">-->
      <!--<div class="wrap">-->
        <!--<el-row class="head_row">-->
          <!--<div class="left">-->
            <!--<img src="../assets/img/logo.png" alt="" class="logo_img" @click="$router.push('/home')">-->
          <!--</div>-->
          <!--<div class="right">-->
            <!--<input type="text" class="search_input" placeholder="搜索我感兴趣的课程">-->
            <!--<img src="../assets/img/search.png" alt="" class="logo_search">-->
            <!--<img src="../assets/img/video.png" alt="" class="logo_video">-->
            <!--<img src="../assets/img/phone.png" alt="" class="logo_phone">-->
            <!--<img src="../assets/img/message.png" alt="" class="logo_message">-->
            <!--<img src="../assets/img/photo.png" alt="" class="logo_photo" @click="$router.push('/selfInfo')">-->
          <!--</div>-->
        <!--</el-row>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>
<style lang="less">
.header {
  background-color: #fff;
  padding: 0 100px;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 1200px;
}
.header-right {
  display: flex;
  align-items: center;
}
.header-search {
  display: flex;
  align-items: center;
}
.header-search-btn {
  background: url("../assets/img/search.png") no-repeat center;
  width: 25px;
  height: 26px;
}
.header-ico {
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 28px;
  &.ico-video {
    background-image: url("../assets/img/video.png");
    width: 36px;
    height: 27px;
  }
  &.ico-tel {
    background-image: url("../assets/img/phone.png");
    width: 19px;
    height: 29px;
  }
  &.ico-msg {
    background-image: url("../assets/img/message.png");
    width: 23px;
    height: 30px;
  }
}
.header-user {
  position: relative;
  &:hover {
    .header-user-group {
      transform: scaleY(1);
      transition: all 0.3s;
    }
  }
}
.header-user-group {
  position: absolute;
  left: 50%;
  top: 100%;
  width: 100px;
  margin-left: -50px;
  background-color: #000;
  transform: scaleY(0);
  transform-origin: top;
  transition: all 0.3s;
}
.header-user-ico {
  display: block;
  background-position: center;
  background-repeat: no-repeat;
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
.form-checkBox {
  display: flex;
  align-items: center;
  i {
    width: 20px;
    height: 20px;
    border: 1px solid #000;
  }
  input {
    display: none;
    &:checked + i {
      background-color: #000;
    }
  }
}
</style>
<script>
export default {
  name: "headerModule",
  data() {
    return {};
  },
  mounted() {},
  components: {},
  methods: {
    logOut: function() {
      this.$api.systemMangerment.get_loginOut().then(() => {
        let _this = this;
        this.$message({
          type: "success",
          message: "退出成功，您即将返回登录页面!",
          duration: 1000,
          onClose() {
            _this.$router.push("/login");
          }
        });
      });
    },
    keyEnter(e) {
      console.log(e);
    }
  }
};
</script>

<style scoped lang="less">
.top-header {
  min-width: 1200px;
}
.wrap {
  height: 90px;
  background: #fff;
  border-bottom: 1px solid #d4d4d9;
  box-shadow: 0px 0px 1px #d4d4d9;
  .right {
    float: right;
    margin-right: 100px;
  }
  .left {
    float: left;
  }
  input {
    // margin-left: 823px;
    width: 310px;
    height: 33px;
    border-radius: 6px;
    margin-top: 27px;
    float: left;
    border: 1px solid #e5e5e5;
    padding: 0 20px;
  }
  .logo_img {
    padding: 20px 0 0 100px;
    float: left;
    cursor: pointer;
  }
  .logo_search {
    padding-left: 10px;
    float: left;
    padding-top: 31px;
    cursor: pointer;
  }
  .logo_video {
    padding-left: 44px;
    float: left;
    padding-top: 31px;
    cursor: pointer;
  }
  .logo_phone {
    padding-left: 62px;
    float: left;
    padding-top: 31px;
    cursor: pointer;
  }
  .logo_message {
    float: left;
    padding-left: 69px;
    padding-top: 31px;
    cursor: pointer;
  }
  .logo_photo {
    padding-left: 60px;
    float: left;
    padding-top: 19px;
    cursor: pointer;
  }
}
</style>
