"use strict";
const utils_request = require("../utils/request.js");
const stockGetByCarIdService = (id) => {
  return utils_request.http({
    method: "GET",
    url: `/stock/getByCarId?size=50&id=${id}`
  });
};
exports.stockGetByCarIdService = stockGetByCarIdService;
