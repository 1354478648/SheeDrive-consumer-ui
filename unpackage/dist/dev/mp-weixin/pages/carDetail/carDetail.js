"use strict";
const common_vendor = require("../../common/vendor.js");
const api_cardetail = require("../../api/cardetail.js");
const utils_common = require("../../utils/common.js");
const api_stock = require("../../api/stock.js");
require("../../utils/request.js");
require("../../stores/modules/info.js");
require("../../stores/modules/token.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
const _sfc_main = {
  __name: "carDetail",
  setup(__props) {
    const id = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      id.value = options.id;
      cardetailGetById();
      stockGetList();
    });
    const cardetailData = common_vendor.ref();
    const cardetailGetById = async () => {
      let result = await api_cardetail.cardetailGetByIdService(id.value);
      cardetailData.value = result.data.car_detail;
    };
    const dealerData = common_vendor.ref([]);
    const stockGetList = async () => {
      let result = await api_stock.stockGetByCarIdService(id.value);
      dealerData.value = result.data.List;
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
    const longitude = common_vendor.ref(0);
    const latitude = common_vendor.ref(0);
    const getLocation = () => {
      common_vendor.index.getLocation({
        type: "wgs84",
        // GPS坐标
        success: (res) => {
          longitude.value = res.longitude;
          latitude.value = res.latitude;
        },
        fail: (error) => {
          console.error("获取位置失败", error);
        }
      });
    };
    getLocation();
    const getDistance = (lnglat) => {
      const [targetLongitude, targetLatitude] = lnglat.split(",").map(Number);
      const distance = utils_common.calculateDistance(longitude.value, latitude.value, targetLongitude, targetLatitude);
      return distance.toFixed(2);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(cardetailData.value.brand + " " + cardetailData.value.model),
        b: common_vendor.t(cardetailData.value.version),
        c: cardetailData.value.image,
        d: common_vendor.t("官方指导价: " + common_vendor.unref(utils_common.formatPrice)(cardetailData.value.price)),
        e: common_vendor.t("预估落地价: " + common_vendor.unref(utils_common.formatPrice)(cardetailData.value.price * 0.9)),
        f: common_vendor.t(cardetailData.value.year),
        g: common_vendor.t(getCategoryName(cardetailData.value.category)),
        h: common_vendor.t(getTypeName(cardetailData.value.type)),
        i: common_vendor.t(getSeatName(cardetailData.value.seats)),
        j: common_vendor.p({
          isFull: true
        }),
        k: common_vendor.f(dealerData.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.dealerInfo.name),
            b: common_vendor.t(getDistance(item.dealerInfo.address.LngLat) ? getDistance(item.dealerInfo.address.LngLat) + " km" : "未获得定位权限"),
            c: common_vendor.t(item.dealerInfo.address.Province + " " + item.dealerInfo.address.City + " " + item.dealerInfo.address.District + " " + item.dealerInfo.address.Detail),
            d: common_vendor.t(item.dealerInfo.describeInfo),
            e: item.dealerInfo.avatar,
            f: common_vendor.t(item.dealerInfo.phone),
            g: item.id,
            h: "35425daa-1-" + i0
          };
        }),
        l: common_vendor.p({
          isFull: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/carDetail/carDetail.vue"]]);
wx.createPage(MiniProgramPage);
