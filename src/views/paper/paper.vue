<template>
  <div class="homeWrap">
  	
  	<div class="courseStudyWrap commonWrapSty">
  			<div class="courseStudyWrap-title flex-r">
  				<span style="font-size: 18px;">毕业设计 <span style="font-size: 13px;">Graduation Project</span></span>
  			</div>
  			<div class="marT20">
  				<el-tabs type="border-card">
				  <el-tab-pane label="毕业设计">
				  	<el-steps :active="active" style="margin-top:50px">
					  <el-step title="选题" icon="el-icon-edit" data-id="0" @click.native="clickAction(0,'selectTopic')">
					  </el-step>
					  <el-step title="开题" icon="el-icon-upload" data-id="1"  @click.native="clickAction(1,'openTopic')"></el-step>
					  <el-step title="论文" icon="el-icon-picture" @click.native="clickAction(2,'graduatePaper')"></el-step>
					  <el-step title="答辩" icon="el-icon-picture" @click.native="clickAction(3,'debate')"></el-step>
					  <el-step title="学位" icon="el-icon-picture" @click.native="clickAction(4,'degree')"></el-step>
					</el-steps>
					<div>
						<router-view></router-view>
					</div>
				  </el-tab-pane>
				  <el-tab-pane label="历史记录">
				  	
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
    	active:0
    };
  },
  components: {},
  mounted() {
//	this.get_course()
	this.getStepInfo();
	
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
    clickAction(val,route){
    	this.active=val;
    	this.$router.push(`/paper/${route}`)
    },
    getStepInfo(){
    	this.$api.paper.getStepInfo().then((res)=>{
    		this.stepInfo=res.data;
    		this.active=res.data.step
    	})
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
</style>
