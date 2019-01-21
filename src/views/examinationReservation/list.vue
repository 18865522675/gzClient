<template>
  <div class="g-module">
    <div class="kf-head">
      <div class="kf-head-cap">
        <b>考试通知</b>
        <small>TEST NOTIFICATION</small>
      </div>
    </div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" class="nav" >
    <el-tab-pane label="正考" name="first">
      <div class="kf-listMain-exam" v-if="firstExam">
        <div class="kf-listItem-exam" v-for="(item,index) in firstExam" :key="index">
          <div  class="kf-listItem-img-exam" v-if="!item.item"  :style="{backgroundImage: 'url('+require('../../assets/img/video2.png')+')'}"></div>
          <div class="kf-listItem-img-exam" v-else :style="{backgroundImage: 'url('+$api.global.img+item.logo+')'}">
          </div>
          <div class="kf-listItem-bd-exam">
            <div class="kf-listItem-cap-exam">{{item.courseName}}</div>
            <div class="kf-listItem-tit-exam" style="display:flex;justify-content:space-between;margin-bottom: 10px;">
              <div>地址&nbsp;&nbsp;&nbsp;{{item.address}}</div>
              <div>座位号&nbsp;&nbsp;{{item.snumber}}</div>
            </div>
            <!--<div class="kf-listItem-ft-exam" v-if="item.applyStatusName==='未预约'||item.applyStatusName==='待审核'">-->
              <!--<div class="kf-listItem-time-exam">考试日期:&nbsp;&nbsp;{{item.totalTime1}}</div>-->
              <!--<div class="kf-listItem-info-exam" @click="show(item.planId)" v-if="item.applyStatusName==='未预约'">预约</div>-->
              <!-- <div :class="appointment=='预约'?'kf-listItem-info-exam':'kf-listItem-info-ing-exam'" @click="show(item.planId)">{{appointment}}</div> -->
              <!--<div class="kf-listItem-info-ing-exam" v-if="item.applyStatusName==='待审核'">预约中...</div>-->
            <!--</div>-->
            <div class="kf-listItem-ft-exam">
              <div class="kf-listItem-time-exam">考试开始时间:</div>
              <div class="kf-listItem-time-exam">{{item.startTime}}</div>
            </div>
            <div class="kf-listItem-ft-exam">
              <div class="kf-listItem-time-exam">考试结束时间:</div>
              <div class="kf-listItem-time-exam">{{item.endTime}}</div>
            </div>
              <!--<div class="kf-listItem-info-exam" @click="show(item.planId)" v-if="item.applyStatusName==='未预约'">预约</div>-->
              <!-- <div :class="appointment=='预约'?'kf-listItem-info-exam':'kf-listItem-info-ing-exam'" @click="show(item.planId)">{{appointment}}</div> -->
              <!--<div class="kf-listItem-info-ing-exam" v-if="item.applyStatusName==='待审核'">预约中...</div>-->
            <!--<div class="kf-listItem-ft-success-exam" v-if="item.applyStatusName==='通过'||item.applyStatusName==='拒绝'">-->
              <!--<div class="kf-listItem-time-exam">考试日期:&nbsp;&nbsp;{{item.totalTime1}}</div>-->
               <!--<div class="kf-listItem-info-success-exam" v-if="item.applyStatusName==='通过'">预约成功</div>-->
                <!--<div class="kf-listItem-info-fail-exam" v-if="item.applyStatusName==='拒绝'">预约失败</div>-->
            <!--</div>-->
          </div>
        </div>
      </div>
      <div class="kf-listMain-exam-no" v-else>暂无正考信息</div>
    </el-tab-pane>
    <el-tab-pane label="补考" name="second">
      <div class="kf-listMain-exam" v-if="secondExam">
        <div class="kf-listItem-exam" v-for="(item,index) in secondExam" :key="index">
          <div  class="kf-listItem-img-exam" v-if="!item.item"  :style="{backgroundImage: 'url('+require('../../assets/img/video2.png')+')'}"></div>
          <div class="kf-listItem-img-exam" v-else :style="{backgroundImage: 'url('+$api.global.img+item.logo+')'}">
          </div>
          <div class="kf-listItem-bd-exam">
            <div class="kf-listItem-cap-exam">{{item.courseName}}</div>
            <div class="kf-listItem-tit-exam" style="display:flex;justify-content:space-between;margin-bottom: 10px;">
              <div>地址&nbsp;&nbsp;&nbsp;{{item.address}}</div>
              <div>座位号&nbsp;&nbsp;{{item.snumber}}</div>
            </div>
            <div class="kf-listItem-ft-exam">
              <div class="kf-listItem-time-exam">考试开始时间:</div>
              <div class="kf-listItem-time-exam">{{item.startTime}}</div>
            </div>
            <div class="kf-listItem-ft-exam">
              <div class="kf-listItem-time-exam">考试结束时间:</div>
              <div class="kf-listItem-time-exam">{{item.endTime}}</div>
            </div>


            <!--<div class="kf-listItem-tit-exam">{{item.termName}}&nbsp;&nbsp;&nbsp;{{item.courseCredit}}学分</div>-->
            <!--<div class="kf-listItem-ft-exam" v-if="item.applyStatusName=='未预约'||item.applyStatusName=='待审核'">-->
              <!--<div class="kf-listItem-time-exam">考试日期:&nbsp;&nbsp;{{item.totalTime2}}</div>-->
              <!--<div class="kf-listItem-info-exam" @click="show1(item.planId)" v-if="item.applyStatusName=='未预约'">预约</div>-->
              <!-- <div :class="appointment=='预约'?'kf-listItem-info-exam':'kf-listItem-info-ing-exam'" @click="show(item.planId)">{{appointment}}</div> -->
              <!--<div class="kf-listItem-info-ing-exam" v-if="item.applyStatusName=='待审核'">预约中...</div>-->
            <!--</div>-->
            <!--<div class="kf-listItem-ft-success-exam" v-if="item.applyStatusName=='通过'||item.applyStatusName=='拒绝'">-->
              <!--<div class="kf-listItem-time-exam">考试日期:&nbsp;&nbsp;{{item.totalTime2}}</div>-->
               <!--<div class="kf-listItem-info-success-exam" v-if="item.applyStatusName=='通过'">预约成功</div>-->
                <!--<div class="kf-listItem-info-fail-exam" v-if="item.applyStatusName=='拒绝'">预约失败</div>-->
            <!--</div>-->
          </div>
        </div>
      </div>
      <div class="kf-listMain-exam-no" v-else>暂无补考信息</div>
    </el-tab-pane>
  </el-tabs>

  <el-dialog title="温馨提示" :visible.sync="dialogAddVisible" width="35%" left>
      <div class="dia_content-exam">
        <p>预约中...</p>
        <div class="content-exam">
          请等待审核，届时会以消息的形式通知你，请及时查看！
        </div>
        <div @click="close" class="know-exam">知道了</div>
      </div>
      <!-- <div slot="footer" class="dialog"> -->
        <!-- <div @click="dialogAddVisible = false" class="know">知道了</div> -->
      <!-- </div> -->
    </el-dialog>
  </div>
  
