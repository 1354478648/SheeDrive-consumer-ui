"use strict";
const common_vendor = require("../common/vendor.js");
common_vendor.defineStore(
  "wode",
  () => {
    common_vendor.ref();
    const clearProfile = () => {
      profile.value = void 0;
    };
    return {
      profile,
      setProfile,
      clearProfile
    };
  },
  // TODO: 持久化
  {
    persist: true
  }
);
