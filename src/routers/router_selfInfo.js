// const router_module = {
//   path: "/selfInfo/moduleMain",
//   meta: {
//     title: "个人资料",
//     show: true, // 是否显示
//     listHide: true // 是否子菜单
//   },
//   component: resolve => require(["../views/selfInfo/moduleMain.vue"], resolve),
//   children: [
//     {
//       path: "/selfInfo",
//       meta: {
//         title: "个人资料",
//         show: true
//       },
//       component: resolve => require(["../views/selfInfo/selfInfo.vue"], resolve)
//     }
//   ]
// };
const router_module = {
  path: "/selfInfo",
  meta: {
    title: "个人资料"
  },
  component: resolve => require(["../views/selfInfo/selfInfo.vue"], resolve)
};

export default router_module;
