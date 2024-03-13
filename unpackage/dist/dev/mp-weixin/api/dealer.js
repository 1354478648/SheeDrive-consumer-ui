"use strict";
const utils_request = require("../utils/request.js");
const dealerGetListService = () => {
  return utils_request.http({
    method: "GET",
    url: "/dealer/list?size=50"
  });
};
const dealerGetDetailService = (dealerId) => {
  return utils_request.http({
    method: "GET",
    url: `/dealer/detail?id=${dealerId}`
  });
};
exports.dealerGetDetailService = dealerGetDetailService;
exports.dealerGetListService = dealerGetListService;
