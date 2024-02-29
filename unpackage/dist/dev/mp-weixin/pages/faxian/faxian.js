"use strict";
const common_vendor = require("../../common/vendor.js");
const api_mobile = require("../../api/mobile.js");
require("../../utils/request.js");
require("../../stores/index.js");
require("../../stores/modules/info.js");
const _sfc_main = {
  __name: "faxian",
  setup(__props) {
    const swiperList = common_vendor.ref([]);
    const getSwiperList = async () => {
      const result = await api_mobile.getSwiperService();
      swiperList.value = result.data.swiperInfoList;
    };
    getSwiperList();
    const activeIndex = common_vendor.ref(0);
    const onChange = (ev) => {
      activeIndex.value = ev.detail.current;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(swiperList.value, (item, k0, i0) => {
          return {
            a: item.imageUrl,
            b: item.id
          };
        }),
        b: common_vendor.o(onChange),
        c: common_vendor.f(swiperList.value, (item, index, i0) => {
          return {
            a: item,
            b: index === activeIndex.value ? 1 : ""
          };
        }),
        d: common_vendor.t(swiperList.value[activeIndex.value].describeInfo)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d5906933"], ["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/faxian/faxian.vue"]]);
wx.createPage(MiniProgramPage);
