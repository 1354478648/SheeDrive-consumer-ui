"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_modules_info = require("../../stores/modules/info.js");
const stores_modules_token = require("../../stores/modules/token.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = {
  __name: "settings",
  setup(__props) {
    const infoStore = stores_modules_info.useInfoStore();
    const tokenStore = stores_modules_token.useTokenStore();
    const naviToProfile = () => {
      if (infoStore.info) {
        common_vendor.index.navigateTo({
          url: "/pages/profile/profile"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      }
    };
    const naviToAddress = () => {
      if (infoStore.info) {
        common_vendor.index.navigateTo({
          url: "/pages/address/address"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      }
    };
    const logout = () => {
      if (!infoStore.info) {
        common_vendor.index.showToast({
          icon: "none",
          title: "尚未登录"
        });
        return;
      }
      common_vendor.index.showModal({
        content: "是否退出登录？",
        success: (res) => {
          if (res.confirm) {
            infoStore.removeInfo();
            tokenStore.removeToken();
            common_vendor.index.switchTab({
              url: "/pages/wode/wode"
            });
          }
          common_vendor.index.showToast({
            icon: "none",
            title: "退出成功"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(naviToProfile),
        b: common_vendor.p({
          title: "个人资料",
          link: true
        }),
        c: common_vendor.p({
          title: "我的订单"
        }),
        d: common_vendor.o(naviToAddress),
        e: common_vendor.p({
          title: "我的地址簿",
          link: true
        }),
        f: common_vendor.p({
          title: "用户协议与隐私条款",
          link: true,
          to: "/pages/address/address"
        }),
        g: common_vendor.o(logout)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/settings/settings.vue"]]);
wx.createPage(MiniProgramPage);
