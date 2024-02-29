"use strict";
const common_vendor = require("../common/vendor.js");
require("../stores/index.js");
const stores_modules_info = require("../stores/modules/info.js");
const baseURL = "http://localhost:8000";
const httpInterceptor = {
  // 拦截前触发
  invoke(options) {
    if (!options.url.startsWith("http")) {
      options.url = baseURL + options.url;
    }
    options.timeout = 1e4;
    options.header = {
      "source-client": "miniapp",
      ...options.header
    };
  }
};
common_vendor.index.addInterceptor("request", httpInterceptor);
common_vendor.index.addInterceptor("uploadFile", httpInterceptor);
const http = (options) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      ...options,
      // 响应成功
      success(result) {
        if (result.data.code === 0) {
          resolve(result.data);
        } else if (result.statusCode === 403) {
          const infoStore = stores_modules_info.useInfoStore();
          infoStore.clearInfo();
          reject(result.data.message);
        } else {
          common_vendor.index.showToast({
            icon: "none",
            title: result.data.message ? result.data.message : "请求错误"
          });
          reject(result.data.message);
        }
      },
      // 响应失败
      fail(err) {
        common_vendor.index.showToast({
          icon: "none",
          title: "网络错误，换个网络试试"
        });
        reject(err);
      }
    });
  });
};
exports.http = http;
