const router_module = {
  path: "/selfInfo",
  meta: {
    title: "个人资料"
  },
  component: resolve => require(["../views/selfInfo/selfInfo.vue"], resolve)
};

export default router_module;
