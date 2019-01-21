import { $ } from "./axios";

export default {
  get_list: params => $.post("resource/warecourse/course/query", params)
};
