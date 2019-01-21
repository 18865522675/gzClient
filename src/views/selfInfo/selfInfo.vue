<template>
  <div class="container">
    <div class="my-info">
      <!-- <div class="bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人资料</el-breadcrumb-item>
        </el-breadcrumb>
      </div> -->
      <div class="info_bar">
        <p>个人资料
          <span>INFORMATIONS</span>
        </p>
      </div>
      <div class="info_detial">
        <div class="detial_left">
          <ul>
            <li>
              <div>姓&nbsp;&nbsp;&nbsp;&nbsp;名：</div>
              <div>{{information.userName}}</div>
            </li>
            <li>
              <div>学&nbsp;&nbsp;&nbsp;&nbsp;号：</div>
              <div>{{information.code}}</div>
            </li>
            <li>
              <div>年&nbsp;&nbsp;&nbsp;&nbsp;级：</div>
              <div>{{information.batchName}}</div>
            </li>
            <li>
              <div>层&nbsp;&nbsp;&nbsp;&nbsp;次：</div>
              <div>{{information.levelName}}</div>
            </li>
            <li>
              <div>专&nbsp;&nbsp;&nbsp;&nbsp;业：</div>
              <div :title="information.majorName" class="over_hidden" style="width:200px;">{{information.majorName}}</div>
            </li>
            <li>
              <div>学&nbsp;&nbsp;&nbsp;&nbsp;校：</div>
              <div>{{information.siteName}}</div>
            </li>
            <li>
              <div>函&nbsp;授&nbsp;站：</div>
              <div>{{information.stationName}}</div>
            </li>
            <li>
              <div>学籍状态：</div>
              <div class="status" @click="stateForm">{{information.schoolStateName}}</div>
            </li>

          </ul>
        </div>
        <div class="detial_right">
          <!-- <img width="30%" height="20%" src="../../assets/img/Picture.png" alt="" class="kf-form-upImg" v-if="!photo"> -->
        <el-form label-width="100px" class="kf-form-add" :model="formData" :rules="rules" ref="formData">
          <el-form-item prop="photo">
            <el-input type="textarea" v-model.trim="formData.photo" style="display: none;"></el-input>
            <!-- <img width="30%" height="20%" :src="require('../../assets/img/selfPic.png')" alt="" class="kf-form-upImg" v-if="!formData.photo"> -->
            <div :style="{backgroundImage: 'url('+require('../../assets/img/Picture.png')+')'}" v-if="!formData.photo" class="kf-form-upImg"></div>
            <div class="kf-form-upImg" :style="{backgroundImage: 'url('+$api.global.img+formData.photo+'?'+random+')'}" v-else></div>
            <!-- <router-link to="/preschoolReview/preschoolReview" class="learn_bg lbg_3" :style="{backgroundImage: 'url('+require('../../assets/img/photo3.png')+')'}"></router-link> -->
            <!-- <img width="30%" height="20%" :src="$api.global.img+formData.photo+'?'+random" alt="" class="kf-form-upImg" v-else> -->
            <!-- <img width="30%" height="20%" :src="$api.global.img+formData.photo" alt="" class="kf-form-upImg"> -->
            <el-upload
              :action="$api.global.url + 'api/student/image/upload'"
              :headers="headers"
              :on-success="upSuccess"
              :on-error="upError"
              :on-progress="upProgress"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :with-credentials="true">
              <el-button size="small" type="primary" class="setinfo_upload">修改头像</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="虚拟名称 :" class="sel-bot" prop="name">
              <el-input placeholder="请输入虚拟名称" v-model="formData.virtualAccount"  :disabled="information.virtualAccount!=null">小丸子</el-input>
              <!-- <el-input placeholder="请输入虚拟名称" v-model="formData.virtualAccount" :disabled="information.virtualAccount!=null">小丸子</el-input> -->
          </el-form-item>
        </el-form>
            <el-button type="primary" class="save" @click="save">保存</el-button>
        </div>
      </div>
    </div>

    <!-- 状态弹框 -->
    <el-dialog title="学籍状态" :visible.sync="centerDialogVisible" width="30%" center>
      <!-- <span>需要注意的是内容是默认不居中的</span> -->
      <div class="leranStatus" v-for="(item,index) in schoolState" :key="index">
        <span>{{item.totalTime}}</span>
        <span>{{item.schoolStateGet}}</span>
      </div>
      <!-- <div class="leranStatus">
        <span>{{schoolState.transactionTime}}</span>
        <span>{{schoolState.statusName}}</span>
      </div> -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="btnstyle" @click="centerDialogVisible = false">知道了</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import headModule from "../../components/header";
