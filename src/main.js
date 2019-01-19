import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import config from "../config";
import api from "./api";
import fun from "./public/fun";

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$config = config;
Vue.prototype.$fun = fun;

Vue.use(ElementUI);

let titleNotArr = ["首页"]; //改写统一Title 提示
let crumbsStatusArr = ["首页"]; //不显示面包屑的页面

let routerChangeNum = 0;
router.beforeEach((to, from, next) => {
  let path = to.matched[to.matched.length - 1].path;

  console.log(path);
  // this.$store.dispatch("set_path", to);
  if (!to.meta.title || titleNotArr.indexOf(to.meta.title) > -1) {
    document.title = "华中大自考网络助学平台(测试版)";
  } else {
    document.title = to.meta.title;
  }

  //路由第一次进入
  if (routerChangeNum === 0) {
    console.log(111);
  }

  if (crumbsStatusArr.indexOf(to.meta.title) > -1) {
    store.commit("crumbsStatus_change", false);
  } else {
    store.commit("crumbsStatus_change", true);
  }
  store.commit("crumbs_change", to.matched);
  try {
    store.dispatch("set_userInfo", {
      // data: JSON.parse(userInfo),
      success() {
        next();
      }
    });
  } catch (e) {
    console.log(e);
  }
  store.dispatch("ready_store");
  store.dispatch("update_message");
  // try {
  //   store.dispatch("update_userInfo", {
  //     data: JSON.parse(updatedata),
  //     success() {
  //       next();
  //     }
  //   });
  // } catch (e) {
  //   console.log(e);
  // }
  next();
  routerChangeNum++;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
