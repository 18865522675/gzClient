<template>
	<div>
		<div style="text-align: center" class="marT40">
			<el-button  plain round @click="designApply" v-if="(stepInfo.step==4&&stepInfo.auditStatus==2)||(stepInfo.step==4&&stepInfo.auditStatus==3)">申请学位</el-button>
			<div v-else   class="waitClass">
				学位申请状态 : <span :style="{'color':arr[stepInfo.auditStatus-1]}">{{forAudit(stepInfo.auditStatus)}}</span>
			</div>
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
		       stepInfo:{},
		       arr:['orange','green','red']
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
			 this.$confirm('您确定要进行学位申请?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	        }).then(() => {
	          this.$api.paper.degreeApply(this.stepInfo.id).then((res)=>{
	          	this.$message.success("学位申请成功!");
	          	this.getStepInfo();        	
	          })
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消申请'
	          });          
	        });
			},
			forAudit(val){
		   	switch(val){
		   		case 1:return '待审核';
		   		case 2:return '通过';
		   		case 3:return '拒绝';
		   	}
		   }
		}
	}
</script>

<style lang="less">
	.waitClass{
		text-align: center;
		line-height: 100px;
		font-weight: bold;
		font-size: 18px;
	}
</style>