<template>
  <div class="g-module">
    <div class="kf-head">
      <div class="kf-head-cap">
        <b>我的消息</b>
        <small>MESSAGES</small>
      </div>
    </div>
     <ul class="systemNews">
       <li>
         <p>【系统消息】{{sysContent.name}}</p>
         <p>发送于{{time}}</p>
         <p>
           {{sysContent.content}}
         </p>
       </li>
       <p class="serve">服务热线：400888888   服务时间：9:00-22:30</p>
     </ul>
  </div>
  
</template>

<script>
import "../../assets/css/system/systemNews.less";
export default {
  data() {
    return {
      activeName2: "first",
      dialogAddVisible: false,
      sysContent: "",
      time: ""
    };
  },
  components: {},
  mounted() {
    this.get_List();
  },
  methods: {
    get_List() {
      this.$api.news
        .get_sys_detail({
          id: this.$route.params.id,
          type: this.$route.params.type
        })
        .then(res => {
          console.log(res.data);
          this.sysContent = res.data;
          this.time = this.$fun.table.time(
            null,
            null,
            this.sysContent.createTime
          );
          // this.news = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    show() {
      this.dialogAddVisible = true;
    }
  }
};
</script>
<style lang="less" scoped>
.nav {
  margin-top: 40px;
}
</style>
