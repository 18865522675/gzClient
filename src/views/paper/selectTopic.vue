<template>
	<div>
		<div style="text-align: center" class="marT40">
			<el-button  plain round @click="showDialog" v-if="(stepInfo.step==0&&stepInfo.auditStatus==2)||(stepInfo.step==1&&stepInfo.auditStatus==3)">{{stepInfo.auditStatus==3?'重新选题':'开始选题'}}</el-button>
			<div v-if="stepInfo.auditStatus">
				<paperAudit :index="1" v-if='stepInfo.auditStatus!=2' ref="paperAudit"></paperAudit>
			</div>
			
		</div>
		<el-dialog
		  title="论文选题"
		  :visible.sync="dialogVisible"
		  width="700px"
		  :before-close="handleClose">
		  <div>
		  	<el-form ref="dirctionForm" :rules="rules" :model="dirctionForm" label-width="120px" class="kf-form-add">
		         <el-form-item label="导师"  prop="teacherId">
		          <el-select  style="width:100%" v-model="dirctionForm.teacherId" @change="changeTeacher" placeholder="请选择导师">
		          	<el-option v-for="(item,index) in teacherList" :key="index" :value="item.id" :label="item.name">
		
		          	</el-option>
		          </el-select>
		        </el-form-item>
		        <el-form-item label="选题方向" prop="dirctionName" v-if="directionList.length">
		          <div v-for="(item,index) in directionList" :key="index">
					<el-radio v-model="dirctionForm.dirctionName" @change="radioChange" :label="item.direction">{{item.direction}}</el-radio>	  
		          </div>
		        </el-form-item>
		        <el-form-item label="选题选择" prop="topicName" v-if="dirctionForm.dirctionName">
		          <el-select  style="width:100%" v-model="dirctionForm.topicId" @change="topicNameChange" placeholder="请选择选题名称">
		          	<el-option v-for="(item,index) in topicNameList"  :key="index" :value="item.topicId" :label="item.topicName">
		
		          	</el-option>
		          </el-select>
		          <!--<el-input   :disabled="isDisable" v-model.trim="dirctionForm.topicName"  placeholder="请输入选题名称"></el-input>-->
		        </el-form-item>
		        <el-form-item label="选题名称" prop="topicName" v-if="dirctionForm.dirctionName">
		          <el-input   :disabled="isDisable" v-model.trim="dirctionForm.topicName"  placeholder="请输入选题名称"></el-input>
		        </el-form-item>
		      </el-form>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">关 闭</el-button>
		    <el-button type="primary" @click="addDirection('dirctionForm')">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	import paperAudit from "@/components/paperAudit";
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
					topicName:"",
					dirctionName:"",
					topicNameId:""
				},
				isDisable:false,
				rules: {
		          teacherId: [
		            { required: true, message: '请先选择导师', trigger: 'blur' },
		          ],
		          dirctionName: [
		            { required: true, message: '请先选择选题方向', trigger: 'blur' },
		          ],
		          topicName: [
		            { required: true, message: '请先选择选题名称', trigger: 'blur' },
		          ],
		       },
		       stepInfo:{},
		       topicNameList:[]
			}
		},
		created(){
			
		},
		components:{
			paperAudit
		},
		mounted(){
			this.getStepInfo()
			this.getTeacherList();
		},
		methods:{
			getStepInfo(){
				this.$api.paper.getStepInfo().then((res)=>{
					this.stepInfo=res.data
				})
			},
			addDirection(formName){
				 if(!this.directionList.length){
				 	return this.$message.warning("该导师下暂无选题方向，无法提交")
				 }
				 this.$refs[formName].validate((valid) => {
		          if (valid) {
		            this.$api.paper.addDirection(this.dirctionForm).then((res)=>{
		            	this.$message.success("选题选择成功");
		            	this.dialogVisible=false;
		            	this.getStepInfo(); 
		            	this.$refs.paperAudit.getStepInfo()
		            })
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
			},
			topicNameChange(val){
				this.topicNameList.map((item)=>{
					if(item.topicId==val){
						this.dirctionForm.topicName=item.topicName
					}
				})
			},
			radioChange(val){
				let arr=[];
				this.directionList.map((item)=>{
					if(item.direction==val){
						this.topicNameList=item.topicNameList;
						this.isDisable=item.defined==1?false:true;
					}
				});
				
//				let arr=[];
//				let bArr=[];
//				for(let i of this.directionList){
//					arr.push(...i.topicNameList);
//					bArr.push({
//						defined:i.defined,
//						topicId:i.topicNameList[0].topicId
//					})
//				}
//			   	for(let i of bArr){
//			   		if(i.topicId==val){
//						this.isDisable=i.defined==1?false:true;
//					}	
//			   	}
//				for(let i of arr){
//					if(i.topicId==val){
////						this.topicNameList.push(i);
////						console.log(this.topicNameList)
//						this.dirctionForm.topicName=i.topicName;
//					}
//				}
			},
			showDialog(){
				this.dialogVisible=true;
			},
			changeTeacher(val){
				this.teacherId=val;
				this.$api.paper.getDirectionById(val).then((res)=>{
					this.directionList=res.data.pageList;
				})
			},
			getTeacherList(){
				this.$api.paper.getTeacherList({
					pageNum:1,
					pageSize:200
				}).then((res)=>{
					this.teacherList=res.data
				})
			}
		}
	}
</script>

<style lang="less">
</style>