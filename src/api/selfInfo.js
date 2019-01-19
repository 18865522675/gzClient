import { $ } from "./axios";

export default {
  //修改资料
  selfInfo: params =>
    $.put("common/account/sign/updateSelf", params, { lock: true }),

  password: params => $.put("common/account/sign/updatePassword", params),
  changePhone: params =>
    $.post("common/account/sign/changePhoneByOldVerify", params) //新验证码修改手机号
};
