"use strict";
const common_vendor = require("../../common/vendor.js");
const api_cardetail = require("../../api/cardetail.js");
const utils_common = require("../../utils/common.js");
require("../../utils/request.js");
require("../../stores/modules/info.js");
require("../../stores/modules/token.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_card2 + _easycom_uni_icons2)();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_icons)();
}
const _sfc_main = {
  __name: "carList",
  setup(__props) {
    const cardetailListData = common_vendor.ref([]);
    const isNull = common_vendor.ref(false);
    const brand = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      brand.value = options.name;
      getCarDetailList();
    });
    const getCarDetailList = async () => {
      let result = await api_cardetail.cardetailGetListService(brand.value);
      if (result.data.List == null) {
        isNull.value = true;
        return;
      }
      cardetailListData.value = result.data.List;
    };
    const onClick = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/carDetail/carDetail?id=${id}`
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !isNull.value
      }, !isNull.value ? {
        b: common_vendor.f(cardetailListData.value, (item, k0, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.describeInfo),
            c: item.id,
            d: common_vendor.o(($event) => onClick(item.id), item.id),
            e: "5aa73976-0-" + i0,
            f: common_vendor.p({
              title: item.brand + " " + item.model,
              ["sub-title"]: item.year + "款 " + item.version,
              extra: "官方指导价: " + common_vendor.unref(utils_common.formatPrice)(item.price),
              padding: "10px 0"
            })
          };
        })
      } : {}, {
        c: isNull.value
      }, isNull.value ? {
        d: common_vendor.p({
          type: "info",
          size: "32"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/carList/carList.vue"]]);
wx.createPage(MiniProgramPage);
