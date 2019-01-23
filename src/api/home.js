import { $ } from "./axios";
import { stringify } from "qs";

export default {
//get_homeCourse: params => $.get("/common/page/mainPage",params),

  get_homeNotice: params => $.get("/common/page/mainPage",params),
  
  
  get_noticeList: params => $.get("/common/page/listNotice",params),
 
};
