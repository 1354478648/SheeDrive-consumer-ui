"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "orderSuccess",
  setup(__props) {
    const orderId = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      orderId.value = options.orderId;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "hand-up",
          size: "32"
        }),
        b: `/pagesOrder/detail/detail`,
        c: common_vendor.o((...args) => _ctx.onScrolltolower && _ctx.onScrolltolower(...args))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/orderSuccess/orderSuccess.vue"]]);
wx.createPage(MiniProgramPage);
