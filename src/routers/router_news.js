const router_module = {
  path: "/non",
  meta: {
    title: "通知消息"
  },
  component: resolve => require(["../views/news/moduleMain.vue"], resolve),
  redirect:"/newsList",
children: [
    {
      path: "/newsList",
      meta: {
        title: "通知消息"
      },
      component: resolve => require(["../views/news/list.vue"], resolve)
    },
    {
      path: "/newsDetail/:id/:type",
      name: "systemNews",
      meta: {
        title: "消息"
      },
      component: resolve => require(["../views/news/newsDetail.vue"], resolve)
    }
]
};

export default router_module;
