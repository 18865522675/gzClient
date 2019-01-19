<template>
    <div class="protocol-main">
        <div class="protocol-title">用户协议</div>
        <div class="protocol-btn" @click="protocolBack(2)">已阅读</div>
    </div>
</template>

<script>
  export default {
    methods:{
      protocolBack(type){
        this.$router.push(`/login?loginType=${type}`);
      }
    }
  }
</script>

<style lang="less">
    .protocol-main{
        width: 1200px;
        margin: 0 auto;
    }
    .protocol-title{
        text-align: center;
        padding: 20px;
        font-size: 22px;
    }
    .protocol-btn{
        margin: 20px auto;
        width: 100px;
        padding: 20px 20px;
        text-align: center;
        background-color: #ffba4e;
        border-radius: 10px;
        cursor: pointer;
    }

</style>