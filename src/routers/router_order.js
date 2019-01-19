const router_module = {
  path: "/moduleMain",
  meta: {
    title: "我的订单",
    show: true, // 是否显示
    listHide: true, // 是否子菜单
    path: "/order/order"
  },
  component: resolve => require(["../views/order/moduleMain"], resolve),
  children: [
    {
      path: "/order/order",
      meta: {
        title: "我的订单",
        show: true
      },
      component: resolve => require(["../views/order/order.vue"], resolve)
    }
  ]
};

export default router_module;
