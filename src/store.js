import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //面包屑
    crumbs: [],
    crumbsStatus: false,
    userInfo: {},
    user: {}
  },
  mutations: {
    set_userInfo(state, res) {
      return (state.userInfo = res);
    },
    set_user(state, res) {
      return (state.user = res);
    },
    //改变面包屑
    crumbs_change(state, matched) {
      let crumbs = [];

      matched.map(item => {
        if (item.meta.title) {
          crumbs.push({
            title: item.meta.title,
            path: item.path
          });
        }
      });

      return (state.crumbs = crumbs);
    },
    //改变面包屑状态
    crumbsStatus_change(state, val) {
      return (state.crumbsStatus = val);
    }
  },
  actions: {
    set_userInfo({ commit }, res) {
      commit("set_userInfo", res.data);
      res.success();
    },
    set_user({ commit }, res) {
      commit("set_user", res);
    }
  }
});
