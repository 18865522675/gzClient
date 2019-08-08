import { $ } from "./axios";
// import { stringify } from "querystring";

export default {
  getNoticeUrl: params => $.get("/other/adviceNote/myNote", params) //考场查询
};
