import { $ } from "./axios";
// import { stringify } from "querystring";

export default {
  get_feed_back: params => $.get("api/student/feed/back/save", params), //意见反馈

  get_edit: params => $.post("api/student/exam/save", params) //考试预约
};
