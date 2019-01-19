module.exports = {
  baseUrl: "/",
  devServer: {
    proxy: {
      "client-api/": {
        target: "http://61.153.184.193:8084/"
      }
    }
  }
};
