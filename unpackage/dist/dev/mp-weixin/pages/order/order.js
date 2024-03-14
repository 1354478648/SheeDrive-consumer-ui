"use strict";
const common_vendor = require("../../common/vendor.js");
const api_cardetail = require("../../api/cardetail.js");
const api_dealer = require("../../api/dealer.js");
require("../../utils/request.js");
const stores_modules_info = require("../../stores/modules/info.js");
const api_order = require("../../api/order.js");
const api_address = require("../../api/address.js");
require("../../stores/modules/token.js");
if (!Array) {
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_datetime_picker2 + _easycom_uni_card2)();
}
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_datetime_picker + _easycom_uni_card)();
}
const _sfc_main = {
  __name: "order",
  setup(__props) {
    const infoStore = stores_modules_info.useInfoStore();
    const carId = common_vendor.ref("");
    const dealerId = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      carId.value = options.carId;
      dealerId.value = options.dealerId;
      cardetailGetById();
      stockGetList();
    });
    const cardetailData = common_vendor.ref();
    const cardetailGetById = async () => {
      let result = await api_cardetail.cardetailGetByIdService(carId.value);
      cardetailData.value = result.data.car_detail;
    };
    const dealerData = common_vendor.ref([]);
    const stockGetList = async () => {
      let result = await api_dealer.dealerGetDetailService(dealerId.value);
      dealerData.value = result.data.dealer_info;
    };
    const userAddressData = common_vendor.ref();
    const addrArr = common_vendor.ref([]);
    const index = common_vendor.ref(0);
    const getUserAddressList = async () => {
      const data = {
        id: infoStore.info.id
      };
      let result = await api_address.userAddressGetListService(data);
      userAddressData.value = result.data.addressInfoList;
      addrArr.value = userAddressData.value.map((location) => `${location.province} ${location.city} ${location.district} ${location.detail}`);
    };
    getUserAddressList();
    const orderAddData = common_vendor.ref({
      userId: null,
      dealerId: null,
      carId: null,
      addrId: null,
      orderTime: ""
    });
    const bindPickerChange = (e) => {
      index.value = e.detail.value;
    };
    const onChange = (e) => {
      orderAddData.value.orderTime = e;
    };
    const onOrder = async () => {
      orderAddData.value.userId = infoStore.info.id;
      orderAddData.value.dealerId = dealerId.value;
      orderAddData.value.carId = carId.value;
      orderAddData.value.addrId = userAddressData.value[index.value].id;
      let result = await api_order.orderAddService(orderAddData.value);
      let orderId = result.data.orderInfo.id;
      common_vendor.index.redirectTo({
        url: `/pages/orderSuccess/orderSuccess?orderId=${orderId}`
      });
      common_vendor.index.showToast({
        icon: "checkmarkempty",
        title: "预约成功！"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: cardetailData.value.image,
        b: cardetailData.value.brand + cardetailData.value.model + " " + cardetailData.value.version,
        c: dealerData.value.name,
        d: dealerData.value.address.Province + " " + dealerData.value.address.City + " " + dealerData.value.address.District + " " + dealerData.value.address.Detail,
        e: common_vendor.unref(infoStore).info.phone,
        f: common_vendor.t(addrArr.value[index.value]),
        g: common_vendor.o(bindPickerChange),
        h: index.value,
        i: addrArr.value,
        j: common_vendor.o(onChange),
        k: common_vendor.p({
          type: "date",
          start: /* @__PURE__ */ new Date(),
          ["return-type"]: "string",
          ["clear-icon"]: true,
          border: false
        }),
        l: common_vendor.o(onOrder),
        m: common_vendor.p({
          isFull: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/order/order.vue"]]);
wx.createPage(MiniProgramPage);
