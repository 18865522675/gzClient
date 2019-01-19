<template>
    <div class="msg-main">
        <!--学生-->
        <ul class="msg-left" v-if="userInfo.clientRoleType===1">
            <li class="msg-nav" @click="msgList(1)">
                <div  :class="typeList ===1?'msg-round-active':'msg-round'"></div>
                <span>系统消息</span>
            </li>
            <li class="msg-nav" @click="msgList(2)">
                <div  :class="typeList ===2?'msg-round-active':'msg-round'"></div>
                <span>新的留言</span>
            </li>
        </ul>
        <div v-if="typeList===1&&userInfo.clientRoleType===1">
            <ul class="msg-right" v-if="typeList===1&&userInfo.clientRoleType===1">
                <li class="msg-list" v-for="(item,index) in notice_list" :key="index" >
                    <div class="msg-list-left">
                        <img src="../../assets/img/msg_sys_new.png" alt="" class="msg-list-left-img" v-if="item.readStatus===0">
                        <img src="../../assets/img/msg_sys_old.png" alt="" class="msg-list-left-img" v-if="item.readStatus!==0">
                    </div>
                    <div class="msg-list-right" v-on:mouseenter="dataDetails(index)" v-on:mouseleave="hiddenDetail" :class="{active:index===isActive}">
                        <div class="msg-list-right-fir">
                            <span class="msg-list-right-title">系统消息</span>
                            <span class="msg-list-right-time">{{item.time}}</span>
                            <span class="msg-list-right-del" @click="del(item.id)">
                                <img src="../../assets/img/del.png" alt="" class="msg-list-right-del-img">
                            </span>
                        </div>
                        <div class="msg-list-right-coursename" @click="goNoticeDetail(item.id,item.title,item.content,item.publishTime)">{{item.title}}</div>
                        <div class="msg-list-right-syscontent">{{item.content}}</div>
                    </div>
                </li>
                <div v-if="notice_list.length===0" class="msg-list-no">暂无消息</div>
            </ul>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="limitNum"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    class="kf-pagination"
                    v-if="notice_list.length!==0">
            </el-pagination>
        </div>
        <div v-if="typeList===2&&userInfo.clientRoleType===1">
            <div class="msg-right" v-if="typeList===2&&userInfo.clientRoleType===1">
                <div class="msg-list" v-for="(item,index) in messageList" :key="index">
                    <div class="msg-list-left">
                        <img src="../../assets/img/message_new.png" alt="" class="msg-list-left-img" v-if="item.readStatus===0">
                        <img src="../../assets/img/message_old.png" alt="" class="msg-list-left-img" v-if="item.readStatus!==0">
                    </div>
                    <div class="msg-list-right" v-on:mouseenter="dataDetails(index)" v-on:mouseleave="hiddenDetail" :class="{active:index===isActive}">
                        <div class="msg-list-right-fir">
                            <span class="msg-list-right-title">新的留言</span>
                            <span class="msg-list-right-time">{{item.messagetime}}</span>
                            <span class="msg-list-right-del" @click="del(item.id)">
                                <img src="../../assets/img/del.png" alt="" class="msg-list-right-del-img">
                            </span>
                        </div>
                        <div class="msg-list-right-coursename" @click="goMessageDetail(item.id,item.courseId,1)">{{item.title}}</div>
                        <div class="msg-list-right-content-bg">
                            <div class="msg-list-right-content">{{item.content}}</div>
                        </div>
                    </div>
                </div>
                <div v-if="messageList.length===0" class="msg-list-no">暂无留言</div>
            </div>
            <el-pagination
                    @size-change="handleSizeChange2"
                    @current-change="handleCurrentChange2"
                    :current-page="currentPage2"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="limitNum2"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total2"
                    class="kf-pagination"
                    v-if="messageList.length!==0">
            </el-pagination>
        </div>

        <!--教师-->
        <ul class="msg-left" v-if="userInfo.clientRoleType==2">
            <li class="msg-nav" @click="msgList(1)">
                <div  :class="typeList ===1?'msg-round-active':'msg-round'"></div>
                <span>系统消息</span>
            </li>
            <li class="msg-nav" @click="msgList(2)">
                <div  :class="typeList ===2?'msg-round-active':'msg-round'"></div>
                <span>新的留言</span>
            </li>
        </ul>
        <div v-if="typeList===1&&userInfo.clientRoleType===2">
            <ul class="msg-right" v-if="typeList===1&&userInfo.clientRoleType===2">
                <li class="msg-list" v-for="(item,index) in notice_list" :key="index" >
                    <div class="msg-list-left">
                        <img src="../../assets/img/msg_sys_new.png" alt="" class="msg-list-left-img" v-if="item.readStatus===0">
                        <img src="../../assets/img/msg_sys_old.png" alt="" class="msg-list-left-img" v-if="item.readStatus!==0">
                    </div>
                    <div class="msg-list-right" v-on:mouseenter="dataDetails(index)" v-on:mouseleave="hiddenDetail" :class="{active:index===isActive}">
                        <div class="msg-list-right-fir">
                            <span class="msg-list-right-title">系统消息</span>
                            <span class="msg-list-right-time">{{item.time}}</span>
                            <span class="msg-list-right-del" @click="del(item.id)">
                                <img src="../../assets/img/del.png" alt="" class="msg-list-right-del-img">
                            </span>
                        </div>
                        <div class="msg-list-right-coursename" @click="goNoticeDetail(item.id,item.title,item.content,item.publishTime)">{{item.title}}</div>
                        <div class="msg-list-right-syscontent">{{item.content}}</div>
                    </div>
                </li>
                <div v-if="notice_list.length===0" class="msg-list-no">暂无消息</div>
            </ul>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="limitNum"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    class="kf-pagination"
            v-if="notice_list.length!==0">
            </el-pagination>
        </div>
        <div v-if="typeList===2&&userInfo.clientRoleType===2">
            <ul class="msg-right" v-if="typeList===2&&userInfo.clientRoleType===2">
                <li class="thmsg-list" v-for="(item,index) in messageList" :key="index" v-on:mouseenter="dataDetails(index)" v-on:mouseleave="hiddenDetail" :class="{active:index===isActive}">
                    <div class="thmsg-list-left">
                        <img src="../../assets/img/message_new.png" alt="" class="msg-list-left-img" v-if="item.readStatus===0">
                        <img src="../../assets/img/message_old.png" alt="" class="msg-list-left-img" v-if="item.readStatus!==0">
                    </div>
                    <div class="thmsg-list-right">
                        <div class="thmsg-list-right-fir">
                            <div class="thmsg-list-right-fir-left">
                                <span class="thmsg-list-right-title">新的留言</span>
                                <span class="thmsg-list-right-time">{{item.messagetime}}</span>
                            </div>
                            <div class="thmsg-list-right-del" @click="del(item.id)">
                                <img src="../../assets/img/del.png" alt="" class="msg-list-right-del-img">
                            </div>
                        </div>
                        <div class="thmsg-list-right-coursename" @click="goMessageDetail(item.id,item.courseId,2)">{{item.title}}</div>
                        <div class="thmsg-list-right-content-bg">
                            <div class="thmsg-list-right-content">{{item.content}}</div>
                        </div>
                        <div class="msg-list-right-answer" @click="answer(item.id,index)" v-if="!item.answerTime">
                            <div class="msg-list-right-answer-img" :style="{backgroundImage: 'url(\''+require('../../assets/img/anser_icon.png')+'\')'}"></div>
                            <div class="msg-list-right-answer-text">回复</div>
                        </div>
                        <div class="msg-list-right-answer" @click="down(item.id,index)" v-if="item.answerTime&&thReplyDown!==item.id">展开回复↓</div>
                        <div class="msg-list-right-answer" @click="down(item.id,index)" v-if="item.answerTime&&thReplyDown===item.id">收起回复↑</div>
                        <div class="msg-list-right-answerText" v-show="thReplyShow ===item.id">
                                <textarea class="msg-list-right-answerText-input" placeholder="写下您的回复,不超过200个字符" onKeyUp="if(this.value.length > 200) this.value=this.value.substr(0,200)" v-model="answerContent"></textarea>
                                <div class="msg-list-right-answerText-reply" @click="teaAnswer(item.quizId)">写回复</div>
                        </div>
                        <div class="msg-list-right-answerText" v-show="thReplyDown ===item.id">
                            <div class="msg-list-right-content-bg">
                                <div class="msg-list-right-content">{{item.answerName}}:{{item.answerContent}}</div>
                            </div>
                        </div>
                    </div>
                </li>
                <div v-if="messageList.length===0" class="msg-list-no">暂无留言</div>
            </ul>
            <el-pagination
                    @size-change="handleSizeChange2"
                    @current-change="handleCurrentChange2"
                    :current-page="currentPage2"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="limitNum2"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total2"
                    class="kf-pagination"
            v-if="messageList.length!==0">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      typeList: 1,
      currentPage: 1,
      limitNum: 10,
      total: 10,
      currentPage2: 1,
      limitNum2: 10,
      total2: 10,
      show: false,
      notice_list: "",
      messageList: "",
      isActive: false,
      thReplyShow: "",
      answerContent: "",
      ansReply: true,
      replyDown: false,
      thReplyDown: ""
    };
  },
  mounted() {
    this.get_List();
  },
  computed: mapState(["userInfo"]),
  methods: {
    get_List() {
      //系统消息
      this.$api.message
        .list({
          pageNum: this.currentPage,
          pageSize: this.limitNum,
          generateType: 0
        })
        .then(res => {
          console.log(res);
          this.notice_list = res.data.pageList;
          this.notice_list.forEach(item => {
            item.time = this.$fun.table.time(null, null, item.publishTime);
          });
          this.total = res.data.total;
        });

      //留言消息
      this.$api.message
        .list({
          pageNum: this.currentPage2,
          pageSize: this.limitNum2,
          generateType: -1
        })
        .then(res => {
          console.log(res);
          this.messageList = res.data.pageList;
          console.log(this.messageList.length);
          this.messageList.forEach(item => {
            item.messagetime = this.$fun.table.time(
              null,
              null,
              item.publishTime
            );
          });
          this.total2 = res.data.total;
        });
    },
    get_messageCount() {
      if (this.userInfo) {
        this.$api.main.messageCount().then(() => {});
      }
    },
    goNoticeDetail(id, title, content, time) {
      this.$api.message.read({ id: id }).then(() => {
        // this.$store.dispatch("update_message", res.data);
        this.$router.push({
          name: "noticeDetail",
          params: { id: id, title: title, content: content, time: time }
        });
      });
      this.$store.dispatch("update_message").then(res => {
        this.messageCount = res;
      });
    },
    goMessageDetail(id, courseId, type) {
      this.$api.message.read({ id: id }).then(() => {
        if (type === 1) {
          this.$router.push({
            name: "myStudyDetail",
            params: { id: courseId }
          });
        } else if (type === 2) {
          this.$router.push({
            name: "commonCourseDetail",
            params: { id: courseId }
          });
        }
        this.$store.dispatch("update_message").then(res => {
          this.messageCount = res;
        });
      });
    },
    msgList(type) {
      if (type === 1) {
        this.typeList = 1;
      } else if (type === 2) {
        this.typeList = 2;
      } else {
        this.typeList = 3;
      }
    },
    del(id) {
      this.$confirm("你确定要删除这条消息？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        this.$api.message.delete({ id: id }).then(() => {
          this.$message({
            type: "success",
            message: "删除成功！"
          });
          this.get_List();
        });
      });
    },
    answer(id) {
      this.thReplyShow = id;
      this.thReplyDown = "";
    },
    down(id) {
      if (this.thReplyDown === id) {
        this.thReplyDown = "";
      } else {
        this.thReplyDown = id;
      }
      // this.thReplyDown = id;
      this.thReplyShow = "";
    },
    teaAnswer(id) {
      if (this.answerContent !== "") {
        this.$api.commonCourse
          .addAnswer({ id: id, askContent: this.answerContent })
          .then(() => {
            this.$message({
              type: "success",
              message: "添加回复成功！"
            });
            this.thReplyShow = "";
          });
        this.answerContent = null;
        this.get_List();
        // this.getQuizList();
      } else {
        this.$message({
          type: "success",
          message: "请输入回复！"
        });
      }
    },
    dataDetails(index) {
      // this.show = true;
      this.isActive = index;
    },
    hiddenDetail() {
      this.show = false;
    },
    handleSizeChange(val) {
      this.limitNum = val;
      this.get_List();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.get_List();
    },
    // handleSizeChange1(val) {
    //   this.limitNum1 = val;
    //   this.get_List();
    // },
    // handleCurrentChange1(val) {
    //   this.currentPage1 = val;
    //   this.get_List();
    // },
    handleSizeChange2(val) {
      this.limitNum2 = val;
      this.get_List();
    },
    handleCurrentChange2(val) {
      this.currentPage2 = val;
      this.get_List();
    }
  }
};
</script>

