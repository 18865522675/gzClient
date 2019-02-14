import { $ } from "./axios";
import { stringify } from "qs";

export default {
//get_homeCourse: params => $.get("/common/page/mainPage",params),

  get_homeNotice: params => $.get("/common/page/mainPage",params),
  
  
  get_noticeList: params => $.get("/common/page/listNotice",params),
  
   get_MesList: params => $.get("/common/page/listMessage",params),
  
  get_noticeDetail: params => $.get("/common/page/"+params+"/details",params),
  
  get_noticeStationDetail: params => $.post("/common/page/read/"+params,{}),
  
  
 
};
