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
  					<div class="noticeBodyItem flex-r">
  						<span>2011-10-11  10：31【函授站】</span>
  						<span>贵州职业技术学院开学典礼</span>
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
