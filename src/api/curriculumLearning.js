import { $ } from "./axios";
// import { stringify } from "querystring";

/*
课程学习
 */
export default {
  //我的课程
  get_course: params => $.get("/course/list", params),
////我的学期
//get_item: params => $.post("api/student/terms", params),
//
//课件列表
get_courseware_list: params => $.get("/course/listWare/"+params, {}),
//问答列表
get_courseask_list: params => $.get("/course/listAQ/"+params, {}),
//笔记列表
get_coursenote_list: params => $.get("/course/listNote/"+params, {}),
////保存播放时间
//savePlayTime: params => $.post("api/student/watch/save", params),
//
////书籍列表
//get_book_list: params => $.post("api/student/book/querys", params),
//
////获取作业列表
//get_task_list: params => $.post("api/student/works/querys", params),
////获取作业详情
//get_task_info: params => $.post("api/student/exercise/querys", params),
////保存作业
//save_task: (res, params) =>
//  $.post("api/student/exercise/save?studentId=" + res, params, {
//    dataType: "json"
//  }),
//
////获取留言列表
//get_leaMsg_list: params => $.post("api/student/question/querys", params),
////留言
//leaving_message: params => $.post("api/student/question/save", params),
////删除留言
//leaving_del: params => $.post("api/student/delete/question", params),
////删除留言回复
//leavingAnswerDel: params => $.post("api/student/answer/delete", params),
////留言点赞
//leaving_like: params => $.post("api/student/save/liked", params),
////留言回复
//leaving_answer: params => $.post("api/student/answer/save", params),
////查看回复
//get_answer: params => $.post("api/student/answer/querys", params),
////回复点赞
//leaving_answer_like: params => $.post("api/student/answer/liked", params),
//
////获取评价列表
//get_stars_list: params => $.post("api/student/stars/query", params),
////提交评价
//stars_save: params => $.post("api/student/stars/save", params)
};
