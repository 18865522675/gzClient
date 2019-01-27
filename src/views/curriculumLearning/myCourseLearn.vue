<template>
  <div class="homeWrap">
  	
  	<div class="courseStudyWrap commonWrapSty">
  			<div class="courseStudyWrap-title flex-r">
  				<span style="font-size: 18px;">课程学习 <span style="font-size: 13px;">COURSE STUDY</span></span>
  				学期切换
  			</div>
  			<div class="courseStudyWrap-body">
  				<div class="nowLearnScore">
  					已修学分：6/100
  				</div>
  				<div>
  					<div class="courseList flex-r">
  						<div class="courseItem" v-for="(item,index) in courseList" :key="index" @click="$router.push(`/curriculumLearning/myCourse/${item.courseId}/${item.planId}`)">
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
						          <time class="hasLearnTime">学习进度：{{item.myCourseLearn?item.myCourseLearn:0}}%</time>
						          <div class="startBtn">
						          	开始学习
						          </div>
						        </div>
						      </div>
						    </el-card>
  					</div>
  					
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
export default {
  data() {
    return {
    	courseList:[],
    	pageNum:1,
    	pageSize:10,
    	total:10
    };
  },
  components: {},
  mounted() {
  	this.get_course()
  },
  methods: {
  	get_course(){
  		this.$api.curriculumLearning.get_course().then((res)=>{
  			this.courseList=res.data.pageList
  		})
  	},
  	  handleSizeChange(val) {
      this.pageSize = val;
      this.get_course();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.get_course();
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
					}
			}
		}
	}
}
</style>
