<template>
  <div>
    <div class="kf-curMy-task-list" v-if="type===0">
      <div class="kf-curMy-task-item" :class="{on: item.status!==1}" @click="task_look(item)" v-for="(item, index) in worksList" :key="index">
        <div class="kf-curMy-task-cap">{{item.siteCourseName}}({{item.examType==1?'正考':'补考'}})</div>
        <div  class="kf-curMy-task-tit" >开始时间:{{$fun.table.time(null,null,item.taskStartTime)}}</div>
        <div  class="kf-curMy-task-tit" >结束时间:{{$fun.table.time(null,null,item.taskEndTime)}}</div>
        <div class="kf-curMy-task-tit" v-if="item.finishStatus">已提交  <span>分数:{{item.score}}分</span></div>
        <div class="kf-curMy-task-tit" v-else>未完成</div>
      </div>
    </div>
    <div class="kf-listNot" v-if="!worksList.length">当前没有试卷</div>
    <div class="kf-curMy-bookLook" v-if="type===1">
      <div class="kf-curMy-bookLook-bd">
        <div class="kf-curMy-bookLook-return" @click="task_return">返回目录</div>
        <div class="kf-curMy-taskLook-bd s-center" v-show="exerciseNum ===1">暂无习题</div>
          <div class="kf-curMy-taskLook-bd" v-show="exerciseNum ===0">
          <div class="kf-curMy-taskLook-cap">考试</div>
          <div  v-if="isSee"  style="text-align: center;font-size: 20px;color: green;line-height: 40px;">得分:{{score}}</div>
          <!--大题--单选-->
          <div class="kf-curMy-taskLook-group" v-if="radioList.length">
            <div class="kf-curMy-taskLook-name">一、单选题</div>
            <!--小题-->
            <div class="kf-curMy-taskLook-item" v-for="(item, index) in radioList" :key="index">
              <div class="kf-curMy-taskLook-tit" v-if="item.content.indexOf('http')>-1">{{index+1}}.<tableCover :url="item.content"></tableCover></div>
              <div class="kf-curMy-taskLook-tit" v-else>{{index+1}}. {{item.content}}</div>
              <div class="taskLook-answer column">
                <div class="taskLook-answer-item" v-for="(optItem, optIndex) in item.options" :key="optIndex">
                  <label class="taskLook-answer-label">
                  	<span style="display: inline-block;margin-left: -25px;">({{changeNum(optIndex)}})</span>
                    <input type="radio" :disabled="isSee" :name="'radio1_'+index" v-model="item.check" :value="changeNum(optIndex)">
                    <i></i>
                    <!--<span class="taskLook-answer-name" style="display: inline-block;margin-left: 40px;" v-if="optItem.indexOf('http')>-1">-->
                    	<tableCover :url="optItem"  v-if="optItem.indexOf('http')>-1"></tableCover>
                    <!--</span>-->
                    <span class="taskLook-answer-name" style="display: inline-block;margin-left: 40px;" v-else>{{optItem}}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <!--大题--多选-->
          <div class="kf-curMy-taskLook-group" v-if="checkList.length">
            <div class="kf-curMy-taskLook-name">二、多选题</div>
            <!--小题-->
            <div class="kf-curMy-taskLook-item" v-for="(item, index) in checkList" :key="index">
              <!--<div class="kf-curMy-taskLook-tit">{{index+1}}. {{item.content}}</div>-->
              <div class="kf-curMy-taskLook-tit" v-if="item.content.indexOf('http')>-1">{{index+1}}.<tableCover :url="item.content"></tableCover></div>
              <div class="kf-curMy-taskLook-tit" v-else>{{index+1}}. {{item.content}}</div>
              <div class="taskLook-answer column">
                <div class="taskLook-answer-item" v-for="(optItem, optIndex) in item.options" :key="optIndex">
                  <label class="taskLook-answer-label">
                  	<span style="display: inline-block;margin-left: -25px;">({{changeNum(optIndex)}})</span>
                    <input type="checkbox"   :name="'check2_'+index" v-model="item.check" :value="changeNum(optIndex)">
                    <i></i>
                    <tableCover :url="optItem"  v-if="optItem.indexOf('http')>-1"></tableCover>
                    <!--</span>-->
                    <span class="taskLook-answer-name" style="display: inline-block;margin-left: 40px;" v-else>{{optItem}}</span>
                    
                    <!--<span class="taskLook-answer-name"  style="display: inline-block;margin-left: 40px;">{{optItem}}</span>-->
                  </label>
                </div>
              </div>
            </div>
          </div>
          <!--大题--判断-->
          <div class="kf-curMy-taskLook-group" v-if="judgeList.length">
            <div class="kf-curMy-taskLook-name">三、判断</div>
            <!--小题-->
            <div class="kf-curMy-taskLook-item" v-for="(item, index) in judgeList" :key="index">
              <!--<div class="kf-curMy-taskLook-tit img" v-if="ifImg(item.name)">
                {{index+1}}.
                <div class="kf-curMy-taskLook-tit-img">
                  <img :src="$api.global.img+item.exerciseName" alt="" class="">
                </div>
              </div>-->
              <!--<div class="kf-curMy-taskLook-tit" >{{index+1}}. {{item.content}}</div>-->
              <div class="kf-curMy-taskLook-tit" v-if="item.content.indexOf('http')>-1">{{index+1}}.<tableCover :url="item.content"></tableCover></div>
              <div class="kf-curMy-taskLook-tit" v-else>{{index+1}}. {{item.content}}</div>
              <div class="taskLook-answer">
                <div class="taskLook-answer-item" v-for="(optItem, optIndex) in item.options" :key="optIndex">
                  <label class="taskLook-answer-label">			
                    <input type="radio" :disabled="isSee" :name="'judge3_'+index" v-model="item.check" :value="changeNum(optIndex)">
                    <i></i>
                    <!--<span class="taskLook-answer-name">{{optItem}}</span>-->
                    <tableCover :url="optItem"  v-if="optItem.indexOf('http')>-1"></tableCover>
                    <!--</span>-->
                    <span class="taskLook-answer-name" style="display: inline-block;margin-left: 40px;" v-else>{{optItem}}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="kf-curMy-taskLook-ft">
            <div class="kf-curMy-taskLook-btn" v-if="!isSee" @click="submit">提交</div>
            <!--<div class="kf-curMy-taskLook-btn none" @click="save">保存</div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/css/curriculumLearning.less";
