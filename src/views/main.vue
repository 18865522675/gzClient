<template>
  <div class="g-main">
    <headerMoudel></headerMoudel>
    <div class="bread" v-if="crumbsStatus">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: index < crumbs.length-1?item.path:'' }" v-for="(item, index) in crumbs" :key="index" v-if="item.path!=='/none'">{{item.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--<footerMoudel></footerMoudel>-->
    <router-view class="m-main"/>
  </div>
</template>
 
<script>
import headerMoudel from "../components/header";
import footerMoudel from "../components/footer";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    headerMoudel,
    footerMoudel
  },
  computed: mapState(["crumbs", "crumbsStatus"]),
  mounted() {
    console.log(666);
  },
  methods: {}
};
</script>
<style>
.bread {
  max-width: 1200px;
  margin: 0 auto;
  margin: 29px auto 8px;
  font-size: 15px;
}
</style>
