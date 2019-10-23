<template>
  <div class="homeWrap">
  	
  	<div class="courseStudyWrap commonWrapSty">
  			<div class="courseStudyWrap-title flex-r">
  				<span style="font-size: 18px;">考试安排 <span style="font-size: 13px;">EXAM ARRANGE</span></span>
  				<div style="cursor: pointer;color: red;" @click="downloadZZK">
  					准考证下载
  				</div>
  				<div class="termSel">
  					  <el-select v-model="term" @change="changeCourse" placeholder="请选择学期">
						    <el-option
						      v-for="item in termList"
						      :key="item.id"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						  </el-select>
  				</div>
  			</div>
  			<div v-if="tableData.length" class="courseStudyWrap-body examList marT30 flex-r" style="padding: 0 10px;flex-wrap: wrap;justify-content: space-between;">
  				<el-card v-for="(item,index) in tableData" class="exam-item" :key="index">
  					 <div>
	  						<div>
	  							科目 :  {{item.siteCourseName}}
	  						</div>
	  						<div>
	  							考试状态 :	  {{item.examType==1?'正考':'补考'}}
	  						</div>
	  						<div>
	  							考试时间 :	   {{$fun.table.time(null,null,item.startTime)}}
	  						</div>
	  						<div>
	  							考试地点 :	   {{item.address}}	
	  						</div>
	  						<div>
	  							考场座位 :	  {{item.sorting}}	
	  						</div>	
  					</div>
  				</el-card>
  			
  			</div>
  			<div v-else class="noData">
  				该学期下暂无考试
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
    };
  },
  components: {},
  mounted() {
//	this.get_course()
		this.getList()
  },
  methods: {
  	downloadZZK(){
//		this.$api.exam.doanloadZZK().then((res)=>{
//			if(res.data!='null'){
//				window.location.href=res.data;
//				return
//			}
//			this.$message.warning("文件地址不存在")
//		}).catch((e)=>{
//			this.$message.warning("下载失败")
//		})
//			window.location.href="http://47.107.105.141:89/client-api/other/exam/loadExamCard";
			
			window.location.href="http://"+window.location.host.split(":")[0]+":82/client-api/other/exam/loadExamCard";
  	},
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
