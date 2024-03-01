"use strict";
const common_vendor = require("../../common/vendor.js");
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
          console.log("当前位置的经度：" + res.longitude);
          console.log("当前位置的纬度：" + res.latitude);
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
    common_vendor.onMounted(() => {
      getLocation();
    });
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
