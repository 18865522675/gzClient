const router_module = {
  path: "/none",
  meta: {
    title: "个人中心"
  },
  component: resolve => require(["../views/my/myModule.vue"], resolve),
  children: [
    {
      path: "/my/teaching",
      meta: {
        title: "教学计划"
      },
      component: resolve => require(["../views/my/teachingPlan.vue"], resolve)
    },
    {
      path: "/my/courseScore",
      meta: {
        title: "课程成绩"
      },
      component: resolve => require(["../views/my/course_score.vue"], resolve)
    },
    {
      name: "tst",
      path: "/my/graduation",
      meta: {
        title: "毕业设计"
      },
      component: resolve => require(["../views/my/graduation.vue"], resolve)
    },
    {
      name: "ss",
      path: "/my/kk",
      meta: {
        title: "毕业设计测试"
      },
      component: resolve => require(["../views/my/graduationTest.vue"], resolve)
    }
  ]
};

export default router_module;
