const router_module = {
  path: "/paper",
  meta: {
    title: "毕业设计"
  },
  component: resolve => require(["../views/paper/paper.vue"], resolve),
  redirect:"/paper/paperDesign",
  children: [
    {
      path: "/paper/paperDesign",
      meta: {
        title: "毕业设计"
      },
      redirect:"/paper/selectTopic",
      component: resolve => require(["../views/paper/moduleMain.vue"], resolve),
      children:[{
      	path: "/paper/selectTopic",
        meta: {
          title: "论文选题"
        },
         component: resolve => require(["../views/paper/selectTopic.vue"], resolve),
      },{
      	path: "/paper/openTopic",
        meta: {
          title: "开题报告"
        },
         component: resolve => require(["../views/paper/openTopic.vue"], resolve),
      },{
      	path: "/paper/graduatePaper",
        meta: {
          title: "论文"
        },
         component: resolve => require(["../views/paper/graduatePaper.vue"], resolve),
      },{
      	path: "/paper/debate",
        meta: {
          title: "答辩"
        },
         component: resolve => require(["../views/paper/debate.vue"], resolve),
      },{
      	path: "/paper/degree",
        meta: {
          title: "学位"
        },
         component: resolve => require(["../views/paper/degree.vue"], resolve),
      }]
    },
]
};

export default router_module;
