"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_modules_info = require("../../stores/modules/info.js");
const api_user = require("../../api/user.js");
require("../../utils/request.js");
require("../../stores/modules/token.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "profile",
  setup(__props) {
    const infoStore = stores_modules_info.useInfoStore();
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    const onAvatarChange = () => {
      common_vendor.index.chooseMedia({
        // 文件个数
        count: 1,
        // 文件类型
        mediaType: ["image"],
        success: (res) => {
          const { tempFilePath } = res.tempFiles[0];
          common_vendor.index.uploadFile({
            url: "/file/upload",
            name: "file",
            // 后端数据字段名
            filePath: tempFilePath,
            // 新头像
            success: async (res2) => {
              if (res2.statusCode === 200) {
                const avatarUrl = JSON.parse(res2.data).data.url;
                const data = {
                  id: infoStore.info.id,
                  url: avatarUrl
                };
                await api_user.userUpdateAvatarService(data);
                infoStore.info.avatar = avatarUrl;
                common_vendor.index.showToast({ icon: "success", title: "更新成功" });
              } else {
                common_vendor.index.showToast({ icon: "error", title: "发生错误" });
              }
            }
          });
        }
      });
    };
    const naviToChangePwd = () => {
      common_vendor.index.navigateTo({
        url: "/pages/changePwd/changePwd"
      });
    };
    return (_ctx, _cache) => {
      var _a;
      return {
        a: common_vendor.p({
          type: "left",
          size: "24",
          color: "white"
        }),
        b: ((_a = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _a.top) + "px",
        c: common_vendor.unref(infoStore).info.avatar ? common_vendor.unref(infoStore).info.avatar : "https://sheedrive.oss-cn-shanghai.aliyuncs.com/sys/default_avatar.jpg",
        d: common_vendor.o(onAvatarChange),
        e: common_vendor.t(common_vendor.unref(infoStore).info.username),
        f: common_vendor.t(common_vendor.unref(infoStore).info.lastName + common_vendor.unref(infoStore).info.firstName),
        g: common_vendor.t(common_vendor.unref(infoStore).info.sex),
        h: common_vendor.t(common_vendor.unref(infoStore).info.birthday.substring(0, 10)),
        i: common_vendor.t(common_vendor.unref(infoStore).info.idNumber.substring(0, 4) + "******" + common_vendor.unref(infoStore).info.idNumber.substring(10, 14) + "****"),
        j: common_vendor.t(common_vendor.unref(infoStore).info.createTime),
        k: common_vendor.o(naviToChangePwd)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/profile/profile.vue"]]);
wx.createPage(MiniProgramPage);
