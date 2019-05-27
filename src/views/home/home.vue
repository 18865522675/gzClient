<template>
  <div class="homeWrap">
  	<div class="noticeWrap commonWrapSty">
  		<div class="noticeHeader flex-r">
  			<div style="font-weight: bold;">
  				通知公告
  			</div>
  			<span style="font-size: 12px;cursor: pointer;" @click="$router.push('/newsList')">更多 <i class="el-icon-arrow-right"></i></span>
  		</div>
  		<div class="noticeBody">
  				<div  v-if="noticeList.length"> 
  					<div class="noticeBodyItem flex-r" v-for="(item,index) in noticeList" @click="$router.push('/newsDetail/'+item.id+'/1')" :key="index">
  						<span>{{$fun.time(item.publishTime)}}【{{item.sendName}}】</span>
  						<span>{{item.title}}</span>
  				 </div>		
  				</div>
  				<div v-else class="notip">
  					暂无消息
  				</div>
  		</div>
  	</div>
  	
  	
  	<div class="courseStudyWrap marT30 commonWrapSty">
  			<div class="courseStudyWrap-title flex-r">
  				<span style="font-size: 18px;">课程学习 <span style="font-size: 13px;">COURSE STUDY</span></span>
  				<!--学期切换-->
  			</div>
  			<div class="courseStudyWrap-body">
  				<div class="nowLearnScore">
  					已修学分：{{staticInfo.gainCredit}}/{{staticInfo.totalCredit}}
  				</div>
  				<div class="courseList flex-r">
  					<div class="courseItem" v-for="(item,index) in courseList" :key="index">
  						    <el-card style="width: 100%;">
						      <img :src="item.logo?item.logo:'../../assets/img/figure.png'"  @error="imgError(item)"  class="image">
						      <div style="padding: 14px;">
						        <div class="courseName">
						        	{{item.siteCourseName}}
						        </div>
						        <div  class="courseTime">
						        	{{item.courseCredit}}学分
						        </div>
						        <div  class="courseTime" style="font-size: 12px;">
						        	已学{{transSecond(item.totalStudyTimes)}}
						        </div>
						        
						       <div class="bottom clearfix flex-r" style="align-items: center;justify-content: space-between;">
						          <time class="hasLearnTime">学习进度：{{item.finishedPercent?(item.finishedPercent*100).toFixed(2):0}}%</time>
						          <div class="startBtn" v-if="!item.finishedPercent" @click="go(item)">
						          	开始学习
						          </div>
						          <div class="courseOver" v-else-if="item.finishedPercent==100"  @click="$router.push(`/curriculumLearning/myCourse/${item.courseId}/${item.planId}`)">
						          	已完成
						          </div>
						           <div class="startBtn" v-else  @click="$router.push(`/curriculumLearning/myCourse/${item.courseId}/${item.planId}`)">
						          	继续学习
						          </div>
						        </div>
						        
						        
						      </div>
						    </el-card>
  					</div>
  				</div>
  			</div>
  			
  			
  	</div>
  		
  		
  		  	<div class="noticeWrap commonWrapSty" style="margin-top: 30px;">
  		<div class="noticeHeader flex-r">
  			<div style="font-weight: bold;">
  				站内信
  			</div>
  			<span style="font-size: 12px;cursor: pointer;" @click="$router.push('/newsList')">更多 <i class="el-icon-arrow-right"></i></span>
  		</div>
  		<div class="noticeBody">
  				<div v-if="mesList.length">
  					<div class="noticeBodyItem flex-r" v-for="(item,index) in mesList" @click="$router.push('/newsDetail/'+item.id+'/2')" :key="index">
  						<span>{{$fun.time(item.publishTime)}}【{{item.sendName}}】</span>
  						<span>{{item.title}}</span>
  			  	</div>	
  				</div>	
  				<div v-else class="notip">
  					暂无站内信
  				</div>
  				
  		</div>
  	</div>
    <!--<div class="footer-small">version: 4.0.1</div>-->
  </div>
</template>
<script>
	import { mapState } from "vuex";
