const router_module = {
  path: "/examResult/moduleMain",
  meta: {
    title: "测评结果",
    show: true, // 是否显示
    listHide: true, // 是否子菜单
    path: "/examResult/examResult"
  },
  component: resolve => require(["../views/examResult/moduleMain"], resolve),
  children: [
    {
      path: "/examResult/examResult",
      meta: {
        title: "",
        show: true
      },
      component: resolve =>
        require(["../views/examResult/examResult.vue"], resolve)
    },
    {
      path: "/examResult/scoreQuery/:assessmentId/:courseName",
      meta: {
        title: "成绩查询",
        show: true
      },
      component: resolve =>
        require(["../views/examResult/scoreQuery.vue"], resolve)
    }
  ]
};

export default router_module;
