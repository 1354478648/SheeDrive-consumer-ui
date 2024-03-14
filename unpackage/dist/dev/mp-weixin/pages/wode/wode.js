"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const stores_modules_info = require("../../stores/modules/info.js");
const api_order = require("../../api/order.js");
require("../../utils/request.js");
require("../../stores/modules/token.js");
if (!Array) {
  const _easycom_uni_steps2 = common_vendor.resolveComponent("uni-steps");
  _easycom_uni_steps2();
}
const _easycom_uni_steps = () => "../../uni_modules/uni-steps/components/uni-steps/uni-steps.js";
if (!Math) {
  _easycom_uni_steps();
}
const _sfc_main = {
  __name: "wode",
  setup(__props) {
    const infoStore = stores_modules_info.useInfoStore();
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    const havaOrderData = common_vendor.ref(false);
    const orderList = common_vendor.ref([]);
    const orderGetByIdInWoDe = async () => {
      console.log("函数执行");
      if (infoStore.info.id) {
        let result = await api_order.orderGetByIdInWoDeService(infoStore.info.id);
        orderList.value = result.data.List;
        havaOrderData.value = true;
      }
    };
    orderGetByIdInWoDe();
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
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: common_vendor.unref(infoStore).info
      }, common_vendor.unref(infoStore).info ? {
        b: common_vendor.unref(infoStore).info.avatar ? common_vendor.unref(infoStore).info.avatar : "https://sheedrive.oss-cn-shanghai.aliyuncs.com/sys/default_avatar.jpg",
        c: common_vendor.t(common_vendor.unref(infoStore).info.lastName + common_vendor.unref(infoStore).info.firstName)
      } : {
        d: common_assets._imports_0
      }, {
        e: ((_a = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _a.top) + "px",
        f: common_vendor.f(orderList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.id),
            b: common_vendor.t(getStatusText(item.status)),
            c: common_vendor.t(item.carDetailInfo.brand + " " + item.carDetailInfo.model + " " + item.carDetailInfo.version),
            d: common_vendor.t(item.dealerInfo.name),
            e: common_vendor.t(item.orderTime.substring(0, 10)),
            f: "56162f02-0-" + i0,
            g: common_vendor.p({
              direction: "row",
              options: statusList.value,
              active: item.status - 1,
              ["active-color"]: "#47dfff",
              s: true
            }),
            h: item.status == 6
          }, item.status == 6 ? {} : {}, {
            i: item.id
          });
        }),
        g: !havaOrderData.value
      }, !havaOrderData.value ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/wode/wode.vue"]]);
wx.createPage(MiniProgramPage);