export default {
  data() {
    return {
    	courseList:[],
    	noticeList:[],
    	
    	term:1,
    	staticInfo:{},
    	mesList:[]
    };
  },
  components: {},
  mounted() {
  	this.get_homeNotice();
  	this.get_course();
  	this.getMesList();
	this.getCredit()
  },
 computed: mapState(["userInfo"]),
  watch:{
 	 "userInfo":function(n){
 	 		if(Object.keys(n).length){
 	 			this.term=n.term
 	 		}
 	 }
  },
  methods: {
//	get_homeCourse(){
//		this.$api.home.get_homeCourse().then((res)=>{
//			this.courseList=res.data.pageList
//		})
//	},
		imgError(item){
			console.log(item)
			 item.logo			= require('../../assets/img/figure.png')	;
		},
  	get_homeNotice(){
  		this.$api.home.get_homeNotice().then((res)=>{
  			if(res.data.noticeVoList){
  				this.noticeList=res.data.noticeVoList
  			}
  			
  		})
  	},
  	getMesList(){
  		this.$api.home.get_MesList().then((res)=>{
  			this.mesList=res.data.pageList.slice(0,5)
  		})
  	},
  		get_course(){
  		this.$api.curriculumLearning.get_course({
  			pageNum:1,
  			pageSize:4,
  			term:this.userInfo.term
  		}).then((res)=>{
  			this.courseList=res.data.pageList
  		})
  	},
  	getCredit(){
  		this.$api.setInfo
        .get_info()
        .then(res => {
						this.$api.curriculumLearning.getCredit({
			  			term:res.data.term
			  		}).then((res)=>{
			  			this.staticInfo=res.data
			  		})
        })
        .catch(res => {
          console.log(res);
        });
  		
  	},
  	go(item){
  		if(!item.courseId){
  			return this.$message.warning("该课程暂无匹配资源")
  		}
  		if(this.userInfo.agreeStatus!=2){
  			return this.$message.warning("抱歉，您的资料未审核通过，暂时无法学习！")
  		}
  		this.$router.push(`/curriculumLearning/myCourse/${item.courseId}/${item.planId}`)
  	},
  	 transSecond(val){
    	var min=Math.floor(val%3600);
    	return Math.floor(val/3600) + "时" + Math.floor(min/60) + "分"+ val%60 + "秒";
    }
  }
};
</script>
<style lang="less">
.homeWrap{
	.noticeWrap{
		box-sizing: border-box;
		padding: 20px;
		.noticeHeader{
			height: 40px;
			align-items: center;
			justify-content:space-between;
		}
		.noticeBody{
			.noticeBodyItem{
				justify-content: space-between;
				font-size: 13px;
				height: 50px;
				line-height: 50px;
				cursor: pointer;
				&:hover{
					background-color: #F8F8F8;
				}
			}
		}
	}
	.courseStudyWrap{
		
		.courseStudyWrap-title{
			padding:0 20px;
			color:white;
			height: 60px;
			line-height: 60px;
			background: #435A95;
			justify-content:space-between;
		}
	}
	.courseStudyWrap-body{
		.nowLearnScore{
			font-family: PingFangSC-Medium;
			font-size: 16px;
			color: #333333;
			line-height: 50px;
			box-sizing: border-box;
			padding: 0 20px;
			font-size: 13px;
			letter-spacing: 0;
		}
		.courseList{
			flex-wrap: wrap;
			justify-content: space-between;
			.courseItem{
				margin: 10px;
					width: 30%;
					img{
						width: 100%;
						height: 181px;
					}
					.courseName{
						line-height: 30px;
						font-size: 15px;
					}
					.courseTime{
						line-height: 30px;
						font-size: 14px;
						
					}
					.hasLearnTime{
						font-size: 12px;
						color: #9B9B9B;
						line-height: 40px;
					}
					.startBtn{
						cursor: pointer;
					}
			}
		}
	}
	
		.startBtn{
						cursor: pointer;
						border:1px solid black;
						padding: 2px 5px;
						border-radius: 5px;
						font-size: 13px;
						&:hover{
							color:white;
							background: rgba(0,0,0,0.6);
						}
					}
					.courseOver{
						font-size: 12px;
						color:gray;	
					}
					.notip{
						text-align: center;
						line-height: 40px;
						color:gray;
					}
}
</style>
