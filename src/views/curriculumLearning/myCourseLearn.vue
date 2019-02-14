<template>
  <div class="homeWrap">
  	
  	<div class="courseStudyWrap commonWrapSty">
  			<div class="courseStudyWrap-title flex-r">
  				<span style="font-size: 18px;">课程学习 <span style="font-size: 13px;">COURSE STUDY</span></span>
  				<div class="termSel">
  					  <el-select v-model="term" @change="changeCourse" placeholder="请选择">
						    <el-option
						      v-for="item in termList"
						      :key="item.id"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						  </el-select>
  				</div>
  			</div>
  			<div class="courseStudyWrap-body">
  				<div class="nowLearnScore">
  					已修学分：{{staticInfo.gainCredit}}/{{staticInfo.totalCredit}}
  				</div>
  				<div>
  					<div class="courseList flex-r" v-if="courseList.length">
  						<div class="courseItem" v-for="(item,index) in courseList" :key="index">
  						    <el-card style="width: 100%;">
						      <img src="../../assets/img/figure.png" class="image">
						      <div style="padding: 14px;">
						        <div class="courseName">
						        	{{item.siteCourseName}}
						        </div>
						        <div  class="courseTime">
						        	{{item.courseCredit}}学分
						        </div>
						        
						        <div class="bottom clearfix flex-r" style="align-items: center;justify-content: space-between;">
						          <time class="hasLearnTime">学习进度：{{item.finishedPercent?item.finishedPercent:0}}%</time>
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
  					
  					<div class="noTip" v-else>
  						此学期下暂无课程！
  					</div>
  					<div>
  						<el-pagination
			        @size-change="handleSizeChange"
			        @current-change="handleCurrentChange"
			        :current-page="pageNum"
			        :page-size="pageSize"
			        :page-sizes="[10, 20, 30, 40, 50, 100]"
			        layout="total, sizes, prev, pager, next, jumper"
			        :total="total"
			        class="kf-pagination">
			      </el-pagination>
  					</div>
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
    	pageNum:1,
    	pageSize:10,
    	total:10,
    	termList:[{
    		name:'第一学期',
    		id:1
    	},{
    		name:'第二学期',
    		id:2
    	},{
    		name:'第三学期',
    		id:3
    	},{
    		name:'第四学期',
    		id:4
    	},{
    		name:'第五学期',
    		id:5
    	}],
    	term:1,
    	staticInfo:{}
    };
  },
  computed: mapState(["userInfo"]),
  components: {},
  mounted() {
  	this.get_course();
  	this.getCredit()
  },
  watch:{
 	 "userInfo":function(n){
 	 		if(Object.keys(n).length){
 	 			this.term=n.term
 	 		}
 	 }
  },
  methods: {
  	changeCourse(){
  		this.pageSize=10;
  		this.pageNum=1;
  		this.get_course();
  		this.getCredit()
  	},
  	get_course(){
  		this.$api.curriculumLearning.get_course({
  			pageNum:this.pageNum,
  			pageSize:this.pageSize,
  			term:this.term
  		}).then((res)=>{
  			this.courseList=res.data.pageList;
  			this.total=+res.data.total;
  			
  		})
  	},
  	getCredit(){
  		this.$api.curriculumLearning.getCredit({
  			term:this.term
  		}).then((res)=>{
  			this.staticInfo=res.data
  		})
  	},
  	  handleSizeChange(val) {
      this.pageSize = val;
      this.get_course();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.get_course();
    },
    go(item){
    	if(!item.courseId){
    		return this.$message.warning("该课程暂未匹配资源")
    	}
    	this.$router.push(`/curriculumLearning/myCourse/${item.courseId}/${item.planId}`)
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
			justify-content: flex-start;	
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
			}
		}
	}
	.termSel{
		width: 150px;
		height: 30px;
		.el-input__inner{
			height: 30px;
		}
	}
	
	.noTip{
		line-height: 160px;
		text-align: center;
		font-size: 22px;
		font-weight: bold;
		color: gray;
	}
}
</style>
