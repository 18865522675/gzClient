<template>
  <div class="homeWrap">
  	
  	<div class="courseStudyWrap commonWrapSty">
  			<div class="courseStudyWrap-title flex-r">
  				<span style="font-size: 18px;">毕业设计 <span style="font-size: 13px;">Graduation Project</span></span>
  			</div>
  			<div class="marT20">
  				<el-tabs type="border-card"  @tab-click="handleClick">
				  <el-tab-pane label="毕业设计">
				  	<el-steps :active="active" style="margin-top:50px" finish-status="success" >
				  	<el-step title="设计申请" icon="el-icon-edit" data-id="0" @click.native="clickAction(0,'designApply')">
					  </el-step>
					  <el-step title="选题" icon="el-icon-edit" data-id="0" @click.native="clickAction(1,'selectTopic')">
					  </el-step>
					  <el-step title="开题" icon="el-icon-upload" data-id="1"  @click.native="clickAction(2,'openTopic')"></el-step>
					  <el-step title="论文" icon="el-icon-picture" @click.native="clickAction(3,'graduatePaper')"></el-step>
					  <el-step title="答辩" icon="el-icon-picture" @click.native="clickAction(4,'debate')"></el-step>
					  <el-step title="学位" icon="el-icon-picture" @click.native="clickAction(5,'degree')"></el-step>
					</el-steps>
					<div>
						<router-view></router-view>
					</div>
				  </el-tab-pane>
				  <el-tab-pane label="历史记录">
				  			<div v-if="historyList.length" v-for="(item,index) in historyList"  :key="index" style="width: 60%;margin: 0 auto;margin-top: 30px;">
									<el-card class="box-card" v-if="item.step!=0&&item.step!=5">
										<div slot="header" class="clearfix">
									  	 模块 : {{forModule(item.step)}}
									  </div>
									  <div class="cardBodyWrap">
									  	<!--<div>
									  		截至日期 : 
									  	</div>-->
									  	<div v-if="item.step!=4">
									  		指导老师 : {{item.teacherName}}
									  	</div>
									  	<div v-if="item.step==4">
									  		答辩老师 : {{item.replyTeachers}}
									  	</div>
									  	<div v-if="item.step==1">
									  		选题方向 : {{item.direction}}
									  	</div>
									  	<div v-if="item.step==1">
									  		导师邮箱 : {{item.email}}
									  	</div>
									  	<div  v-if="item.step==4&&item.auditStatus!=1">
									  		答辩地址 : {{item.address}}
									  	</div>
									  	<div  v-if="item.step==4&&item.auditStatus!=1">
									  		申请时间 : {{$fun.table.time(null,null,item.commitTime)}}
									  	</div>
									  	<div  v-if="item.step==4&&item.auditStatus!=1">
									  		答辩时间 : {{$fun.table.time(null,null,item.replayStartTime)}}
									  	</div>
									  	<div   v-if="item.step==4&&item.auditStatus!=1">
									  		院校回复  : {{item.agreeRemark}}
									  	</div>
									  	<div   v-if="item.step==4&&item.auditStatus==1">
									  		申请时间  : {{$fun.table.time(null,null,item.commitTime)}}
									  	</div>
									  	
									  	<div>
									  		题目名称 : {{item.topicName}}
									  	</div>
									  	<div v-if="item.step==3">
									  		得分 : {{item.replyScore}}
									  	</div>
									  	<div>
									  		审核状态 : <span :style="{'color':arr[item.auditStatus-1]}">{{forAudit(item.auditStatus)}}</span>
									  	</div>
									  	<div class="flex-r" v-if="item.auditStatus!=1"  style="line-height: 26px;">
									  		<div style="width: 68px;">
									  			老师建议 : 
									  		</div>
									  		<div style="flex:1;">
									  			{{item.teacherAdvises}}
									  		</div>
									  	</div>
									  	<div v-if="item.step==5">
									  		论文成绩 : {{item.score}}
									  	</div>
									  	<div v-if="item.step!=4">
									  		上传时间 : {{$fun.table.time(null,null,item.commitTime)}}
									  	</div>
									  	<div  v-if="item.step!=4&&item.step!=1">
									  		附件地址 : <a :href="item.attachmentUrl" download v-if="item.attachmentUrl">下载</a> <span v-else style="color:gray">暂无</span>
									  	</div>
									  	<div v-if="item.step==4&&item.auditStatus!=1">
									  		答辩成绩 : {{item.replyScore}}
									  	</div>
									  </div>
									</el-card>
									
									<el-card class="box-card" v-else>
										<div slot="header" class="clearfix">
									  	 模块 : {{forModule(item.step)}}
									  </div>
									  <div class="cardBodyWrap">
									  	<!--<div>
									  		截至日期 : 
									  	</div>-->
									  	<div>
									  		申请时间 : {{$fun.table.time(null,null,item.commitTime)}}
									  	</div>
									  	<div>
									  		申请状态 : <span :style="{'color':arr[item.auditStatus-1]}">{{forAudit(item.auditStatus)}}</span>
									  	</div>
									  	<div  v-if="item.auditStatus!=1" >
									  		老师建议 : {{item.teacherAdvises}}
									  	</div>
									  </div>
									</el-card>
								</div>
								<div v-if="historyList.length==0" class="noTip"> 
									暂无历史记录
								</div>
				  </el-tab-pane>
				</el-tabs>
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
    	total:10,
    	tableData:[],
    	term:1,
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
    	active:0,
    	historyList:[],
    	arr:['#EEEE00','green','red']
    	
    };
  },
  components: {},
  mounted() {
//	this.get_course()
	this.getStepInfo();
	this.getHistoryList();
  },
  methods: {
  	changeCourse(val){
  		this.term=val;
  	  this.ready_ajax()
  	},
  	ready_ajax(){
  		this.pageNum=1;
  		this.pageSize=10;
  		this.getList()
  	},
  	getList(){
  		this.$api.exam.getList({
  			pageNum:this.pageNum,
  			pageSize:this.pageSize,
  			term:this.term
  		}).then((res)=>{
  			this.tableData=res.data.pageList;
  			this.total=+res.data.total;
  		})
  	},
  	handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    },
    getHistoryList(){
    	this.$api.paper.getHistoryList({
    		pageSize:50
    	}).then((res)=>{
    		this.historyList=res.data.pageList
    	})
    },
    clickAction(val,route){
    	this.$message.warning("只能在当前步骤操作,请到历史记录里面查看记录")		  
//  	if(this.stepInfo.auditStatus==2){
//  		  if(val<this.stepInfo.step||val==this.stepInfo.step){
//		    		  this.$router.push(`/paper/${route}`)
//		    	}else{
//							this.$message.warning("只能在当前步骤操作")		    		
//		    	}
//  	}else{
//  		if(this.stepInfo.step==val-1){
////	    		this.active=val;
//	    	  this.$router.push(`/paper/${route}`)
//	    	}else{
//	    		this.$message.warning("只能在当前步骤操作")		  
//	    	}
//  	}
    },
    getStepInfo(){
    	this.$api.paper.getStepInfo().then((res)=>{
    		this.stepInfo=res.data;
    		if(!this.stepInfo){
    			return this.$router.push('/paper/designApply')
    		}
    		if(this.stepInfo.auditStatus==2){
    			this.active=res.data.step+1
    		}else{
    			this.active=+res.data.step
    		}
    		let arr=['designApply','selectTopic','openTopic','graduatePaper','debate','degree'];
    		let index;
    		if(res.data.auditStatus==2&&res.data.step!=5){
    			index=res.data.step+1
    		}else{
    			index=res.data.step
    		}
    		this.$router.push(`/paper/${arr[index]}`)
    	})
    },
    forModule(val){
	   	switch(val){
	   		case 0:return '设计申请';
	   		case 1:return '选题';
	   		case 2:return '开题';
	   		case 3:return '论文';
	   		case 4:return '答辩';
	   		case 5:return '学位';
	   	}
	   },
	   forAudit(val){
		   	switch(val){
		   		case 1:return '待审核';
		   		case 2:return '通过';
		   		case 3:return '拒绝';
		   	}
		  },
		  handleClick(e){
		  	if(e.label=='历史记录'){
		  		this.getHistoryList();
		  	}
		  	
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

}
.kf-table{
    thead{
        .cell{
            text-align: center!important;
        }
        th{
        	background:rgba(0,0,0,0.35);
        	color:white
        }
    }
    tbody{
    	.cell{
    		text-align: center;
    	}
    }
}
    .examList{
    		.exam-item{
    			box-sizing: border-box;
    			padding: 20px;
    			width: 46%;
    			margin: 10px;
    			&>div{
    				line-height: 30px;
    			}
    		}
    }
    .noData{
    	font-weight: bold;
    	text-align: center;
    	font-size: 20px;
    	color:gray;
    	line-height: 100px;
    }
    .cardBodyWrap{
	div{
		margin-bottom: 12px;
		font-size: 14px;
		
	}
}
.noTip{
		line-height: 160px;
		text-align: center;
		font-size: 22px;
		font-weight: bold;
		color: gray;
	}
</style>
