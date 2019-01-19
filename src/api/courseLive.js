import { $ } from "./axios";

export default {
  //增加评论
  addComment: params => $.get("common/live/courseLive/comment", params),
  //直播日志
  liveLog: params => $.get("common/live/courseLive/comment/{id}", params),
  //课程列表
  courseList: params =>
    $.get("common/live/courseLive/courseList", params, { lock: true }),
  //目录
  directory: params =>
    $.get("common/live/courseLive/details/list/" + params.id),
  //课程详情
  detail: params =>
    $.get("common/live/courseLive/details/" + params.id, { lock: true }),
  //直播列表
  list: params => $.get("common/live/courseLive/list", params),
  //专业列表
  majorList: params => $.get("common/live/courseLive/majorList", params),
  //回放列表
  playback: params => $.get("common/live/courseLive/playback/" + params.id),
  //直播
  courseLive: params =>
    $.get("common/live/courseLive/" + params.id, {}, { lock: true }),
  //加入课程
  addCourse: params =>
    $.post("student/study/studentCourse", params, { lock: true }),
  //取消课程
  cancelCourse: params =>
    $.delete("student/study/studentCourse", params, { lock: true }),
  //进入课程
  enterCourse: params =>
    $.post("student/study/studentCourse/enter", params, { lock: true })
};
