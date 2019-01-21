const router_module = {
  path: "/none",
  meta: {
    title: "考场查询"
  },
  component: resolve =>
    require(["../views/testQueries/moduleMain.vue"], resolve),
  children: [
    {
      path: "/testQueries/list",
      meta: {
        title: "考场查询"
      },
      component: resolve => require(["../views/testQueries/list.vue"], resolve)
    }
  ]
};

export default router_module;
