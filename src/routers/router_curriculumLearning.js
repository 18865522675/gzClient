const router_module = {
  path: "/none",
  meta: {
    title: "课程学习"
  },
  component: resolve =>
    require(["../views/curriculumLearning/moduleMain.vue"], resolve),
  children: [
    {
      path: "/curriculumLearning/list",
      meta: {
        title: "课程学习"
      },
      component: resolve =>
        require(["../views/curriculumLearning/list.vue"], resolve)
    },
    {
      path:
        "/curriculumLearning/myCourse/:tabInd/:planId/:wareCourseId/:courseName",
      name: "myCourse",
      meta: {
        title: "我的课程"
      },
      component: resolve =>
        require(["../views/curriculumLearning/myCourse.vue"], resolve)
    }
  ]
};

export default router_module;
