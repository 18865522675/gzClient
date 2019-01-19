import { $ } from "./axios";

export default {
  //课程列表
  courseList: params => $.get("student/study/studentCourse/list", params),
  //申请测评（有助学资格）
  applytestOK: params =>
    $.post("student/assessment/apply", params, { lock: true }),
  //获取助学机构
  station: params => $.get("student/assessment/listSimpleStation", params),
  //申请测评（无助学资格）
  applytestNo: params =>
    $.post("student/assessment/studyRight", params, { lock: true }),
  //测评结果
  applyResult: params => $.get("student/assessment/result", params),
  //成绩查询
  applyDetail: params =>
    $.get("student/assessment/detail/" + params.assessmentId)
};
