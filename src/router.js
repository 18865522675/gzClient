import Vue from "vue";
import Router from "vue-router";
import login from "./views/login";
import main from "./views/main";
import router_home from "./routers/router_home"; //首页
import router_selfInfo from "./routers/router_selfInfo"; //个人资料
import router_curriculumLearning from "./routers/router_curriculumLearning"; //课程学习
import router_preschoolReview from "./routers/router_preschoolReview"; //学前复习
import router_library from "./routers/router_library"; //图书馆
import router_my from "./routers/router_my"; //个人中心
import router_examinationReservation from "./routers/router_examinationReservation"; //考试预约
import router_testQueries from "./routers/router_testQueries"; //考试查询
import router_news from "./routers/router_news"; //消息
import router_serviceFeedback from "./routers/router_serviceFeedback"; //服务反馈
import router_courseScore from "./routers/router_courseScore"; //服务反馈
import router_teachPlan from "./routers/router_teachPlan"; //服务反馈
import router_examArrange from "./routers/router_examArrange"; //服务反馈
import router_paper from "./routers/router_paper"; //服务反馈

//页面
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
      path: "/",
      name: "main",
      component: main,
      redirect: "/home",
      children: [
        router_home, //首页
        router_selfInfo, //个人资料
        router_curriculumLearning, //课程学习
//      router_preschoolReview, //学前复习
//      router_library, //图书馆
//      router_my, //个人中心
//      router_examinationReservation, //考试预约
        router_news, //消息
         router_courseScore, //消息
         router_teachPlan,
         router_examArrange,
         {
         	 path:'/studentBook',
         	 name:'studentBook',
         	 meta:{
         	 	 title:'学生手册'
         	 },
         	 component: resolve => require(["./views/studentBook.vue"], resolve),
         }
//       router_paper
//      router_serviceFeedback //服务反馈
      ]
    }
  ]
});
