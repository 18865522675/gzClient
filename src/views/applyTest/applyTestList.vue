<template>
  <div class="at-main">
    <div class="at-dateTime">
      <div class="dateTime" @click="dateMsgShow">申请时间</div>
    </div>

    <div class="at-header">
      <div class="at-hd-body">
        <div class="at-hd-item" :class="{on:topStatus === 0||topStatus === null}" @click="checkStatus(0)">全部</div>
        <div class="at-hd-item" :class="{on:topStatus === 1}" @click="checkStatus(1)">未开始</div>
        <div class="at-hd-item" :class="{on:topStatus === 2}" @click="checkStatus(2)">学习中</div>
        <div class="at-hd-item" :class="{on:topStatus === 3}" @click="checkStatus(3)">已完成</div>
      </div>
    </div>
    <div class="at-con" v-show="!courseList.length"><h1>暂无测评</h1></div>
    <div class="at-con" v-show="courseList.length">

      <div class="at-item" v-for="(item,index) in courseList" :key="index">
        <div class="at-item-left" :style="{backgroundImage: 'url(\''+(item.coverUrl?item.coverUrl:require('../../assets/img/course_cover.png'))+'\')'}"></div>
        <div class="at-item-right">
          <div class="at-item-tit">{{item.name}}</div>
          <div class="at-item-tag"></div>
          <div class="at-item-time">学习次数：{{item.studyTimes}}</div>
          <div class="at-item-num">
            <div class="at-item-exe">习题 {{item.finishTaskCount}}/{{courseExtra.taskCount }}</div>
            <div class="at-item-note">笔记 {{item.finishNoteCount}}/{{courseExtra.noteCount }}</div>
          </div>
          <div class="at-item-length">
            <el-progress type="circle" :percentage="item.wareSchedule " :width="45" color="#ffba4e" show-text="true" style="float: left"></el-progress>
            <div class="at-item-btn m-h" :class="{on:timeOk}" @click="appyTest(courseExtra.rightStatus,item.courseId)" v-show="courseExtra.rightStatus !== 1">申请测评</div>
            <div class="at-item-btn m-h" :class="{on:item.assessmentStatus ===null|item.assessmentStatus ===3}" :disabled="item.assessmentStatus ===2|item.assessmentStatus ===1" @click="appyTest(courseExtra.rightStatus,item.courseId,item.assessmentStatus,item.wareSchedule,item.finishNoteCount,item.finishTaskCount,item.studyTimes)" v-show="courseExtra.rightStatus === 1">{{item.assessmentStatus ===1?"待审核":(item.assessmentStatus ===2?"通过":"申请测评")}}</div>
          </div>
        </div>
      </div>

    </div>
    <div class="at-page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      style="float:right;">
      </el-pagination>
    </div>
    <div class="at-dia" v-show="dialogVisible||dateMsgVisible||dialogApplyVisible||submitVisible">
      <!--提交成功提示-->
      <div class="at-dia-apply" v-show="false">
        <div class="at-dia-top">
          温馨提示：
        </div>
        <div class="at-dia-mid">
          <div class="at-dia-text">申请提交成功！</div>
          <div class="at-dia-text">次月5日公布成绩，请在“测评结果”中查看</div>
        </div>
        <div class="at-dia-btn" @click="pickOk">
          知道了
        </div>
      </div>
