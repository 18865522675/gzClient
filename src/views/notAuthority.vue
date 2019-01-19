<template>
  <div class="notF-bd">
    <div class="notF-hd">
      <div class="notF-ico"><i class="el-icon-warning" style="color: #F56C6C;"></i></div>
      <div class="notF-tit">很抱歉，您没有权限访问该页面</div>
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
