import { $ } from "./axios";

export default {
  //搜索结果
  listBykeyWord: params =>
    $.get("common/resource/course/listByKeyword", params, { lock: true }),
  detail: params =>
    $.get("/common/resource/course/details/" + params.id, {}, { lock: true }),

  thDetail: params =>
    $.get(
      "/teacher/study/studentCourse/details/" + params.id,
      {},
      { lock: true }
    ),

  listByMajor: params => $.get("common/resource/course/listByMajor", params),
  majorList: params => $.get("common/resource/major/list", params)
};
