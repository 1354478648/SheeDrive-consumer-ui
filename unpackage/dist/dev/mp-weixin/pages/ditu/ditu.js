"use strict";
const common_vendor = require("../../common/vendor.js");
const api_dealer = require("../../api/dealer.js");
require("../../utils/request.js");
require("../../stores/modules/info.js");
require("../../stores/modules/token.js");
if (!Math) {
  CustomNavbar();
}
const CustomNavbar = () => "../components/CustomNavbar.js";
const _sfc_main = {
  __name: "ditu",
  setup(__props) {
    const longitude = common_vendor.ref(0);
    const latitude = common_vendor.ref(0);
    const markers = common_vendor.ref([
      {
        id: 0,
        longitude: 0,
        latitude: 0,
        callout: {
          content: "当前位置",
          color: "#000000",
          fontSize: 12,
          borderRadius: 10,
          padding: 8,
          display: "ALWAYS"
        }
      }
    ]);
    const getLocation = () => {
      common_vendor.index.getLocation({
        type: "wgs84",
        // GPS坐标
        success: (res) => {
          longitude.value = res.longitude;
          latitude.value = res.latitude;
          markers.value[0].longitude = res.longitude;
          markers.value[0].latitude = res.latitude;
        },
        fail: (error) => {
          console.error("获取位置失败", error);
        }
      });
    };
    getLocation();
    const getDealerLocation = async () => {
      let result = await api_dealer.dealerGetListService();
      result.data.List.forEach((item) => {
        const lngLatArr = item.address.LngLat.split(",");
        markers.value.push({
          id: item.id,
          longitude: parseFloat(lngLatArr[0]),
          latitude: parseFloat(lngLatArr[1]),
          callout: {
            content: item.name,
            color: "#000000",
            fontSize: 12,
            borderRadius: 10,
            padding: 8,
            display: "ALWAYS"
          }
        });
      });
    };
    getDealerLocation();
    return (_ctx, _cache) => {
      return {
        a: longitude.value,
        b: latitude.value,
        c: markers.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/pages/ditu/ditu.vue"]]);
wx.createPage(MiniProgramPage);
