const router_module = {
  path: "/applyTest/moduleMain",
  meta: {
    title: "申请测评",
    show: true, // 是否显示
    listHide: true, // 是否子菜单
    path: "/applyTest/applyTestList"
  },
  component: resolve => require(["../views/applyTest/moduleMain.vue"], resolve),
  children: [
    {
      path: "/applyTest/applyTestList",
      meta: {
        title: "",
        show: true
      },
      component: resolve =>
        require(["../views/applyTest/applyTestList.vue"], resolve)
    },
    {
      path: "/applyTest/confirmOrder",
      meta: {
        title: "首页",
        show: true
      },
      component: resolve =>
        require(["../views/applyTest/confirmOrder.vue"], resolve)
    }
  ]
};

export default router_module;
