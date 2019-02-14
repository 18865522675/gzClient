import { $ } from "./axios";
import { stringify } from "qs";

export default {
//get_homeCourse: params => $.get("/common/page/mainPage",params),

  get_courseScore: params => $.get("/other/plan/list",params),
 
 
};
