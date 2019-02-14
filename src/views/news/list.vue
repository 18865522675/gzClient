<template>
  <div class="homeWrap">
  	<div class="noticeWrap commonWrapSty">
  		<div class="noticeHeader flex-r">
  			<!--<div style="font-weight: bold;">
  				通知公告
  			</div>-->
  			<div class="info_bar">
        <p>消息通知
          <span>MESSAGE NOTICE</span>
        </p>
      </div>
  		</div>
  		
  		<div class="noticeBody" style="margin-top: 40px;">
  				<div class="noticeBodyItem flex-r" v-for="(item,index) in noticeList"  @click="$router.push('/newsDetail/'+item.id)" :key="index">
  						<span>{{$fun.time(item.publishTime)}}【{{item.sendName}}】</span>
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
  	
  	
  	<div class="noticeWrap commonWrapSty" style="margin-top: 100px;">
  		<div class="noticeHeader flex-r">
  			<!--<div style="font-weight: bold;">
  				通知公告
  			</div>-->
  			<div class="info_bar">
        <p>站内信
          <span>STATION MESSAGE</span>
        </p>
      </div>
  		</div>
  		
  		<div class="noticeBody">
  				<div v-if="mesList.length" class="marT20">
  					<div class="noticeBodyItem flex-r" v-for="(item,index) in mesList" @click="$router.push('/newsDetail/'+item.id)" :key="index">
  						<span>{{$fun.time(item.publishTime)}}【{{item.sendName}}】</span>
  						<span>{{item.title}}</span>
  			  	</div>	
  				</div>	
  				<div v-else class="notip">
  					暂无站内信
  				</div>	
  		</div>
  		<el-pagination
			        @size-change="handleSizeChange1"
			        @current-change="handleCurrentChange1"
			        :current-page="pageNum1"
			        :page-size="pageSize1"
			        :page-sizes="[10, 20, 30, 40, 50, 100]"
			        layout="total, sizes, prev, pager, next, jumper"
			        :total="total1"
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
    	total:0,
    	mesList:[],
    	pageNum1:1,
    	total1:0,
    	pageSize1:10
    };
  },
  components: {},
  mounted() {
  	this.getMesList();
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
  	getMesList(){
  		this.$api.home.get_MesList({
  			pageNum:this.pageNum1,
  			pageSize:this.pageSize1
  		}).then((res)=>{
  			this.mesList=res.data.pageList;
  			this.total1=+res.data.total
  		})
  	},
  	   handleSizeChange(val) {
      this.pageSize = val;
      this.get_noticeList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.get_noticeList();
    },
      handleSizeChange1(val) {
      this.pageSize1 = val;
      this.getMesList();
    },
    handleCurrentChange1(val) {
      this.pageNum1 = val;
      this.getMesList();
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

	.notip{
						text-align: center;
						line-height: 40px;
						color:gray;
						margin-top: 50px;
					}
}
</style>
