const router_module = {
  path: "/none",
  meta: {
    title: "服务与反馈",
    show: true, // 是否显示
    listHide: true, // 是否子菜单
    path: "/sever"
  },
  component: resolve => require(["../views/moduleMain.vue"], resolve),
  children: [
    {
      path: "/sever",
      meta: {
        title: "服务与反馈",
        show: true
      },
      component: resolve => require(["../views/sever/sever.vue"], resolve)
    }
  ]
};

export default router_module;
