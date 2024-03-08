"use strict";
const utils_request = require("../utils/request.js");
const dealerGetListService = () => {
  return utils_request.http({
    method: "GET",
    url: "/dealer/list?size=50"
  });
};
exports.dealerGetListService = dealerGetListService;
