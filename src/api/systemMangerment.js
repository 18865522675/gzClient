import { $ } from "./axios";
import { stringify } from "qs";

export default {
  get_login: params => $.post("account/sign/signIn",params),

  get_loginOut: params => $.post("sys/admin/logout", params),

  get_bgimg: params => $.get("sys/admin/pcLogo", params), //获取登录背景图
};
