<template>
	<div style="width: 60%;margin: 0 auto;margin-top: 30px;">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		  	记录
		  </div>
		  <div class="cardBodyWrap">
		  	<!--<div>
		  		截至日期 : 
		  	</div>-->
		  	<div>
		  		指导老师 : {{stepInfo.teacherName}}
		  	</div>
		  	<div>
		  		论文名称 : {{stepInfo.topicName}}
		  	</div>
		  	<div>
		  		审核状态 : <span :style="{'color':arr[stepInfo.auditStatus-1]}">{{forAudit(stepInfo.auditStatus)}}</span>
		  	</div>
		  	<div>
		  		老师建议 : {{stepInfo.teacherAdvises}}
		  	</div>
		  	<div>
		  		上传时间 : {{$fun.table.time(null,null,stepInfo.commitTime)}}
		  	</div>
		  	<div>
		  		附件地址 : <a :href="stepInfo.attachmentUrl" download v-if="stepInfo.attachmentUrl">下载</a> <span v-else style="color:gray">暂无</span>
		  	</div>
		  </div>
		</el-card>
	</div>
</template>

<script>
	export default{
		name:"paperAudit",
		data(){
			return {
				stepInfo:{},
				arr:['#EEEE00','green','red']
			}
		},
		props:['index'],
		methods:{
			getStepInfo(){
		    	this.$api.paper.getStepInfo().then((res)=>{
		    		this.stepInfo=res.data;
		    		
		    	})
		   },
		   forAudit(val){
		   	switch(val){
		   		case 1:return '待审核';
		   		case 2:return '通过';
		   		case 3:return '拒绝';
		   	}
		   }
		},
		mounted(){
			this.getStepInfo()
		}
	}
</script>

<style lang="less">
.cardBodyWrap{
	div{
		margin-bottom: 20px;
		font-size: 14px;
		
	}
}
</style>