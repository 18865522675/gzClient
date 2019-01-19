<template>
  <div class="header-pos">
    <header class="header home">
      <div class="header-box">
        <!--<header class="header-home">-->
        <router-link to="/home" class="m-logo">
          <img src="../assets/img/logo.png" alt="" class="m-logo-img">
        </router-link>
        <div class="header-right">
          <div class="header-enter headerLogin" v-if="userInfo==null">
            <span class="header-enter-login header-enter-login-cur" @click="login(1)">登录</span>
            <span class="header-enter-login">/</span>
            <span class="header-enter-login header-enter-login-cur" @click="login(2)">注册</span>
          </div>
          <div class="header-search">
            <input type="text" class="header-search-in" v-model="keyWord" placeholder="搜索我感兴趣的课程"
                   @keyup.enter="keyEnter">
            <div class="header-search-btn" @click="keyEnter"></div>
          </div>
          <div class="header-tel" :class="{on:qrT}">
            <div to="/home" class="header-phone-ico"
                 :style="{backgroundImage: 'url('+require('../assets/img/phone.png')+')'}"></div>
            <div class="header-phone-group">
              <img src="../assets/img/header_my_hide_tri.png" alt="" class="header-my-hide-tri-img">
              <div class="header-phone-group-left">
                <img src="../assets/img/header_phone_code.png" alt="">
              </div>
              <div class="header-phone-group-right">
                下载手机客户端
              </div>
            </div>
          </div>
          <router-link to="/message/List" type="image/x-icon"  class="header-ico ico-msg icomsg" v-if="userInfo">
            <div class="header-msg-new" v-if="userInfo!=null&&updatemessage">{{updatemessage}}</div>
          </router-link>
          <router-link to="/login" type="image/x-icon"  class="header-ico ico-msg icomsg" v-if="!userInfo">
          </router-link>

          <!--未登录-->
          <div class="header-user" v-if="userInfo==null"   @click="login(1)">
            <router-link to="/home" class="header-user-ico"
                         :style="{backgroundImage: 'url('+require('../assets/img/nologin.png')+')'}">
              <div class="header-myinfo headerMyinfo">登录
              </div>
            </router-link>
            <!--<div class="header-user-group">-->
              <!--<img src="../assets/img/header_my_hide_tri.png" alt="" class="header-my-hide-tri-img">-->
              <!--<div class="header-user-item-no">-->

              <!--</div>-->

              <!--<div class="header-user-item">请登录之后查看相关信息</div>-->
            <!--</div>-->
          </div>

          <!--教师登录后-->
          <div class="header-user-login" v-if="userInfo&&userInfo.clientRoleType==2">
            <div class="header-myinfo headerMyinfo">hello {{userInfo.nick}}</div>
            <router-link to="/selfInfo" class="header-user-ico header-stu-ico"
                         :style="{backgroundImage: 'url('+require('../assets/img/user.png')+')'}">
            </router-link>
            <div class="header-user-login-group">
              <img src="../assets/img/header_my_hide_tri.png" alt="" class="header-my-hide-tri-img">
              <div class="header-user-login-group-intr">Hi~{{userInfo.nick}}</div>
              <div class="header-user-login-group-ul">
                <router-link to="/commonCourse/commonCourse" class="header-user-login-group-item">课程查阅</router-link>
                <router-link to="/examRead/examRead" class="header-user-login-group-item">测评查阅</router-link>
                <router-link to="/learnRecord/learnRecord" class="header-user-login-group-item">学习记录</router-link>
              </div>
              <div class="header-user-login-group-logout" @click="logout">退出</div>
            </div>
          </div>

          <!--学生登录后-->
          <div class="header-stu-login" v-if="userInfo&&userInfo.clientRoleType===1">
            <div class="header-myinfo headerMyinfo">hello {{userInfo.nick}}</div>
            <router-link to="/selfInfo" class="header-user-ico header-stu-ico"
                         :style="{backgroundImage: 'url('+require('../assets/img/user.png')+')'}"
                         v-if="!userInfo.avatar">
            </router-link>
            <router-link to="/selfInfo" class="header-user-ico header-stu-ico"
                         :style="{backgroundImage: 'url('+$config.HOST_API+userInfo.avatar+')'}" v-if="userInfo.avatar">
            </router-link>
            <div class="header-stu-login-group">
              <img src="../assets/img/header_my_hide_tri.png" alt="" class="header-my-hide-tri-img">
              <div class="header-user-login-group-intr">Hi~{{userInfo.nick}}</div>
              <div class="header-user-login-group-intr-num">
                <div class="header-user-login-group-intr-nums">这是你第{{userInfo.signInTimes}}次登陆</div>
                <router-link to="/learnRecord/learnRecord" class="header-user-login-group-intr-nums-see">查看学习记录
                </router-link>
              </div>
              <div class="header-user-login-group-ul">
                <router-link to="/myStudy/commonCourse" class="header-user-login-group-item">我的学习</router-link>
                <router-link to="/applyTest/applyTestList" class="header-user-login-group-item">申请测评</router-link>
                <router-link to="/examResult/examResult" class="header-user-login-group-item">测评结果</router-link>
                <router-link to="/tutoring/tutoring" class="header-user-login-group-item">习题辅导</router-link>
                <!--<router-link to="/order/order" class="header-user-login-group-item">我的订单</router-link>-->
              </div>
              <div class="header-user-login-group-logout" @click="logout">退出</div>
            </div>
          </div>
          <router-link to="/sever" class="header-ico ico-serve icoserve" v-if="userInfo"></router-link>
          <router-link to="/login" class="header-ico ico-serve icoserve" v-if="!userInfo"></router-link>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Cookies from "js-cookie";

