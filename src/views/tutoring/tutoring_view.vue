<template>
  <div class="td-main">
    <div class="td-left">
      <!--<div class="td-img" :style="{backgroundImage: 'url('+(info.coverUrl?info.coverUrl:require('../../assets/img/course_cover.png'))+')'}"></div>-->
      <div class="td-book-name">{{info.name}}</div>
      <div class="td-book-code"></div>
      <div class="td-book-score">
        <div class="td-score-num">{{info.score}}分</div>
        <div class="td-score-exe">共{{info.totalCount}}题 答对{{info.rightCount}}题</div>
      </div>
    </div>
    <div class="td-right exe">
      <div class="td-exe-head">
        <div class="td-exe-code">{{info.name}}</div>
        <div class="td-exe-msg">【注】<span>为正确选项</span></div>
      </div>
      <div class="td-exe-con">
        <div v-for="(item, index) in exercisesForm" :key="index">

          <!--单选题-->
          <div v-if="item.name==='单选'">
            <div class="td-exe-tit">{{item.number}}. 单选题</div>
            <div class="td-exe-item" v-for="(exeItem, exeIndex) in item.value" :key="exeIndex">
              <div class="td-item-tit">
                <div class="td-item-tit-tit">{{exeIndex+1}}、{{exeItem.content}}</div>
              </div>
              <div class="td-item-con">
                <div class="td-item-exe" v-for="(optItem, optIndex) in exeItem.options" :key="optIndex">
                  <i v-if="exeItem.answerCheck.indexOf(optItem.name)>-1"></i>
                  <span
                    :class="{
                      on:exeItem.check.indexOf(optItem.name)>-1&&exeItem.answerCheck.indexOf(optItem.name)>-1,
                      error:exeItem.check.indexOf(optItem.name)>-1&&exeItem.answerCheck.indexOf(optItem.name)===-1
                      }">{{optItem.name}}</span>
                  {{optItem.label}}
                </div>
              </div>
            </div>
          </div>

          <!--多选题-->
          <div v-if="item.name==='多选'">
            <div class="td-exe-tit">{{item.number}}. 多选题</div>
            <div class="td-exe-item" v-for="(exeItem, exeIndex) in item.value" :key="exeIndex">
              <div class="td-item-tit">
                <div class="td-item-tit-tit">{{exeIndex+1}}、{{exeItem.content}}</div>
              </div>
              <div class="td-item-con">
                <div class="td-item-exe" v-for="(optItem, optIndex) in exeItem.options" :key="optIndex">
                  <i v-if="exeItem.answerCheck.indexOf(optItem.name)>-1"></i>
                  <span
                    :class="{
                      on:exeItem.check.indexOf(optItem.name)>-1&&exeItem.answerCheck.indexOf(optItem.name)>-1,
                      error:exeItem.check.indexOf(optItem.name)>-1&&exeItem.answerCheck.indexOf(optItem.name)===-1
                      }">{{optItem.name}}</span>
                  {{optItem.label}}
                </div>
              </div>
            </div>
          </div>

          <!--判断题-->
          <div v-if="item.name==='判断'">
            <div class="td-exe-tit">{{item.number}}. 判断题</div>
            <div class="td-exe-item" v-for="(exeItem, exeIndex) in item.value" :key="exeIndex">
              <div class="td-item-tit">
                <div class="td-item-tit-tit">{{exeIndex+1}}、{{exeItem.content}}</div>
              </div>
              <div class="td-item-con">
                <div class="td-item-exe judge" v-for="(optItem, optIndex) in exeItem.options" :key="optIndex">
                  <i v-if="exeItem.answerCheck.indexOf(optItem.label)>-1"></i>
                  <span
                    :class="{
                      on:exeItem.check.indexOf(optItem.label)>-1&&exeItem.answerCheck.indexOf(optItem.label)>-1,
                      error:exeItem.check.indexOf(optItem.label)>-1&&exeItem.answerCheck.indexOf(optItem.label)===-1
                      }"></span>
                  {{optItem.label}}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/css/tutoring.less";

export default {
  data() {
    return {
      taskId: this.$route.params.taskId,
      exerciseList: [],
      exercisesForm: [],
      info: {}
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$api.tutoring
        .getEndExerciseList({ studentTaskId: this.taskId })
        .then(res => {
          this.info = res.data;
          this.proDetailReady(res.data.exercises);
        });
    },
    //处理习题
    proDetailReady(list) {
      let optionsLabel = ["A", "B", "C", "D", "E", "F", "G"];
      let judge = []; //判断
      let singleElection = []; //单选
      let multiSelection = []; //多选
      let clientRoleType = 2;

      this.exercisesForm = [];

      list.map(item => {
        let options = [];
        let check;
        let answerCheck;

        switch (item.type) {
          case 1: //判断
            if (clientRoleType === 2) {
              if (item.answer === "RIGHT") {
                answerCheck = "正确";
              } else {
                answerCheck = "错误";
              }
              if (item.studentAnswer === "RIGHT") {
                check = "正确";
              } else {
                check = "错误";
              }
            } else {
              check = {};
            }
            options.push({
              label: "正确"
            });
            options.push({
              label: "错误"
            });
            judge.push({
              content: item.content,
              check,
              answerCheck,
              id: item.exerciseId,
              type: item.type,
              options
            });
            break;
          case 2: //单选
          case 3: //多选
            optionsLabel.map(optItem => {
              let itemRow = item["option" + optItem];
              if (itemRow) {
                options.push({
                  label: itemRow,
                  name: optItem
                });
              }
            });
            switch (item.type) {
              case 2:
                if (clientRoleType === 2) {
                  check = item.studentAnswer;
                  answerCheck = item.answer;
                } else {
                  check = {};
                }
                singleElection.push({
                  content: item.content,
                  check,
                  answerCheck,
                  id: item.exerciseId,
                  type: item.type,
                  options
                });
                break;
              case 3:
                if (clientRoleType === 2) {
                  check = item.studentAnswer.split("");
                  answerCheck = item.answer;
                } else {
                  check = [];
                }
                multiSelection.push({
                  content: item.content,
                  check,
                  answerCheck,
                  id: item.exerciseId,
                  type: item.type,
                  options
                });
                break;
            }
            break;
        }
      });
      if (singleElection.length)
        this.exercisesForm.push({
          name: "单选",
          number: "",
          value: singleElection
        });
      if (multiSelection.length)
        this.exercisesForm.push({
          name: "多选",
          number: "",
          value: multiSelection
        });
      if (judge.length)
        this.exercisesForm.push({
          name: "判断",
          number: "",
          value: judge
        });
      this.exercisesForm.map((item, index) => {
        if (index === 0) {
          item.number = "一";
        }
        if (index === 1) {
          item.number = "二";
        }
        if (index === 2) {
          item.number = "三";
        }
      });
      console.log(this.exercisesForm);
    }
  }
};
</script>

<style scoped>
</style>
