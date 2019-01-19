<template>
    <div id="app" class="g-app bg_g">
        <router-view/>
    </div>
</template>

<script>
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/reset.less";
import "./assets/css/style.less";
import "./assets/css/media.less";

export default {
  name: "app",
  components: {}
};
</script>
