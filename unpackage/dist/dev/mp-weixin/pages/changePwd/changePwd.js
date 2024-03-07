"use strict";
const common_vendor = require("../../common/vendor.js");
const api_sms = require("../../api/sms.js");
const stores_modules_token = require("../../stores/modules/token.js");
const stores_modules_info = require("../../stores/modules/info.js");
const api_user = require("../../api/user.js");
require("../../utils/request.js");
const _sfc_main = {
  __name: "changePwd",
  setup(__props) {
    const tokenStore = stores_modules_token.useTokenStore();
    const infoStore = stores_modules_info.useInfoStore();
    const updatePwdData = common_vendor.ref({
      phone: "",
      code: "",
      newPassword: "",
      confirmPassword: ""
    });
    const getCodeButtonActive = common_vendor.ref(false);
    const countDown = common_vendor.ref(60);
    const getCode = async () => {
      getCodeButtonActive.value = true;
      startCountDown();
      const data = {
        phone: updatePwdData.value.phone
      };
      let result = await api_sms.smsSendCode(data);
      common_vendor.index.showToast({
        icon: "checkmarkempty",
        title: "验证码已发送"
      });
      updatePwdData.value.code = result.data.code;
    };
    const startCountDown = () => {
      const timer = setInterval(() => {
        if (countDown.value > 0) {
          countDown.value--;
        } else {
          clearInterval(timer);
          getCodeButtonActive.value = false;
          countDown.value = 60;
        }
      }, 1e3);
    };
    const confirm = async () => {
      const data = {
        phone: updatePwdData.value.phone,
        code: updatePwdData.value.code,
        newPassword: updatePwdData.value.newPassword,
        confirmPassword: updatePwdData.value.confirmPassword
      };
      await api_user.userUpdatePasswordService(data);
      infoStore.removeInfo();
      tokenStore.removeToken();
      common_vendor.index.switchTab({
        url: "/pages/wode/wode"
      });
      common_vendor.index.showToast({
        icon: "checkmarkempty",
        title: "修改成功"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: updatePwdData.value.phone,
        b: common_vendor.o(($event) => updatePwdData.value.phone = $event.detail.value),
        c: updatePwdData.value.code,
        d: common_vendor.o(($event) => updatePwdData.value.code = $event.detail.value),
        e: common_vendor.t(!getCodeButtonActive.value ? "获取验证码" : `${countDown.value}秒后重试`),
        f: common_vendor.o(getCode),
        g: getCodeButtonActive.value,
        h: updatePwdData.value.newPassword,
        i: common_vendor.o(($event) => updatePwdData.value.newPassword = $event.detail.value),
        j: updatePwdData.value.confirmPassword,
        k: common_vendor.o(($event) => updatePwdData.value.confirmPassword = $event.detail.value),
        l: common_vendor.o(confirm)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/changePwd/changePwd.vue"]]);
wx.createPage(MiniProgramPage);
