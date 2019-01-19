<template>
  <div class="setp">
    <div class="setp-header" @click="goHome"></div>
    <div class="setp-content">
      <div class="setp-title"><div class="setp-tit-text"> 已有账号，<a href="/login">马上登录</a></div></div>
      <div class="setp-con-con">
        <div class="setp-con-header">
          <div class="setp-con-text"></div>
        </div>
          <el-form ref="ruleForm" :model="form" class="setp-con-main" label-width="286px" label-position="top" :rules="rules">
            <el-form-item class="input-item" prop="clientRoleType">
              <el-radio-group v-model="form.clientRoleType">
                <el-radio :label="1">学生</el-radio>
                <el-radio :label="2">教师</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="请输入手机号" class="setp-con-item" prop="phone">
              <el-input v-model="form.phone" class="setp-inp"></el-input>
            </el-form-item>
            <el-form-item label="短信验证码" class="setp-con-item" prop="verifyCode">
              <el-input v-model="form.verifyCode" class="setp-inp" style="display:inline-block;width: 154px;float: left;"></el-input>
              <el-button class="button" @click="send" v-if="!sendMsgDisabled">获取短信验证码</el-button>
              <el-button class="button" @click="send" v-if="sendMsgDisabled">{{time+'秒后获取'}}</el-button>
            </el-form-item>
            <el-form-item label="请重新设置密码" class="setp-con-item" prop="password">
              <el-input v-model="form.password" class="setp-inp"></el-input>
            </el-form-item>
            <el-form-item prop="safety">
              <div class="safety">
                <!--<div class="safety-item safety-item-low">低</div>-->
                <!--<div class="safety-item safety-item-mid">中</div>-->
                <!--<div class="safety-item safety-item-high">高</div>-->
              </div>
            </el-form-item>
            <el-form-item class="setp-con-item">
              <el-button class="setp-item-btn" @click="submitForm('ruleForm')">找回登录密码</el-button>
            </el-form-item>
          </el-form>

      </div>
    </div>
    <div class="pro-mask"  v-show="dialogVisible">
      <div class="prompt">
        <div class="pro-icon"></div>
        <div class="pro-text">密码修改成功！</div>
        <button class="pro-btn" @click="handleClose">知道了</button>
      </div>
    </div>
  </div>
</template>
<script>
import "../assets/css/login.less";
import md5 from "md5";
export default {
  data() {
    const checkpassword = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("请输入密码"));
      }

      let reg2 = /^(\w){6,12}$/;
      const  p1 = /[0-9]/;
      const  p2 = /[a-z]/i;
      if (!reg2.test(value)) {
        return callback(new Error("输入6-12位密码"));
      }
      if(!p1.test(value)||!p2.test(value)){
          return callback(new Error("密码必须由数字和字符组成"));
      }

      callback();
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
      form: {
        clientRoleType: 1,
        phone: "",
        verifyCode: "",
        password: ""
      },
      rules: {
        phone: [{ required: true, validator: checktel, trigger: "blur" }],
        password: [
          { required: true, validator: checkpassword, trigger: "blur" }
        ],
        verifyCode: [
          { required: true, message: "请填写验证码", trigger: "blur" }
        ]
      },
      dialogVisible: false,
      time: 60, // 发送验证码倒计时
      sendMsgDisabled: false
    };
  },
  mounted() {},
  methods: {
    goHome() {
      this.$router.push("/home");
    },
    send() {
      if (this.form.phone.length === 11) {
        this.$api.main
          .verify({
            clientRoleType: this.form.clientRoleType,
            phone: this.form.phone,
            type: 2
          })
          .then(() => {
            // this.$message({
            //   type: "success",
            //   message: "验证码发送成功!",
            //   duration: 1000
            // });
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
    //改密码
    submitForm(formName) {
      console.log(123);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form.password = md5(this.form.password);
          this.$api.main
            .forgetPassword({
              clientRoleType: this.form.clientRoleType,
              verifyCode: this.form.verifyCode,
              phone: this.form.phone,
              password: this.form.password
            })
            .then(() => {
              this.form.verifyCode = "";
              this.form.phone = "";
              this.form.password = "";
              this.dialogVisible = true;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
    }
  }
};
</script>
<style type="less">
</style>
