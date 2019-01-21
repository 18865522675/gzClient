<template>
  <div id="app" class="g-app">
    <router-view/>
  </div>
</template>

<script>
import "./assets/css/style.less";
import "./assets/css/reset.less";
import "./assets/css/media.less";
import "element-ui/lib/theme-chalk/index.css";

export default {
  name: "app",
  components: {},
  mounted() {
    this.$router.beforeResolve((to, from, next) => {
      document.title = to.meta.title;
      next();
    });
  }
};
</script>
