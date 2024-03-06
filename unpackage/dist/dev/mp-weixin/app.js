"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const stores_index = require("./stores/index.js");
require("./stores/modules/info.js");
if (!Math) {
  "./pages/faxian/faxian.js";
  "./pages/ditu/ditu.js";
  "./pages/wode/wode.js";
  "./pages/category/category.js";
  "./pages/login/login.js";
  "./pages/agreement/agreement.js";
  "./pages/register/register.js";
  "./pages/loginForm/loginForm.js";
}
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  return {};
}
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/文档/大学文档/A毕业设计/小羊试驾/SheeDrive-consumer-ui/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(stores_index.pinia);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
