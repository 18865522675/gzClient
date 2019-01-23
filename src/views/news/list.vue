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
  				<div class="noticeBodyItem flex-r" v-for="(item,index) in noticeList" :key="index">
  						<span>{{$fun.time(item.publishTime)}}【{{item.stationName}}】</span>
  						<span>{{item.title}}</span>
  				</div>
  		</div>
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
  	
  		
    <!--<div class="footer-small">version: 4.0.1</div>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
    	noticeList:[],
    	pageNum:1,
    	pageSize:10,
    	total:0
    };
  },
  components: {},
  mounted() {
  	this.get_noticeList()
  },
  methods: {
  	get_noticeList(){
  		this.$api.home.get_noticeList({
  			pageNum:this.pageNum,
  			pageSize:this.pageSize,
  			name:""
  		}).then((res)=>{
  			this.noticeList=res.data.pageList;
  			this.total=+res.data.total
  		})
  	},
  	   handleSizeChange(val) {
      this.pageSize = val;
      this.get_noticeList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.get_noticeList();
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
			justify-content:space-between
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

	
}
</style>
