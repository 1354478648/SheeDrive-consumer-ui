"use strict";
const utils_request = require("../utils/request.js");
const orderAddService = (data) => {
  return utils_request.http({
    method: "POST",
    url: "/order/add",
    data
  });
};
const orderGetByUserIdInWoDeService = (userId) => {
  return utils_request.http({
    method: "GET",
    url: `/order/getByUserId?size=2&userId=${userId}`
  });
};
const orderGetByUserIdService = (userId) => {
  return utils_request.http({
    method: "GET",
    url: `/order/getByUserId?size=50&userId=${userId}`
  });
};
const orderGetByIdService = (carId) => {
  return utils_request.http({
    method: "GET",
    url: `/order/detail?id=${carId}`
  });
};
exports.orderAddService = orderAddService;
exports.orderGetByIdService = orderGetByIdService;
exports.orderGetByUserIdInWoDeService = orderGetByUserIdInWoDeService;
exports.orderGetByUserIdService = orderGetByUserIdService;
