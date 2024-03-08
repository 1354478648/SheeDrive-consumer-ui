"use strict";
const common_vendor = require("../../common/vendor.js");
const api_address = require("../../api/address.js");
const stores_modules_info = require("../../stores/modules/info.js");
require("../../utils/request.js");
require("../../stores/modules/token.js");
if (!Array) {
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  (_easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2)();
}
const _easycom_uni_swipe_action_item = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
if (!Math) {
  (_easycom_uni_swipe_action_item + _easycom_uni_swipe_action)();
}
const _sfc_main = {
  __name: "address",
  setup(__props) {
    const infoStore = stores_modules_info.useInfoStore();
    const userAddressData = common_vendor.ref();
    const getUserAddressList = async () => {
      const data = {
        id: infoStore.info.id
      };
      let result = await api_address.userAddressGetListService(data);
      userAddressData.value = result.data.addressInfoList;
    };
    getUserAddressList();
    const onDelete = async (id) => {
      await api_address.userAddressDeleteService(id);
      getUserAddressList();
      common_vendor.index.showToast({
        icon: "checkmarkempty",
        title: "删除成功"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userAddressData.value
      }, userAddressData.value ? {
        b: common_vendor.f(userAddressData.value, (item, k0, i0) => {
          return {
            a: common_vendor.t("ID: " + item.id),
            b: common_vendor.t(item.province + " " + item.city + " " + item.district + " " + item.detail),
            c: `/pages/addressForm/addressForm?id=${item.id}`,
            d: common_vendor.o(($event) => onDelete(item.id), item.id),
            e: "7093e209-1-" + i0 + "," + ("7093e209-0-" + i0),
            f: item.id,
            g: "7093e209-0-" + i0
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/address/address.vue"]]);
wx.createPage(MiniProgramPage);
