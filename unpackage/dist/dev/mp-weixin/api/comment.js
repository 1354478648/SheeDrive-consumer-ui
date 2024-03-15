"use strict";
const utils_request = require("../utils/request.js");
const commentAddService = (data) => {
  return utils_request.http({
    method: "POST",
    url: "/comment/add",
    data
  });
};
const commentGetByOrderIdService = (orderId) => {
  return utils_request.http({
    method: "GET",
    url: `/comment/detailByOrderId?orderId=${orderId}`
  });
};
exports.commentAddService = commentAddService;
exports.commentGetByOrderIdService = commentGetByOrderIdService;
