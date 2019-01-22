<template>
  <div class="homeWrap">
  	<div class="noticeWrap commonWrapSty">
  		<div class="noticeHeader flex-r">
  			<div style="font-weight: bold;">
  				通知公告
  			</div>
  			<span style="font-size: 12px;">更多 <i class="el-icon-arrow-right"></i></span>
  		</div>
  		<div class="noticeBody">
  				<div class="noticeBodyItem flex-r">
  						<span>2011-10-11  10：31【函授站】</span>
  						<span>贵州职业技术学院开学典礼</span>
  				</div>
  				<div class="noticeBodyItem flex-r">
  						<span>2011-10-11  10：31【函授站】</span>
  						<span>贵州职业技术学院开学典礼</span>
  				</div>
  				<div class="noticeBodyItem flex-r">
  						<span>2011-10-11  10：31【函授站】</span>
  						<span>贵州职业技术学院开学典礼</span>
  				</div>			
  		</div>
  	</div>
  	
  	<div class="courseStudyWrap marT30 commonWrapSty">
  			<div class="courseStudyWrap-title flex-r">
  				<span style="font-size: 18px;">课程学习 <span style="font-size: 13px;">COURSE STUDY</span></span>
  				学期切换
  			</div>
  			<div class="courseStudyWrap-body">
  				<div class="nowLearnScore">
  					已修学分：6/100
  				</div>
  				<div class="courseList flex-r">
  					<div class="courseItem">
  						    <el-card style="width: 100%;">
						      <img src="../../assets/img/figure.png" class="image">
						      <div style="padding: 14px;">
						        <div class="courseName">
						        	马克思主义基本原理概论
						        </div>
						        <div  class="courseTime">
						        	6学分
						        </div>
						        
						        <div class="bottom clearfix flex-r" style="align-items: center;justify-content: space-between;">
						          <time class="hasLearnTime">已学习时间：20/20课时</time>
						          <div class="startBtn">
						          	开始学习
						          </div>
						        </div>
						      </div>
						    </el-card>
  					</div>
  						<div class="courseItem">
  						    <el-card style="width: 100%;">
						      <img src="../../assets/img/figure.png" class="image">
						      <div style="padding: 14px;">
						        <div class="courseName">
						        	马克思主义基本原理概论
						        </div>
						        <div  class="courseTime">
						        	6学分
						        </div>
						        
						        <div class="bottom clearfix flex-r" style="align-items: center;justify-content: space-between;">
						          <time class="hasLearnTime">已学习时间：20/20课时</time>
						          <div class="startBtn">
						          	开始学习
						          </div>
						        </div>
						      </div>
						    </el-card>
  					</div>
  						<div class="courseItem">
  						    <el-card style="width: 100%;">
						      <img src="../../assets/img/figure.png" class="image">
						      <div style="padding: 14px;">
						        <div class="courseName">
						        	马克思主义基本原理概论
						        </div>
						        <div  class="courseTime">
						        	6学分
						        </div>
						        
						        <div class="bottom clearfix flex-r" style="align-items: center;justify-content: space-between;">
						          <time class="hasLearnTime">已学习时间：20/20课时</time>
						          <div class="startBtn">
						          	开始学习
						          </div>
						        </div>
						      </div>
						    </el-card>
  					</div>
  					<div class="courseItem">
  						    <el-card style="width: 100%;">
						      <img src="../../assets/img/figure.png" class="image">
						      <div style="padding: 14px;">
						        <div class="courseName">
						        	马克思主义基本原理概论
						        </div>
						        <div  class="courseTime">
						        	6学分
						        </div>
						        
						        <div class="bottom clearfix flex-r" style="align-items: center;justify-content: space-between;">
						          <time class="hasLearnTime">已学习时间：20/20课时</time>
						          <div class="startBtn">
						          	开始学习
						          </div>
						        </div>
						      </div>
						    </el-card>
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
    };
  },
  components: {},
  mounted() {},
  methods: {}
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
}
</style>
