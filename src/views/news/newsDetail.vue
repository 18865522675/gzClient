<template>
  <div class="homeWrap">
  	<div class="noticeWrap commonWrapSty">
  		<div class="noticeHeader flex-r">
  		<div class="info_bar">
       		 <p>消息通知 > 消息详情
        </p>
      </div>
  			<!--<span style="font-size: 12px;">更多 <i class="el-icon-arrow-right"></i></span>-->
  		</div>
  		<div class="noticeBody">
  			<div class="noticeTitle">
  				{{newsDetail.title}}
  			</div>
  			<div class="noticeTime">
  				{{$fun.time(newsDetail.publishTime)}}
  			</div>
  			<div class="content" v-html="newsDetail.content">
  				
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
    	newsDetail:{}
    };
  },
  components: {},
  mounted() {
  	this.getnewsDetail()
  },
  computed:{
  	"type":function(){
  		return this.$route.params.type
  	}
  },
  methods: {
  	getnewsDetail(){
  		if(this.type==1){
  			this.$api.home.get_noticeDetail(this.$route.params.id).then((res)=>{
	  			this.newsDetail=res.data;
	  		})
  		}else{
  			this.$api.home.get_noticeStationDetail(this.$route.params.id).then((res)=>{
	  			this.newsDetail=res.data;
	  		})
  		}
  	},
  }
};
</script>
<style lang="less">
.homeWrap{
	.noticeWrap{
		box-sizing: border-box;
		/*padding: 20px;*/
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
	.noticeTitle{
		font-size: 20px;
		margin-top: 30px;
		padding-left: 40px;
	}
	.noticeTime{
		font-size: 16px;
	    padding-left: 40px;
	    line-height: 50px;
	    border-bottom: 1px solid gray;
	}
	.content{
		box-sizing: border-box;
		padding: 40px 40px 40px 40px;
		line-height: 25px;
		font-size: 14px;
		text-indent: 2em;
	}

	
}
</style>
