"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup_message + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const naviToAgreement = () => {
      common_vendor.index.navigateTo({
        url: "/pages/agreement/agreement"
      });
    };
    const naviToRegister = () => {
      common_vendor.index.redirectTo({
        url: "/pages/register/register"
      });
    };
    const naviToLoginForm = (way) => {
      common_vendor.index.redirectTo({
        url: `/pages/loginForm/loginForm?way=${way}`
      });
    };
    const fastLogin = () => {
      common_vendor.index.showToast({
        icon: "close",
        title: "暂未开放"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.p({
          type: "phone",
          size: "16",
          color: "white"
        }),
        c: common_vendor.o(fastLogin),
        d: common_vendor.o(naviToRegister),
        e: common_vendor.p({
          type: "auth",
          size: "24"
        }),
        f: common_vendor.o(($event) => naviToLoginForm("pwd")),
        g: common_vendor.p({
          type: "email",
          size: "24"
        }),
        h: common_vendor.o(($event) => naviToLoginForm("code")),
        i: common_vendor.o(naviToAgreement),
        j: common_vendor.p({
          type: "info",
          message: "本系统由 上海工程技术大学 计算机科学与技术专业 2024届毕业生 汤晟 于2024年开发",
          duration: 2e3
        }),
        k: common_vendor.sr("popup", "1eaf4d1a-3"),
        l: common_vendor.p({
          type: "right"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
