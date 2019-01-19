const router_module = {
  path: "/moduleMain",
  meta: {
    title: "测评查阅",
    title1: "申请测评",
    show: true, // 是否显示
    listHide: true, // 是否子菜单
    path: "/examRead/examRead"
  },
  component: resolve => require(["../views/examRead/moduleMain"], resolve),
  children: [
    {
      path: "/examRead/examRead",
      meta: {
        title: "测评查阅",
        show: true
      },
      component: resolve => require(["../views/examRead/examRead.vue"], resolve)
    },
    {
      path: "/examRead/time/:id/:img/:course/:time",
      name: "examTime",
      meta: {
        title: "选择日期",
        show: true
      },
      component: resolve => require(["../views/examRead/time.vue"], resolve)
    },
    {
      path: "/examRead/score/:id/:course/:img/:name",
      name: "examReadScore",
      meta: {
        title: "测评成绩",
        show: true
      },
      component: resolve => require(["../views/examRead/score.vue"], resolve)
    }
  ]
};

export default router_module;