<!--申请时间未到提示-->
      <div class="at-dia-apply" v-show="dateMsgVisible">
        <div class="at-dia-top">
          温馨提示：
        </div>
        <div class="at-dia-mid msg">
          <div class="at-dia-text msg">申请时间：{{courseExtra.applyStartTime|formatDate}}——{{courseExtra.applyEndTime|formatDate}}</div>
        </div>
        <div class="at-dia-btn" @click="closeDateMsg">
          知道了
        </div>
      </div>
      <!--购买表单-->
      <div class="at-dia-buy" v-show="dialogApplyVisible">
        <div class="at-dia-top">购买信息确认：<div class="at-dia-close" @click="diaBuyClose"></div></div>
        <el-form :model="form" class="at-buy-form"  :rules="rules" ref="form">
          <el-form-item prop="num">
            <el-input type="text" v-model.number="form.num" placeholder="66666666" class="at-buy-item-input" disabled></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input type="text" v-model="form.code" placeholder="请输入身份证号" class="at-buy-item-input"></el-input>
          </el-form-item>
          <el-form-item prop="station">
            <el-select v-model="form.station" placeholder="请选择助学机构" style="width: 100%">
              <el-option v-for="(item,index) of stationList" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="at-dia-btn1" @click="pickOk">
          确认
        </div>
      </div>
      <!--确认提交提示-->
      <div class="at-dia-buy at-dia-buy-h" v-show="submitVisible">
        <div class="at-dia-top">{{courseName}}该课程 您：<div class="at-dia-close" @click="diaBuyClose"></div></div>
        <div class="at-sub-li">
          <div class="at-sub-tit">提交了{{finishNoteCount}}次笔记</div>
          <div class="at-sub-con">提交3次可得满分10分，您可得{{finishNoteCount === 3?"10":finishNoteCount*2}}分</div>
        </div>
        <div class="at-sub-li">
        <div class="at-sub-tit">提交了{{finishTaskCount}}次作业</div>
        <div class="at-sub-con">提交5次可得满分10分，您可得{{finishTaskCount*2}}分</div>
      </div>
        <div class="at-sub-li">
          <div class="at-sub-tit">登录学习了{{studyTimes}}次</div>
          <div class="at-sub-con">提交10次可得满分10分，您可得{{studyTimes>9?"10":studyTimes}}分</div>
        </div>
        <div class="at-sub-li2">平时成绩，您所处的助学中心还未给出</div>
          <div class="at-sub-footer">
            <router-link to="/learnRecord/learnRecord">去完善学习记录</router-link>
            <div class="at-dia-btn" @click="submitCourseId">
              确认提交
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/css/applyTest.less";
import { mapState } from "vuex";
import { formatDate } from "../../components/filters.js";
export default {
  data() {
    return {
      currentPage: 1,
      dialogVisible: false,
      dateMsgVisible: false,
      dialogApplyVisible: false,
      submitVisible: false,
      wareSchedule: "",
      finishNoteCount: "",
      finishTaskCount: "",
      studyTimes: "",
      courseId: null,
      form: {
        num: "",
        code: "",
        station: ""
      },
      courseExtra: {},
      courseList: [],
      pageSize: 10,
      pageNum: 1,
      total: 0,
      topStatus: 0,
      rules: {
        code: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          { min: 17, max: 18, message: "长度在18个字符", trigger: "blur" }
        ],
        station: [
          { required: true, message: "请选择助学机构", trigger: "change" }
        ]
      },
      nowTime: null,
      timeOk: false,
      siteId: 27,
      idCardType: 1,
      stationList: []
    };
  },
  filters: {
    formatDate(time) {
      var data = new Date(time);
      let nowArr = formatDate(data, "yy-MM-dd").split("-");
      return `${nowArr[0]} 年 ${nowArr[1]} 月 ${nowArr[2]} 日`

    }
  },
  computed: mapState(["userInfo"]),
  mounted() {
    this.nowTime = new Date().getTime();
    this.getList();
    console.log(this.userInfo);
    this.getStation(this.siteId);
  },
  methods: {
    getList(studyStatus) {
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        studyStatus: studyStatus
      };
      console.log(params);
      this.$api.applyTest.courseList(params).then(res => {
        this.courseExtra = res.data.extra;
        this.courseList = res.data.pageList;
        this.pageNum = res.data.pageNum;
        this.pageSize = res.data.pageSize;
        this.total = res.data.total;
        console.log(this.courseList);
        if (this.courseExtra.timeId && this.courseExtra.rightStatus !== 0) {
          this.timeOk = true;
        }
        // console.log(this.timeOk);
      });
    },
    //获取助学中心
    getStation(siteId) {
      this.$api.applyTest.station({ siteId }).then(res => {
        this.stationList = res.data;
      });
    },
    //申请测评弹框打开
    appyTest(
      rightStatus,
      courseId,
      assessmentStatus,
      wareSchedule,
      finishNoteCount,
      finishTaskCount,
      studyTimes
    ) {
      if (this.courseExtra.timeId === 0) {
        alert("未到申请时间！");
        return;
      }
      if (rightStatus === 1) {
        //有助学资格申请
        if (assessmentStatus === 2 || assessmentStatus === 1) {
          // this.submitVisible = false;
          // this.wareSchedule = wareSchedule;
          // this.finishNoteCount = finishNoteCount;
          // this.courseId = courseId;
          return;
        } else if (assessmentStatus === null || assessmentStatus === 3) {
          this.submitVisible = true;
          this.wareSchedule = wareSchedule;
          this.finishNoteCount = finishNoteCount;
          this.finishTaskCount = finishTaskCount;
          this.studyTimes = studyTimes;
          this.courseId = courseId;
        }
      } else if (rightStatus === 0) {
        return;
      } else {
        //无助学资格
        this.dialogApplyVisible = true;
        this.form = {
          num: this.userInfo.phone,
          code: "",
          station: ""
        };
      }
    },
    //提交提示框
    submitCourseId() {
      this.applyTestOk(this.courseId);
      this.submitVisible = false;
    },
    //切换状态
    checkStatus(status) {
      this.topStatus = status;
      if (status === 0) {
        status = null;
      }
      this.getList(status);
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    },
    applyOk() {
      this.dialogVisible = true;
    },
    //有助学资格申请
    applyTestOk(courseId) {
      this.$api.applyTest.applytestOK({ courseId }).then(() => {
        this.$message({
          type: "success",
          message: "申请测评成功！"
        });
        this.getList();
      });
    },
    //无助学资格申请
    pickOk() {
      console.log(this.$refs);
      this.$refs["form"].validate(valid => {
        if (valid) {
          let params = {
            phone: this.form.num,
            idCardType: this.idCardType,
            idCardNo: this.form.code,
            siteId: this.siteId,
            stationId: this.form.station,
            studentId: this.userInfo.id
          };
          this.$api.applyTest.applytestNo(params).then(() => {
            this.$message({
              type: "success",
              message: "申请成功！"
            });
            this.getList();
          });
          this.dialogApplyVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    diaBuyClose() {
      this.dialogApplyVisible = false;
      if (this.submitVisible) {
        this.submitVisible = false;
      }
    },
    dateMsgShow() {
      this.dateMsgVisible = true;
    },
    closeDateMsg() {
      this.dateMsgVisible = false;
    }
  }
};
</script>

<style scoped>
</style>
