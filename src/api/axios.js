import axios from "axios";
import { stringify } from "qs";
import md5 from "md5";
import { Message } from "element-ui";
import router from "../router";

// 正式
// const HOST = "http://61.153.184.193:8085/";

// 测试
// const HOST = "http://61.153.184.193:8081/";
// const HOST = "http://192	.168.1.25:8080/";

//let HOST = "http://47.107.105.141:82/";


//const PREFIX_URL = HOST + "client-api/";


let HOST="";
let PREFIX_URL=""

if(window.location.href.indexOf("localhost")<0){	
//		正式
	  HOST="http://"+window.location.host.split(":")[0]+":82"
	 PREFIX_URL="http://"+window.location.host.split(":")[0]+":82/client-api/";	

//	 测
//		HOST="http://47.107.105.141:89"	
//	 PREFIX_URL="http://47.107.105.141:89/client-api/"
}else{	
	
//	正式
//		HOST="http://hlh.gzsqwhcm.com:82"
//	 PREFIX_URL="http://hlh.gzsqwhcm.com:82/client-api/"

	 
//	 测试
	 HOST="http://47.107.105.141:89"
	 PREFIX_URL="http://47.107.105.141:89/client-api/"

}

let ajax_main = (resolve, reject, obj) => {
  let notBodyMethod = ["get"];
  let configObj = {
    method: obj.method,
    withCredentials: true,
    url: PREFIX_URL + obj.url
  };

  if (!obj.params) obj.params = {};

  if (obj.checkUser !== false) {
    //判断是否登录
    let Token = sessionStorage.getItem("Token");

    if (Token) {
      configObj.headers = {
        Token: Token
      };
    } else {
      router.push("/login");
    }
  }

  //重复提交验证
  if (obj.repeat) {
    let dataMd5 = obj.url + md5(JSON.stringify(obj.params));

    if (window.repeatMd5Arr === dataMd5) {
      Message.error("不允许重复提交");
      return;
    } else {
      window.repeatMd5Arr = dataMd5;
    }
  }

  //分类序列化参数
  if (notBodyMethod.indexOf(configObj.method) > -1) {
    configObj.url = configObj.url + "?" + stringify(obj.params);
  } else {
    if (obj.dataType !== "json") {
      configObj["transformRequest"] = params => {
        return stringify(params);
      };
    }
    configObj["data"] = obj.params;
  }

  axios(configObj)
    .then(res => {
      if (res.status === 200) {
        if (res.data.code === 0) {
          resolve(res.data);
        } else if (res.data.code === 5001) {
          Message.error(res.data.msg);
//        sessionStorage.removeItem("Token");
//        router.app.$router.push("/login");
        } else {
          Message.error(res.data.msg);
          reject(res.data);
        }
      } else {
        Message.error(res.statusText + " " + res.status);
        reject(res);
      }
    })
    .catch(err => {
      Message.error(err.response.statusText + " " + err.response.status);
      reject(err);
    });
};

let $ = {
  get: (url, params, config) => {
    let obj = {
      url,
      params,
      method: "get",
      ...config
    };
    return new Promise((resolve, reject) => ajax_main(resolve, reject, obj));
  },
  post: (url, params, config) => {
    let obj = {
      url,
      params,
      method: "post",
      ...config
    };
    return new Promise((resolve, reject) => ajax_main(resolve, reject, obj));
  },
  put: (url, params, config) => {
    let obj = {
      url,
      params,
      method: "put",
      ...config
    };
    return new Promise((resolve, reject) => ajax_main(resolve, reject, obj));
  },
   delete: (url, params, config) => {
    let obj = {
      url,
      params,
      method: "delete",
      ...config
    };
    return new Promise((resolve, reject) => ajax_main(resolve, reject, obj));
  }
};

export { $, PREFIX_URL, HOST };
