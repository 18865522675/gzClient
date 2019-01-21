const router_module = {
  path: "/none",
  meta: {
    title: "入学复习"
  },
  component: resolve =>
    require(["../views/preschoolReview/moduleMain.vue"], resolve),
  children: [
    {
      path: "/preschoolReview/preschoolReview",
      meta: {
        title: "入学复习"
      },
      component: resolve =>
        require(["../views/preschoolReview/preschoolReview.vue"], resolve)
    },
    {
      path: "/preschoolReview/preschoolReviewInfo/:courseId",
      meta: {
        title: "入学复习"
      },
      component: resolve =>
        require(["../views/preschoolReview/preschoolReviewInfo.vue"], resolve)
    }
  ]
};

export default router_module;
