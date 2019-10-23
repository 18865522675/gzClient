import { $ } from "./axios";
import { stringify } from "qs";

export default {
//get_homeCourse: params => $.get("/common/page/mainPage",params),

  getList: params => $.get("/other/exam/list",params),
  
  get_task_info: params => $.get("/other/online/"+params+"/listExercise",{}),
  
  doanloadZZK: params => $.get("/other/exam/loadExamCard",params),
 
 
};
