const router_module = {
  path: "/none",
  meta: {
    title: "图书馆"
  },
  component: resolve => require(["../views/library/moduleMain.vue"], resolve),
  children: [
    {
      path: "/library/library",
      meta: {
        title: "图书馆"
      },
      component: resolve => require(["../views/library/library.vue"], resolve)
    }
  ]
};

export default router_module;
