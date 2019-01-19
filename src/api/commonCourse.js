import { $ } from "./axios";

export default {
  //课程目录课件
  Ware: params => $.post("student/study/studentCourseWare/play/" + params.id),
  //退出观看记录课件播放时间
  quit: params => $.post("student/study/studentCourseWare/quit/" + params.id),
  // 学生笔记
  //提交笔记
  postNote: params =>
    $.post("student/study/studentNote", params, { lock: true }),
  //获取笔记列表
  getNote: params => $.get("student/study/studentNote/list", params),
  //删除笔记
  deleteNote: params =>
    $.post("student/study/studentNote/" + params.id, { lock: true }),
  //获取课程列表
  getCourseList: params =>
    $.get("student/study/studentCourse/list", params, { lock: true }),

  //教师获取课程查阅列表
  getThCourseList: params =>
    $.get("teacher/study/studentCourse/list", params, { lock: true }),
  //添加留言
  addQuiz: params =>
    $.post("student/study/studentQuiz", params, { lock: true }),
  //留言列表
  quizList: params => $.get("student/study/studentQuiz/list", params),
  //删除留言
  deleteQuiz: params => $.delete("student/study/studentQuiz/" + params.id),
  //教师留言列表
  teaQuizList: params => $.get("teacher/study/studentQuiz/list", params),
  //新增教师留言
  addAnswer: params =>
    $.put("teacher/study/studentQuiz/answer/" + params.id, params, {
      lock: true
    }),
  //教师看到的学生笔记列表
  teaNoteList: params =>
    $.get("teacher/study/studentNote/list", params, { lock: true }),
  //教师笔记学生列表
  studentList: params => $.get("teacher/study/studentNote/studentList", params),
  //教师看到的学生笔记详情
  teanoteDetail: params =>
    $.get("teacher/study/studentNote/details/" + params.id),

  //教师习题获取学生列表
  getThProList: params =>
    $.get("teacher/study/studentTask/studentList", params, { lock: true }),

  //教师习题获取学生作业列表
  getThProExeList: params =>
    $.get("teacher/study/studentTask/list", params, { lock: true }),

  //教师获取学生已完成习题列表
  proThDetail: params =>
    $.get("teacher/study/studentTask/details/" + params.id, {}, { lock: true }),

  //学生习题列表
  getStuProList: params => $.get("student/study/studentTask/list", params),

  //学生作业已完成题目
  getStuProFinishList: params =>
    $.get("student/study/studentTask/listStudentExercise", params),

  //学生作业未完成题目
  getStuProReadyList: params =>
    $.get("student/study/studentTask/listExercise", params, { lock: true }),
  //学生作业未完成题目--提交
  getStuProReadyList_commitTask: params =>
    $.post("student/study/studentTask/commitTask", params, { lock: true }),

  //学生课件目录
  getStuWareList: params =>
    $.get("/student/study/studentCourseWare/list", params),

  //老师课件目录
  getThWareList: params => $.get("/teacher/study/ware/list", params),

  //老师课件目录
  getCourseDetail: params =>
    $.get("/common/resource/course/details/" + params, {}),

  //学生视频退出记录
  stuWareQuit: (id, params) =>
    $.post("/student/study/studentCourseWare/quit/" + id, params),

  //学生五分钟记录一次
  stuRecordTime: params =>
    $.post("/student/study/studentCourseWare/play/" + params, {})
};
