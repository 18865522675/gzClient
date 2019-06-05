<template>
	<div style="width: 60%;margin: 0 auto;margin-top: 30px;">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		  	{{index|filTitle}}
		  </div>
		  <div class="cardBodyWrap">
		  	<!--<div>
		  		截至日期 : 
		  	</div>-->
		  	<div  v-if="index!=4">
		  		指导老师 : {{stepInfo.teacherName}}
		  	</div>
		  	<div v-if="index==4">
		  		答辩老师 : {{stepInfo.replyTeachers}}
		  	</div>
		  	<div>
		  		题目名称 : {{stepInfo.topicName}}
		  	</div>
		  	<div>
		  		当前状态 : <span :style="{'color':arr[stepInfo.auditStatus-1]}">{{forAudit(stepInfo.auditStatus)}}</span>
		  	</div>
		  	<div>
		  		老师建议 : {{stepInfo.teacherAdvises}}
		  	</div>
		  	<div>
		  		{{stepInfo.step==0?'提交时间':'上传时间'}} : {{$fun.table.time(null,null,stepInfo.commitTime)}}
		  	</div>
		  	<div v-if="index==1">
		  		导师邮箱 : {{stepInfo.email}}
		  	</div>
		  	<div  v-if="index==1">
		  		选题方向 : {{stepInfo.direction}}
		  	</div>
		  	<div v-if="index!=1">
		  		附件地址 : <a :href="stepInfo.attachmentUrl" @click="downFile" v-if="stepInfo.attachmentUrl">下载</a> <span v-else style="color:gray">暂无</span>
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
		   },
		   downFile(){
		   	window.location.href=this.stepInfo.attachmentUrl
		   }
		},
		mounted(){
			this.getStepInfo()
		},
		filters:{
			'filTitle':function(val){
				switch(+val){
					case 0:return '设计申请记录';
					case 1:return '选题记录';
					case 2:return '开题记录';
					case 3:return '论文记录';
					case 4:return '答辩记录';
					case 5:return '学位记录';
				}
			}
		}
	}
</script>

<style lang="less">
.cardBodyWrap{
	box-sizing: border-box;
	padding: 0 70px;
	div{
		text-align: left;
		margin-bottom: 20px;
		font-size: 14px;
	}
}
</style>