import { $ } from "./axios";
import { stringify } from "qs";

export default {
//get_homeCourse: params => $.get("/common/page/mainPage",params),

  getList: params => $.get("/other/exam/list",params),
 
 
};
