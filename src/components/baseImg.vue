<template>
 <div>
     <el-upload
      class="avatar-uploader"
      :action="$api.global.url + url"
      :headers="headers"
      :show-file-list="false"
      :on-success="upSuccess"
      :on-error="upError"
      :before-upload="beforeAvatarUpload"
      :on-progress="upProgress">
      <!-- <div v-if="$api.global.img+null">
        <i v-if="!imageUrl&&!profilePhoto" class="el-icon-plus avatar-uploader-icon"></i>
      </div>
      <div v-else> -->
        <img v-if="imageUrl" :src="$api.global.img+imageUrl" class="avatar">
        <img v-if="!imageUrl&&photo!=null" :src="$api.global.img+photo+'?random='+Math.random()" class="avatar">
        <i v-if="!imageUrl&&!photo" class="el-icon-plus avatar-uploader-icon"></i>
        <!-- <i v-if="!imageUrl||$api.global.img+null" class="el-icon-plus avatar-uploader-icon"></i> -->
      <!-- </div> -->
    </el-upload> 
 </div>
</template>

<script>
export default {
  data() {
    return {
      message: null,
      imageUrl: "",
      headers: {
        Token: sessionStorage.getItem("Token")
      }
    };
  },
  model: {
    prop: "photo",
    event: "modelPhoto"
  },
  props: ["url", "success", "photo"],
  mounted() {},
  methods: {
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
    },
    upSuccess(res) {
      if (res.resultCode === 1000) {
        this.$message({
          message: "上传成功",
          type: "success"
        });
        setTimeout(() => {
          this.imageUrl = res.data + "?random=" + Math.random();
          this.$emit("modelPhoto", res.data);
        }, 600);
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

      if (this.message) {
        this.message.message = "上传进度" + percent + "%";
      } else {
        this.message = this.$message({
          message: "上传进度" + percent + "%",
          duration: 0
        });
      }
    }
  }
};
</script>

<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
