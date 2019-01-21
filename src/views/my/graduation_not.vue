<template>
  <div class="container">
    <div class="my-info">
      <div class="info_bar">
        <ul>
          <li>毕业设计</li>
          <li>GRADUATION PROJECT</li>
        </ul>
      </div>
    </div>

    <div style="text-align: center;margin-top: 60px">毕业设计未开始</div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      test: {
        id: 1,
        msg: "zzzz"
      },
      centerDialogVisible: false,
      upLoard: false,
      upTopicLoard: false,
      tabs: ["毕业设计", "历史记录"],
      num: 0,
      showCont: 0,
      staut: "申请毕业设计",
      gru_app_res: "",
      graStatus: "",
      btns: 1,
      startChoose: false,
      bgColor: 0,
      // 允许自拟题目选题

      // 毕业申请状态
      status: 2,
      // 初始申请状态
      applyBtn: 1,
      // 初始选题隐藏
      seleTitleBtn: 0,
      //导师列表
      teacher: [],
      // 点击选择当前导师
      teacherTopic: [],
      current: 0,
      //老师ID
      teacherId: "",
      // 选中的论文题目ID
      paperTopicId: "",
      m1res: "",
      m2res: "",
      // 不允许自拟-选题
      topic_1: [],
      // 允许自拟-选题
      topic_2: [],
      // 教师允许状态
      allowStu: "",
      checked1: "",
      input: "",
      tocId: "",
      // 选题结果查询
      topic_resStu: "",
      chBtnstu: 1,
      notData: 0,
      topRes: 0,
      TopicSub: 0,
      opening: 0,
      headers: {
        Token: sessionStorage.getItem("Token")
      },
      fileName: "",
      // 开题报告切换状态
      firstUp: 1,
      againUp: 0,
      relAgainUp: 0,
      // 论文切换状态
      firstTopicUp: 0,
      againTopicUp: 0,
      relTopicAgainUp: 0,
      // 开题报告结果
      openUp: "",
      //论文结果
      topicUp: "",
      openingSub: 0,
      Topicing: 0,
      topicUP: 0,
      topicName: "",
      // 申请答辩结果
      applyres: "",
      answer: 0,
      answerRes: 0,
      aplDeg: 0,
      degreeStu: 0,
      //学位申请结果
      degreeres: "",
      // 总步骤状态
      //..1(申请)
      graduationStatus: "",
      // ..2(论文)
      paperStatus: "",
      // ..2(选题)
      dissertationProposalStatus: "",
      // ..2(开题报告)
      topicStatus: "",
      // ..2(答辩)
      defenseStatus: "",
      // ..2(学位)
      degreeStatus: ""
    };
  },
  mounted() {
    // 判断当前毕设申请所处状态
    console.log("郑莹莹");
    // this.query_step();
  },
  methods: {
    tab(index) {
      this.num = index;
      this.showCont = index;
    },
    // 当前毕设流程状态

    query_step: function() {
      this.$api.applyGraduation.qurey_progress().then(res => {
        console.log(res.data);
        this.graduationStatus = res.data.graduationStatus;
        console.log(this.graduationStatus);
        this.topicStatus = res.data.topicStatus;
        console.log(this.topicStatus);
        this.paperStatus = res.data.paperStatus;
        this.dissertationProposalStatus = res.data.dissertationProposalStatus;
        this.defenseStatus = res.data.defenseStatus;
        this.degreeStatus = res.data.degreeStatus;
        if (this.graduationStatus == 0 || this.graduationStatus == 2) {
          this.applyBtn = 1;
        } else if (this.graduationStatus == 1) {
          // 初始申请通过
          this.applyBtn = 0;
          if (this.topicStatus == 0) {
            this.TopicSub = 1;
            this.chooseStu();
          } else if (this.topicStatus == 1) {
            // 选题通过
            // this.TopicSub = 1;??
            this.opening = 1;
            this.chooseStu();
            if (this.dissertationProposalStatus == 0) {
              this.opening = 0;
              this.openingSub = 1;
              this.openres();
              this.againUp = 0;
            } else if (this.dissertationProposalStatus == 1) {
              // 开题报告通过
              this.opening = 0;
              this.openingSub = 1;
              this.openres();
              if (this.paperStatus == 0) {
                this.topicUP = 1;
                this.Topicing = 1;
                this.TopicRes();
              } else if (this.paperStatus == 1) {
                // 论文提交通过
                this.topicUP = 1;
                this.Topicing = 1;
                this.TopicRes();
                if (this.defenseStatus == null) {
                  this.answer = 1;
                } else if (this.defenseStatus == 0) {
                  this.answer = 0;
                  this.answerRes = 1;
                  this.qurey_answer();
                } else if (this.defenseStatus == 1) {
                  // 答辩申请通过
                  this.answer = 0;
                  this.answerRes = 1;
                  this.qurey_answer();
                  if (this.degreeStatus == null) {
                    this.aplDeg = 1;
                  } else if (this.degreeStatus == 0) {
                    this.aplDeg = 0;
                    this.degreeStu = 1;
                    this.applyDegree();
                  } else if (this.degreeStatus == 1) {
                    // 学位申请通过
                    this.aplDeg = 0;
                    this.degreeStu = 1;
                    this.applyDegree();
                  } else if (this.degreeStatus == 2) {
                    this.aplDeg = 0;
                    this.degreeStu = 1;
                    this.applyDegree();
                  }
                } else if (this.defenseStatus == 2) {
                  this.answer = 0;
                  this.answerRes = 1;
                  this.qurey_answer();
                }
              } else if (this.paperStatus == 2) {
                // this.openingSub = 1;
                this.topicUP = 1;
                // this.Topicing = 1;
                // this.TopicRes();
              }
            } else if (this.dissertationProposalStatus == 2) {
              this.opening = 0;
              this.openingSub = 1;
              this.openres();
            }
          } else if (this.topicStatus == 2) {
            this.TopicSub = 1;
            this.chooseStu();
          } else if (this.topicStatus == null) {
            this.seleTitleBtn = 1;
          }
        }
      });
    },

    //申请毕设 查询结果
    applygru_res: function() {
      this.$api.applyGraduation.gru_apply().then(res => {
        console.log(res.data);
        console.log("林宥嘉");
        this.gru_app_res = res.data;
        this.graStatus = res.data.graduationStatus;
        // if (this.graStatus == 1) {
        //   this.applyBtn = 0;
        // }
      });
    },
    // 选题状态查询（定位用）
    chooseStu: function() {
      this.$api.applyGraduation.Topic_pass().then(res => {
        this.topic_resStu = res.data;
      });
    },
    //开题报告提交结果查看（定位用）
    openres: function() {
      this.$api.applyGraduation.start_pass().then(res => {
        let openUp_a = res.data;
        this.openUp = openUp_a;
        console.log(this.openUp);
      });
    },
    //论文提交结果查看（定位用）
    TopicRes: function() {
      this.$api.applyGraduation.topic_succ().then(res => {
        console.log(res.data);
        this.topicUp = res.data;
      });
    },
    //申请结果提示
    tog: function() {
      this.centerDialogVisible = true;
      this.$api.applyGraduation
        .apply_graduation({ status: this.status })
        .then(res => {
          console.log(res.data);
          this.applygru_res();
        });
    },
    // 关闭申请提示弹窗打开开始选题按钮
    closedWin() {
      this.centerDialogVisible = false;
      if (this.graStatus == 1) {
        this.applyBtn = 0;
        this.seleTitleBtn = 1;
      } else if (this.graStatus == 0) {
        this.seleTitleBtn = 0;
      } else if (this.graStatus == 2) {
        this.staut = "申请中请等待。";
      }
    },
    // 导师列表
    startChos: function() {
      this.startChoose = true;
      this.$api.applyGraduation.teacher_list().then(res => {
        this.teacher = res.data.results;
        // 默认老师Id
        this.teacherId = res.data.results[0].id;
        //默认老是 是否允许自拟题目
        this.allowStu = res.data.results[0].independentTopic;
        console.log(this.teacherId);
        // 默认拿到第一个老师的数据
        this.$api.applyGraduation
          .teacher_Topic({ id: this.teacherId })
          .then(res => {
            if (this.allowStu == 0) {
              this.topic_1 = res.data.results;
            } else if (this.allowStu == 1) {
              this.topic_2 = res.data.results;
            }
          });
      });
    },
    //选题

    // 点击选择当前老师
    addClass: function(index, tinfo) {
      this.current = index;
      this.teacherId = tinfo.id;
      this.allowStu = tinfo.independentTopic;
      console.log(this.teacherId);
      this.$api.applyGraduation
        .teacher_Topic({ id: this.teacherId })
        .then(res => {
          // if (res.data.results === undefined || res.data.results.length == 0) {
          //   this.chBtnstu = 0;
          //   this.notData = 0;
          //   console.log(6666666666666666);
          // } else {
          if (this.allowStu == 0) {
            this.topic_1 = res.data.results;
            if (this.topic_1.length !== 0) {
              this.chBtnstu = 1;
              this.notData = 0;
              this.topic_1.map(item => {
                item.check = false;
              });
            } else {
              this.chBtnstu = 0;
              this.notData = 1;
            }

            console.log(this.topic_1);
          } else if (this.allowStu == 1) {
            this.topic_2 = res.data.results;
          }
          // }
        });
    },
    //改变选选题
    tocChange(row, ind) {
      let topic_1 = this.topic_1;
      topic_1.map((item, index) => {
        if (index !== ind) item.check = false;
      });
      this.topic_1 = [];
      this.topic_1 = topic_1;
      // console.log(ind, row, row.id);
      this.tocId = row.id;
    },
    // 提交选题

    topicSubmit: function() {
      console.log(this.topicStatus);
      if (this.topicStatus == null) {
        this.startChoose = false;
        this.$api.applyGraduation
          .Topic_submit({ paperTopicId: this.tocId, status: 2 })
          .then(res => {
            if (res.resultCode == 1000) {
              this.$message({
                type: "success",
                message: "选题提交成功",
                duration: 1000
              });
              this.TopicSub = 1;
              this.pass_status();
              this.seleTitleBtn = 0;
            }
          });
      } else if (this.topicStatus == 0) {
        this.startChoose = false;
        this.$api.applyGraduation
          .Topic_again_submit({ paperTopicId: this.tocId, status: 2 })
          .then(res => {
            if (res.resultCode == 1000) {
              this.$message({
                type: "success",
                message: "重新选题提交成功",
                duration: 1000
              });
              this.TopicSub = 1;
              this.pass_status();
              this.seleTitleBtn = 0;
            }
          });
      }

      // if (tinfo.status == 0) {
      //   this.startChoose = false;
      //   this.$api.applyGraduation
      //     .Topic_submit({ paperTopicId: this.paperTopicId })
      //     .then(res => {
      //       console.log(res.data);
      //     });
      // } else {
      //   this.startChoose = false;
      //   this.$api.applyGraduation
      //     .Topic_submit({ paperTopicId: this.paperTopicId })
      //     .then(res => {
      //       console.log(res.data);
      //     });
      // }
    },

    // 选题状态查询
    pass_status: function() {
      this.$api.applyGraduation.Topic_pass().then(res => {
        this.topic_resStu = res.data;
        // this.time=this.$fun.table.time(null,null,res.data.time)
        if (this.topic_resStu.status == 1) {
          this.TopicSub = 0;
          this.opening = 1;
        }
      });
    },
    // 开题报告
    submitUpload() {
      this.$refs.uploadOpen.submit();
      console.log(this.$refs.upload);
    },
    //开题报告重新上传
    againSubmitUpload() {
      this.$refs.againOPenUpload.submit();
      console.log(this.$refs.againUpload);
    },
    // 论文上传
    subTopicUpload() {
      this.$refs.upload.submit();
      console.log(this.$refs.upload);
    },
    // 论文重新上传
    againTopicUpload() {
      this.$refs.againUpload.submit();
      console.log(this.$refs.upload);
    },
    // 开题报告上传成功
    upSuccess(res) {
      if (res.resultCode === 1000) {
        this.$message({
          message: "上传成功",
          type: "success"
        });
        this.firstUp = 0;
        // this.againUp = 1;
        this.relAgainUp = 0;
        this.qureyUp();
      }
    },
    // 论文上传成功
    TopicupSucc(res) {
      if (res.resultCode === 1000) {
        this.$message({
          message: "上传成功",
          type: "success"
        });
        this.firstTopicUp = 0;
        this.againTopicUp = 1;
        this.relTopicAgainUp = 0;
        this.qureyTopicUp();
      }
    },
    // 限制文件格式和大小
    filFile(file) {
      // console.log(file);
      this.fileName = file.name;
      this.topicName = file.name;
      const isDOC = file.name.split(".")[1] === "doc";
      const isDOCX = file.name.split(".")[1] === "docx";
      const isLT10M = file.size / 1024 / 1024 < 50;
      if (!isDOC && !isDOCX) {
        this.$message({
          message: "上传报告必须是doc或docx 格式!",
          type: "error"
        });
      }
      if (!isLT10M) {
        this.$message({
          message: "上传报告大小不超过50MB!",
          type: "error"
        });
      }
      return (isDOC || isDOCX) && isLT10M;
    },
    // 打开重新选题弹框
    agUp: function() {
      this.upLoard = true;
    },
    //打开论文重新选题
    agTopicUp: function() {
      this.upTopicLoard = true;
    },
    // 开题报告重新上传
    sureUpload: function() {
      this.upLoard = false;
      this.relAgainUp = 1;
      this.againUp = 0;
      this.qureyUp();
    },
    sureTopicUpload: function() {
      this.upTopicLoard = false;
      this.relTopicAgainUp = 1;
      this.againTopicUp = 0;
      this.qureyTopicUp();
    },
    // 查看开题报告提交结果
    qureyUp: function() {
      this.$api.applyGraduation.start_pass().then(res => {
        console.log(res.data);
        this.openUp = res.data;
        this.openingSub = 1;
      });
    },
    // 查看论文提交结果
    qureyTopicUp: function() {
      this.$api.applyGraduation.topic_succ().then(res => {
        console.log(res.data);
        this.topicUp = res.data;
        this.Topicing = 1;
      });
    },
    // 论文未通过重新上传
    anewTopicUplod() {
      this.Topicing = 0;
      this.topicUP = 1;
    },
    // 开题报告未通过重新上传
    anewPaperUplod() {
      this.openingSub = 0;
      this.opening = 1;
    },
    // 答辩申请
    applyAnswer: function() {
      console.log(1123232344);
      this.answerRes = 1;
      this.$api.applyGraduation.apply_answer().then(res => {
        console.log(res.data);
        this.qurey_answer();
      });
    },
    // 答辩申请结果查询
    qurey_answer() {
      this.$api.applyGraduation.answer_res().then(res => {
        console.log(res.data);
        this.applyres = res.data;
      });
    },
    // 学位申请
    applyDegree: function() {
      this.degreeStu = 1;
      this.$api.applyGraduation.apply_deg().then(res => {
        console.log(res.data);
        this.qurey_answer();
      });
    },
    // 学位申请结果查询
    qurey_Degree() {
      this.$api.applyGraduation.deg_result().then(res => {
        console.log(res.data);
        this.degreeres = res.data;
      });
    }
  },
  filters: {
    myApplyStu: function(data) {
      if (data == 0) {
        return "拒绝";
      } else if (data == 2) {
        return "申请中...";
      } else if (data == 1) {
        return "通过";
      }
    },
    allowStatus: function(st) {
      if (st == 0) {
        return "不允许";
      } else if (st == 1) {
        return "允许";
      }
    },
    passStu: function(time) {
      // this.$fun.timeFormat(timeStr);
      let timeStr = new Date(time);
      // console.log(timeStr);
      let Y = timeStr.getFullYear() + "-";
      // console.log(Y);
      let M =
        (timeStr.getMonth() + 1 < 10
          ? "0" + (timeStr.getMonth() + 1)
          : timeStr.getMonth() + 1) + "-";
      // let D = timeStr.getDate() + " ";
      let D =
        timeStr.getDate() < 10
          ? "0" + timeStr.getDate() + " "
          : timeStr.getDate() + " ";
      // let h = timeStr.getHours() + ":";
      let h =
        timeStr.getHours() < 10
          ? "0" + timeStr.getHours() + ":"
          : timeStr.getHours() + ":";
      // let m = timeStr.getMinutes() + ":";
      let m =
        timeStr.getMinutes() < 10
          ? "0" + timeStr.getMinutes() + ":"
          : timeStr.getMinutes() + ":";
      // let s = timeStr.getSeconds();
      let s =
        timeStr.getSeconds() < 10
          ? "0" + timeStr.getSeconds()
          : timeStr.getSeconds();
      // console.log(Y + M + D + h + m + s);
      return Y + M + D + h + m + s;
    }
  }
};
</script>
<style scoped lang="less">
@import "../../assets/css/graduation";
</style>
