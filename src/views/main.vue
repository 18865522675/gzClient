<template>
  <div class="g-main">
    <headModule></headModule>
    <div class="bread" style="width:1200px;margin:20px auto 9px" v-if="crumbsStatus">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: item.path }" v-for="(item, index) in crumbs" :key="index" v-if="item.path!=='/none'">{{item.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="mainInfo flex-r" >
    	<div class="mainInfo-left">
    		<div class="userPic flex-r" >
    			<div class='pic'>
    				<div  :style="{backgroundImage: 'url('+require('../assets/img/Picture.png')+')'}" v-if="!userInfo.logo" class="kf-form-upImg styBg"></div>
            <div  class="kf-form-upImg styBg" :style="{backgroundImage: 'url('+userInfo.logo+')'}" v-else></div>
    			</div>
    			<span>{{userInfo.userName}}</span>	
    		</div>
    		<div class="routerList">
    			<div v-for="(item,index) in routes" @click="$router.push(item.path)" :class="{'routeActive':$route.path==item.path}" :key="index" class="routerItem">
    				{{item.meta.title}}
    			</div>
    		</div>
    	</div>
    	<div class="mainInfo-right">
    			<router-view ></router-view>
    	</div>
    </div>
    <!--<div class="bigTopLine" @click.stop>
    	
    </div>-->
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
    return {
    	routes:[]
    };
  },
  computed: mapState(["crumbs", "crumbsStatus","userInfo"]),
  components: {
    headModule
  },
  mounted() {
  	this.routes=this.$router.options.routes[1].children
//  console.log(this.$router.options.routes[1].children);
		this.get_List()
  },
  methods:{
  	get_List() {
      this.$api.setInfo
        .get_info()
        .then(res => {
						this.$store.commit({
							type:'set_userInfo',
							res:res.data
						})
						console.log(this.$store.state.userInfo)
        })
        .catch(res => {
          console.log(res);
        });
    },
  }
};
</script>
<style type="text/css" lang="less">
	body{
		position: relative!important;
	}
	.mainInfo{
		padding-top: 20px;
		width: 1200px;
		margin: 0 auto;
		.mainInfo-left{
			width: 240px;
			height: 900px;
			background: #FFFFFF;
			box-shadow: 4px 0 4px 0 rgba(0,0,0,0.15);
			.userPic{
				width: 100%;
				height: 90px;
				align-items: center;
				justify-content:space-around;
				.pic{
					width: 70px;
					height: 70px;
					/*background: green;*/
					border-radius: 50%;
				}
			}
			.routerList{
				.routerItem{
					text-align: center;
					line-height: 60px;
					font-size: 14px;
					/*font-weight:bold;*/ 
					&:hover{
						background-color: #F8F8F8;
					}
				}
			}
		}
		.mainInfo-right{
			flex:1;
			margin-left: 20px;
			height: 600px;
			background: white;
			/*background: #FFFFFF;*/
	/*	  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.17);*/
		}
		
		.routeActive{
			box-sizing: border-box;
			border-left: 2px solid #00B0FF;
		}
		.styBg{
			height: 100%;
			background-position: center;
			background-size: 100% 100%;
			border-radius: 50%;
			border: 2px solid gray;
		}
	}
			.bigTopLine{
			position:absolute;
			height: 30px!important;
			background: black;
			bottom: 0px!important;
			width: 100%;
			z-index: 100000;
		}
</style>
