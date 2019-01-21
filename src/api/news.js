import { $ } from "./axios";
// import { stringify } from "querystring";

export default {
  get_news: params => $.get("api/student/all/msg/querys", params), //全部消息

  get_sys: params => $.post("api/student/notice/query", params), //系统消息

  get_sys_detail: params => $.post("api/student/notice/detail", params), //系统消息详情

  get_sys_del: params => $.post("api/student/notice/delete", params), //系统消息删除

  get_reply: params => $.post("api/student/answer/web/querys", params), //留言回复

  get_reply_del: params => $.post("api/student/answer/delete", params), //留言回复删除

  get_reply_update: params => $.post("api/student/answer/web/update", params) //留言回复更新
};
