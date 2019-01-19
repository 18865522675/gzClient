<template>
    <div class="self-background">
        <div class="self-main">
            <!--学生-->
            <div class="self-left" v-if="userInfo.clientRoleType==1">
                <!--<div class="self_pic_left" :style="{backgroundImage: 'url('+require('../../assets/img/photo_big.png')+')'}"></div>-->
                <div class="self-left-content">
                    <div class="self-pic-left" v-if="userInfo.avatar"
                         :style="{backgroundImage: 'url('+$config.HOST_API+userInfo.avatar+')'}"></div>
                    <div class="self-pic-left" v-else
                         :style="{backgroundImage: 'url('+require('../../assets/img/self_pic_small.png')+')'}"></div>
                </div>
                <p class="self-name">{{userInfo.nick}}</p>
                <p class="self-code">{{userInfo.phone}}</p>
            </div>
            <div class="self-right" v-if="userInfo.clientRoleType==1">
                <el-tabs v-model="activeName" @tab-click="handleClick" class="hk-selIn-tabs">
                    <el-tab-pane label="个人信息" name="first" class="self-tab-first">
                        <!--<el-form-item class="self-pic-right">-->
                        <!--<baseImg url="sys/image/upload"></baseImg>-->
                        <!--</el-form-item>-->
                        <!--<div class="self-pic-right">-->
                        <!--<img src="../../assets/img/photo_big.png" alt="">-->
                        <!--</div>-->
                        <div class="self-informationForm">
                            <el-form :model="form" ref="form" align="center" label-width="132px" label-position="right">
                                <el-upload
                                        :action="$config.HOST_API+'common/account/sign/upload'"
                                        name="imageFile"
                                        :show-file-list="false"
                                        :on-success="upSuccess"
                                        :on-error="upError"
                                        :before-upload="beforeAvatarUpload"
                                        :on-progress="upProgress">
                                    <div class="self-pic-right"
                                         :style="{backgroundImage: 'url('+$config.HOST_API+form.avatar+')'}"
                                         v-if="form.avatar"></div>
                                    <div class="self-pic-right" v-else></div>
                                </el-upload>
                                <el-form-item label="昵称 :" class="sel-bot">
                                    <el-input placeholder="请输入昵称" v-model="form.nick" maxlength="10" minlength="1"></el-input>
                                </el-form-item>
                                <el-form-item label="性别 :" prop="sex">
                                    <el-radio-group v-model="form.sex">
                                        <el-radio :label="1">男</el-radio>
                                        <el-radio :label="2">女</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="是否具有助学资格 :" prop="rightStatus">
                                    <el-radio-group v-model="form.rightStatus" disabled>
                                        <el-radio :label="1">是</el-radio>
                                        <el-radio :label="2">否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <!--<el-form-item>-->
                                <!--<el-button @click="submitForm" type="primary" plain size="big">保存</el-button>-->
                                <!--</el-form-item>-->
                            </el-form>
                            <el-button @click="submitForm" type="primary" plain size="big">保存</el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="修改密码" name="second">
                        <div class="self-informationForm-password">
                            <el-form :model="formData" :rules="rules" ref="formData" align="center" label-width="90px"
                                     label-position="right">
                                <el-form-item label="原密码 :" prop="oldPassword" class="sel-bot-password">
                                    <el-input v-model.trim="formData.oldPassword" type="password"
                                              auto-complete="off" placeholder="请输入原密码"></el-input>
                                </el-form-item>
                                <el-form-item label="新密码 :" prop="password" class="sel-bot-password">
                                    <el-input v-model.trim="formData.password" type="password"
                                              auto-complete="off" placeholder="请输入新密码"></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码 :" prop="surePassWord" class="sel-bot-password">
                                    <el-input v-model.trim="formData.surePassWord" type="password"
                                              auto-complete="off" placeholder="请重复输入新密码"></el-input>
                                </el-form-item>
                                <!--<el-form-item>-->
                                    <el-button @click="submitForm1" type="primary" plain size="big" class="self-save">
                                        保存
                                    </el-button>
                                <!--</el-form-item>-->
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="更换手机号" name="third">
                        <div class="self-informationForm-changePhone">
                            <el-form :model="formData1" :rules="rules1" ref="formData1" align="center" label-width="136px"
                                     label-position="right">
                                <!--<el-form-item label="原手机验证码 :" prop="oldPassword" class="sel-bot-password">-->
                                    <!--<el-input v-model.trim="formData.oldPassword" type="password"-->
                                              <!--auto-complete="off" placeholder="请输入原密码"></el-input>-->
                                <!--</el-form-item>-->
                                <el-form-item label="原手机号验证码：" class="sel-bot-password" prop="oldVerifyCode">
                                    <el-input v-model="formData1.oldVerifyCode" type="text" class="setp-inp" placeholder="请输入原手机号验证码" style="display:inline-block;width: 184px;float: left;"></el-input>
                                    <el-button class="button1" @click="send" v-if="!sendOldMsgDisabled">获取短信验证码</el-button>
                                    <el-button class="button1" @click="send" v-if="sendOldMsgDisabled">{{time+'秒后获取'}}</el-button>
                                </el-form-item>
                                <el-form-item label="新手机号 :" prop="newPhone" class="sel-bot-password">
                                    <el-input v-model.trim="formData1.newPhone" type="text"
                                              auto-complete="off" placeholder="请输入新手机号"></el-input>
                                </el-form-item>
                                <el-form-item label="新手机号验证码 :" prop="newVerifyCode" class="newVerifyCode">
                                    <el-input v-model="formData1.newVerifyCode" type="text" class="setp-inp" placeholder="请输入新手机号验证码" style="display:inline-block;width: 184px;float: left;"></el-input>
                                    <el-button class="button1" @click="sendNew" v-if="!sendMsgDisabled">获取短信验证码</el-button>
                                    <el-button class="button1" @click="sendNew" v-if="sendMsgDisabled">{{time1+'秒后获取'}}</el-button>
                                </el-form-item>
                                <!--<el-form-item>-->
                                <el-button @click="submitForm2" type="primary" plain size="big" class="self-save-btn">
                                    保存
                                </el-button>
                                <!--</el-form-item>-->
                            </el-form>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>

            <!--教师-->
            <div class="self-left" v-if="userInfo.clientRoleType==2">
                <!--<div class="self_pic_left" :style="{backgroundImage: 'url('+require('../../assets/img/photo_big.png')+')'}"></div>-->
                <div class="self-left-content">
                    <div class="self-pic-left"
                         :style="{backgroundImage: 'url('+require('../../assets/img/self_pic_small.png')+')'}"></div>
                </div>
                <p class="self-name">{{userInfo.nick}}</p>
                <p class="self-code">{{userInfo.phone}}</p>
            </div>
            <div class="self-right" v-if="userInfo.clientRoleType==2">
                <el-tabs v-model="activeName" @tab-click="handleClick" class="hk-selIn-tabs">
                    <el-tab-pane label="个人信息" name="first" class="self-tab-first">
                        <!--<el-form-item class="self-pic-right">-->
                        <!--<baseImg url="sys/image/upload"></baseImg>-->
                        <!--</el-form-item>-->
                        <div class="self-pic-right-img">
                            <img src="../../assets/img/self_pic_big.png" alt="">
                        </div>
                        <div class="self-informationForm">
                            <el-form :model="form" ref="form" align="center" label-width="60px" label-position="right">
                                <!--<el-upload-->
                                        <!--:action="$config.HOST_API+'common/account/sign/upload'"-->
                                        <!--name="imageFile"-->
                                        <!--:show-file-list="false"-->
                                        <!--:on-success="upSuccess"-->
                                        <!--:on-error="upError"-->
                                        <!--:before-upload="beforeAvatarUpload"-->
                                        <!--:on-progress="upProgress">-->
                                    <!--<div class="self-pic-right"-->
                                         <!--:style="{backgroundImage: 'url('+$config.HOST_API+form.avatar+')'}"-->
                                         <!--v-if="userInfo.avatar"></div>-->
                                    <!--<div class="self-pic-right" v-else></div>-->
                                <!--</el-upload>-->
                                <el-form-item label="昵称 :" class="sel-bot">
                                    <el-input placeholder="请输入昵称" v-model="form.nick" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="性别 :" prop="sex">
                                    <el-radio-group v-model="form.sex" disabled>
                                        <el-radio :label="1">男</el-radio>
                                        <el-radio :label="2">女</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="修改密码" name="second">
                        <div class="self-informationForm-password">
                            <el-form :model="formData" :rules="rules" ref="formData" align="center" label-width="90px"
                                     label-position="right">
                                <el-form-item label="原密码 :" prop="oldPassword" class="sel-bot-password">
                                    <el-input v-model.trim="formData.oldPassword" type="password"
                                              auto-complete="off" placeholder="请输入原密码"></el-input>
                                </el-form-item>
                                <el-form-item label="新密码 :" prop="password" class="sel-bot-password">
                                    <el-input v-model.trim="formData.password" type="password" maxlength="12" minlength="6"
                                              auto-complete="off" placeholder="请输入新密码"></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码 :" prop="surePassWord" class="sel-bot-password">
                                    <el-input v-model.trim="formData.surePassWord" type="password"  maxlength="12" minlength="6"
                                              auto-complete="off" placeholder="请重复输入新密码"></el-input>
                                </el-form-item>
                                <!--<el-form-item>-->
                                <el-button @click="submitForm1" type="primary" plain size="big" class="self-save">
                                    保存
                                </el-button>
                                <!--</el-form-item>-->
                            </el-form>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import baseImg from "@/components/baseImg";
