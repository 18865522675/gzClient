const router_module = {
  path: "/moduleMain",
  meta: {
    title: "菜单1",
    show: true, // 是否显示
    listHide: true // 是否子菜单
  },
  component: resolve => require(["../views/moduleMain.vue"], resolve),
  children: [
    {
      path: "/home",
      meta: {
        title: "子菜单1",
        show: true
      },
      component: resolve => require(["../views/home/home.vue"], resolve)
    }
  ]
};

export default router_module;
