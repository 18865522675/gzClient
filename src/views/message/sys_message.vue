<template>
    <div class="sys-msg-main">
        <div class="sys-msg-headcontent">
            <div class="sys-msg-list-left">
                <img src="../../assets/img/msg_sys_old.png" alt="" class="sys-msg-list-left-img">
            </div>
            <div class="sys-msg-list-right">
                <div class="sys-msg-list-right-fir">
                    <span class="sys-msg-list-right-title">系统消息</span>
                    <span class="sys-msg-list-right-time">{{Time}}</span>
                </div>
                <div class="sys-msg-list-right-coursename">【系统消息】{{title}}</div>
                <div class="sys-msg-list-right-syscontent">服务热线：400888888 服务时间：9:00-22:00</div>
            </div>
        </div>
        <div class="sys-msg-content">
            <p class="sys-msg-content-text">{{content}}</p>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      title: this.$route.params.title,
      content: this.$route.params.content,
      // time:this.$route.params.time,
      Time: ""
    };
  },
  mounted() {
    this.Time = this.$fun.table.time(null, null, this.$route.params.time);
  }
};
</script>

<style lang="less">
.sys-msg-main {
  width: 872px;
  background-color: #fff;
  margin: 90px auto 0;
  border-radius: 10px;
  .sys-msg-headcontent {
    height: 138px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    justify-content: space-between;
    .sys-msg-list-left {
      width: 88px;
      display: flex;
      justify-content: center;
      .sys-msg-list-left-img {
        margin-top: 30px;
        width: 35px;
        height: 35px;
      }
    }
    .sys-msg-list-right {
      width: 784px;
      line-height: 33px;
      font-size: 15px;
      .sys-msg-list-right-fir {
        display: flex;
        justify-content: space-between;
        padding-top: 19px;
        .sys-msg-list-right-title {
          width: 78px;
          color: #989898;
        }
        .sys-msg-list-right-time {
          width: 706px;
          color: #989898;
        }
      }
      .sys-msg-list-right-syscontent {
        color: #989898;
        float: right;
        padding: 10px 20px 0 0;
      }
    }
  }
  .sys-msg-content {
    padding: 75px 0 139px;
    /*margin: 0 auto;*/
    .sys-msg-content-text {
      width: 688px;
      margin: 0 auto;
      line-height: 30px;
    }
  }
}
</style>