<style lang="less">
.msg-main {
  margin-top: 58px;
  max-width: 1200px;
  margin: 58px auto 0;
  display: flex;
  justify-content: space-between;
  .msg-left {
    width: 260px;
    height: 174px;
    background-color: #fff;
    border-radius: 10px;
    .msg-nav {
      height: 58px;
      border-bottom: #e5e5e5 1px solid;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: #ffba4e;
        cursor: pointer;
      }
    }
    .msg-round {
      height: 8px;
      width: 8px;
      border-radius: 50%;
      background-color: #404852;
      margin-right: 16px;
    }
    .msg-round-active {
      height: 8px;
      width: 8px;
      border-radius: 50%;
      background-color: #ffba4e;
      margin-right: 16px;
    }
  }
  .msg-th-left {
    width: 260px;
    height: 116px;
    background-color: #fff;
    border-radius: 10px;
    .msg-nav {
      height: 58px;
      border-bottom: #e5e5e5 1px solid;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: #ffba4e;
        cursor: pointer;
      }
    }
    .msg-round {
      height: 8px;
      width: 8px;
      border-radius: 50%;
      background-color: #404852;
      margin-right: 16px;
    }
    .msg-round-active {
      height: 8px;
      width: 8px;
      border-radius: 50%;
      background-color: #ffba4e;
      margin-right: 16px;
    }
  }
}
.msg-right {
  width: 872px;
  /*height: 2189px;*/
  /*background-color: #fff;*/
  border-radius: 10px;
  .msg-list {
    height: 218px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    justify-content: space-between;
    background-color: #fff;

    .msg-list-left {
      width: 88px;
      display: flex;
      justify-content: center;
      .msg-list-left-img {
        margin-top: 30px;
        width: 35px;
        height: 35px;
      }
    }
    .msg-list-right {
      width: 784px;
      height: 33px;
      line-height: 33px;
      font-size: 15px;
      .msg-list-right-fir {
        display: flex;
        justify-content: space-between;
        padding-top: 19px;
        position: relative;
        .msg-list-right-title {
          width: 78px;
          color: #989898;
        }
        .msg-list-right-time {
          width: 706px;
          color: #989898;
        }
        .msg-list-right-del {
          position: absolute;
          top: 29px;
          right: 20px;
          display: block;
          width: 22px;
          height: 22px;
          cursor: pointer;
          display: none;
        }
      }
      &.active {
        .msg-list-right-del {
          display: block;
        }
      }
      .msg-list-right-coursename {
        display: block;
        color: #000;
        cursor: pointer;
      }
      .msg-list-right-content-bg {
        width: 752px;
        background-image: url("../../assets/img/msg_bg.png");
        background-position: center;
        background-repeat: no-repeat;
        padding: 23px 0;
        height: 66px;
        .msg-list-right-content {
          padding: 0 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
      .msg-list-right-syscontent {
        color: #989898;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        width: 722px;
      }
    }
  }
  .thmsg-list {
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #e5e5e5;
    background-color: #fff;
    &.active {
      .thmsg-list-right-del {
        display: block;
      }
    }
  }
  .thmsg-list-left {
    margin: 30px 22px 0 31px;
  }
  .thmsg-list-right-fir {
    display: flex;
    justify-content: space-between;
    padding-top: 19px;
    height: 34px;
    line-height: 34px;
    color: #989898;
    /*position: relative;*/
  }
  .thmsg-list-right-fir-left {
    display: flex;
    justify-content: flex-start;
  }
  .thmsg-list-right-title {
    margin-right: 16px;
  }
  .thmsg-list-right-coursename {
    display: block;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
  }
  .thmsg-list-right-content-bg {
    width: 752px;
    background-image: url("../../assets/img/msg_bg.png");
    background-position: center;
    background-repeat: no-repeat;
    padding: 23px 0;
    height: 66px;
  }
  .thmsg-list-right-content {
    padding: 0 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 30px;
  }
  .thmsg-list-right-del {
    margin-right: 8px;
    margin-top: 5px;
    width: 22px;
    height: 22px;
    cursor: pointer;
    display: none;
  }
}
.msg-list-right-answer {
  margin-right: 33px;
  justify-content: flex-end;
  display: flex;
  margin-top: 10px;
  cursor: pointer;
  padding-bottom: 20px;
}
.msg-list-right-answer-img {
  width: 30px;
  height: 30px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.msg-list-right-answer-text {
  font-size: 16px;
  margin-left: 5px;
  margin-top: 5px;
}
.msg-list-right-answerText {
  width: 752px;
  padding: 10px 0 10px;
}
.msg-list-right-answerText-input {
  width: 100%;
  background-image: url("../../assets/img/msg_bg.png");
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  height: 90px;
  color: #000;
  font-size: 16px;
  text-indent: 3%;
  padding-top: 3px;
}
.msg-list-right-answerText-reply {
  width: 70px;
  height: 40px;
  line-height: 40px;
  background-color: #ffba4e;
  border-radius: 4px;
  text-align: center;
  margin: 5px 0 0 91%;
  cursor: pointer;
}
.msg-list-right-content-bg {
  width: 752px;
  background-image: url("../../assets/img/msg_bg.png");
  background-position: center;
  background-repeat: no-repeat;
  padding: 23px 0;
  height: 66px;
  .msg-list-right-content {
    padding: 0 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
.msg-list-no {
  height: 100px;
  text-align: center;
  line-height: 100px;
  width: 872px;
}
.kf-pagination {
  float: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
