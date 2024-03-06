"use strict";
const utils_request = require("../utils/request.js");
const userRegisterService = (data) => {
  return utils_request.http({
    method: "POST",
    url: "/user/register",
    data
  });
};
const userLoginService = (data) => {
  return utils_request.http({
    method: "POST",
    url: "/user/login",
    data
  });
};
const userLoginByPhoneService = (data) => {
  return utils_request.http({
    method: "POST",
    url: "/user/loginByPhone",
    data
  });
};
exports.userLoginByPhoneService = userLoginByPhoneService;
exports.userLoginService = userLoginService;
exports.userRegisterService = userRegisterService;
