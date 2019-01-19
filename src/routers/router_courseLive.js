const router_module = {
  path: "/courseLive/moduleMain",
  meta: {
    title: "课程直播",
    show: true, // 是否显示
    listHide: true, // 是否子菜单
    path: "/courseLive/searchResult"
  },
  component: resolve =>
    require(["../views/courseLive/moduleMain.vue"], resolve),
  children: [
    {
      path: "/courseLive/searchResult",
      meta: {
        title: "直播列表",
        show: true
      },
      component: resolve =>
        require(["../views/courseLive/searchResult.vue"], resolve)
    },
    {
      path: "/courseLive/searchResult1/:id",
      meta: {
        title: "直播列表搜索结果",
        show: true
      },
      component: resolve =>
        require(["../views/courseLive/searchResult1.vue"], resolve)
    },
    {
      path: "/courseLive/liveRoom/:id/:courseId",
      meta: {
        title: "直播间",
        show: true
      },
      component: resolve =>
        require(["../views/courseLive/liveRoom.vue"], resolve)
    },
    {
      path: "/courseLive/playBack/:id",
      meta: {
        title: "直播回放",
        show: true
      },
      component: resolve =>
        require(["../views/courseLive/playBack.vue"], resolve)
    },
    {
      path: "/courseLive/courseDetail/:id",
      meta: {
        title: "课程详情",
        show: true
      },
      component: resolve =>
        require(["../views/courseLive/courseDetail.vue"], resolve)
    },
    {
      path: "/courseLive/commonCourseCata/:id/:lastWareId/:courseName",
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
