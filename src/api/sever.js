import { $ } from "./axios";

export default {
  //反馈
  sever: params => $.post("/common/message/feedback", params)
};
