//const router_module = {
//path: "/none",
//meta: {
//  title: "首页"
//},
//component: resolve => require(["../views/home/homeMain.vue"], resolve),
//children: [
//  {
//    path: "/home",
//    meta: {
//      title: "首页"
//    },
//    component: resolve => require(["../views/home/home.vue"], resolve)
//  },
//  {
//    path: "/home/search_result",
//    meta: {
//      title: "查询列表页"
//    },
//    component: resolve =>
//      require(["../views/home/search_result.vue"], resolve)
//  }
//]
//};

const router_module = {
  path: "/home",
  meta: {
    title: "首页"
  },
  component: resolve => require(["../views/home/home.vue"], resolve),
};

export default router_module;
