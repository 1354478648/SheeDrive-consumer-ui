"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
const api_sms = require("../../api/sms.js");
const stores_modules_token = require("../../stores/modules/token.js");
const stores_modules_info = require("../../stores/modules/info.js");
require("../../utils/request.js");
const _sfc_main = {
  __name: "loginForm",
  setup(__props) {
    const tokenStore = stores_modules_token.useTokenStore();
    const infoStore = stores_modules_info.useInfoStore();
    const way = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      way.value = options.way;
    });
    const showLoginButton = common_vendor.ref(true);
    const loginData = common_vendor.ref({
      username: "",
      password: "",
      code: ""
    });
    const login = async () => {
      if (way.value === "pwd") {
        const data = {
          username: loginData.value.username,
          password: loginData.value.password
        };
        let result = await api_user.userLoginService(data);
        tokenStore.setToken(result.data.token);
        infoStore.setInfo(result.data.user_info);
        common_vendor.index.redirectTo({
          url: "/pages/category/category"
        });
        common_vendor.index.showToast({
          icon: "checkmarkempty",
          title: `欢迎，${infoStore.info.lastName}` + (infoStore.info.sex === "男" ? "先生" : "女士")
        });
      } else {
        const data = {
          phone: loginData.value.username,
          code: loginData.value.code
        };
        let result = await api_user.userLoginByPhoneService(data);
        tokenStore.setToken(result.data.token);
        infoStore.setInfo(result.data.user_info);
        common_vendor.index.redirectTo({
          url: "/pages/category/category"
        });
        common_vendor.index.showToast({
          icon: "checkmarkempty",
          title: `欢迎，${infoStore.info.lastName}` + (infoStore.info.sex === "男" ? "先生" : "女士")
        });
      }
    };
    const getCodeButtonActive = common_vendor.ref(false);
    const countDown = common_vendor.ref(60);
    const getCode = async () => {
      getCodeButtonActive.value = true;
      startCountDown();
      const data = {
        phone: loginData.value.username
      };
      let result = await api_sms.smsSendCode(data);
      common_vendor.index.showToast({
        icon: "checkmarkempty",
        title: "验证码已发送"
      });
      loginData.value.code = result.data.code;
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loginData.value.username,
        b: common_vendor.o(($event) => loginData.value.username = $event.detail.value),
        c: way.value === "pwd"
      }, way.value === "pwd" ? {
        d: loginData.value.password,
        e: common_vendor.o(($event) => loginData.value.password = $event.detail.value)
      } : {}, {
        f: way.value === "code"
      }, way.value === "code" ? {
        g: loginData.value.code,
        h: common_vendor.o(($event) => loginData.value.code = $event.detail.value),
        i: common_vendor.t(!getCodeButtonActive.value ? "获取验证码" : `${countDown.value}秒后重试`),
        j: common_vendor.o(getCode),
        k: getCodeButtonActive.value
      } : {}, {
        l: showLoginButton.value
      }, showLoginButton.value ? {
        m: common_vendor.o(login)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/loginForm/loginForm.vue"]]);
wx.createPage(MiniProgramPage);
