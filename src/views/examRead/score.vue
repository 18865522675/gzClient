<template>
    <div class="examRead-score">
        <div class="examRead-score-top">
            <div class="examRead-score-top-cont">
                <div class="examRead-score-top-cont-left">
                    <div :style="{backgroundImage: 'url(\''+$config.HOST_API+img+'\')'}" class="examRead-score-top-cont-left-img" v-if="img"></div>
                    <div :style="{backgroundImage: 'url('+require('../../assets/img/course_pro_userphoto.png')+')'}" class="examRead-score-top-cont-left-img" v-else></div>
                    <div class="examRead-score-top-cont-left-msg">
                        <div class="examRead-score-top-cont-left-msg-courseName font">{{course}}</div>
                        <div class="examRead-score-top-cont-left-msg-courseName">{{name}}</div>
                    </div>
                </div>
                <div class="examRead-score-top-cont-right">总分: {{List.totalScore}}分</div>
            </div>
        </div>
        <div class="examRead-score-bot">
            <ul class="examRead-score-bot-items">
                <li class="examRead-score-bot-items-detail detail-weight">课程学习 ({{List.courseScore}}分)</li>
                <li class="examRead-score-bot-items-detail">
                    <div class="examRead-score-bot-items-detail-round"></div>平时成绩 {{List.usualScore}}分
                </li>
                <li class="examRead-score-bot-items-detail"><div class="examRead-score-bot-items-detail-round"></div>学习笔记 {{List.noteScore}}分</li>
            </ul>
            <ul class="examRead-score-bot-items">
                <li class="examRead-score-bot-items-detail detail-weight">网上学习 ({{List.stdyScore }}分)</li>
                <li class="examRead-score-bot-items-detail"><div class="examRead-score-bot-items-detail-round"></div>登录 {{List.loginScore}}分</li>
                <li class="examRead-score-bot-items-detail"></li>
            </ul>
            <ul class="examRead-score-bot-items">
                <li class="examRead-score-bot-items-detail detail-weight">平时作业 ({{List.workScore}}分)</li>
                <li class="examRead-score-bot-items-detail"><div class="examRead-score-bot-items-detail-round"></div>作业提交 {{List.taskScore}}分</li>
                <li class="examRead-score-bot-items-detail"></li>
            </ul>
            <ul class="examRead-score-bot-items">
                <li class="examRead-score-bot-items-detail detail-weight">综合测评 ({{List.examTotalScore}}分)</li>
                <li class="examRead-score-bot-items-detail"><div class="examRead-score-bot-items-detail-round"></div>测评成绩 {{List.examScore}}分</li>
                <li class="examRead-score-bot-items-detail"></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      name: this.$route.params.name,
      course: this.$route.params.course,
      img: this.$route.params.img,
      List: ""
    };
  },
  mounted() {
    this.get_List();
  },
  methods: {
    get_List() {
      this.$api.examRead
        .examReadNameDetail({
          id: this.id
        })
        .then(res => {
          this.List = res.data;
          console.log(this.List);
        });
    }
  }
};
</script>

<style lang="less">
.examRead-score {
  width: 980px;
  margin: 80px auto 0;
  .examRead-score-top {
    height: 106px;
    width: 100%;
    border-radius: 10px;
    background-color: #fff;
    .examRead-score-top-cont {
      width: 90%;
      display: flex;
      justify-content: center;
      align-items: center;
      .examRead-score-top-cont-left {
        width: 80%;
        height: 106px;
        display: flex;
        /*justify-content: flex-start;*/
        align-items: center;
        .examRead-score-top-cont-left-img {
          width: 70px;
          height: 70px;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
        }
        .examRead-score-top-cont-left-msg {
          margin-left: 10px;
          justify-content: flex-start;
          flex-direction: row;
          .examRead-score-top-cont-left-msg-courseName {
            height: 35px;
            line-height: 35px;
          }
          .font {
            font-size: 22px;
          }
        }
      }
      .examRead-score-top-cont-right {
        width: 150px;
        height: 40px;
        border-radius: 10px;
        background-color: #ffba4e;
        text-align: center;
        line-height: 40px;
      }
    }
  }
  .examRead-score-bot {
    width: 110%;
    margin-top: 12px;
    background-color: #fff;
    border-radius: 10px;
    .examRead-score-bot-items {
      width: 234px;
      height: 182px;
      margin-right: 14px;
      border-radius: 10px;
      float: left;
      .examRead-score-bot-items-detail {
        height: 60px;
        border-bottom: 1px solid #e5e5e5;
        background-color: #fff;
        line-height: 60px;
        text-align: center;
        position: relative;
        .examRead-score-bot-items-detail-round {
          position: absolute;
          width: 8px;
          height: 8px;
          background-color: #ffba4e;
          border-radius: 50%;
          left: 44px;
          top: 26px;
        }
      }
      .detail-weight {
        font-weight: bold;
      }
    }
  }
}
</style>