export default {
  name: "headerModule",
  data() {
    return {
      qrT: false,
      keyWord: ""
    };
  },
  computed: mapState(["crumbs", "crumbsStatus", "userInfo", "updatedata", "updatemessage"]),
  mounted() {
    console.log(this.userInfo);
    console.log(JSON.stringify(this.userInfo));
    setTimeout(()=>{
      this.cacheQr();
    },800);
  },
  components: {},
  methods: {
    cacheQr(){
      let qrT = localStorage.getItem("hk_qrT");

      if(!qrT){
        this.qrT = true;
        setTimeout(()=>{
          this.qrT = false;
          localStorage.setItem("hk_qrT", "1");
        }, 1000*3);
      }
    },
    login(type) {
      this.$router.push(`/login?loginType=${type}`);
    },
    logout() {
      this.$api.main.signOut().then(() => {
        let _this = this;
        this.$message({
          type: "success",
          message: "退出成功，您即将返回登录页面!",
          duration: 1000,
          onClose() {
            sessionStorage.setItem("key", _this.userInfo.clientRoleType);
            Cookies.remove("userInfo");
            _this.$router.push("/login");
          }
        });
      });
    },
    keyEnter() {
      let keyWord = this.keyWord;
      this.keyWord = "";
      if (!keyWord) {
        keyWord = "null";
      }
      this.$router.push(`/search/search/${keyWord}`);
    }
  }
};
</script>
<style lang="less">
.header-pos {
  height: 60px;
  width: 100%;
}

.header {
  background-color: #2a2e43;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9000;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
  &.home {
    background-color: #fff;
  }
}
.m-logo-img {
  transition: all 0.2s;
}
.header-box {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
}
.header-right {
  display: flex;
  align-items: center;
}

.header-search {
  display: flex;
  align-items: center;
  position: relative;
}

.header-search-in {
  width: 300px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid #e5e5e5;
  padding: 0 20px 0 46px;
  color: #989898;
  background-color: #efefef;
}

.header-search-btn {
  background: url("../assets/img/saerch.png") no-repeat center;
  width: 16px;
  height: 16px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 13px;
}

.header-enter {
  color: #fff;
  padding-right: 20px;
  .header-enter-login {
    padding-left: 12px;
  }
  .header-enter-login-cur {
    cursor: pointer;
  }
  &.headerLogin {
    color: #8e8e8e;
  }
}

