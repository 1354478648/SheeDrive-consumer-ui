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
const userUpdateAvatarService = (data) => {
  return utils_request.http({
    method: "PUT",
    url: "/user/updateAvatar",
    data
  });
};
const userUpdatePasswordService = (data) => {
  return utils_request.http({
    method: "PUT",
    url: "/user/updatePasswordByPhone",
    data
  });
};
exports.userLoginByPhoneService = userLoginByPhoneService;
exports.userLoginService = userLoginService;
exports.userRegisterService = userRegisterService;
exports.userUpdateAvatarService = userUpdateAvatarService;
exports.userUpdatePasswordService = userUpdatePasswordService;
