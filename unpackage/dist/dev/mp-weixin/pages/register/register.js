"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
require("../../utils/request.js");
require("../../stores/modules/info.js");
require("../../stores/modules/token.js");
const _sfc_main = {
  __name: "register",
  setup(__props) {
    const registerData = common_vendor.ref({
      name: "",
      idCard: "",
      phone: "",
      password: "",
      confirmPassword: ""
    });
    const register = async () => {
      const data = {
        last_name: registerData.value.name.substring(0, 1),
        first_name: registerData.value.name.substring(1),
        id_number: registerData.value.idCard,
        phone: registerData.value.phone,
        password: registerData.value.password,
        confirmPassword: registerData.value.confirmPassword
      };
      await api_user.userRegisterService(data);
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
      common_vendor.index.showToast({
        icon: "checkmarkempty",
        title: "注册成功"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: registerData.value.name,
        b: common_vendor.o(($event) => registerData.value.name = $event.detail.value),
        c: registerData.value.idCard,
        d: common_vendor.o(($event) => registerData.value.idCard = $event.detail.value),
        e: registerData.value.phone,
        f: common_vendor.o(($event) => registerData.value.phone = $event.detail.value),
        g: registerData.value.password,
        h: common_vendor.o(($event) => registerData.value.password = $event.detail.value),
        i: registerData.value.confirmPassword,
        j: common_vendor.o(($event) => registerData.value.confirmPassword = $event.detail.value),
        k: common_vendor.o(register)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/register/register.vue"]]);
wx.createPage(MiniProgramPage);
