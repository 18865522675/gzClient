import { $ } from "./axios";
// import { stringify } from "querystring";

export default {
  getStepInfo: params => $.get("/thesis/stepInfo", params), //毕业设计信息
  
  getTeacherList: params => $.get("/thesis/teacher/list", params), //导师列表
  
//根据老师获取选题方向
  getDirectionById: params => $.get("/thesis/teacher/listTopic/"+params, {}), //导师列表
  
  addDirection: params => $.post("/thesis/topic/choose/"+params.topicId, params), //添加选题
  
  designApply: params => $.post("/thesis/apply", params), //添加选题
};
