import { $ } from "./axios";
// import { stringify } from "querystring";

export default {
  get_examcourse: params => $.post("api/student/examcourse/querys", params), //考试预约列表

  get_edit: params => $.post("api/student/exam/save", params), //考试预约

  get_examRoom:params => $.post("api/student/exam/querys",params) //考场查询
};
