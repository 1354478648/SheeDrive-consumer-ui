"use strict";
const common_vendor = require("../../common/vendor.js");
const useInfoStore = common_vendor.defineStore(
  "info",
  () => {
    const info = common_vendor.ref();
    const setInfo = (newInfo) => {
      info.value = newInfo;
    };
    const removeInfo = () => {
      info.value = null;
    };
    return {
      info,
      setInfo,
      removeInfo
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
exports.useInfoStore = useInfoStore;
