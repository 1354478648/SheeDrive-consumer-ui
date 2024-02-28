"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  CustomSwiper();
}
const CustomSwiper = () => "./components/CustomSwiper.js";
const _sfc_main = {
  __name: "faxian",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          list: _ctx.bannerList
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/faxian/faxian.vue"]]);
wx.createPage(MiniProgramPage);
