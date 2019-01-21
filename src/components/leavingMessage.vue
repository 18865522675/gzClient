<template>
  <div>
    <div class="kf-leaMsg-list">
      <div class="kf-leaMsg-head">
        <div class="kf-leaMsg-img" :style="{backgroundImage: 'url('+(user.photo?$api.global.img+user.photo:require('../assets/img/Picture.png'))+')'}"></div>
        <div class="kf-leaMsg-in" :class="{on: topOn}">
          <textarea class="kf-leaMsg-textarea" @focus="topOn = true; answerOn = false" v-model.trim="content" maxlength="200" placeholder="写下你的留言…"></textarea>
          <div class="kf-leaMsg-btn" @click="leavingBtn">留言</div>
        </div>
      </div>
      <!--一级-->
      <div class="kf-leaMsg-list-item" v-for="(item, index) in questionList" :key="index">
        <div class="kf-leaMsg-img" :style="{backgroundImage: 'url('+(item.photo?$api.global.img+item.photo:require('../assets/img/Picture.png'))+')'}"></div>
        <div class="kf-leaMsg-cont">
          <div class="kf-leaMsg-hd">
            <div class="kf-leaMsg-name">{{item.userName?item.userName:"某某同学"}}</div>
            <div class="kf-leaMsg-time">{{item.time}}</div>
          </div>
          <div class="kf-leaMsg-text" v-html="item.content"></div>
          <div class="kf-leaMsg-ft">
            <div class="kf-leaMsg-open">
              <span @click="onAnswer(item, index)">回复</span>
              <template v-if="item.answerCount">
                ·
                <span class="ico-down" v-if="!item.answerShow" @click="onAnswer(item, index)">{{item.answerCount}}条回复</span>
                <span class="ico-up" v-else @click="onAnswerHide(item, index)">收起回复</span>
              </template>
            </div>
            <div class="kf-leaMsg-status">
              <div class="kf-leaMsg-ico zan" :class="{on: item.hasLike}" @click="leavingLike(item)">{{item.liked}}</div>
              <template v-if="item.slef">
                <span>|</span>
                <div class="kf-leaMsg-ico" @click="leavingDel(item)">删除</div>
              </template>
            </div>
          </div>
          <!--二级-->
          <div class="kf-leaMsg-lists" v-if="item.answerShow">
            <!--回复框-->
            <div class="kf-leaMsg-in" :class="{on: answerOn}">
              <textarea class="kf-leaMsg-textarea" @focus="topOn = false; answerOn = true" v-model.trim="answerCount" maxlength="200" placeholder="写下你的回复…"></textarea>
              <div class="kf-leaMsg-btn" @click="answerBtn(item)">留言</div>
            </div>
            <div class="kf-leaMsg-lists-item" v-for="(listItem, listIndex) in item.list" :key="listIndex">
              <div class="kf-leaMsg-img" :style="{backgroundImage: 'url('+(listItem.photo?$api.global.img+listItem.photo:require('../assets/img/Picture.png'))+')'}"></div>
              <div class="kf-leaMsg-cont">
                <div class="kf-leaMsg-hd">
                  <div class="kf-leaMsg-name">{{listItem.userName?listItem.userName:"某某同学"}}</div>
                  <div class="kf-leaMsg-time">{{listItem.time}}</div>
                </div>
                <div class="kf-leaMsg-text" v-html="listItem.content"></div>
                <div class="kf-leaMsg-ft">
                  <div class="kf-leaMsg-status mla">
                    <div class="kf-leaMsg-ico zan" :class="{on: listItem.hasLike}" @click="leavingAnswerLike(listItem)">{{listItem.liked}}</div>
                    <template v-if="listItem.self">
                      <span>|</span>
                      <div class="kf-leaMsg-ico" @click="leavingAnswerDel(listItem)">删除</div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="kf-listNot" v-if="!questionList.length">当前没有留言</div>
      <!--一级-->
      <!--<div class="kf-leaMsg-list-item">-->
        <!--<div class="kf-leaMsg-img" :style="{backgroundImage: 'url('+require('../../public/static/background.png')+')'}"></div>-->
        <!--<div class="kf-leaMsg-cont">-->
          <!--<div class="kf-leaMsg-hd">-->
            <!--<div class="kf-leaMsg-name">我的姓名</div>-->
            <!--<div class="kf-leaMsg-time">1小时前</div>-->
          <!--</div>-->
          <!--<div class="kf-leaMsg-text">互联网的崛起给了像我这样农村家庭孩子更多的学习机会，我的小学及初中都是在村里学校上的，教学资源和师资力量相对薄弱，学习非常单一，网上教育的出现使得我们这类人有了学习赶超的机会。</div>-->
          <!--<div class="kf-leaMsg-ft">-->
            <!--<div class="kf-leaMsg-open">-->
              <!--<span>回复</span>·<span class="ico-down">3条回复</span><span class="ico-up">收起回复</span>-->
            <!--</div>-->
            <!--<div class="kf-leaMsg-status">-->
              <!--<div class="kf-leaMsg-ico zan">10</div>-->
              <!--<div class="kf-leaMsg-ico zan on">10</div>-->
              <!--<span>|</span>-->
              <!--<div class="kf-leaMsg-ico">删除</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--&lt;!&ndash;二级&ndash;&gt;-->
          <!--<div class="kf-leaMsg-lists">-->
            <!--<div class="kf-leaMsg-lists-item">-->
              <!--<div class="kf-leaMsg-img" :style="{backgroundImage: 'url('+require('../../public/static/background.png')+')'}"></div>-->
              <!--<div class="kf-leaMsg-cont">-->
                <!--<div class="kf-leaMsg-hd">-->
                  <!--<div class="kf-leaMsg-name">我的姓名</div>-->
                  <!--<div class="kf-leaMsg-time">1小时前</div>-->
                <!--</div>-->
                <!--<div class="kf-leaMsg-text">互联网的崛起给了像我这样农村家庭孩子更多的学习机会，我的小学及初中都是在村里学校上的，教学资源和师资力量相对薄弱，学习非常单一，网上教育的出现使得我们这类人有了学习赶超的机会。</div>-->
                <!--<div class="kf-leaMsg-ft">-->
                  <!--<div class="kf-leaMsg-open">-->
                    <!--<span>回复</span>-->
                  <!--</div>-->
                  <!--<div class="kf-leaMsg-status">-->
                    <!--<div class="kf-leaMsg-ico zan">10</div>-->
                    <!--<div class="kf-leaMsg-ico zan on">10</div>-->
                    <!--<span>|</span>-->
                    <!--<div class="kf-leaMsg-ico">删除</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="kf-leaMsg-lists-item">-->
              <!--<div class="kf-leaMsg-img" :style="{backgroundImage: 'url('+require('../../public/static/background.png')+')'}"></div>-->
              <!--<div class="kf-leaMsg-cont">-->
                <!--<div class="kf-leaMsg-hd">-->
                  <!--<div class="kf-leaMsg-name">我的姓名</div>-->
                  <!--<div class="kf-leaMsg-time">1小时前</div>-->
                <!--</div>-->
                <!--<div class="kf-leaMsg-text">互联网的崛起给了像我这样农村家庭孩子更多的学习机会，我的小学及初中都是在村里学校上的，教学资源和师资力量相对薄弱，学习非常单一，网上教育的出现使得我们这类人有了学习赶超的机会。</div>-->
                <!--<div class="kf-leaMsg-ft">-->
                  <!--<div class="kf-leaMsg-open">-->
                    <!--<span>回复</span>-->
                  <!--</div>-->
                  <!--<div class="kf-leaMsg-status">-->
                    <!--<div class="kf-leaMsg-ico zan">10</div>-->
                    <!--<div class="kf-leaMsg-ico zan on">10</div>-->
                    <!--<span>|</span>-->
                    <!--<div class="kf-leaMsg-ico">删除</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="kf-leaMsg-lists-item">-->
              <!--<div class="kf-leaMsg-img" :style="{backgroundImage: 'url('+require('../../public/static/background.png')+')'}"></div>-->
              <!--<div class="kf-leaMsg-cont">-->
                <!--<div class="kf-leaMsg-hd">-->
                  <!--<div class="kf-leaMsg-name">我的姓名</div>-->
                  <!--<div class="kf-leaMsg-time">1小时前</div>-->
                <!--</div>-->
                <!--<div class="kf-leaMsg-text">互联网的崛起给了像我这样农村家庭孩子更多的学习机会，我的小学及初中都是在村里学校上的，教学资源和师资力量相对薄弱，学习非常单一，网上教育的出现使得我们这类人有了学习赶超的机会。</div>-->
                <!--<div class="kf-leaMsg-ft">-->
                  <!--<div class="kf-leaMsg-open">-->
                    <!--<span>回复</span>-->
                  <!--</div>-->
                  <!--<div class="kf-leaMsg-status">-->
                    <!--<div class="kf-leaMsg-ico zan">10</div>-->
                    <!--<div class="kf-leaMsg-ico zan on">10</div>-->
                    <!--<span>|</span>-->
                    <!--<div class="kf-leaMsg-ico">删除</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import "../assets/css/curriculumLearning.less";
