<template>
  <div class="login">
    <div class="login-bg" :style="{backgroundImage: 'url(\''+$api.global.img+bgImg+'\')'}" v-if="bgImg"></div>
    <div class="login-bg" :style="{backgroundImage: 'url('+require('../assets/img/beijing.png')+')'}" v-else></div>
    <div class="login-bg"></div>
    <!--<div class="login-account-hint" v-show="show">
      <p class="login-account-hint-explain">课房学生端初次登录说明
        <img src="../assets/img/del.png" alt="">
      </p>
      <ul>
        <li>
          <p class="login-account-hint-explain-text">1、课房平台初次登录，账号为：域名前缀+_+身份证号码，密码为：身份证后六位；示例：浙江工商大学学生张三，登录账号为：zjgsdx_123456789123456789（中间的下划线不能遗漏），密码为：456789</p>
          <img src="../assets/img/1.png" alt="" class="login-account-hint-explain-img" onclick="javascript:window.open(this.src)">
        </li>
        <li>
          <p class="login-account-hint-explain-text">2、登录成功后，将鼠标移动至“我的”并点击头像；</p>
          <img src="../assets/img/2.png" alt="" class="login-account-hint-explain-img">
        </li>
        <li>
          <p class="login-account-hint-explain-text">3、点击头像后跳转至个人资料页，在页面右下角会出现“虚拟名称”编辑框，并进向编辑（编辑的内容建议使用英文），编辑完成后点击保存即可；</p>
          <img src="../assets/img/3.png" alt="" class="login-account-hint-explain-img" onclick="javascript:window.open(this.src)">
        </li>
        <li>
          <p class="login-account-hint-explain-text">4、再次登录时，仅需直接输入当初修改的虚拟名称即可，密码仍为身份证后六位。</p>
          <img src="../assets/img/4.png" alt="" class="login-account-hint-explain-img" onclick="javascript:window.open(this.src)">
        </li>
        <li>
          <p class="login-account-hint-explain-text">5、各学校域名前缀如下图所示</p>
          <img src="../assets/img/5.png" alt="" class="login-account-hint-explain-img" onclick="javascript:window.open(this.src)">
        </li>
      </ul>
      <div class="login-account-hint-cancel" @click="cancel">关闭</div>
    </div>-->
    <div class="loginmod">
      <div class="logBox">
        <p class="logtit">平台登录</p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="account">
            <el-input v-model.trim="ruleForm.account" auto-complete="new-password" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model.trim="ruleForm.password"  auto-complete="new-password" placeholder="请输入登录密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm('ruleForm')" @keyup="submitForm('ruleForm')" style="width:70%;font-size:18px;background:#FFBB51;color:#fff;border:0;">登陆</el-button>
          </el-form-item>
        </el-form>
        <el-checkbox v-model="checkStatus">记住登录状态</el-checkbox>
        <!--<div class="login-hint" @click="hint">初次登录提示</div>-->
        <!--<div class="logtit-qr">
          <img src="../assets/img/qrCode.png" alt="" class="logtit-qr-img">
          <div class="logtit-qr-tit">手机客户端下载</div>
        </div>-->
      </div>
    </div>
    <div class="loginTip">
    	成人高等教育网络学习平台
    </div>
    <div class="footer-small fixed">version: 4.0.1</div>
  </div>
</template>

