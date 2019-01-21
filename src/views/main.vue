<template>
  <div class="g-main">
    <headModule></headModule>
    <div class="bread" style="width:1200px;margin:20px auto 9px" v-if="crumbsStatus">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: item.path }" v-for="(item, index) in crumbs" :key="index" v-if="item.path!=='/none'">{{item.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="mainInfo">
    	<div class="mainInfo-left">
    		
    	</div>
    	<div class="mainInfo-right">
    			
    	</div>
    </div>
    <!--<router-view class="m-main"/>-->
    <!--<div class="footer" v-if="!crumbsStatus">-->
      <!--<div class="footer-box">-->
        <!--<div class="footer-left">-->
          <!--<p>华博特·课房研发中心</p>-->
          <!--<p>地址: 杭州市经济开发区科技园路   邮编:325400</p>-->
          <!--<p>联系电话;027-87792201（院办）  027-87792733（传真）  027-87792640（招办）</p>-->
          <!--<p>电子邮箱:yjzs_hust@163.com  浙公网安备 42011102000738号</p>-->
        <!--</div>-->
        <!--<div class="footer-right">-->
          <!--<img src="../assets/img/Bitmap.png" alt="" class="footer-logo">-->
          <!--<div class="footer-logo-tit">友情链接</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
import headModule from "../components/header";
import { mapState } from "vuex";

export default {
  name: "g-main",
  data() {
    return {};
  },
  computed: mapState(["crumbs", "crumbsStatus"]),
  components: {
    headModule
  },
  mounted() {
    console.log(this.crumbs);
  }
};
</script>
<style type="text/css" lang="less">
	.mainInfo{
		padding-top: 20px;
		.mainInfo-left{
			width: 240px;
		}
		.mainInfo-right{
			flex:1;
			margin-left: 20px;
		}
		
	}
</style>
