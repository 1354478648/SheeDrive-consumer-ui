"use strict";
const utils_request = require("../utils/request.js");
const userAddressGetListService = (data) => {
  return utils_request.http({
    method: "GET",
    url: "/address/user/list",
    data
  });
};
const userAddressAddService = (data) => {
  return utils_request.http({
    method: "POST",
    url: "/address/user/add",
    data
  });
};
const userAddressGetByIdService = (id) => {
  return utils_request.http({
    method: "GET",
    url: `/address/user/detail?id=${id}`
  });
};
const userAddressUpdateService = (data) => {
  return utils_request.http({
    method: "PUT",
    url: `/address/user/update`,
    data
  });
};
const userAddressDeleteService = (id) => {
  return utils_request.http({
    method: "DELETE",
    url: `/address/user/delete?id=${id}`
  });
};
exports.userAddressAddService = userAddressAddService;
exports.userAddressDeleteService = userAddressDeleteService;
exports.userAddressGetByIdService = userAddressGetByIdService;
exports.userAddressGetListService = userAddressGetListService;
exports.userAddressUpdateService = userAddressUpdateService;
