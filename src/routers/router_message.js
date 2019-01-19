const router_module = {
  path: "/none",
  meta: {
    title: "我的消息",
    show: true, // 是否显示
    listHide: true, // 是否子菜单
    path: "/message/List"
  },
  component: resolve => require(["../views/moduleMain.vue"], resolve),
  children: [
    {
      path: "/message/List",
      meta: {
        title: "我的消息",
        show: true
      },
      component: resolve => require(["../views/message/message.vue"], resolve)
    },
    {
      path: "/message/sys_message/:id/:title/:content/:time",
      name: "noticeDetail",
      meta: {
        title: "系统消息",
        show: true
      },
      component: resolve =>
        require(["../views/message/sys_message.vue"], resolve)
    }
  ]
};

export default router_module;
