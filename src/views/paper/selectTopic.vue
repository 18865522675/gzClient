<template>
	<div>
		<div style="text-align: center" class="marT40">
			<el-button  plain round @click="showDialog">开始选题</el-button>
		</div>
		<el-dialog
		  title="论文选题"
		  :visible.sync="dialogVisible"
		  width="700px"
		  :before-close="handleClose">
		  <div>
		  	<el-form ref="form" :rules="rulesForm" :model="form" label-width="120px" class="kf-form-add">
		         <el-form-item label="导师">
		          <el-select  style="width:100%" v-model="form.teacherId" placeholder="请选择导师">
		          	<el-option v-for="(item,index) in teacherList" :key="index" :value="item.id" :label="item.name">
		
		          	</el-option>
		          </el-select>
		        </el-form-item>
		      </el-form>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">关 闭</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				dialogVisible:false,
				teacherList:[],
				form:{}
			}
		},
		created(){
			
		},
		mounted(){
			this.getTeacherList();
		},
		methods:{
			showDialog(){
				this.dialogVisible=true;
			},
			getTeacherList(){
				this.$api.paper.getTeacherList({
					pageNum:1,
					pageSize:200
				}).then((res)=>{
//					this.teacherList=res.data.pageList
					this.teacherList.push({
						name:'zbj导师',
						id:'562637623747674112'
					})
				})
			}
		}
	}
</script>

<style lang="less">
</style>