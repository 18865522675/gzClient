<template>
  <div class="homeWrap">
  	<div class="noticeWrap commonWrapSty">
  		<div class="noticeHeader flex-r">
  		<div class="info_bar">
       		 <p>我的课程 > 问答列表 
        </p>
      </div>
  			<!--<span style="font-size: 12px;">更多 <i class="el-icon-arrow-right"></i></span>-->
  		</div>
  		<div class="noticeBody marT30">
  			<div class="disCussCon">
  				<div class="discussInp">
  					<el-input v-model.trim="content" placeholder="请输入提问内容...">
  						 <el-button slot="append" icon="el-icon-plus" @click="addDiscuss"></el-button>
  					</el-input>
  				</div>
  				<div class="cons">
  					<div class="discussItem flex-r"  v-for="(item,index) in conList" :key="index">
  						<div class="logo"  v-if="userInfo.id!=item.studentId">
  							
  						</div>
  						<div  v-if="userInfo.id==item.studentId" class="logo" :style="{'backgroundImage':'url('+userInfo.logo+')'}">
  							
  						</div>
  						<div class="discussRight marL10" style="flex:1">
  							<div class="discussName flex-r" style="align-items: center;">
  								{{item.userName?item.userName:'未知'}} <span>{{$fun.time(item.createTime)}}</span> 
  								<div class="delBtn marL20" style="display: inline-block;" @click="delAction(item)" v-if="userInfo.id==item.studentId"></div>
  								<div class="editBtn marL20" style="display: inline-block;" @click="editAction(item,index)" v-if="userInfo.id==item.studentId&&!item.answerContent"></div>
  							</div>
  							<div class="discussUnder">
  								<div v-if='!item.isEdit'>
  									问 ：{{item.askContent}}
  								</div>
  								<div v-else>
  									问 : <el-input v-model.trim="item.askContent" style="width:90%;display: inline-block;"></el-input>
  								</div>
  								<div class="marT10" v-if="item.isEdit">
  									<el-button class='saveBtn' @click="sureSave(item)">保存</el-button>
  									<el-button class='cancelBtn' @click="cancenSave(item,index)">取消</el-button>
  								</div>
  								<div class='marT30' v-if="item.answerContent">
  									答 ：{{item.answerContent}}
  								</div>
  							</div>
  						</div>
  					</div>
  				</div>
  			</div>
  		</div>
  	</div>
  	
  		
    <!--<div class="footer-small">version: 4.0.1</div>-->
  </div>
</template>
<script>
		import { mapState } from "vuex";
export default {
  data() {
    return {
    	conList:[],
    	content:""
    };
  },
  computed: mapState(["userInfo"]),
  components: {},
  mounted() {
  	this.get_qa_list()
  },
  methods: {
  	get_qa_list(){
  		this.$api.curriculumLearning.get_qa_list(this.$route.params.planId,{
  			pageNum:1,
  			pageSize:1000
  		}).then((res)=>{
  			this.conList=res.data.pageList;
  			this.conList.map((item)=>{
  				item.isEdit=false;
  			})
  		})
  	},
  	editAction(item,index){
  			this.conList[index].isEdit=true;
			this.$set(this.conList,index,this.conList[index]);
  	},
  	cancenSave(item,index){
  		this.conList[index].isEdit=false;
			this.$set(this.conList,index,this.conList[index]);
  	},
  	sureSave(item){
  		if(!item.askContent){
  			return this.$message.warning("请输入内容！")
  		}
  		this.$api.curriculumLearning.edit_qa(item.id,{
           			content:item.askContent
           		}).then(()=>{
           			this.$message.success("修改成功!");
           			this.get_qa_list();
           		})
  	},
  	addDiscuss(){
  		 if(!this.content){
  		 	return this.$message.warning("请输入提问内容..")
  		 }
  		 this.$alert('确定要发布此提问内容吗', '提示', {
          confirmButtonText: '确定',
          callback: action => {
           	if(action=="confirm"){
           		this.$api.curriculumLearning.add_qa({
           			planId:this.$route.params.planId,
           			content:this.content
           		}).then(()=>{
           			this.$message.success("发布成功!");
           			this.get_qa_list();
           			this.content=""
           		})
           	}
          }
        });
  	},
  	delAction(item){
  		 this.$alert('确定要删除此提问内容吗', '提示', {
          confirmButtonText: '确定',
          callback: action => {
           	if(action=="confirm"){
           		this.$api.curriculumLearning.del_qa(item.id).then(()=>{
           			this.$message.success("内容删除成功!");
           			this.get_discuss_content();
           		})
           	}
          }
        });
  	}
  }
};
</script>
<style lang="less" scoped>
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
	.disCussCon{
		box-sizing:border-box;
		padding: 40px;
		.discussInp{
			width: 60%;
		}	
		.discussItem{
			&:not(:first-child){
				margin-top: 20px;
			}
			box-sizing: border-box;
			padding: 10px 0;
			.logo{
				width: 35px;
				height: 35px;
				background-size: 100% 100%;
				border-radius: 50%;
				background-image:url(../assets/img/figure3.png);
			}
			.discussName{
				color:gray;
				font-size: 16px;
				line-height: 30px;
				font-weight: bold;
				span{
					font-size: 14px;
					font-weight: normal;
					display: inline-block;
					margin-left: 20px;
				}
			}
			
			.discussUnder{
				margin-top: 10px;
				/*border: 1px solid black;*/
				box-sizing: border-box;
				padding: 10px 5px;
				color:gray;
				/*height: 70px;*/
				overflow-y: auto;
				
				border-radius: 10px;
			}
			
		}
	}

.delBtn{
		width: 20px;
				height: 20px;
				background-size: 100% 100%;
				border-radius: 50%;
				cursor: pointer;
				background-image:url(../assets/img/shanchu.png);
}
.editBtn{
		width: 20px;
				height: 20px;
				background-size: 100% 100%;
				border-radius: 50%;
				cursor: pointer;
				background-image:url(../assets/img/bianji.png);
}
	
.saveBtn{
	padding: 5px 10px;
	background: rgba(67,90,149,0.5);
	color:white
}
.cancelBtn{
		padding: 5px 10px;
}
}
</style>