export default {
  data() {
    return {
      questionList: [],
      content: "",
      topOn: false,
      answerCount: "",
      answerOn: false
    };
  },
  computed: mapState(["user"]),
  props: ["planId"],
  watch: {
    planId: function() {
      if (this.planId) {
        this.get_question_list();
      }
    },
    user: function() {
      console.log(this.user.photo);
    }
  },
  mounted() {},
  methods: {
    get_question_list() {
      this.$api.curriculumLearning
        .get_leaMsg_list({
          currentPage: 1,
          limitNum: 10000,
          planId: this.planId
        })
        .then(res => {
          //数据合并
          res.data.results.map(item => {
            this.questionList.map(listItem => {
              if (item.questionId === listItem.questionId) {
                item.answerShow = listItem.answerShow;
                item.list = listItem.list;
              }
            });
          });
          this.questionList = res.data.results ? res.data.results : null;
          this.questionList.map(item => {
            if (typeof item.answerShow === undefined) item.answerShow = false;
            if (typeof item.list === undefined) item.list = [];
          });
          this.diyTime(this.questionList);
          if (this.questionList)
            this.$emit("update:getList", this.questionList);
        })
        .catch(res => {
          console.log(res);
        });
    },
    //点击回复按钮
    onAnswer(row, ind) {
      let questionList = this.questionList;

      questionList.map(item => (item.answerShow = false));
      questionList[ind].answerShow = true;
      this.questionList = [];
      this.questionList = questionList;
      this.get_answer(row);
    },
    //收起回复
    onAnswerHide(row, ind) {
      let questionList = this.questionList;
      questionList[ind].answerShow = false;
      this.questionList = [];
      this.questionList = questionList;
    },
    //留言
    leavingBtn() {
      if (this.content) {
        this.$api.curriculumLearning
          .leaving_message({
            planId: this.planId,
            title: this.content,
            content: this.content.replace(/\n/g, "<br>")
          })
          .then(res => {
            this.content = "";
            this.$message.success("留言成功");
            this.get_question_list();
          })
          .catch(res => {
            console.log(res);
          });
      } else {
        this.$message.error("请填写留言");
      }
    },
    //留言回复
    answerBtn(row) {
      if (this.answerCount) {
        this.$api.curriculumLearning
          .leaving_answer({
            planId: this.planId,
            questionId: row.questionId,
            title: this.answerCount,
            content: this.answerCount.replace(/\n/g, "<br>")
          })
          .then(res => {
            this.answerCount = "";
            this.$message.success("留言回复成功");
            this.get_answer(row);
          })
          .catch(res => {
            console.log(res);
          });
      } else {
        this.$message.error("请填写留言回复");
      }
    },
    //删除留言
    leavingDel(row) {
      this.$api.curriculumLearning
        .leaving_del({
          questionId: row.questionId
        })
        .then(() => {
          this.get_question_list();
        })
        .catch(res => {
          console.log(res);
        });
    },
    //删除留言回复
    leavingAnswerDel(row) {
      this.$api.curriculumLearning
        .leavingAnswerDel({
          answerId: row.answerId
        })
        .then(() => {
          this.get_answer(row);
        })
        .catch(res => {
          console.log(res);
        });
    },
    //留言点赞
    leavingLike(row) {
      this.$api.curriculumLearning
        .leaving_like({
          questionId: row.questionId
        })
        .then(() => {
          this.get_question_list();
        })
        .catch(res => {
          console.log(res);
        });
    },
    //留言回复点赞
    leavingAnswerLike(row) {
      console.log(row);
      this.$api.curriculumLearning
        .leaving_answer_like({
          questionId: row.questionId,
          answerId: row.answerId
        })
        .then(() => {
          this.get_answer(row);
        })
        .catch(res => {
          console.log(res);
        });
    },
    //查看回复
    get_answer(row) {
      this.$api.curriculumLearning
        .get_answer({
          currentPage: 1,
          limitNum: 10000,
          questionId: row.questionId
        })
        .then(res => {
          let questionList = this.questionList;
          questionList.map(item => {
            if (item.questionId === row.questionId) {
              item.list = res.data.results ? res.data.results : [];
              this.diyTime(item.list);
              item.answerCount = item.list.length;
            }
          });
          this.questionList = [];
          this.questionList = questionList;
        })
        .catch(res => {
          console.log(res);
        });
    },
    diyTime(list) {
      list.map(item => {
        if (item.createTime) {
          let createTime = parseInt(item.createTime / 1000);
          let time = parseInt(new Date().getTime() / 1000);
          let c_s = time - createTime;

          if (c_s < 60) {
            // 未超过1分钟显示刚刚
            item.time = "刚刚";
          } else if (c_s < 60 * 60) {
            //未超过60分钟显示分钟前，如1分钟前
            item.time = parseInt(c_s / 60) + "分钟前";
          } else if (c_s < 60 * 60 * 24) {
            //未超过24小时，显示小时前，如1小时前
            item.time = parseInt(c_s / 60 / 60) + "小时前";
          } else {
            item.time = this.$fun.time(item.createTime);
          }
        } else {
          item.time = "";
        }
      });
    }
  }
};
</script>

<style lang="less">
</style>
