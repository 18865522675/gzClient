import { $ } from "./axios";

export default {
  //系统消息
  list: params => $.get("/common/message/notice/list", params),

  //读消息
  read: params =>
    $.put("/common/message/notice/read/" + params.id, {}, { lock: true }),

  //删除消息
  delete: params =>
    $.delete("/common/message/notice/" + params.id, {}, { lock: true })
};
