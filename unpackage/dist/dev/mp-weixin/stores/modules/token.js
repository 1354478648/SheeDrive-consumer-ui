"use strict";
const common_vendor = require("../../common/vendor.js");
const useTokenStore = common_vendor.defineStore(
  "token",
  () => {
    const token = common_vendor.ref("");
    const setToken = (newToken) => {
      token.value = newToken;
    };
    const removeToken = () => {
      token.value = "";
    };
    return {
      token,
      setToken,
      removeToken
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
exports.useTokenStore = useTokenStore;
