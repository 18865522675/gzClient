import { PREFIX_URL, HOST } from "./axios";

import main from "./main";
import courseLive from "./courseLive";
import selfInfo from "./selfInfo";
import message from "./message";
import sever from "./sever";
import search from "./search";
import commonCourse from "./commonCourse";
import learnRecord from "./learnRecord";
import applyTest from "./applyTest";
import examRead from "./examRead";
import tutoring from "./tutoring";

//模块目录
const api = {
  global: {
    url: PREFIX_URL,
    host: HOST,
    img: HOST
  },
  main,
  courseLive,
  selfInfo,
  message,
  sever,
  search,
  commonCourse,
  learnRecord,
  applyTest,
  examRead,
  tutoring
};

export default api;
