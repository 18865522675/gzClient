<template>
 <div>
     <el-upload
      class="avatar-uploader"
      :action="$config.HOST_API + url"
      name="imageFile"
      :show-file-list="false"
      :on-success="upSuccess"
      :on-error="upError"
      :before-upload="beforeAvatarUpload"
      :on-progress="upProgress">
      <!-- <div v-if="$api.global.img+null">
        <i v-if="!imageUrl&&!profilePhoto" class="el-icon-plus avatar-uploader-icon"></i>
      </div>
      <div v-else> -->
        <!--<img v-if="imageUrl" :src="$config.HOST_API+imageUrl" class="avatar">-->
         <div v-if="imageUrl" :style="{backgroundImage: 'url('+$config.HOST_API+imageUrl+')'}" class="baseImg-img avatar"></div>
        <!--<img v-if="!imageUrl&&imgUrl!=null" :src="$config.HOST_API+imgUrl" class="avatar">-->
        <i v-if="!imageUrl&&!imgUrl" class="el-icon-plus avatar-uploader-icon"></i>
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
      imageUrl: ""
    };
  },
  model: {
    prop: "imgUrl",
    event: "modelPhoto"
  },
  props: ["url", "success", "imgUrl"],
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
      if (res.code === 0) {
        this.$message({
          message: "上传成功",
          type: "success"
        });
        setTimeout(() => {
          this.imageUrl = res.data;
          console.log(this.imageUrl);
          this.$emit("modelPhoto", res.data);
          // this.success&&this.success()
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
    },
    resetUrl() {
      console.log(123);
      this.imageUrl = "";
      this.$emit("modelPhoto", "");
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
  /*text-align: center;*/
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.baseImg-img {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
