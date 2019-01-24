const router_module = {
  path: "/none",
  meta: {
    title: "我的课程"
  },
  component: resolve =>
    require(["../views/curriculumLearning/moduleMain.vue"], resolve),
    redirect:"/curriculumLearning/myCourseLearn",
children: [
    {
      path: "/curriculumLearning/myCourseLearn",
      meta: {
        title: "我的课程"
      },
      component: resolve =>
        require(["../views/curriculumLearning/myCourseLearn.vue"], resolve)
    },
    {
      path:
        "/curriculumLearning/myCourse/:courseId",
      name: "myCourse",
      meta: {
        title: "课程学习"
      },
      component: resolve =>
        require(["../views/curriculumLearning/myCourse.vue"], resolve)
    },
    {
      path:
        "/curriculumLearning/seeVideo",
      name: "myCourse",
      meta: {
        title: "视频学习"
      },
      component: resolve =>
        require(["../views/curriculumLearning/seeVideo.vue"], resolve)
    }
]
};

export default router_module;
