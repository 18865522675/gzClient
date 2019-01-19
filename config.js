const HOST_IND = 2, // 切换服务器
  HOST = [
    "", // 正式服务器
    "http://61.153.184.193:8084/", // 测试服务器
    // "http://1920.168.1.26/"
    "/" // 其它测试
  ],
  HOST_CATALOG_API = "client-api/", // api目录
  HOST_CATALOG_IMG = "client-api/"; // 图片资源目录

if (HOST_IND !== 0) {
  console.log(
    "%c当前HOST在测试环境：" + HOST[HOST_IND],
    "background: #000;color:#ffff00;padding: 2px"
  );
}

export default {
  HOST: HOST[HOST_IND],
  HOST_API: HOST[HOST_IND] + HOST_CATALOG_API,
  HOST_IMG: HOST[HOST_IND] + HOST_CATALOG_IMG
};
