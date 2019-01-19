<template>
    <div class="login">
        <div class="login-header">
            <div class="login-logo" @click="goHome"></div>
        </div>
        <div class="logo-content" @keyup.enter="submitForm('ruleForm')">
            <div class="form-header">
                <div :class="loginType ===1?'header-tab header-tab-on':'header-tab'" @click="checkeLogin(1)">平台登录</div>
                <div :class="loginType ===2?'header-tab header-tab-on':'header-tab'" @click="checkeLogin(2)">注册账号</div>
            </div>


            <div class="form-content">
                <el-form ref="form" :model="form" class="form" v-show="loginType === 2" :rules="rules1">
                    <el-form-item class="input-item" prop="phone">
                        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item class="input-item" prop="verifyCode">
                        <!--<el-input style="display:inline-block;width: 120px;float: left;" v-model="form.verifyCode"-->
                                  <!--placeholder="短信验证码"></el-input>-->
                        <el-input v-model="form.verifyCode" style="display:inline-block;width: 120px;float: left;" placeholder="短信验证码"></el-input>
                        <el-button class="button" @click="send" v-if="!sendMsgDisabled">获取短信验证码</el-button>
                        <el-button class="button" @click="send" v-if="sendMsgDisabled">{{time+'秒后获取'}}</el-button>
                    </el-form-item>

                    <el-form-item class="input-item mb0" prop="password">
                        <el-input v-model="form.password" placeholder="请设置登录密码" type="password"></el-input>
                    </el-form-item>
                    <!--<el-form-item prop="safety">-->
                        <!--<div class="safety">-->
                            <!--<div class="safety-item safety-item-low">低</div>-->
                            <!--<div class="safety-item safety-item-mid">中</div>-->
                            <!--<div class="safety-item safety-item-high">高</div>-->
                        <!--</div>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item>-->
                    <!--我已阅读并同意遵守-->
                    <!--</el-form-item>-->
                    <el-form-item class="input-item" prop="agree">
                        <el-checkbox v-model="agree">我已阅读并同意遵守</el-checkbox>
                        <!--<div><label><input type="radio">我已阅读并同意遵守</label></div>-->
                        <div><a href="/protocol" class="agre">华中科技大学自考学习平台用户协议</a></div>
                    </el-form-item>
                    <el-form-item prop="login">
                        <el-button class="input-item login-button" @click="loginUp">注册</el-button>
                    </el-form-item>
                </el-form>

                <el-form ref="ruleForm" :model="loginForm" class="form" v-show="loginType ===1" :rules="rules">
                    <el-form-item prop="clientRoleType" class="selectType">
                        <el-radio-group v-model="loginForm.clientRoleType">
                            <el-radio :label="1">学生</el-radio>
                            <el-radio :label="2">教师</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item class="changePhone">
                        <router-link to="/changePhone" class="phone">找回账号</router-link>
                    </el-form-item>
                    <el-form-item prop="phone">
                        <el-input v-model.trim="loginForm.phone" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model.trim="loginForm.password" placeholder="请输入密码" type="password" minlength="6"
                                  maxlength="12"></el-input>
                    </el-form-item>
                    <el-form-item prop="status">
                        <el-checkbox v-model="status">记住用户名</el-checkbox>
                        <router-link to="/setPassword" style="color:#ccc;float: right;">忘记密码</router-link>
                    </el-form-item>
                    <el-form-item prop="status">
                        <el-button class="input-item login-button" @click.prevent="submitForm('ruleForm')">登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="pro-mask" v-show="dialogVisible">
            <div class="prompt">
                <div class="pro-icon"></div>
                <div class="pro-text">账号注册成功,请去登录页进行登录</div>
                <button class="pro-btn" @click="handleClose">知道了</button>
            </div>
        </div>


    </div>
</template>

<script>
import "../assets/css/login.less";
import Cookies from "js-cookie";
import md5 from "md5";

