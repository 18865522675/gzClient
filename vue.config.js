module.exports = {
  baseUrl:
    process.env.NODE_ENV === "production"
      ? "/" //生产
      : "/" //开发
  // devServer: {
  //   proxy: {
  //     "autoditacte/": {
  //       target: "http://61.153.184.193:8083/"
  //     }
  //   }
  // }
};
