<template>
	<div>
		<div style="text-align: center" class="marT40">
			<div v-if="(stepInfo.step==2&&stepInfo.auditStatus==2)||(stepInfo.step==3&&stepInfo.auditStatus==3)">
				<uploadImg title='论文' @setData="uploadOk"></uploadImg>
				<el-button  size="small" type="primary" style="margin-top:20px" v-if="form.attachmentUrl" @click="uploadPaper">上传</el-button>
			</div>
			<paperAudit :index="3"  v-if="stepInfo.step==3"></paperAudit>
		</div>
	</div>
</template>
<script>
	import uploadImg from "@/components/uploadImg";
	import paperAudit from "@/components/paperAudit";
	export default{
		data(){
			return {
			   form:{
			   	topicId:"",
			   	attachmentUrl:""
			   },
		       stepInfo:{}
			}
		},
		created(){
			
		},
		components:{
			uploadImg,
			paperAudit
		},
		mounted(){
			this.getStepInfo()
		},
		methods:{
			getStepInfo(){
				this.$api.paper.getStepInfo().then((res)=>{
					this.stepInfo=res.data;
					
				})
			},
			uploadOk(res){
				this.form.attachmentUrl=res
				console.log(res)
			},
			uploadPaper(){
				if(!this.form.attachmentUrl){
					return this.$message.warning("请先选择文件")
				}
				this.$api.paper.uploadGraduatePaper({
					topicId:this.stepInfo.id,
					attachmentUrl:this.form.attachmentUrl
				}).then((res)=>{
					this.$message.success("论文上传成功");
					this.getStepInfo();
				})
			}
		}
	}
</script>

<style lang="less">
</style>