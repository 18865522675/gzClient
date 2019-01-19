<template>
    <div class="setp-changePhone">
        <div class="setp-changePhone-header" @click="goHome"></div>
        <div class="setp-changePhone-content">
            <div class="setp-changePhone-title">
                已有账号，马上
                <router-link to="/login" class="goLogin">登录</router-link>
            </div>
            <div class="setp-changePhone-con-con">
                <div class="setp-changePhone-con-header">
                    <div class="setp-changePhone-con-text-change">更换手机号</div>
                </div>
                <el-form ref="ruleForm" :model="form" class="setp-changePhone-con-main" label-width="286px" label-position="top" :rules="rules">
                    <el-form-item label="请输入原手机号" class="setp-changePhone-con-item" prop="oldPhone">
                        <el-input v-model="form.oldPhone" class="setp-changePhone-inp"></el-input>
                    </el-form-item>
                    <el-form-item label="请输入新手机号" class="setp-changePhone-con-item" prop="newPhone">
                        <el-input v-model="form.newPhone" class="setp-changePhone-inp"></el-input>
                    </el-form-item>
                    <el-form-item label="短信验证码" class="setp-changePhone-con-item" prop="newVerifyCode">
                        <el-input v-model="form.newVerifyCode" class="setp-changePhone-inp" style="display:inline-block;width: 154px;float: left;"></el-input>
                        <el-button class="button" @click="send" v-if="!sendMsgDisabled">获取短信验证码</el-button>
                        <el-button class="button" @click="send" v-if="sendMsgDisabled">{{time+'秒后获取'}}</el-button>
                    </el-form-item>
                    <el-form-item prop="safety">
                        <div class="safety"></div>
                    </el-form-item>
                    <el-form-item class="setp-changePhone-con-item">
                        <el-button class="setp-changePhone-item-btn" @click="submitForm('ruleForm')">提交审核</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </div>
        <!--<div class="pro-mask"  v-show="dialogVisible">-->
            <!--<div class="prompt">-->
                <!--<div class="pro-icon"></div>-->
                <!--<div class="pro-text">密码修改成功！</div>-->
                <!--<button class="pro-btn" @click="handleClose">知道了</button>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>
<script>
import "../assets/css/changePhone.less";
export default {
  data() {
    let checktel1 = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入原手机号"));
      }
      let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (!reg.test(value)) {
        return callback(new Error("账号为手机号格式且11位"));
      }
      return callback();
    };
    let checktel2 = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入新手机号"));
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
        oldPhone: "",
        newPhone: "",
        newVerifyCode: ""
      },
      rules: {
        oldPhone: [{ required: true, validator: checktel1, trigger: "blur" }],
        newPhone: [{ required: true, validator: checktel2, trigger: "blur" }],
        newVerifyCode: [
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
      if (this.form.newPhone.length === 11) {
        this.$api.main
          .verify({
            clientRoleType: this.form.clientRoleType,
            phone: this.form.newPhone,
            type: 4
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
      } else if (this.form.newPhone.length === 0) {
        this.$message({
          type: "error",
          message: "请输入新手机号!",
          duration: 1000
        });
      } else if (
        this.form.newPhone.length > 0 &&
        this.form.newPhone.length !== 11
      ) {
        this.$message({
          type: "error",
          message: "新手机号长度11，请重新填写!",
          duration: 1000
        });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.main
            .changePhone({
              oldPhone: this.form.oldPhone,
              newPhone: this.form.newPhone,
              newVerifyCode: this.form.newVerifyCode
            })
            .then(() => {
              this.$message({
                type: "success",
                message: "提交审核成功!",
                duration: 1000
              });
              this.form.newVerifyCode = "";
              this.form.oldPhone = "";
              this.form.newPhone = "";
              this.$router.push("/login");
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
