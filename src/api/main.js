import { $ } from "./axios";

export default {
  //登录
  login: params => $.post("common/account/sign/signIn", params, { lock: true }),
  signUp: params =>
    $.post("common/account/sign/signUp", params, { lock: true }), //注册
  verify: params => $.post("common/account/sign/verify", params), //短信验证码
  forgetPassword: params =>
    $.put("common/account/sign/forgetPassword", params, { lock: true }), //修改密码
  ceshi: params => $.get("common/page/mainpage", params, { lock: true }), //home
  signOut: params =>
    $.post("common/account/sign/signOut", params, { lock: true }), //退出
  messageCount: params =>
    $.get("common/account/sign/messageCount", params, { lock: true }), //消息数
  changePhone: params => $.post("common/account/sign/changePhone", params), //新验证码修改手机号
  cardId: params => $.post("common/account/sign/updatePhone", params), //身份证号转手机号
};