import tableCover from "@/components/tableCover.vue";
export default {
  data() {
    return {
      type: 0, // 0 列表，1 详情
      radioList: [], //单选
      checkList: [], //多选
      judgeList: [], //判断
      worksList: [],
      workId: "",
      exerciseNum: 1,
      isSee:false,
      score:""
    };
  },
  props: ["planId"],
  watch: {
    planId: function() {
      if (this.planId) {
        this.get_task_list();
      }
    }
  },
  components:{
  	tableCover
  },
  mounted() {
  	this.get_task_list();
  },
  methods: {
    get_task_list() {
      this.$api.curriculumLearning
        .get_exam_list(this.planId)
        .then(res => {
          res.data ? (this.worksList = res.data) : [];
          this.$emit("update:getList", this.worksList);
        })
        .catch(res => {
          console.log(res);
        });
    },
    get_task_info() {
      this.$api.curriculumLearning
        .get_exam_info(this.workId)
        .then(res => {
          if (!res.data.exercises||!res.data.exercises.length) {
            this.exerciseNum = 1;
            return;
          }
          this.exerciseNum = 0;
          //整理数据
          let radioList = []; //单选
          let checkList = []; //多选
          let judgeList = []; //判断
          res.data.exercises.map(item => {
          	item.options=[];
          	let optionsArr=["optionA","optionB","optionC","optionD","optionE","optionF","optionF"];
          	for(let i of optionsArr){
          		if(item[i]){
          			item.options.push(item[i])
          		}
          	}
            switch (item.type) {
              case 2: // 单选
                item.check = {};
                radioList.push(item);
                break;
              case 3: // 多选
                item.check = [];
                checkList.push(item);
                break;
              case 1: // 判断
                item.check = {};
                judgeList.push(item);
                break;
            }
          });

          this.radioList = radioList;
          this.checkList = checkList;
          this.judgeList = judgeList;
        })
        .catch(res => {
          console.log(res);
        });
    },
    get_task_finishInfo(){
    	this.$api.curriculumLearning
        .get_task_finishInfo(this.workId)
        .then(res => {
        	this.score=res.data.workScore;
          if (!res.data.exercises) {
            this.exerciseNum = 1;
            return;
          }
          this.exerciseNum = 0;
          //整理数据
          let radioList = []; //单选
          let checkList = []; //多选
          let judgeList = []; //判断
          res.data.exercises.map(item => {
          	item.options=[];
          	let optionsArr=["optionA","optionB","optionC","optionD","optionE","optionF","optionF"];
          	for(let i of optionsArr){
          		if(item[i]){
          			item.options.push(item[i])
          		}
          	}
            switch (item.type) {
              case 2: // 单选
                item.check = item.studentAnswer;
                radioList.push(item);
                break;
              case 3: // 多选
                item.check = item.studentAnswer.split("|");
                checkList.push(item);
                break;
              case 1: // 判断
                item.check = item.studentAnswer;
                judgeList.push(item);
                break;
            }
          });

          this.radioList = radioList;
          this.checkList = checkList;
          this.judgeList = judgeList;
        })
        .catch(res => {
          console.log(res);
        });
    },
    task_look(item) {
      if (item.finishStatus!= 1) {
      	
      	if(item.currentTime<item.taskStartTime||item.currentTime>item.taskEndTime){
      		return this.$message.warning("当时时间与考试时间不符，请耐心等待！")
      	}
        this.type = 1;
        this.isSee=false;
        this.$nextTick(() => {
          window.scrollTo(0, 1006);
        });
        this.workId = item.taskId;
        this.get_task_info();
      }else{
      	return this.$message.warning("试卷已提交，无法查看！")
      	this.type = 1;
      	this.isSee=true;
        this.$nextTick(() => {
          window.scrollTo(0, 1006);
        });
        this.workId = item.taskId;
        this.get_task_finishInfo();
      }
    },
    task_return() {
      this.type = 0;
    },
    submit() {
      
      let list = [];
      let exerciseIds=[];
      let answers=[]
      let number = 0;
      let count =
        this.radioList.length + this.checkList.length + this.judgeList.length;

      this.radioList.map(item => {
        if (JSON.stringify(item.check) !== "{}") number++;
//      list.push({
//        workId: this.workId,
//        exerciseId: item.exerciseId,
//        answer: item.check
//      });
				exerciseIds.push(item.exerciseId);
				answers.push(item.check);
      });
      this.checkList.map(item => {
        let answer = [];
				
        if (item.check.length) number++;
        item.check.map(checkItem => {
          answer.push(checkItem);
        });
//      list.push({
//        workId: this.workId,
//        exerciseId: item.exerciseId,
//        answer: answer.join(",")
//      });
				exerciseIds.push(item.exerciseId);
				answers.push(answer.join("|"))
      });
      this.judgeList.map(item => {
        if (JSON.stringify(item.check) !== "{}") number++;
//      list.push({
//        workId: this.workId,
//        exerciseId: item.exerciseId,
//        answer: item.check
//      });
				exerciseIds.push(item.exerciseId);
				answers.push(item.check);
			
      });
			
      if (number !== count) {
      	console.log(number+'--'+count)
        this.$message.warning("请答完题目再提交");
        return;
      }
      this.$confirm("确认提交试卷？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$api.curriculumLearning
            .save_exam(this.workId,{
            	exerciseIds:exerciseIds.join(","),
            	answers:answers.join(","),
            	taskId:this.workId
            })
            .then(res => {
              this.$message({
                type: "success",
                message: "提交成功!"
              });
              this.get_task_list();
              this.task_return();
            })
            .catch(res => {
              console.log(res);
            });
        })
        .catch(() => {

        });
    },
    save() {
      this.$confirm("确认保存作业？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存"
          });
        });
    },
    //判断是不是图片
    ifImg(str) {
      let imgType = [
        "jpg",
        "JPG",
        "jpeg",
        "JPEG",
        "gif",
        "GIF",
        "bmp",
        "BMP",
        "png",
        "PNG"
      ];
      let t = false;

      imgType.map(item => {
        if (str.indexOf(item) > -1) t = true;
      });
      return t;
    },
    changeNum(val){
    	return String.fromCharCode(val+65	)
    }
  }
};
</script>

<style lang="less">
</style>