</template>

<script>
import "../../assets/css/examinationReservation.less";
export default {
  data() {
    return {
      activeName2: "first",
      dialogAddVisible: false,
      firstExam: "",
      secondExam: "",
      totalTime1: "",
      totalTime2: "",
      appointment: "预约",

      //改动
      formerRoom: []
    };
  },
  components: {},
  mounted() {
    // this.get_List1();
    // this.get_List2();
    this.getFormerRoom();
    this.getRepairRoom();
  },
  methods: {
    get_List1() {
      this.$api.examinationReservation
        .get_examcourse({
          type: 1
        })
        .then(res => {
          this.firstExam = res.data.results;
          // if (this.firstExam.applyStatusName == "未预约") {
          //   this.appointment = "预约";
          // }
          this.firstExam.forEach(item => {
            console.log(this.$fun.table.time(null, null, item.endTime));
            item.totalTime1 = this.$fun.table.time(null, null, item.endTime);
            // let date = new Date(item.endTime);
            // let Y = date.getFullYear() + "-";
            // let M =
            //   (date.getMonth() + 1 < 10
            //     ? "0" + (date.getMonth() + 1)
            //     : date.getMonth() + 1) + "-";
            // let D = date.getDate() + " ";
            // this.totalTime1 = Y + M + D;
          });
        })
        .catch(res => {
          console.log(res);
        });
    },
    get_List2() {
      this.$api.examinationReservation
        .get_examcourse({
          type: 2
        })
        .then(res => {
          this.secondExam = res.data.results;
          this.secondExam.forEach(item => {
            console.log(this.$fun.table.time(null, null, item.endTime));
            item.totalTime2 = this.$fun.table.time(null, null, item.endTime);
            // let date = new Date(item.endTime);
            // let Y = date.getFullYear() + "-";
            // let M =
            //   (date.getMonth() + 1 < 10
            //     ? "0" + (date.getMonth() + 1)
            //     : date.getMonth() + 1) + "-";
            // let D = date.getDate() + " ";
            // this.totalTime2 = Y + M + D;
          });
        })
        .catch(res => {
          console.log(res);
        });
    },
    close() {
      this.dialogAddVisible = false;
      this.get_List1();
      this.get_List2();
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    show(planId) {
      this.$api.examinationReservation
        .get_edit({
          type: 1,
          planId: planId
        })
        .then(res => {
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
      // setTimeout(() => {
      //   this.get_List1();
      // }, 1000);
      // this.get_List();
      this.dialogAddVisible = true;
    },
    show1(planId) {
      this.$api.examinationReservation
        .get_edit({
          type: 2,
          planId: planId
        })
        .then(res => {
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
      // setTimeout(() => {
      //   this.get_List2();
      // }, 1000);
      // this.get_List2();
      // if (this.appointment == "预约") {
      //   this.appointment = "预约中...";
      // }
      this.dialogAddVisible = true;
    },
    //正考考场查询
    getFormerRoom() {
      this.$api.examinationReservation.get_examRoom({ status: 1 }).then(res => {
        this.firstExam = res.data.results;
        console.log(this.firstExam);
      });
    },
    //补考考考场查询
    getRepairRoom() {
      this.$api.examinationReservation.get_examRoom({ status: 2 }).then(res => {
        this.secondExam = res.data.results;
          console.log(this.secondExam);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.nav {
  margin-top: 40px;
}
</style>
