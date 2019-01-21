const router_module = {
  path: "/none",
  meta: {
    title: "考试通知"
  },
  component: resolve =>
    require(["../views/examinationReservation/moduleMain.vue"], resolve),
  children: [
    {
      path: "/examinationReservation/list",
      meta: {
        title: "考试通知"
      },
      component: resolve =>
        require(["../views/examinationReservation/list.vue"], resolve)
    }
  ]
};

export default router_module;
