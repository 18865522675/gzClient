import { $ } from "./axios";
// import { stringify } from "querystring";

export default {
  get_info: params => $.get("/myInfo/myInfo", params),
  
    sureSaveUpload: params => $.put("/account/sign/updateSelf", params),
  
  get_listTrans: params => $.get(" /myInfo/listTrans", params),
 

  get_state: params => $.post("api/student/school", params),

  edit_photo: params => $.put("/account/sign/updateSelf", params),

  get_courseList: params => $.post("api/student/coursesresult/query", params),

    // api/student/courses/teachPlan
    get_course: params => $.get("api/student/courses/teachPlan", params),
    // api/student/coursesresult/query2
    get_scoreList: params => $.post("api/student/coursesresult/query2", params),

  get_terms: params => $.post("api/student/terms", params)
  
  
};
