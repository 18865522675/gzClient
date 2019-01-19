<template>
  <div class="td-main">
    <div class="td-left">
      <div class="td-img" :style="{backgroundImage: 'url(\''+(info.coverUrl?info.coverUrl:require('../../assets/img/course_cover.png'))+'\')'}"></div>
      <div class="td-book-name">{{info.name}}</div>
      <div class="td-book-code">课程编码:{{info.code}}</div>
    </div>
    <div class="td-right" v-show="info.tasks.length ===0">
      <div class="data-null">暂无内容</div>
    </div>
    <div class="td-right" v-show="info.tasks">
      <div class="td-item" v-for="(item,index) in info.tasks" :key="index">
        <div class="td-item-tit">{{item.name }}</div>
        <div class="td-item-btn" @click="goExerciseDetail(item.id)">{{item.id === null?"未完成":"前往查看"}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/css/tutoring.less";
export default {
  data() {
    return {
      courseId: this.$route.params.id,
      info: {}
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      console.log(this.courseId);
      let param = { courseId: this.courseId };
      this.$api.tutoring.getWorkInfo(param).then(res => {
        this.info = res.data;
      });
    },
    goExerciseDetail(taskId) {
      if (taskId === null) {
        this.$message({
          message: "该作业暂未完成",
          type: "warning"
        });
        return;
      }
      this.$router.push(`/tutoring/tutoring_view/${taskId}`);
    }
  }
};
</script>

<style scoped>
</style>
