"use strict";
const utils_request = require("../utils/request.js");
const getSwiperService = () => {
  return utils_request.http({
    method: "GET",
    url: "/mobile/getSwiper"
  });
};
exports.getSwiperService = getSwiperService;
