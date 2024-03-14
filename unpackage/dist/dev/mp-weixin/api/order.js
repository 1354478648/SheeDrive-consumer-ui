"use strict";
const utils_request = require("../utils/request.js");
const orderAddService = (data) => {
  return utils_request.http({
    method: "POST",
    url: "/order/add",
    data
  });
};
exports.orderAddService = orderAddService;
