import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";
import $api from "./api/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //面包屑
    crumbs: [],
    crumbsStatus: false,

    userInfo: {},
    // clientRoleType 1:学生 2老师
    updatedata: {},
    updatemessage: ""
  },
  mutations: {
    //改变面包屑
    crumbs_change(state, matched) {
      let crumbs = [];

      matched.map(item => {
        let path = item.meta.path ? item.meta.path : item.path;
        if (item.meta.title && path.indexOf("moduleMain") === -1) {
          let t = true;
          crumbs.map(crumbsItem => {
            if (crumbsItem.path === path) t = false;
          });
          if (t) {
            crumbs.push({
              title: item.meta.title,
              path
            });
          }
        }
      });
      console.log(crumbs);
      return (state.crumbs = crumbs);
    },
    //改变面包屑状态
    crumbsStatus_change(state, val) {
      return (state.crumbsStatus = val);
    },
    set_userInfo(state, res) {
      return (state.userInfo = res);
    },
    set_message(state, res) {
      return (state.message = res);
    },
    update_userInfo(state, res) {
      return (state.updatedata = res);
    },
    update_message(state, res) {
      return (state.updatemessage = res);
    },
    setState(state, payload) {
      state[payload.cType][payload.key] = payload.nKey;
    }
  },
  actions: {
    set_userInfo({ commit }, res) {
      commit("set_userInfo", res.data);
      res.success();
    },
    update_userInfo({ commit }, res) {
      Cookies.set("userInfo", JSON.stringify(res));
      commit("set_userInfo", res);
    },
    update_message({ commit, state }) {
      if (state.userInfo)
        $api.main.messageCount().then(res => {
          commit("update_message", res.data);
        });
    },
    ready_store({ commit }) {
      let userInfoStr = Cookies.get("userInfo");

      try {
        if (userInfoStr) commit("set_userInfo", JSON.parse(userInfoStr));
      } catch (e) {
        commit("set_userInfo", {});
      }
    }
  },
  getters: {
    getUserInfo: state => {
      return state.userInfo;
    }
  }
});