export default {
  data() {
    const checkpassword = (rule, value, callback) => {
      let reg2 = /^(\w){6,12}$/;

      if (value === "") {
        return callback(new Error("请输入密码"));
      } else if (!reg2.test(value)) {
        return callback(new Error("输入6-12位密码"));
      } else {
        callback();
      }
    };
    let checktel = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入账号"));
      }
      let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (!reg.test(value)) {
        return callback(new Error("账号为手机号格式且11位"));
      }
      return callback();
    };
    return {
      loginType: 1,
      form: {
        phone: "",
        password: "",
        verifyCode: ""
      },
      loginForm: {
        clientRoleType: 1,
        phone: "",
        password: ""
      },
      status: true,
      agree: false,
      rules1: {
        phone: [{ required: true, validator: checktel, trigger: "blur" }],
        verifyCode: [
          { required: true, message: "请填写验证码", trigger: "blur" }
        ],
        password: [
          { required: true, validator: checkpassword, trigger: "blur" }
        ]
        // agree: [{ required: true, trigger: "blur" }]
      },
      rules: {
        phone: [{ required: true, message: "请填写账号", trigger: "blur" }],
        password: [
          { required: true, validator: checkpassword, trigger: "blur" }
        ]
      },
      activeName: "second",
      dialogVisible: false,
      time: 60, // 发送验证码倒计时
      sendMsgDisabled: false
    };
  },
  mounted() {
    const key = sessionStorage.getItem("key");
    console.log(key);
    console.log(this.$route.query.loginType);
    console.log(this.form.length);
    if (this.$route.query.loginType) {
      this.loginType = parseInt(this.$route.query.loginType);
    }
    if (key) {
      this.loginForm.clientRoleType = Number(key);
    }
  },
  created() {
    try {
      const user = localStorage.getItem("user");
      if (localStorage.getItem("user")) {
        this.loginForm.phone = user;
        this.status = true;
      } else {
        this.status = false;
      }
    } catch (e) {
      this.status = false;
      this.$message({
        type: "error",
        message: "当前浏览器不支持记住用户名操作"
      });
    }
  },
  watch: {
    "loginForm.clientRoleType": function() {
      this.$nextTick(() => {
        this.$refs["ruleForm"].clearValidate();
      });
    },
    status: function(n) {
      if (!n) {
        localStorage.removeItem("user");
      }
    }
  },
  methods: {
    goHome() {
      this.$router.push("/home");
    },
    //登录
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loginForm.password = md5(this.loginForm.password);
          this.$api.main
            .login({
              clientRoleType: this.loginForm.clientRoleType,
              phone: this.loginForm.phone,
              password: this.loginForm.password
            })
            .then(res => {
              if (res.code === 0) {
                Cookies.set("userInfo", JSON.stringify(res.data));
                this.$message({
                  type: "success",
                  message: "登录成功!",
                  duration: 1000
                });
                if (this.status) {
                  localStorage.setItem("user", this.loginForm.phone);
                } else {
                  localStorage.removeItem("user");
                }
                this.$router.push("/home");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //验证码
    send() {
      console.log(this.form.phone.length);
      if (this.form.phone.length === 11) {
        this.$api.main
          .verify({
            clientRoleType: 1,
            phone: this.form.phone,
            type: 1
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "验证码发送成功!",
              duration: 1000
            });
            let me = this;
            me.sendMsgDisabled = true;
            let interval = window.setInterval(function() {
              if (me.time-- <= 0) {
                me.time = 60;
                me.sendMsgDisabled = false;
                window.clearInterval(interval);
              }
            }, 1000);
          });
      } else {
        this.$message({
          type: "error",
          message: "请输入手机号!",
          duration: 1000
        });
      }
    },
    //注册
    loginUp() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.password = md5(this.form.password);
          if (this.agree == false) {
            this.$message({
              type: "error",
              message: "请勾选协议!"
            });
            this.form.password = "";
            return;
          }
          console.log(this.agree);
          this.$api.main
            .signUp({
              verifyCode: this.form.verifyCode,
              phone: this.form.phone,
              password: this.form.password
            })
            .then(() => {
              this.dialogVisible = true;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    checkeLogin(type) {
      if (type === 1) {
        this.loginType = 1;
      } else {
        this.loginType = 2;
      }
      this.$nextTick(() => {
        this.$refs["ruleForm"].clearValidate();
        this.$refs["form"].clearValidate();
      });
    },
    handleClose() {
      this.dialogVisible = false;
      location.reload();
    }
  }
};
</script>
<style type="less">
</style>
