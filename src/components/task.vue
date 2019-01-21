<template>
  <div>
    <div class="kf-curMy-task-list" v-if="type===0">
      <div class="kf-curMy-task-item" :class="{on: item.status!==1}" @click="task_look(item)" v-for="(item, index) in worksList" :key="index">
        <div class="kf-curMy-task-cap">{{item.workName}}</div>
        <div class="kf-curMy-task-tit" v-if="item.status===1">已提交</div>
        <div class="kf-curMy-task-tit" v-else>未完成</div>
      </div>
    </div>
    <div class="kf-listNot" v-if="!worksList.length">当前没有作业</div>
    <div class="kf-curMy-bookLook" v-if="type===1">
      <div class="kf-curMy-bookLook-bd">
        <div class="kf-curMy-bookLook-return" @click="task_return">返回目录</div>
        <div class="kf-curMy-taskLook-bd s-center" v-show="exerciseNum ===1">暂无习题</div>
          <div class="kf-curMy-taskLook-bd" v-show="exerciseNum ===0">
          <div class="kf-curMy-taskLook-cap">作业</div>
          <!--大题--单选-->
          <div class="kf-curMy-taskLook-group" v-if="radioList.length">
            <div class="kf-curMy-taskLook-name">一、单选题</div>
            <!--小题-->
            <div class="kf-curMy-taskLook-item" v-for="(item, index) in radioList" :key="index">
              <div class="kf-curMy-taskLook-tit">{{index+1}}. {{item.exerciseName}}</div>
              <div class="taskLook-answer column">
                <div class="taskLook-answer-item" v-for="(optItem, optIndex) in item.options" :key="optIndex">
                  <label class="taskLook-answer-label">
                    <input type="radio" :name="'radio1_'+index" v-model="item.check" :value="optItem.id">
                    <i></i>
                    <span class="taskLook-answer-name">{{optItem.content}}</span>
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
              <div class="kf-curMy-taskLook-tit">{{index+1}}. {{item.exerciseName}}</div>
              <div class="taskLook-answer column">
                <div class="taskLook-answer-item" v-for="(optItem, optIndex) in item.options" :key="optIndex">
                  <label class="taskLook-answer-label">
                    <input type="checkbox" :name="'check2_'+index" v-model="item.check" :value="optItem.id">
                    <i></i>
                    <span class="taskLook-answer-name">{{optItem.content}}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <!--大题--判断-->
          <div class="kf-curMy-taskLook-group">
            <div class="kf-curMy-taskLook-name">三、判断</div>
            <!--小题-->
            <div class="kf-curMy-taskLook-item" v-for="(item, index) in judgeList" :key="index">
              <div class="kf-curMy-taskLook-tit img" v-if="ifImg(item.exerciseName)">
                {{index+1}}.
                <div class="kf-curMy-taskLook-tit-img">
                  <img :src="$api.global.img+item.exerciseName" alt="" class="">
                </div>
              </div>
              <div class="kf-curMy-taskLook-tit" v-else>{{index+1}}. {{item.exerciseName}}</div>
              <div class="taskLook-answer">
                <div class="taskLook-answer-item" v-for="(optItem, optIndex) in item.options" :key="optIndex">
                  <label class="taskLook-answer-label">
                    <input type="radio" :name="'judge3_'+index" v-model="item.check" :value="optItem.id">
                    <i></i>
                    <span class="taskLook-answer-name">{{optItem.content}}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="kf-curMy-taskLook-ft">
            <div class="kf-curMy-taskLook-btn" @click="submit">提交</div>
            <!--<div class="kf-curMy-taskLook-btn none" @click="save">保存</div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/css/curriculumLearning.less";
export default {
  data() {
    return {
      type: 0, // 0 列表，1 详情
      radioList: [], //单选
      checkList: [], //多选
      judgeList: [], //判断
      worksList: [],
      workId: "",
      exerciseNum: 1
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
  mounted() {},
  methods: {
    get_task_list() {
      this.$api.curriculumLearning
        .get_task_list({
          currentPage: 1,
          limitNum: 10000,
          planId: this.planId
        })
        .then(res => {
          res.data.results ? (this.worksList = res.data.results) : [];
          this.$emit("update:getList", this.worksList);
        })
        .catch(res => {
          console.log(res);
        });
    },
    get_task_info() {
      this.$api.curriculumLearning
        .get_task_info({
          currentPage: 1,
          limitNum: 10000,
          workId: this.workId
        })
        .then(res => {
          if (!res.data.results) {
            this.exerciseNum = 1;
            return;
          }
          //整理数据
          let radioList = []; //单选
          let checkList = []; //多选
          let judgeList = []; //判断
          res.data.results.map(item => {
            switch (item.exerciseType) {
              case "106": // 单选
                item.check = {};
                radioList.push(item);
                break;
              case "107": // 多选
                item.check = [];
                checkList.push(item);
                break;
              case "109": // 判断
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
    task_look(item) {
      if (item.status !== 1) {
        this.type = 1;
        this.$nextTick(() => {
          window.scrollTo(0, 1006);
        });
        this.workId = item.workId;
        this.get_task_info();
      }
    },
    task_return() {
      this.type = 0;
    },
    submit() {
      let list = [];
      let number = 0;
      let count =
        this.radioList.length + this.checkList.length + this.judgeList.length;

      this.radioList.map(item => {
        if (JSON.stringify(item.check) !== "{}") number++;
        list.push({
          workId: this.workId,
          exerciseId: item.exerciseId,
          answer: item.check
        });
      });
      this.checkList.map(item => {
        let answer = [];

        if (item.check.length) number++;
        item.check.map(checkItem => {
          answer.push(checkItem);
        });
        list.push({
          workId: this.workId,
          exerciseId: item.exerciseId,
          answer: answer.join(",")
        });
      });
      this.judgeList.map(item => {
        if (JSON.stringify(item.check) !== "{}") number++;
        list.push({
          workId: this.workId,
          exerciseId: item.exerciseId,
          answer: item.check
        });
      });

      if (number !== count) {
        this.$message.error("请答完题目再提交");
        return;
      }
      this.$confirm("确认提交作业？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          console.log(JSON.stringify(list));
          this.$api.curriculumLearning
            .save_task(this.$store.state.user.studentId, list)
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
          // this.$message({
          //   type: "info",
          //   message: "已取消提交"
          // });
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
    }
  }
};
</script>

<style lang="less">
</style>
