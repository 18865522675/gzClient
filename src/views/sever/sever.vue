<template>
    <div class="sever-main">
        <!--学生-->
        <ul class="sever-left" v-if="userInfo.clientRoleType==1">
            <li class="sever-nav" @click="severList(1)">
                <div  :class="typeList ==1?'sever-round-active':'sever-round'"></div>
                <span>热线客服</span>
            </li>
            <li class="sever-nav" @click="severList(2)">
                <div  :class="typeList ==2?'sever-round-active':'sever-round'"></div>
                <span>意见反馈</span>
            </li>
        </ul>
        <ul class="sever-right" v-if="typeList==1&&userInfo.clientRoleType==1">
            <li class="sever-list">
                <img src="../../assets/img/sever_phone.png" alt="">
                <p class="sever-list-content">
                    服务热线: 400888888
                </p>
            </li>
            <li class="sever-list">
                <img src="../../assets/img/sever_time.png" alt="">
                <p class="sever-list-content">
                    服务时间: 9:00-22:00
                </p>
            </li>
        </ul>
        <div class="sever-back-right" v-if="typeList==2&&userInfo.clientRoleType==1">
            <div class="sever-back-right-content">
                <el-form :model="form" :rules="rules" ref="ruleForm" align="center" label-width="115px" label-position="right" class="informationForm">
                    <el-form-item  class="suggest-content sever-back-right-textarea" prop="content" label="意见反馈">
                        <el-input type="textarea" class="text" placeholder="请输入反馈意见，我们会以消息的形式回复您的消息或意见，改进产品体验，谢谢！" v-model.trim="form.content"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <!--<el-upload-->
                                <!--:action="$config.HOST_API+'common/account/sign/upload'"-->
                                <!--name="imageFile"-->
                                <!--:show-file-list="false"-->
                                <!--:on-success="upSuccess"-->
                                <!--:on-error="upError"-->
                                <!--:before-upload="beforeAvatarUpload"-->
                                <!--:on-progress="upProgress">-->
                            <!--<div class="self-pic-right" :style="{backgroundImage: 'url('+$config.HOST_API+  form.imgUrl+')'}"></div>-->
                            <!--&lt;!&ndash;<div class="self-pic-right"></div>&ndash;&gt;-->
                        <!--</el-upload>-->
                        <baseImg url="common/account/sign/upload"  v-model="form.imgUrl"></baseImg>
                    </el-form-item>
                </el-form>
                <el-button @click="submitForm('ruleForm')" type="primary" plain size="big" >提交反馈</el-button>
            </div>
        </div>

        <!--教师-->
        <ul class="sever-left" v-if="userInfo.clientRoleType==2">
            <li class="sever-nav" @click="severList(1)">
                <div  :class="typeList ==1?'sever-round-active':'sever-round'"></div>
                <span>热线客服</span>
            </li>
            <li class="sever-nav" @click="severList(2)">
                <div  :class="typeList ==2?'sever-round-active':'sever-round'"></div>
                <span>意见反馈</span>
            </li>
        </ul>
        <ul class="sever-right" v-if="typeList==1&&userInfo.clientRoleType==2">
            <li class="sever-list">
                <img src="../../assets/img/sever_phone.png" alt="">
                <p class="sever-list-content">
                    服务热线: 400888888
                </p>
            </li>
            <li class="sever-list">
                <img src="../../assets/img/sever_time.png" alt="">
                <p class="sever-list-content">
                    服务时间: 9:00-22:00
                </p>
            </li>
        </ul>
        <div class="sever-back-right" v-if="typeList==2&&userInfo.clientRoleType==2">
            <div class="sever-back-right-content">
                <el-form :model="form" :rules="rules" ref="ruleForm" align="center" label-width="80px" label-position="right" class="informationForm">
                    <el-form-item  class="suggest-content sever-back-right-textarea" prop="content" label="意见反馈">
                        <el-input type="textarea" class="text" placeholder="请输入反馈意见，我们会以消息的形式回复您的消息或意见，改进产品体验，谢谢！" v-model.trim="form.content"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <!--<el-upload-->
                                <!--:action="$config.HOST_API+'common/account/sign/upload'"-->
                                <!--name="imageFile"-->
                                <!--:show-file-list="false"-->
                                <!--:on-success="upSuccess"-->
                                <!--:on-error="upError"-->
                                <!--:before-upload="beforeAvatarUpload"-->
                                <!--:on-progress="upProgress">-->
                            <!--<div class="self-pic-right" :style="{backgroundImage: 'url('+$config.HOST_API+form.imgUrl+')'}"></div>-->
                            <!--&lt;!&ndash;<div class="self-pic-right"></div>&ndash;&gt;-->
                            <!--<i class="el-icon-plus avatar-uploader-icon"></i>-->
                        <!--</el-upload>-->
                        <baseImg url="common/account/sign/upload" v-model="form.imgUrl" ref="baseImg"></baseImg>
                    </el-form-item>
                    <!--<el-form-item>-->
                        <!--<el-button @click="submitForm('ruleForm')" type="primary" plain size="big" >提交反馈</el-button>-->
                    <!--</el-form-item>-->
                </el-form>
                <el-button @click="submitForm('ruleForm')" type="primary" plain size="big">提交反馈</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import baseImg from "@/components/baseImg";