.header-ico {
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 20px;
  display: block;
  &.ico-serve {
    background-image: url("../assets/img/header_gold_sever.png");
    width: 26px;
    height: 30px;
    &.icoserve {
      background-image: url("../assets/img/service.png");
      width: 26px;
      height: 30px;
    }
  }
  &.ico-msg {
    background-image: url("../assets/img/header_gold_message.png");
    width: 24px;
    height: 30px;
    position: relative;
    &.icomsg {
      background-image: url("../assets/img/news.png");
      width: 23px;
      height: 30px;
    }
    .header-msg-new {
      height: 18px;
      width: 18px;
      background-color: #e84c45;
      border-radius: 50%;
      text-align: center;
      line-height: 18px;
      color: #fff;
      font-size: 12px;
      position: absolute;
      top: -6px;
      left: 20px;
    }
  }
}

.header-tel {
  position: relative;
  margin: 0 20px 0 20px;
  &:hover,&.on {
    .header-phone-group {
      transform: scaleY(1);
      transition: all 0.3s;
    }
  }
}

.header-phone-ico {
  background-position: center;
  background-repeat: no-repeat;
  width: 19px;
  height: 29px;
  cursor: pointer;
}

.header-phone-group {
  position: absolute;
  left: 50%;
  top: 100%;
  border: 1px solid #e5e5e5;
  height: 119px;
  width: 237px;
  background-color: #f6f5fa;
  margin-left: -28px;
  margin-top: 15px;
  transform: scaleY(0);
  transform-origin: top;
  transition: all 0.3s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-my-hide-tri-img {
    position: absolute;
    top: -15px;
    left: 20px;
  }
  .header-phone-group-left {
    width: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 110px;
    }
  }
  .header-phone-group-right {
    width: 116px;
    line-height: 119px;
    font-size: 15px;
  }
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: -31px;
    width: 100%;
    height: 30px;
  }
}

.header-user {
  position: relative;
  /*padding: 0 56px 0 28px;*/
  padding: 0 18px 0 10px;
  width: 108px;
  height: 38px;
  background-color: #efefef;
  border-radius: 30px;
  .header-myinfo {
    position: absolute;
    top: 11px;
    left: 45px;
    color: #8e8e8e;
    .header-my-tri {
      width: 11px;
      height: 7px;
      font-size: 0;
      margin-left: 6px;
    }
    &.headerMyinfo {
      color: #8e8e8e;
      font-size: 16px;
    }
  }

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
  border: 1px solid #e5e5e5;
  height: 179px;
  width: 281px;
  background-color: #f6f5fa;
  margin-left: -56px;
  margin-top: 11px;
  transform: scaleY(0);
  transform-origin: top;
  transition: all 0.3s;
  .header-my-hide-tri-img {
    position: absolute;
    top: -15px;
    left: 60px;
  }
  a.header-user-item {
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-bottom: 1px solid #e4e4e4;
    color: black;
    display: block;
  }
  .header-user-item-no {
    margin: 42px auto 3px;
    background-image: url("../assets/img/header_lock.png");
    width: 54px;
    height: 62px;
    background-repeat: no-repeat;
    background-position: center;
  }
  .header-user-item {
    text-align: center;
    height: 72px;
    line-height: 72px;
    color: #989898;
  }
}

.header-user-ico {
  display: block;
  background-position: center;
  background-repeat: no-repeat;
  width: 26px;
  height: 26px;
  margin-top: 6px;
  border-radius: 50%;
}

.header-user-login {
  position: relative;
  /*width: 138px;*/
  height: 38px;
  background-color: #efefef;
  border-radius: 30px;
  /*padding: 0 56px 0 28px;*/
  a.header-stu-ico {
    position: absolute;
    top: 0px;
    left: 10px;
    display: block;
    background-position: center;
    background-repeat: no-repeat;
    width: 26px;
    height: 26px;
    /*margin-top: 6px;*/
    border-radius: 50%;
  }
  .header-myinfo {
    /*position: absolute;*/
    /*top: 11px;*/
    /*left: 80px;*/
    line-height: 38px;
    padding-left: 45px;
    padding-right: 18px;
    color: #8e8e8e;
    .header-my-tri {
      width: 11px;
      height: 7px;
      font-size: 0;
      margin-left: 6px;
    }
    &.headerMyinfo {
      color: #000;
    }
  }

  &:hover {
    .header-user-login-group {
      transform: scaleY(1);
      transition: all 0.3s;
    }
  }
}

