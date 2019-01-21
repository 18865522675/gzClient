import { $ } from "./axios";
// import { stringify } from "postcss";
export default {
  // // 申请毕设
  // apply_graduation: params =>
  //   $.post("paperManagement/4/createStudentPaperAPP", params),
  // // 重新申请毕设
  // again_applyGraduation: params =>
  //   $.post("paperManagement/4/updateStudentPaperAPP", params),
  // //查询申请结果查询
  // gru_apply: params => $.get("schoolManagement/4/PaperStatusAPP", params),
  // // 导师列表
  // teacher_list: params => $.get("schoolManagement/1/papersAPP", params),
  // //导师列表下的单选题
  // teacher_Topic: params => $.get("paperManagement/1/getPaperTopicsAPP", params),
  // //提交选题
  // Topic_submit: params =>
  //   $.post("paperManagement/2/createStudentTopicAPP", params),
  // //重新选题
  // Topic_again_submit: params =>
  //   $.post("paperManagement/2/updateStudentTopicAPP", params),

  // // 查看选题通过情况
  // Topic_pass: params =>
  //   $.get("schoolManagement/2/StudentTopicPaperAPP", params),
  // //开题上传结果查询
  // start_pass: params =>
  //   $.get("schoolManagement/3/StudentDissertationProposalAPP", params),
  // //论文上传成功与否的状态
  // topic_succ: params => $.get("schoolManagement/4/PaperStatusAPP", params),
  // //申请答辩
  // apply_answer: params =>
  //   $.post("paperManagement/6/applyDefenseResultAPP", params),
  // // 查询答辩成绩
  // answer_res: params =>
  //   $.get("schoolManagement/5/queryDefenseResultAPP", params),
  // //申请学位
  // apply_deg: params => $.post("paperManagement/3/applyDegree", params),
  // // 查询学位申请结果
  // deg_result: params => $.get("paperManagement/3/Degrees", params),
  // // 查询当前进度
  // qurey_progress: params => $.get("schoolManagement/5/getStatusAPP", params)
  //提交申请
  apply_step: params =>
    $.post("api/student/paper/step/commit", params, { dataType: "formData" }),
  //总状态查询
  qurey_progress: params => $.get("api/student/paper/step", params),
  //论文导师列表
  teacher_list: params => $.get("api/student/paper/searchPaperTeacher", params),
  //论文课题列表
  teacher_Topic: params => $.get("api/student/paper/searchPaperTopicForPC", params),
  //历史记录
  history: params => $.get("api/student/paper/history", params),
  //步骤信息
  itemIfo: params => $.get("api/student/paper/step/info", params),
  //表格下载
  download_list:params => $.get("/api/student/paper/download",params),
  //表格列表
  table_list:params =>  $.get("/api/student/paper/form/list",params),
};
