"use strict";
const common_vendor = require("../../common/vendor.js");
const api_order = require("../../api/order.js");
require("../../utils/request.js");
require("../../stores/modules/info.js");
require("../../stores/modules/token.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_steps2 = common_vendor.resolveComponent("uni-steps");
  (_easycom_uni_card2 + _easycom_uni_icons2 + _easycom_uni_steps2)();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_steps = () => "../../uni_modules/uni-steps/components/uni-steps/uni-steps.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_icons + _easycom_uni_steps)();
}
const _sfc_main = {
  __name: "orderDetail",
  setup(__props) {
    const orderId = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      orderId.value = options.orderId;
      orderGetById();
    });
    const orderInfo = common_vendor.ref({});
    const orderGetById = async () => {
      let result = await api_order.orderGetByIdService(orderId.value);
      orderInfo.value = result.data.orderInfo;
      console.log(orderInfo.value);
    };
    const categoryMap = {
      0: "其他",
      1: "轿车",
      2: "SUV",
      3: "MPV",
      4: "卡车",
      5: "跑车"
    };
    const getCategoryName = (categoryId) => {
      return categoryMap[categoryId] || "未知分类";
    };
    const typeMap = {
      0: "其他",
      1: "纯电动",
      2: "插电混动",
      3: "增程",
      4: "汽油",
      5: "汽油+48V轻混系统",
      6: "油电混动",
      7: "柴油"
    };
    const getTypeName = (typeId) => {
      return typeMap[typeId] || "未知分类";
    };
    const seatMap = {
      0: "7座以上",
      1: "1座",
      2: "2座",
      4: "4座",
      5: "5座",
      6: "6座",
      7: "7座"
    };
    const getSeatName = (seatId) => {
      return seatMap[seatId] || "未知分类";
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
      return common_vendor.e({
        a: common_vendor.t(orderInfo.value.carDetailInfo.brand + " " + orderInfo.value.carDetailInfo.model),
        b: common_vendor.t(orderInfo.value.carDetailInfo.version),
        c: orderInfo.value.carDetailInfo.image,
        d: common_vendor.t(orderInfo.value.carDetailInfo.year),
        e: common_vendor.t(getCategoryName(orderInfo.value.carDetailInfo.category)),
        f: common_vendor.t(getTypeName(orderInfo.value.carDetailInfo.type)),
        g: common_vendor.t(getSeatName(orderInfo.value.carDetailInfo.seats)),
        h: common_vendor.p({
          isFull: true
        }),
        i: orderInfo.value.id,
        j: orderInfo.value.orderTime.substring(0, 10),
        k: orderInfo.value.dealerInfo.name,
        l: orderInfo.value.dealerInfo.address.Province + " " + orderInfo.value.dealerInfo.address.City + " " + orderInfo.value.dealerInfo.address.District + " " + orderInfo.value.dealerInfo.address.Detail,
        m: orderInfo.value.dealerInfo.phone,
        n: orderInfo.value.address.province + " " + orderInfo.value.address.city + " " + orderInfo.value.address.district + " " + orderInfo.value.address.detail,
        o: orderInfo.value.createTime,
        p: common_vendor.p({
          isFull: true
        }),
        q: orderInfo.value.status == 0
      }, orderInfo.value.status == 0 ? {
        r: common_vendor.p({
          type: "closeempty",
          size: "24"
        })
      } : {
        s: common_vendor.p({
          direction: "column",
          options: statusList.value,
          active: orderInfo.value.status - 1,
          ["active-color"]: "#47dfff",
          s: true
        })
      }, {
        t: common_vendor.p({
          isFull: true
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/orderDetail/orderDetail.vue"]]);
wx.createPage(MiniProgramPage);
