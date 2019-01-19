import { $ } from "./axios";

export default {
  //教师学习记录
  thLearnList: params =>
    $.get("teacher/study/record/list", params, { lock: true }),

  //教师学习记录详情
  thLearnDetail: params =>
    $.get(
      "teacher/study/record/listCourseByStudent/" + params.id,
      {},
      { lock: true }
    )
};
