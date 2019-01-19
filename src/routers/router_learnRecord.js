const router_module = {
  path: "/moduleMain",
  meta: {
    title: "学习记录",
    show: true, // 是否显示
    listHide: true, // 是否子菜单
    path: "/learnRecord/learnRecord"
  },
  component: resolve => require(["../views/learnRecord/moduleMain"], resolve),
  children: [
    {
      path: "/learnRecord/learnRecord",
      meta: {
        title: "学习记录",
        show: true
      },
      component: resolve =>
        require(["../views/learnRecord/learnRecord.vue"], resolve)
    },
    {
      path: "/learnRecord/commonCourseDetail/:id",
      meta: {
        title: "课程详情",
        show: true
      },
      component: resolve =>
        require(["../views/commonCourse/commonCourseDetail.vue"], resolve)
    }
  ]
};

export default router_module;