<script>
import md5 from "md5";
// import md5 form "md5";
export default {
  name: "login",
  data() {
    return {
      show: false,
      bgImg:'',
      ruleForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请填写用户密码", trigger: "blur" }
        ]
      },
      checkStatus: true
    };
  },
  created() {
    try {
      const userAccount = localStorage.getItem("userAccount");
      if (localStorage.getItem("userAccount")) {
        this.ruleForm.account = userAccount;
        this.checkStatus = true;
      } else {
        this.checkStatus = false;
      }
    } catch (error) {
      this.showmessage("warning", "当前浏览器不支持记住用户名操作");
    }
    var that = this;
    document.onkeydown = function() {
      var key = window.event.keyCode;
      if (key == 13) {
        that.submitForm("ruleForm");
      }
    };
//  this.get_List()
  },
  methods: {
    hint() {
      this.show = true;
    },
    cancel() {
      this.show = false;
    },
    get_List() {
      let host = window.location.host;
      if (host.indexOf("localhost") > -1) {
        host = "localhost";
      } else {
        host = host.split(".")[0];
      }
      this.$api.systemMangerment
        .get_bgimg({
          prefix: host,
          flag: "client"
        })
        .then(res => {
          console.log(res);
          this.bgImg = res.data;
        });
    },
    submitForm(formName) {
      if (this.checkStatus) {
        localStorage.setItem("userAccount", this.ruleForm.account);
      } else {
        localStorage.removeItem("userAccount");
      }
      // let host = window.location.host;
      // if (host.indexOf("localhost") > -1) {
      //   host = "localhost";
      // } else {
      //   host = host.split(".")[0];
      // }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.password = md5(this.ruleForm.password);
          this.$api.systemMangerment
            .get_login({
              account: this.ruleForm.account,
              password: this.ruleForm.password
              // prefix: host
            })
            .then(res => {
              sessionStorage.setItem("Token", res.data.token);
              sessionStorage.setItem("userInfo", JSON.stringify(res.data));
              this.$message({
                type: "success",
                message: "登录成功!",
                duration: 1000
              });
              setTimeout(() => {
                this.$router.replace("/home");
                // location.reload();
              }, 500);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
	.loginTip{
		font-size: 26px;
	display: inline-block;
	margin-left: 20px;
	position: absolute;
	left: 10px;
	top: 10px;
	color: darkslategray;
	font-family: "perpetua titling mt";
	}
.login-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  min-width: 1200px;
  /*background: url("../assets/img/background.jpg");*/
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 700px;
}
.login{
	.el-checkbox__input.is-checked+.el-checkbox__label{
		color:rgb(255, 187, 81)
	}
}
.loginmod {
  float: right;
  width: 600px;
  position: relative;
  z-index: 1;
  .logBox {
    width: 64%;
    margin: 0 auto;
    margin-top: 33.8%;
    .logtit {
      font-family: PingFangSC-Medium;
      font-size: 36px;
      color: #fff;
      margin-bottom: 30px;
    }
    .el-form-item:nth-child(1) {
      .el-input__inner {
        width: 70%;
        padding-left: 40px;
        background-image: url("../assets/img/account.png");
        background-repeat: no-repeat;
        background-position: 12px 11px;
      }
    }
    .el-form-item:nth-child(2) {
      .el-input__inner {
        width: 70%;
        padding-left: 40px;
        background-image: url("../assets/img/password.png");
        background-repeat: no-repeat;
        background-position: 12px 11px;
      }
    }
    .el-form-item .el-form-item__content {
      margin-left: 0 !important;
    }
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  	background-color:#FFBB51;
  	color:#FFBB51
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  	border-color:#FFBB51
  }
}
.login-hint {
  position: absolute;
  top: 459px;
  right: 225px;
  color: #409eff;
  font-size: 13px;
  cursor: pointer;
  &:hover {
    color: #6c8bfa;
  }
}
.login-account-hint {
  width: 620px;
  height: 600px;
  overflow-y: scroll;
  background: #000;
  border-radius: 10px;
  opacity: 0.9;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -310px;
  margin-top: -300px;
  z-index: 100;
  ul {
    width: 600px;
    li {
      width: 460px;
      padding: 0 70px;
    }
  }
}
.login-account-hint-explain {
  font-size: 18px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
}
.login-account-hint-explain-text {
  font-size: 14px;
  line-height: 22px;
  color: #fff;
  padding: 20px 20px;
}
.login-account-hint-explain-img {
  width: 400px;
  // height: 300px;
  padding: 0 25px 20px;
  cursor: pointer;
}
.login-account-hint-cancel {
  color: #fff;
  padding: 0px 0 20px;
  text-align: center;
  cursor: pointer;
}
.logtit-qr {
  width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 65px;
  margin-top: 30px;
}
.logtit-qr-img {
  width: 100%;
}
.logtit-qr-tit {
  color: #fff;
  font-size: 14px;
  margin-top: 10px;
}
</style>
