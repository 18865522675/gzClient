const router_module = {
  path: "/search/moduleMain",
  meta: {
    title: "搜索",
    show: true, // 是否显示
    listHide: true // 是否子菜单
  },
  component: resolve => require(["../views/search/moduleMain.vue"], resolve),
  children: [
    {
      path: "/search/search/:keyWord",
      meta: {
        title: "搜索结果",
        show: true
      },
      component: resolve => require(["../views/search/search.vue"], resolve)
    }
  ]
};

export default router_module;
