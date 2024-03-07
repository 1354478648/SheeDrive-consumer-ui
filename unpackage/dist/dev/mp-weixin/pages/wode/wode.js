"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const stores_modules_info = require("../../stores/modules/info.js");
const _sfc_main = {
  __name: "wode",
  setup(__props) {
    const infoStore = stores_modules_info.useInfoStore();
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    const havaOrderData = common_vendor.ref(false);
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: common_vendor.unref(infoStore).info
      }, common_vendor.unref(infoStore).info ? {
        b: common_vendor.unref(infoStore).info.avatar ? common_vendor.unref(infoStore).info.avatar : "@/static/default_avatar.jpg",
        c: common_vendor.t(common_vendor.unref(infoStore).info.lastName + common_vendor.unref(infoStore).info.firstName)
      } : {
        d: common_assets._imports_0
      }, {
        e: ((_a = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _a.top) + "px",
        f: !havaOrderData.value
      }, !havaOrderData.value ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/wode/wode.vue"]]);
wx.createPage(MiniProgramPage);
