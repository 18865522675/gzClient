import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import api from "./api";
import fun from "./public/fun";

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$fun = fun;

window.repeatMd5Arr = "";

Vue.use(ElementUI);

let excludeCheckUserPath = ["/login"]; //不验证Token的页面
let titleNotArr = ["首页"]; //改写统一Title 提示
let crumbsStatusArr = ["首页"]; //不显示面包屑的页面
// let userInfo = sessionStorage.getItem("userInfo");
router.beforeResolve((to, from, next) => {
//let Token = sessionStorage.getItem("Token");
//let userInfo = sessionStorage.getItem("userInfo");
//
//if (!to.meta.title || titleNotArr.indexOf(to.meta.title) > -1) {
//  document.title = "课房4.1";
//} else {
//  document.title = to.meta.title;
//}
//
//
//if (excludeCheckUserPath.indexOf(to.fullPath) === -1) {
//  if (!Token) {
//    router.push("/login");
//  } else {
//    try {
//      store.dispatch("set_userInfo", {
//        data: JSON.parse(userInfo),
//        success() {
//          next();
//        }
//      });
//    } catch (e) {
//      console.log(e);
//    }
//    if (crumbsStatusArr.indexOf(to.meta.title) > -1) {
//      store.commit("crumbsStatus_change", false);
//    } else {
//      store.commit("crumbsStatus_change", true);
//    }
//    store.commit("crumbs_change", to.matched);
//    next();
//  }
//} else if (Token) {
//  router.push("/home");
//} else {
//  next();
//}
	next()
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
