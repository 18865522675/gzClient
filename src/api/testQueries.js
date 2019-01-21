import { $ } from "./axios";
// import { stringify } from "querystring";

export default {
  get_exam: params => $.post("api/student/exam/querys", params) //考场查询
};
