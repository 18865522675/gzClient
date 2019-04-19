<template>
	<div>
		<div style="text-align: center" class="marT40">
			<el-button  plain round @click="designApply">设计申请</el-button>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				dialogVisible:false,
				teacherList:[],
				form:{},
				teacherId:"",
				directionList:[],
				dirctionForm:{
					topicId:"",
					topicName:""
				},
				isDisable:false,
				rules: {
		          teacherId: [
		            { required: true, message: '请先选择导师', trigger: 'blur' },
		          ],
		          topicId: [
		            { required: true, message: '请先选择选题方向', trigger: 'blur' },
		          ],
		          topicName: [
		            { required: true, message: '请先选择选题名称', trigger: 'blur' },
		          ],
		       },
		       stepInfo:{}
			}
		},
		created(){
			
		},
		mounted(){
			this.getStepInfo()
		},
		methods:{
			getStepInfo(){
				this.$api.paper.getStepInfo().then((res)=>{
					this.stepInfo=res.data
				})
			},
			designApply(){
			 this.$confirm('您确定要进行设计申请?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	        }).then(() => {
	          this.$api.paper.designApply().then((res)=>{
	          	this.$message.success("设计申请成功!");
	          	this.getStepInfo();        	
	          })
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消申请'
	          });          
	        });
			}
		}
	}
</script>

<style lang="less">
</style>