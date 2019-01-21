import { $ } from "./axios";
// import { stringify } from "querystring";

export default {
  get_preList: params => $.post("api/student/pertutaor/course/querys", params), //入学复习
  //获取入学复习课件列表
  get_pertutaor_ware_list: params =>
    $.post("api/student/pertutaor/ware/querys", params),
  //获取入学复习文档列表
  get_pertutaor_book_list: params =>
    $.post("api/student/pertutaor/doc/querys", params),
  //保存时间
  saveTime: params => $.post("api/student/pertutaor/ware/save", params)
};
