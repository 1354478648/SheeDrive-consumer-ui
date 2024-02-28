"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "CustomSwiper",
  setup(__props) {
    const activeIndex = common_vendor.ref(0);
    const onChange = (ev) => {
      activeIndex.value = ev.detail.current;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => onChange(_ctx.ev)),
        b: common_vendor.f(3, (item, index, i0) => {
          return {
            a: item,
            b: index === activeIndex.value ? 1 : ""
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-57aca98d"], ["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/faxian/components/CustomSwiper.vue"]]);
wx.createComponent(Component);
