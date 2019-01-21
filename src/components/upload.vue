<template>
 <div>
   <el-upload
     class="xf-upload-temp"
     name="excelFile"
     :headers="headers"
     :action="$api.global.url + url"
     :show-file-list="false"
     :with-credentials="true"
     :on-success="upSuccess"
     :on-error="upError"
     :on-progress="upProgress"
   >
     <div class="kf-btn kf-btn-table">批量导入</div>
   </el-upload>
 </div>
</template>

<script>
export default {
  data() {
    return {
      message: null,
      headers: {
        Token: sessionStorage.getItem("Token")
      }
    };
  },
  props: ["url", "ok"],
  mounted() {},

  methods: {
    upSuccess(res) {
      if (res.resultCode === 1000) {
        this.$message({
          message: "上传成功",
          type: "success"
        });
        if (this.ok) this.ok();
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
</style>