export default {
  data() {
    return {
      headers: {
        Token: sessionStorage.getItem("Token")
      },
      centerDialogVisible: false,
      rules: {},
      information: "",
      schoolState: "",
      schoolStateGet: "",
      formData: {
        photo: "",
        virtualAccount: ""
      },
      random: "",
      schoolStateData: [
        {
          type: 0,
          value: 0,
          label: "考前（未录取）"
        },
        {
          type: 0,
          value: 1,
          label: "正常"
        },
        {
          type: 0,
          value: 2,
          label: "休学"
        },
        {
          type: 0,
          value: 3,
          label: "退学"
        },
        {
          type: 0,
          value: 4,
          label: "毕业"
        },
        {
          type: 0,
          value: 5,
          label: "复学"
        },
        {
          type: 0,
          value: 6,
          label: "延迟毕业"
        },
        {
          type: 0,
          value: 7,
          label: "肄业"
        },
        {
          type: 1,
          value: 8,
          label: "转函授站"
        },
        {
          type: 2,
          value: 9,
          label: "转专业"
        }
      ]
    };
  },
  components: { headModule },
  mounted() {
    this.get_List();
  },
  methods: {
    get_List() {
      this.$api.setInfo
        .get_info()
        .then(res => {
          // console.log(res.data);
          this.information = res.data;
          this.formData.photo = this.information.photo;
          this.formData.virtualAccount = this.information.virtualAccount;
          // if (!this.information.photo) {
          //   this.formData.photo = "/img/Picture.28b50584.png";
          // }
          console.log(this.formData.photo);
        })
        .catch(res => {
          console.log(res);
        });
    },
    stateForm() {
      this.centerDialogVisible = true;
      this.$api.setInfo.get_state().then(res => {
        console.log(res);
        this.schoolState = res.data;
        this.schoolState
          .forEach(item => {
            console.log(this.$fun.table.time(null, null, item.transactionTime));
            item.totalTime = this.$fun.table.time(
              null,
              null,
              item.transactionTime
            );
            for (let i of this.schoolStateData) {
              if (i.value == item.statusName) {
                item.schoolStateGet = i.label;
              }
            }
          })
          .catch(res => {
            console.log(res);
          });
      });
    },
    save() {
      this.$refs["formData"].validate(valid => {
        if (valid) {
          this.$api.setInfo
            .edit_photo({
              imgPath: this.formData.photo,
              virtualAccount: this.formData.virtualAccount
            })
            .then(() => {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              this.get_List();
            })
            .catch(() => {});
          return;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    upSuccess(res) {
      if (res.resultCode === 1000) {
        this.$message({
          message: "上传成功",
          type: "success"
        });
        // console.log(res);
        this.formData.photo = res.data;
        this.$nextTick(() => {
          this.random = Math.random();
        });
      } else {
        this.$message({
          message: res.msg,
          type: "error"
        });
      }
      this.message.close();
      this.message = null;
    },
    upError(res) {
      this.$message({
        message: res.message,
        type: "error"
      });
      this.message.close();
      this.message = null;
    },
    upProgress(event) {
      let percent = parseInt(event.percent * 100) / 100;
      console.log(percent);
      if (this.message) {
        this.message.message = "上传进度" + percent + "%";
      } else {
        this.message = this.$message({
          message: "上传进度" + percent + "%",
          duration: 0
        });
      }
    },
    beforeAvatarUpload(file) {
      const isJPEG = file.type === "image/jpeg";
      const isJPG = file.type === "image/jpeg";
      const isGIF = file.type === "image/gif";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isGIF && !isPNG && !isJPEG) {
        this.$message({
          message: "上传图片必须是JPG/GIF/PNG/JPEG 格式!",
          type: "error"
        });
      }
      if (!isLt2M) {
        this.$message({
          message: "上传图片大小不能超过 2MB!",
          type: "error"
        });
      }
      return (isJPG || isGIF || isPNG || isJPEG) && isLt2M;
    }
  }
};
</script>

<style scoped lang="less">
.my-info {
  width: 1200px;
  margin: 0 auto;
  // padding-top: 20px;
  .info_bar {
    width: 1200px;
    height: 60px;
    box-sizing: border-box;
    line-height: 60px;
    background: #6d8bfa;
    margin-top: 9px;
    padding-left: 40px;
    p {
      font-family: PingFangSC-Medium;
      font-size: 24px;
      color: #ffffff;
      letter-spacing: 0;
    }
    span {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #ffffff;
      letter-spacing: 0;
      line-height: 33px;
      margin-left: 5px;
    }
  }
  .save {
    position: absolute;
    left: 382px;
    top: 335px;
    background: #6d8bfa;
    border-color: #fff;
    padding: 15px 20px;
  }
  .info_detial {
    width: 100%;
    padding-top: 40px;
    overflow: hidden;
    .detial_left,
    .detial_right {
      float: left;
      width: 50%;
      height: 400px;
      position: relative;
      img {
        display: block;
        width: 200px;
        height: 233px;
        border: 1px dotted #bbb;
        margin: 0 auto;
      }
      p {
        height: 48px;
        text-align: center;
        margin-top: 50px;
        .el-button--primary {
          background: #6d8bfa;
        }
      }
    }
    .detial_left ul {
      width: 60%;
      margin: 0 auto;
    }
    .detial_left li {
      display: flex;
      height: 25px;
      line-height: 25px;
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #333333;
      letter-spacing: 0;
      margin-bottom: 15px;
      div:nth-child(1) {
        width: 100px;
      }
      .status {
        height: 100%;
        padding-right: 10px;
        background-image: url("../../assets/img/left2.png");
        background-position: 39px 7px;
        background-repeat: no-repeat;
        cursor: pointer;
      }
    }
    .detial_left li:last-child {
      padding-top: 15px;
    }
  }
}
.btnstyle {
  width: 180px;
  height: 48px;
  border: 0;
  background: #6d8bfa;
  border-radius: 4px;
  font-family: PingFangSC-Regular;
  font-size: 18px;
  color: #ffffff;
  letter-spacing: 0;
}
.leranStatus {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #333333;
  span:last-child {
    margin-left: 40px;
  }
}
.setinfo_upload {
  margin: 100px 0 0 151px;
  background: #6d8bfa;
  border-color: #fff;
  border-radius: 4px;
  padding: 15px 20px;
  font-size: 14px;
}
.kf-form-upImg {
  width: 200px;
  height: 235px;
  margin: 0 auto;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.sel-bot {
  width: 50%;
  position: absolute;
  left: 150px;
  top: 270px;
}
.over_hidden {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
