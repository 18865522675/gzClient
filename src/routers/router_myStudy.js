const router_module = {
  path: "/myStudy/moduleMain",
  meta: {
    title: "我的学习",
    show: true, // 是否显示
    listHide: true, // 是否子菜单
    path: "/myStudy/commonCourse"
  },
  component: resolve =>
    require(["../views/commonCourse/moduleMain.vue"], resolve),
  children: [
    {
      path: "/myStudy/commonCourse",
      meta: {
        title: "我的学习列表",
        show: true
      },
      component: resolve =>
        require(["../views/commonCourse/commonCourseList.vue"], resolve)
    },
    {
      path: "/myStudy/commonCourseDetail/:id",
      name:'myStudyDetail',
      meta: {
        title: "课程详情",
        show: true
      },
      component: resolve =>
        require(["../views/commonCourse/commonCourseDetail.vue"], resolve)
    },
    {
      path: "/myStudy/commonCourseCata/:id/:lastWareId/:courseName",
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
