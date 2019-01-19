import { $ } from "./axios";

export default {
  //登录
  login: params => $.post("common/account/sign/signIn", params, { lock: true })
};
