const router_module = {
  path: "/commonCourse/moduleMain",
  meta: {
    title: "课程查阅",
    title1: "我的学习",
    show: true, // 是否显示
    listHide: true, // 是否子菜单
    path: "/commonCourse/commonCourse",
  },
  component: resolve =>
    require(["../views/commonCourse/moduleMain.vue"], resolve),
  children: [
    {
      path: "/commonCourse/commonCourse",
      meta: {
        title: "课程查阅列表",
        show: true
      },
      component: resolve =>
        require(["../views/commonCourse/commonCourseList.vue"], resolve)
    },
    {
      path: "/commonCourse/commonCourseDetail/:id",
      name: "commonCourseDetail",
      meta: {
        title: "课程详情",
        show: true
      },
      component: resolve =>
        require(["../views/commonCourse/commonCourseDetail.vue"], resolve)
    },
    {
      path: "/commonCourse/commonCourseCata/:id/:lastWareId/:courseName",
      meta: {
        title: "课程学习",
        show: true
      },
      component: resolve =>
        require(["../views/commonCourse/commonCourseCata.vue"], resolve)
    }
  ]
};

export default router_module;
