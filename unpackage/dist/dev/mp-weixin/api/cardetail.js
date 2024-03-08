"use strict";
const utils_request = require("../utils/request.js");
const cardetailGetListService = (brand) => {
  return utils_request.http({
    method: "GET",
    url: `/cardetail/list?size=50&brand=${brand}`
  });
};
exports.cardetailGetListService = cardetailGetListService;
