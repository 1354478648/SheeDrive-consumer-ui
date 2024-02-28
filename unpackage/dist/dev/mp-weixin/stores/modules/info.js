"use strict";
const common_vendor = require("../../common/vendor.js");
common_vendor.defineStore(
  "wode",
  () => {
    const info = common_vendor.ref();
    const setInfo = (newInfo) => {
      info.value = newInfo;
    };
    const clearInfo = () => {
      info.value = {};
    };
    return {
      info,
      setInfo,
      clearInfo
    };
  },
  {
    // 配置持久化
    persist: {
      // 设置兼容多端的API
      storage: {
        setItem(key, value) {
          common_vendor.index.setStorageSync(key, value);
        },
        getItem(key) {
          return common_vendor.index.getStorageSync(key);
        }
      }
    }
  }
);
