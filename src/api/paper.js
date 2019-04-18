import { $ } from "./axios";
// import { stringify } from "querystring";

export default {
  getStepInfo: params => $.get("/thesis/stepInfo", params), //毕业设计信息
  
  getTeacherList: params => $.get("/thesis/teacher/list", params), //导师列表
};
