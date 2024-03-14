"use strict";
const utils_request = require("../utils/request.js");
const orderAddService = (data) => {
  return utils_request.http({
    method: "POST",
    url: "/order/add",
    data
  });
};
const orderGetByIdInWoDeService = (userId) => {
  return utils_request.http({
    method: "GET",
    url: `/order/getByUserId?size=2&userId=${userId}`
  });
};
exports.orderAddService = orderAddService;
exports.orderGetByIdInWoDeService = orderGetByIdInWoDeService;
