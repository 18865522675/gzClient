const router_module = {
  path: "/none",
  meta: {
    title: "消息"
  },
  component: resolve => require(["../views/news/moduleMain.vue"], resolve),
  children: [
    {
      path: "/news/list",
      meta: {
        title: "消息"
      },
      component: resolve => require(["../views/news/list.vue"], resolve)
    },
    {
      path: "/news/systemNews/:id/:type",
      name: "systemNews",
      meta: {
        title: "系统消息"
      },
      component: resolve => require(["../views/news/systemNews.vue"], resolve)
    }
  ]
};

export default router_module;
