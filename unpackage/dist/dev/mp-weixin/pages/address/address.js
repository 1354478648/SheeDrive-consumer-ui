"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "address",
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({}, {
        a: `/pagesMember/address-form/address-form?id=1`
      }, {}, {
        b: `/pagesMember/address-form/address-form?id=2`
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/address/address.vue"]]);
wx.createPage(MiniProgramPage);
