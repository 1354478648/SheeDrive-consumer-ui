"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_modules_info = require("../../stores/modules/info.js");
const api_order = require("../../api/order.js");
require("../../utils/request.js");
require("../../stores/modules/token.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_steps2 = common_vendor.resolveComponent("uni-steps");
  (_easycom_uni_icons2 + _easycom_uni_steps2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_steps = () => "../../uni_modules/uni-steps/components/uni-steps/uni-steps.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_steps)();
}
const _sfc_main = {
  __name: "orderList",
  setup(__props) {
    const infoStore = stores_modules_info.useInfoStore();
    common_vendor.index.getSystemInfoSync();
    const havaOrderData = common_vendor.ref(false);
    const orderList = common_vendor.ref([]);
    const orderGetById = async () => {
      if (infoStore.info.hasOwnProperty("id")) {
        let result = await api_order.orderGetByUserIdService(infoStore.info.id);
        orderList.value = result.data.List;
        havaOrderData.value = true;
      }
    };
    common_vendor.onShow(() => {
      orderGetById();
    });
    const statusOptions = [
      { value: -1, label: "异常" },
      { value: 0, label: "取消" },
      { value: 1, label: "未确认" },
      { value: 2, label: "已确认" },
      { value: 3, label: "签署协议" },
      { value: 4, label: "试驾中" },
      { value: 5, label: "试驾结束" },
      { value: 6, label: "待评价" },
      { value: 7, label: "已评价" }
    ];
    const getStatusText = (status) => {
      const statusOption = statusOptions.find((option) => option.value === status);
      return statusOption ? statusOption.label : "未知状态";
    };
    const statusList = common_vendor.ref([
      {
        title: "未确认"
      },
      {
        title: "已确认"
      },
      {
        title: "签署协议"
      },
      {
        title: "试驾中"
      },
      {
        title: "试驾结束"
      },
      {
        title: "待评价"
      },
      {
        title: "已评价"
      }
    ]);
    const naviToOrderDetail = (orderId) => {
      common_vendor.index.navigateTo({
        url: `/pages/orderDetail/orderDetail?orderId=${orderId}`
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(orderList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.id),
            b: common_vendor.t(getStatusText(item.status)),
            c: common_vendor.t(item.carDetailInfo.brand + " " + item.carDetailInfo.model + " " + item.carDetailInfo.version),
            d: common_vendor.t(item.dealerInfo.name),
            e: common_vendor.t(item.orderTime.substring(0, 10)),
            f: item.status == 0
          }, item.status == 0 ? {
            g: "67aeecf9-0-" + i0,
            h: common_vendor.p({
              type: "closeempty",
              size: "24"
            })
          } : {
            i: "67aeecf9-1-" + i0,
            j: common_vendor.p({
              direction: "row",
              options: statusList.value,
              active: item.status - 1,
              ["active-color"]: "#47dfff",
              s: true
            })
          }, {
            k: common_vendor.o(($event) => naviToOrderDetail(item.id), item.id),
            l: item.status == 6
          }, item.status == 6 ? {} : {}, {
            m: item.id
          });
        }),
        b: !havaOrderData.value
      }, !havaOrderData.value ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/orderList/orderList.vue"]]);
wx.createPage(MiniProgramPage);
