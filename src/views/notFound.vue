<template>
  <div class="notF-bd">
    <div class="notF-hd">
      <div class="notF-ico"><i class="el-icon-info" style="color: #E6A23C;"></i></div>
      <div class="notF-tit">404，很抱歉，您访问的页面不存在......</div>
    </div>
    <div class="notF-ft">
      <el-button type="primary" @click="$router.replace('/home')">首页</el-button>
      <el-button type="primary" @click="$router.back()">返回上一页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
