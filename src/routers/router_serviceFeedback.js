const router_module = {
  path: "/none",
  meta: {
    title: "服务反馈"
  },
  component: resolve =>
    require(["../views/serviceFeedback/moduleMain.vue"], resolve),
  children: [
    {
      path: "/serviceFeedback/list",
      meta: {
        title: "服务反馈"
      },
      component: resolve =>
        require(["../views/serviceFeedback/list.vue"], resolve)
    }
  ]
};

export default router_module;
