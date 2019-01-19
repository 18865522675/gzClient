const router_module = {
  path: "/tutoring/moduleMain",
  meta: {
    title: "",
    show: true, // 是否显示
    listHide: true, // 是否子菜单
    path: "/tutoring/tutoring"
  },
  component: resolve => require(["../views/tutoring/moduleMain.vue"], resolve),
  children: [
    {
      path: "/tutoring/tutoring",
      meta: {
        title: "习题辅导",
        show: true
      },
      component: resolve => require(["../views/tutoring/tutoring.vue"], resolve)
    },
    {
      path: "/tutoring/tutoringDetail/:id",
      meta: {
        title: "习题辅导查看",
        show: true
      },
      component: resolve =>
        require(["../views/tutoring/tutoringDetail.vue"], resolve)
    },
    {
      path: "/tutoring/tutoring_view/:taskId",
      meta: {
        title: "查看习题",
        show: true
      },
      component: resolve =>
        require(["../views/tutoring/tutoring_view.vue"], resolve)
    }
  ]
};

export default router_module;