.header-user-login-group {
  position: absolute;
  left: 50%;
  top: 100%;
  border: 1px solid #e5e5e5;
  height: 270px;
  width: 198px;
  background-color: #f6f5fa;
  margin-left: -56px;
  margin-top: 11px;
  transform: scaleY(0);
  transform-origin: top;
  transition: all 0.3s;
  .header-my-hide-tri-img {
    position: absolute;
    top: -15px;
    left: 60px;
  }
  .header-user-login-group-intr {
    height: 58px;
    line-height: 58px;
    text-align: center;
    background-color: #fbfafd;
    color: #2a2e43;
    border-bottom: 1px solid #e5e5e5;
  }
  .header-user-login-group-ul {
    width: 150px;
    padding: 0 25px;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    a.header-user-login-group-item {
      height: 38px;
      line-height: 38px;
      width: 150px;
      border-radius: 10px;
      margin: 10px 0;
      text-align: center;
      display: block;
      color: #2a2e43;
      &:hover {
        background-color: #e2e1e6;
      }
    }
  }
  .header-user-login-group-logout {
    text-align: center;
    height: 51px;
    line-height: 48px;
    border-top: 1px solid #e5e5e5;
    cursor: pointer;
  }
}

.header-stu-login {
  position: relative;
  /*padding: 0 56px 0 28px;*/
  /*padding: 0 18px 0 10px;*/
  /*width: 138px;*/
  height: 38px;
  background-color: #efefef;
  border-radius: 30px;
  a.header-stu-ico {
    position: absolute;
    top: 0px;
    left: 10px;
    display: block;
    background-position: center;
    background-repeat: no-repeat;
    width: 26px;
    height: 26px;
    /*margin-top: 6px;*/
    border-radius: 50%;
  }
  .header-myinfo {
    /*position: absolute;*/
    /*top: 11px;*/
    /*left: 45px;*/
    line-height: 38px;
    padding-right: 10px;
    padding-left: 45px;
    color: #8e8e8e;
    .header-my-tri {
      width: 11px;
      height: 7px;
      font-size: 0;
      margin-left: 6px;
    }
    &.headerMyinfo {
      color: #8e8e8e;
      padding-right: 18px;
    }
  }

  &:hover {
    .header-stu-login-group {
      transform: scaleY(1);
      transition: all 0.3s;
    }
  }
}

.header-stu-login-group {
  position: absolute;
  left: 50%;
  top: 100%;
  border: 1px solid #e5e5e5;
  /*height: 448px;*/
  width: 198px;
  background-color: #f6f5fa;
  margin-left: -56px;
  margin-top: 11px;
  transform: scaleY(0);
  transform-origin: top;
  transition: all 0.3s;
  &:after {
    content: "";
    position: absolute;
    top: -22px;
    left: 0;
    width: 100%;
    height: 22px;
  }
  .header-my-hide-tri-img {
    position: absolute;
    top: -15px;
    left: 60px;
  }
  .header-user-login-group-intr {
    height: 58px;
    line-height: 58px;
    text-align: center;
    background-color: #fbfafd;
    color: #2a2e43;
    border-bottom: 1px solid #e5e5e5;
  }
  .header-user-login-group-intr-num {
    border-bottom: 1px solid #e5e5e5;
    text-align: center;
    padding: 16px 0;
    .header-user-login-group-intr-nums {
      color: #989898;
      height: 28px;
      line-height: 28px;
    }
    .header-user-login-group-intr-nums-see {
      color: #ffba4e;
      height: 28px;
      line-height: 28px;
    }
  }
  .header-user-login-group-ul {
    width: 150px;
    padding: 0 25px;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    a.header-user-login-group-item {
      height: 38px;
      line-height: 38px;
      width: 150px;
      border-radius: 10px;
      margin: 10px 0;
      text-align: center;
      display: block;
      color: #2a2e43;
      &:hover {
        background-color: #e2e1e6;
      }
      &.router-link-active {
        background-color: #e2e1e6;
      }
    }
  }
  .header-user-login-group-logout {
    text-align: center;
    height: 51px;
    line-height: 48px;
    border-top: 1px solid #e5e5e5;
    cursor: pointer;
  }
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
