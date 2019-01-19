import Vue from "vue";
import Router from "vue-router";
import login from "./views/login";
import setPassword from "./views/setPassword";
import changePhone from "./views/changePhone";
import protocol from "./views/protocol";
import main from "./views/main";
import router_home from "./routers/router_home"; //首页
import router_selfInfo from "./routers/router_selfInfo"; //首页
import router_search from "./routers/router_search"; //搜索
import router_courseLive from "./routers/router_courseLive"; //课程直播
import router_majorType from "./routers/router_majorType"; //专业分类
import router_my from "./routers/router_my"; //my——个人资料
import router_myStudy from "./routers/router_myStudy"; //课程查询
import router_commonCourse from "./routers/router_commonCourse"; //我的学习
import router_order from "./routers/router_order"; //我的订单
import router_message from "./routers/router_message"; //消息
import router_feedback from "./routers/router_feedback"; //服务反馈
import router_learnRecord from "./routers/router_learnRecord"; //学习记录
import router_examRead from "./routers/router_examRead"; //测评查阅
import router_applyTest from "./routers/router_applyTest"; //申请测评
import router_examResult from "./routers/router_examResult"; //测评结果
import router_tutoring from "./routers/router_tutoring"; //习题辅导
import router_standard from "./routers/router_standard"; //习题辅导

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      meta: {
        title: "登录"
      },
      component: login
    },
    {
      path: "/setPassword",
      meta: {
        title: "修改密码"
      },
      component: setPassword
    },
    {
      path: "/changePhone",
      meta: {
        title: "更换手机号"
      },
      component: changePhone
    },
    {
      path: "/protocol",
      meta: {
        title: "用户协议"
      },
      component: protocol
    },
    {
      path: "/",
      component: main,
      redirect: "/home",
      children: [
        router_home, //首页
        router_search, //搜索
        router_courseLive, //课程直播
        router_majorType, //专业分类
        router_my, //my——个人资料
        router_commonCourse, //课程查询
        router_myStudy, //我的学习
        router_order, //我的订单
        router_message, //消息
        router_feedback, //服务反馈
        router_selfInfo, //个人资料
        router_learnRecord, //学习记录
        router_examRead, //测评查阅
        router_applyTest, //申请测评
        router_examResult, //测评结果
        router_tutoring //习题辅导
      ]
    },
    router_standard //评判标准
  ]
});
