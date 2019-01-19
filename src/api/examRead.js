import { $ } from "./axios";

export default {
  //测评查阅列表
  examReadList: params =>
    $.get("teacher/assessment/studentAssessment/list", params, { lock: true }),

  //教师测评查阅详情
  examReadDetail: params =>
    $.get(
      "teacher/assessment/studentAssessment/list/" + params.id,
      {},
      { lock: true }
    ),

  //教师测评查阅名字
  examReadName: params =>
    $.get("/teacher/assessment/studentAssessment/details", params, {
      lock: true
    }),

  //教师测评查阅学生详情
  examReadNameDetail: params =>
    $.get("/teacher/assessment/studentAssessment/details/" + params.id, {})
};
