"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_modules_token = require("../../stores/modules/token.js");
const stores_modules_info = require("../../stores/modules/info.js");
const pages_addressForm_pca = require("./pca.js");
const api_address = require("../../api/address.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  _easycom_uni_data_picker2();
}
const _easycom_uni_data_picker = () => "../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
if (!Math) {
  _easycom_uni_data_picker();
}
const _sfc_main = {
  __name: "addressForm",
  setup(__props) {
    stores_modules_token.useTokenStore();
    const infoStore = stores_modules_info.useInfoStore();
    const ssqArr = common_vendor.ref();
    const id = common_vendor.ref("");
    const isAdd = common_vendor.ref(false);
    common_vendor.onLoad((options) => {
      id.value = options.id;
      if (id.value == "" || id.value == null || id.value == void 0) {
        isAdd.value = true;
      } else {
        userAddressGetById(id.value);
      }
    });
    const userAddressAddUpdateData = common_vendor.ref({
      id: "",
      province: "",
      city: "",
      district: "",
      detail_address: ""
    });
    const userAddressGetById = async (id2) => {
      let result = await api_address.userAddressGetByIdService(id2);
      userAddressAddUpdateData.value.province = result.data.addressInfo.province;
      userAddressAddUpdateData.value.city = result.data.addressInfo.city;
      userAddressAddUpdateData.value.district = result.data.addressInfo.district;
      userAddressAddUpdateData.value.detail_address = result.data.addressInfo.detail;
      ssqArr.value = [result.data.addressInfo.province, result.data.addressInfo.city, result.data.addressInfo.district];
    };
    const onchange = (e) => {
      userAddressAddUpdateData.value.province = e.detail.value[0].text;
      userAddressAddUpdateData.value.city = e.detail.value[1].text;
      userAddressAddUpdateData.value.district = e.detail.value[2].text;
    };
    const onAdd = async () => {
      userAddressAddUpdateData.value.id = infoStore.info.id;
      let result = await api_address.userAddressAddService(userAddressAddUpdateData.value);
      if (result.data.id !== "") {
        common_vendor.index.redirectTo({
          url: "/pages/address/address"
        });
        common_vendor.index.showToast({
          icon: "checkmarkempty",
          title: "成功添加地址"
        });
      }
    };
    const onUpdate = async () => {
      userAddressAddUpdateData.value.id = id.value;
      await api_address.userAddressUpdateService(userAddressAddUpdateData.value);
      common_vendor.index.redirectTo({
        url: "/pages/address/address"
      });
      common_vendor.index.showToast({
        icon: "checkmarkempty",
        title: "成功修改地址"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(onchange),
        b: common_vendor.o(($event) => ssqArr.value = $event),
        c: common_vendor.p({
          localdata: common_vendor.unref(pages_addressForm_pca.pcaTextArr),
          placeholder: "请选择省/市/区(县)",
          ["popup-title"]: "请选择省/市/区(县)",
          modelValue: ssqArr.value
        }),
        d: userAddressAddUpdateData.value.detail_address,
        e: common_vendor.o(($event) => userAddressAddUpdateData.value.detail_address = $event.detail.value),
        f: isAdd.value
      }, isAdd.value ? {
        g: common_vendor.o(onAdd)
      } : {}, {
        h: !isAdd.value
      }, !isAdd.value ? {
        i: common_vendor.o(onUpdate)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/addressForm/addressForm.vue"]]);
wx.createPage(MiniProgramPage);
