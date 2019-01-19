import { $ } from "./axios";

export default {
  //获取作业列表
  getWorkList: params => $.get("student/study/studentTask/list", params),
  //查看课程作业
  getWorkInfo: params =>
    $.get("student/study/studentTask/seeCourseTask", params, { lock: true }),
  //获取习题列表
  getExerciseList: params =>
    $.get("student/study/studentTask/listExercise", params),
  //查看已做完列表
  getEndExerciseList: params =>
    $.get("student/study/studentTask/listStudentExercise", params, {
      lock: true
    })
};
