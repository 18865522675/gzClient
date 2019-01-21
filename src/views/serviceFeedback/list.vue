<template>
  <div class="g-module">
    <div class="kf-head">
      <div class="kf-head-cap">
        <b>服务反馈</b>
        <small>SERVE</small>
      </div>
    </div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" class="nav" >
      <el-tab-pane label="热线服务" name="first">
        <div class="kf-listMain-service">
          <p class="phone">服务热线：400888888</p>
          <p class="time">服务时间：09:00—22:30</p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="意见反馈" name="second">
        <div class="kf-listMain-exam">
          <p class="suggest">意见反馈</p>
          <el-form ref="form" :model="form" class="el-suggest" :rules="rules">
            <el-form-item  class="suggest-content" prop="content">
              <el-input type="textarea" style="width:800px;height:240px;margin-left:40px;margin-top:20px;" class="text" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item class="suggest-upload" prop="photo">
              <baseImg url="api/student/feed/back/upload" v-model="form.photo"></baseImg>
            </el-form-item>
          </el-form>
          <div @click="show" class="suggest-submit">提交</div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import baseImg from "@/components/baseImg";
import "../../assets/css/serviceFeedback.less";
export default {
  data() {
    return {
      activeName2: "first",
      dialogAddVisible: false,
      form: {},
      imageUrl: "",
      rules: {
        content: [
          { required: true, message: "请填写内容", trigger: "blur" },
          { max: 200, message: "长度不能超过200个字", trigger: "blur" }
        ],
        photo: [{ required: true, message: "请上传图片", trigger: "blur" }]
      }
    };
  },
  components: {
    baseImg
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    show() {
      this.$refs["form"].validate(valid => {
        console.log(valid);
        if (valid) {
          this.$api.serviceFeedback
            .get_feed_back({
              photo: this.form.photo,
              content: this.form.content
            })
            .then(() => {
              this.$alert("感谢你的反馈！", "温馨提示", {
                confirmButtonText: "确定"
                // callback: action => {
                //   this.$message({
                //     type: "info",
                //     message: `action: ${action}`
                //   });
                // }
              });
              // location.reload();
            })
            .catch(res => {
              console.log(res);
            });
          this.form.content = "";
          this.form.photo = "";
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style lang="less" scoped>
.nav {
  margin-top: 40px;
}
</style>