export default {
  data() {
    return {
      typeList: 1,
      form: {
        content: "",
        imgUrl: ""
      },
      rules: {
        content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      }
    };
  },
  computed: mapState(["userInfo"]),
  components: {
    baseImg
  },
  mounted() {
    console.log(this.userInfo);
  },
  methods: {
    severList(type) {
      if (type == 1) {
        this.typeList = 1;
      } else {
        this.typeList = 2;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.sever
            .sever({
              imgUrl: this.form.imgUrl,
              content: this.form.content
            })
            .then(() => {
              this.$confirm("意见发送成功，感谢您的反馈！", "温馨提示", {
                confirmButtonText: "知道了",
                cancelButtonText: "取消",
                showCancelButton: false
              });
              this.form.content = "";
              this.$refs.baseImg.resetUrl();
              // this.$refs.upload.clearFiles();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    upSuccess(res) {
      if (res.code === 0) {
        this.form.imgUrl = res.data;
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
    }
  }
};
</script>

<style lang="less">
.kf-form-upImg {
  width: 200px;
  height: 235px;
  margin: 0 auto;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.sever-main {
  margin-top: 58px;
  max-width: 1200px;
  margin: 58px auto 0;
  display: flex;
  justify-content: space-between;
  .sever-left {
    width: 260px;
    height: 176px;
    background-color: #fff;
    border-radius: 10px;
    .sever-nav {
      height: 58px;
      border-bottom: #e5e5e5 1px solid;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: #ffba4e;
        cursor: pointer;
      }
    }
    .sever-round {
      height: 8px;
      width: 8px;
      border-radius: 50%;
      background-color: #404852;
      margin-right: 16px;
    }
    .sever-round-active {
      height: 8px;
      width: 8px;
      border-radius: 50%;
      background-color: #ffba4e;
      margin-right: 16px;
    }
  }
  .sever-right {
    width: 872px;
    background-color: #fff;
    border-radius: 10px;
    .sever-list {
      height: 218px;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      .sever-list-content {
        padding-left: 20px;
        font-size: 20px;
        color: #2a2f44;
      }
    }
  }
  .sever-back-right {
    width: 872px;
    height: 650px;
    background-color: #fff;
    border-radius: 10px;
    .sever-back-right-content {
      width: 636px;
      margin: 0 auto;
    }
    .avatar-uploader {
      text-align: left;
    }
    .el-form-item__content {
      margin-left: 0px !important;
    }
    .sever-back-right-textarea {
      margin-top: 38px;
      .el-textarea__inner {
        width: 636px;
        height: 180px;
        margin: 0px auto 0;
      }
      .el-textarea {
        padding: 0px 0 10px;
        text-align: center;
      }
      .el-form-item__content {
        margin-left: 0px;
      }
    }
    .el-radio__input.is-checked .el-radio__inner {
      border-color: #5e4eaa;
      background: #5e4eaa;
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: #000;
    }
    .el-button--primary.is-plain {
      color: #2a2f44;
      background: #ffba4e;
      border-color: #ffba4e;
      width: 100px;
      height: 40px;
      margin-left: 500px;
      margin-top: 20px;
      width: 150px;
      height: 40px;
    }
    .el-button--primary.is-plain:focus,
    .el-button--primary.is-plain:hover {
      background: #ffba4e;
      border-color: #ffba4e;
      color: #2a2f44;
    }
  }
}
/*.sever-back-right-textarea{*/
/*.el-textarea__inner {*/
/*width: 636px;*/
/*height: 180px;*/
/*margin: 0 auto;*/
/*}*/
/*.el-textarea {*/
/*padding: 38px 0 10px;*/
/*text-align: center;*/
/*}*/
/*.el-form-item__content{*/
/*margin-left: 0px!important;*/
/*}*/
/*}*/
.select {
  margin-bottom: 0px;
  margin-top: 66px;
}
.select-text {
}
</style>
