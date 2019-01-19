const router_module = {
  path: "/majorType/moduleMain",
  meta: {
    title: "专业分类",
    show: true, // 是否显示
    listHide: true // 是否子菜单
  },
  component: resolve => require(["../views/majorType/moduleMain.vue"], resolve),
  children: [
    {
      path: "/majorType/majorList",
      meta: {
        title: "专业列表",
        show: true
      },
      component: resolve =>
        require(["../views/majorType/majorList.vue"], resolve)
    },
    {
      path: "/majorType/majorType/:id",
      meta: {
        title: "专业分类列表",
        show: true
      },
      component: resolve =>
        require(["../views/majorType/majorType.vue"], resolve)
    },
    {
      path: "/majorType/courseDetail/:id",
      meta: {
        title: "专业课程",
        show: true
      },
      component: resolve =>
        require(["../views/majorType/courseDetail.vue"], resolve)
    },
    {
      path: "/majorType/courseDetailCata/:id/:lastWareId/:courseName",
      meta: {
        title: "课程学习",
        show: true
      },
      component: resolve =>
        require(["../views/majorType/courseDetailCata.vue"], resolve)
    }
  ]
};

export default router_module;
