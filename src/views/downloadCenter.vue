<template>
  <div class="homeWrap">
  	
  	<div class="courseStudyWrap commonWrapSty">
  			<div class="courseStudyWrap-title flex-r">
  				<span style="font-size: 18px;">下载中心 <span style="font-size: 13px;">DOWNLOAD Center</span></span>
  				
  			</div>
  			<div class="courseStudyWrap-body marT30" style="padding: 0 10px;">
				<el-table
		        v-loading="tableLoading"
		        :data="tableData"
		        border
		        class="kf-table"
		        style="width: 100%">
		        <el-table-column
		          type="index"
		          :index="(index) => (pageNum - 1) * pageSize + index + 1"
		          label="序号"
		          width="60">
		        </el-table-column>
		        <el-table-column
		          prop="docName"
		          label="文档" :show-overflow-tooltip="true">
		        </el-table-column>
		        <el-table-column
		          prop="intro" width="400"
 		          label="简介" :show-overflow-tooltip="true">
		        </el-table-column>
		       	<el-table-column
		          fixed="right"
			      label="操作"
			      width="100">
		          <template slot-scope="scope">
		          	<a :href="scope.row.docUrl" download style="color:blue;text-decoration: underline;cursor: pointer;">下载</a>
		          </template>
		        </el-table-column>

		      </el-table>
  				
  				
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
    	tableData:[]
    };
  },
  components: {},
  mounted() {
  	this.get_course()
  },
  methods: {
  	get_course(){
  		this.$api.teachPlan.get_downloadList({
  			pageNum:this.pageNum,
  			pageSize:this.pageSize
  		}).then((res)=>{
  			this.tableData=res.data.pageList;
  			this.total=+res.data.total;
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
</style>
