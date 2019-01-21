import { PREFIX_URL, HOST } from "./axios";
import resourceManagement from "./resourceManagement";
import setInfo from "./setInfo";
import applyGraduation from "./applyGraduation";
import preschoolReview from "./preschoolReview";
import systemMangerment from "./systemMangerment";
import curriculumLearning from "./curriculumLearning";
import examinationReservation from "./examinationReservation";
import testQueries from "./testQueries";
import news from "./news";
import serviceFeedback from "./serviceFeedback";
//模块目录
const api = {
  global: {
    url: PREFIX_URL,
    host: HOST,
    img: HOST
  },
  resourceManagement, //测试
  setInfo, //个人信息
  applyGraduation, //申请答辩
  preschoolReview, //学前预习
  systemMangerment,
  curriculumLearning, //课程
  examinationReservation, //考试预约
  testQueries, //考场查询
  news, //消息
  serviceFeedback //服务反馈
};

export default api;
