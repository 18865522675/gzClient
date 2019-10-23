import { $ } from "./axios";
// import { stringify } from "querystring";

/*
课程学习
 */
export default {
  //我的课程
  get_course: params => $.get("/course/list", params),
  
  getCredit: params => $.get("/course/getCredit", params),
////我的学期
//get_item: params => $.post("api/student/terms", params),
//
//课件列表
get_courseware_list: params => $.get("/course/listWare/"+params, {}),
//打开课件家一次分数
add_ware_point: (id,params) => $.post("/course/startStudy/"+id, params),

//记录可见时间
save_wareTime: (id,params) => $.post("/course/studyWare/"+id,params),
//问答列表
get_courseask_list: params => $.get("/course/listAQ/"+params, {}),
//笔记列表
get_coursenote_list: params => $.get("/course/listNote/"+params, {}),
////保存播放时间
//savePlayTime: params => $.post("api/student/watch/save", params),
//
////书籍列表
get_book_list: params => $.get("/course/listBook/"+params, {}),
//
////获取作业列表
get_task_list: params => $.get("course/work/"+params+"/listWork", {}),

////获取作业列表
commitTask: params => $.get("course/work/"+params+"/commitWork", {}),

get_task_info: params => $.get("course/work/"+params+"/listExercise", {}),

get_exam_info: params => $.get("/other/online/"+params+"/listExercise", {}),

get_task_finishInfo: params => $.get("course/work/"+params+"/listFinishedExercise", {}),


////主题讨论
get_discuss_list: params => $.get("/course/note/listDiscuss/"+params, {}),

get_discuss_content: (id,params) => $.get("/course/note/listContent/"+id, params),

add_discuss: params => $.post("/course/note/saveContent", params),

del_discuss: params => $.delete("/course/note/removeContent/"+params, {}),


//问答
get_qa_list: (id,params) => $.get("/course/qa/list/"+id, params),


add_qa: params => $.post("/course/qa/save", params),

edit_qa: (id,params) => $.put("/course/qa/update/"+id, params),

del_qa: (id) => $.put("/course/qa/remove/"+id,{}),

save_task:(workId,params) => $.post("/course/work/"+workId+"/commitWork", params),

save_exam:(taskId,params) => $.post("/other/online/"+taskId+"/commit", params),


//考试
get_exam_list: (params) => $.get("/other/online/listExams/"+params, {}),


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