import md5 from "md5";
import Cookies from "js-cookie";

export default {
  data() {
    const checkpassword = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("请填写原密码"));
      }

//    let reg2 = /^(\w){6,12}$/;
//    const p1 = /[0-9]/;
//    const p2 = /[a-z]/i;
//    if (!reg2.test(value)) {
//      return callback(new Error("输入6-12位密码"));
//    }
//    if (!p1.test(value) || !p2.test(value)) {
//      return callback(new Error("密码必须由数字和字符组成"));
//    }

      callback();
    };
    const checknewpassword = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("请填写新密码"));
      }
      if (value) {
        let reg3 = /^(\w){6,12}$/;
          const p1 = /[0-9]/;
          const p2 = /[a-z]/i;
          if (!reg3.test(value)) {
              return callback(new Error("输入6-12位密码"));
          }else if (!p1.test(value) || !p2.test(value)) {
              return callback(new Error("密码必须由数字和字符组成"));
          } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const checksurepassword = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("请填写确认密码"));
      }
      if (this.formData.password) {
        if (!value) {
          return callback(new Error("请填写确认密码"));
        } else if (this.formData.password !== value) {
          return callback(new Error("确认密码与新密码不一致"));
        } else {
          callback();
        }
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
      activeName: "first",
      form: {
        sex: "",
        avatar: "",
        nick: "",
        rightStatus: ""
      },
      formData: {
        oldPassword: "",
        password: "",
        surePassWord: ""
      },
      formData1: {
        newPhone: "",
        newVerifyCode: "",
        oldVerifyCode: ""
      },
      rules: {
        oldPassword: [
          { required: true, validator: checkpassword, trigger: "blur" }
        ],
        password: [
          { required: true, validator: checknewpassword, trigger: "blur" }
        ],
        surePassWord: [
          { required: true, validator: checksurepassword, trigger: "blur" }
        ]
      },
      rules1: {
        newPhone: [{ required: true, validator: checktel, trigger: "blur" }],
        oldVerifyCode: [
          { required: true, message: "请填写原手机号验证码", trigger: "blur" }
        ],
        newVerifyCode: [
          { required: true, message: "请填写新手机号验证码", trigger: "blur" }
        ]
      },
      time: 60, // 发送验证码倒计时
      time1: 60, // 发送验证码倒计时
      sendMsgDisabled: false,
      sendOldMsgDisabled: false
    };
  },
  computed: mapState(["userInfo"]),
  components: {
    baseImg
  },
  mounted() {
    this.form.nick = this.userInfo.nick;
    this.form.avatar = this.userInfo.avatar;
    this.form.sex = this.userInfo.sex;
    this.form.rightStatus = this.userInfo.rightStatus;
    if (this.userInfo.rightStatus === 1) {
      this.form.rightStatus = this.userInfo.rightStatus;
    } else {
      this.form.rightStatus = 2;
    }
  },
  methods: {
    //获取验证码
    send() {
      this.$api.main
        .verify({
          clientRoleType: 1,
          phone: this.userInfo.phone,
          type: 3
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "原手机号验证码发送成功!",
            duration: 1000
          });
          let me = this;
          me.sendOldMsgDisabled = true;
          let interval = window.setInterval(function() {
            if (me.time-- <= 0) {
              me.time = 60;
              me.sendOldMsgDisabled = false;
              window.clearInterval(interval);
            }
          }, 1000);
        });
    },
    //获取验证码
    sendNew() {
      console.log(this.formData1.newPhone);
      if (this.formData1.newPhone.length === 11) {
        this.$api.main
          .verify({
            clientRoleType: 1,
            phone: this.formData1.newPhone,
            type: 4
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "新手机号验证码发送成功!",
              duration: 1000
            });
            let me = this;
            me.sendMsgDisabled = true;
            let interval = window.setInterval(function() {
              if (me.time1-- <= 0) {
                me.time1 = 60;
                me.sendMsgDisabled = false;
                window.clearInterval(interval);
              }
            }, 1000);
          });
      } else if (this.formData1.newPhone.length === 0) {
        this.$message({
          type: "error",
          message: "请输入新手机号!",
          duration: 1000
        });
      }
    },
    submitForm() {
      this.$api.selfInfo
        .selfInfo({
          sex: this.form.sex,
          avatar: this.form.avatar,
          nick: this.form.nick
        })
        .then(res => {
          this.$store.dispatch("update_userInfo", res.data);
          this.$message({
            type: "success",
            message: "修改成功"
          });
        });
    },
    submitForm1() {
      this.$refs["formData"].validate(valid => {
        if (valid) {
          this.formData.password = md5(this.formData.password);
          this.formData.oldPassword = md5(this.formData.oldPassword);
          this.$api.selfInfo
            .password({
              oldPassword: this.formData.oldPassword,
              password: this.formData.password
            })
            .then(() => {
              this.$message({
                type: "success",
                message: "修改成功!",
                duration: 1000
              });
              this.formData.password = "";
              this.formData.oldPassword = "";
              this.formData.surePassWord = "";
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm2() {
      this.$refs["formData1"].validate(valid => {
        if (valid) {
          this.$api.selfInfo
            .changePhone({
              oldPhone: this.userInfo.phone,
              oldVerifyCode: this.formData1.oldVerifyCode,
              newPhone: this.formData1.newPhone,
              newVerifyCode: this.formData1.newVerifyCode
            })
            .then(res => {
              if (res.code === 0) {
                this.$message({
                  type: "success",
                  message: "提交审核成功!",
                  duration: 1000
                });
                this.$store.commit({
                  type: "setState",
                  cType: "userInfo",
                  key: "phone",
                  nKey: this.formData1.newPhone
                });
                Cookies.set("userInfo", this.userInfo);
                // this.formData1.oldVerifyCode = "";
                // this.formData1.newPhone = "";
                // this.formData1.newVerifyCode = "";
                // this.time = 60;
                // this.sendOldMsgDisabled = false;
                // this.time1 = 60;
                // this.sendMsgDisabled = false;
                this.$router.push("/home");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    upSuccess(res) {
      if (res.code === 0) {
        this.form.avatar = res.data;
        console.log(this.form.avatar);
      } else {
        this.$message.error(res.msg);
      }
      this.message.close();
      this.message = null;
    },
    beforeAvatarUpload(file) {
      const imgTypes = ["image/jpeg", "image/png"];
      const isJPG = imgTypes.indexOf(file.type) > -1 ? true : false;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    upProgress(event) {
      let percent = parseInt(event.percent * 100) / 100;

      if (this.message) {
        this.message.message = "上传进度" + percent + "%";
      } else {
        this.message = this.$message({
          message: "上传进度" + percent + "%",
          duration: 0
        });
      }
    },
    upError(res) {
      this.$message({
        message: res.message,
        type: "error"
      });
      this.message.close();
      this.message = null;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang="less">
.self-background {
  background-color: #f4f4f4;
  /*height: 100vh;*/
}

.self-main {
  max-width: 1200px;
  margin: 0 auto;
}

.self-left {
  width: 260px;
  height: 232px;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 58px;
  float: left;
}

.self-left-content {
  margin: 26px auto 0;
  width: 104px;
  height: 104px;
  font-size: 0;
  border-radius: 50%;
}

.self-pic-left {
  width: 104px;
  height: 104px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.self-name {
  margin-top: 23px;
  text-align: center;
  font-size: 15px;
}

.self-code {
  margin-top: 18px;
  text-align: center;
  font-size: 15px;
}

.self-right {
  float: right;
  width: 872px;
  height: 590px;
  background-color: #fff;
  margin-top: 58px;
  border-radius: 10px;
}

.self-pic-right {
  margin: 0 auto;
  height: 136px;
  width: 136px;
  margin-left: 60px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: 44px;
  background-image: url("../../assets/img/self_pic_big.png");
  /*margin-top: 44px;*/
  font-size: 0;
  /*img {*/
  /*height: 136px;*/
  /*width: 136px;*/
  /*}*/
}

.self-pic-right-img {
  height: 136px;
  width: 136px;
  margin: 40px auto 0;
  img {
    height: 136px;
    width: 136px;
  }
}

.self-informationForm {
  margin: 0 auto;
  width: 288px;
  margin-top: 66px;
  .el-tabs__nav {
    line-height: 64px !important;
    height: 64px !important;
    color: #989898 !important;
    font-size: 15px !important;
    /*margin-bottom: 40px;*/
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #5e4eaa;
    background: #5e4eaa;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #000;
  }
  .el-button--primary.is-plain {
    color: #fff;
    background: #5e4eaa;
    border-color: #5e4eaa;
    width: 100px;
    height: 40px;
    margin-left: 465px;
    margin-top: 6px;
  }
  .el-button--primary.is-plain:focus,
  .el-button--primary.is-plain:hover {
    background: #5e4eaa;
    border-color: #5e4eaa;
    color: #fff;
  }
}

.el-tabs__nav {
  line-height: 64px;
  height: 64px;
  color: #989898;
  font-size: 15px;
  margin-left: 23px;
  /*margin-bottom: 40px;*/
}

.self-informationForm-password {
  margin: 0 auto;
  width: 288px;
  margin-top: 103px;
  .el-button--primary.is-plain {
    color: #fff;
    background: #5e4eaa;
    border-color: #5e4eaa;
    width: 100px;
    height: 40px;
    margin-left: 350px;
    margin-top: 70px;
  }
  .el-button--primary.is-plain:focus,
  .el-button--primary.is-plain:hover {
    background: #5e4eaa;
    border-color: #5e4eaa;
    color: #fff;
  }
}
.self-informationForm-changePhone {
  margin: 0 auto;
  width: 450px;
  margin-top: 103px;
  .el-button--primary.is-plain {
    color: #fff;
    background: #5e4eaa;
    border-color: #5e4eaa;
    width: 100px;
    height: 40px;
    margin-left: 350px;
    margin-top: 103px;
  }
  .el-button--primary.is-plain:focus,
  .el-button--primary.is-plain:hover {
    background: #5e4eaa;
    border-color: #5e4eaa;
    color: #fff;
  }
}

/*.hk-selIn-tabs {*/
.el-tabs__nav-scroll {
  height: 64px;
}

.el-tabs__item.is-active {
  color: #232323;
}

.el-tabs__active-bar {
  background-color: #5e4eaa;
}

.el-tabs__nav-wrap::after {
  background-color: #e5e5e5;
  height: 1px;
}

.sel-bot {
  margin-bottom: 40px;
}

.sel-bot-password {
  margin-bottom: 55px;
}

.self-save {
  margin-top: 40px;
  margin-left: 465px !important;
}
.self-save-btn {
  margin-top: 40px;
  margin-left: 546px !important;
}
.button1 {
  background-color: #fff;
  float: right;
  width: 120px;
  height: 40px;
  color: #989898;
  padding: 12px;
}
</style>
