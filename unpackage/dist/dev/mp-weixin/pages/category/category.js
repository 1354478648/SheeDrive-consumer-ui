"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_category_car = require("./car.js");
if (!Array) {
  const _easycom_uni_indexed_list2 = common_vendor.resolveComponent("uni-indexed-list");
  _easycom_uni_indexed_list2();
}
const _easycom_uni_indexed_list = () => "../../uni_modules/uni-indexed-list/components/uni-indexed-list/uni-indexed-list.js";
if (!Math) {
  _easycom_uni_indexed_list();
}
const _sfc_main = {
  __name: "category",
  setup(__props) {
    const onClick = (e) => {
      common_vendor.index.navigateTo({
        url: `/pages/carList/carList?size=50&name=${e.item.name}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onClick),
        b: common_vendor.p({
          options: common_vendor.unref(pages_category_car.car)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/category/category.vue"]]);
wx.createPage(MiniProgramPage);
