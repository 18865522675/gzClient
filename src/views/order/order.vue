<template>
  <div class="od-main">
    <div class="sr-header">
      <div class="sr-hd-body">
        <router-link to="" class="sr-hd-item on">全部</router-link>
        <router-link to="" class="sr-hd-item">成功订单</router-link>
        <router-link to="" class="sr-hd-item">已取消订单</router-link>
      </div>
    </div>
    <div class="od-tit">
      <div class="od-tit-item od-tit-item1">课程信息</div>
      <div class="od-tit-item od-tit-item2">单价（元）</div>
      <div class="od-tit-item od-tit-item3">实付款（元）</div>
      <div class="od-tit-item od-tit-item4">订单状态</div>
      <div class="od-tit-item od-tit-item5">操作</div>
    </div>
    <div class="od-con">
      <div class="od-con-item">
        <div class="od-item-tit">
          <div class="od-item-code">订单编号: 37390542165</div>
          <div class="od-item-time">下单时间: 2018-04-11 19:11:47 </div>
        </div>
        <div class="od-item-con">
          <div class="od-item-logo"></div>
          <div class="od-item-des">
            <div class="od-des-tit">中国近现代史纲要</div>
            <div class="od-des-code">课程编码  1512210973</div>
            <div class="od-des-type">直播-课程测评</div>
          </div>
          <div class="od-item-price1 od-text-center">￥98.00</div>
          <div class="od-item-price2 od-text-center">￥98.00</div>
          <div class="od-item-status od-text-center">状态：已取消</div>
          <div class="od-item-group">
            <div class="od-item-btn od-item-btn1" @click="delorder">删除订单</div>
            <div class="od-item-btn od-item-btn2">再次购买</div>
          </div>
        </div>
    </div>
      <div class="od-con-item">
        <div class="od-item-tit">
          <div class="od-item-code">订单编号: 37390542165</div>
          <div class="od-item-time">下单时间: 2018-04-11 19:11:47 </div>
        </div>
        <div class="od-item-con">
          <div class="od-item-logo"></div>
          <div class="od-item-des">
            <div class="od-des-tit">中国近现代史纲要</div>
            <div class="od-des-code">课程编码  1512210973</div>
            <div class="od-des-type">直播-课程测评</div>
          </div>
          <div class="od-item-price1 od-text-center">￥98.00</div>
          <div class="od-item-price2 od-text-center">￥98.00</div>
          <div class="od-item-status od-text-center">状态：已取消</div>
          <div class="od-item-group">
            <div class="od-item-btn od-item-btn1" @click="delorder">删除订单</div>
            <div class="od-item-btn od-item-btn2">再次购买</div>
          </div>
        </div>
      </div>
  </div>
    <div class="od-del" v-if="btnVisible">
      <div class="od-del-tit"></div>
      <div class="od-del-text"><p>你确定要永久删除订单吗？</p><p>永久删除后，订单将无法恢复，请谨慎操作</p></div>
      <div class="od-del-btns">
        <div class="od-del-btn od-del-btn1"  @click="visibleFun">确定</div>
        <div class="od-del-btn od-del-btn2" @click="visibleFun">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/css/order.less";
export default {
  data() {
    return {
      btnVisible: false
    };
  },
  methods: {
    visibleFun() {
      this.btnVisible = false;
    },
    delorder() {
      this.btnVisible = true;
    }
  }
};
</script>

<style scoped>
</style>
