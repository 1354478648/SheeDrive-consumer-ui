"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_XtxSwiper = common_vendor.resolveComponent("XtxSwiper");
  (_easycom_uni_icons2 + _component_XtxSwiper)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "category",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "search",
          size: "15",
          color: "#323232"
        }),
        b: common_vendor.f(10, (item, index, i0) => {
          return {
            a: item,
            b: index === 0 ? 1 : ""
          };
        }),
        c: common_vendor.p({
          list: []
        }),
        d: common_vendor.f(3, (item, k0, i0) => {
          return {
            a: common_vendor.f(4, (goods, k1, i1) => {
              return {
                a: goods
              };
            }),
            b: item
          };
        }),
        e: `/pages/goods/goods?id=`
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/category/category.vue"]]);
wx.createPage(MiniProgramPage);
