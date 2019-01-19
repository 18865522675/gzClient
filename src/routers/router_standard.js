const router_module = {
  path: "/standard",
  meta: {
    title: "评价标准",
    show: true, // 是否显示
    path: "/order/order"
  },
  component: resolve => require(["@/views/standard.vue"], resolve)
};

export default router_module;
