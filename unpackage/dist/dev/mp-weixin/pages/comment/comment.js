"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_modules_info = require("../../stores/modules/info.js");
const api_order = require("../../api/order.js");
const api_comment = require("../../api/comment.js");
require("../../utils/request.js");
require("../../stores/modules/token.js");
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  _easycom_uni_rate2();
}
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
if (!Math) {
  _easycom_uni_rate();
}
const _sfc_main = {
  __name: "comment",
  setup(__props) {
    stores_modules_info.useInfoStore();
    const orderId = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      orderId.value = options.orderId;
      orderGetById();
    });
    const orderInfo = common_vendor.ref({});
    const orderGetById = async () => {
      let result = await api_order.orderGetByIdService(orderId.value);
      orderInfo.value = result.data.orderInfo;
    };
    const commentAddData = common_vendor.ref({
      orderId: "",
      content: "",
      totalScore: 0,
      dealerScore: 0,
      carScore: 0
    });
    const commentAdd = async () => {
      commentAddData.value.orderId = orderId.value;
      await api_comment.commentAddService(commentAddData.value);
      common_vendor.index.switchTab({
        url: "/pages/wode/wode"
      });
      common_vendor.index.showToast({
        icon: "checkmark",
        title: "评价成功"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: orderId.value,
        b: common_vendor.o(($event) => commentAddData.value.totalScore = $event),
        c: common_vendor.p({
          ["is-fill"]: false,
          modelValue: commentAddData.value.totalScore
        }),
        d: orderInfo.value.dealerInfo.name,
        e: common_vendor.o(($event) => commentAddData.value.dealerScore = $event),
        f: common_vendor.p({
          ["is-fill"]: false,
          modelValue: commentAddData.value.dealerScore
        }),
        g: orderInfo.value.carDetailInfo.brand + " " + orderInfo.value.carDetailInfo.model + " " + orderInfo.value.carDetailInfo.version,
        h: common_vendor.o(($event) => commentAddData.value.carScore = $event),
        i: common_vendor.p({
          ["is-fill"]: false,
          modelValue: commentAddData.value.carScore
        }),
        j: commentAddData.value.content,
        k: common_vendor.o(($event) => commentAddData.value.content = $event.detail.value),
        l: common_vendor.o(commentAdd)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/comment/comment.vue"]]);
wx.createPage(MiniProgramPage);
