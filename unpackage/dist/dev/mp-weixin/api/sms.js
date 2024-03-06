"use strict";
const utils_request = require("../utils/request.js");
const smsSendCode = (data) => {
  return utils_request.http({
    method: "POST",
    url: "/sms/send",
    data
  });
};
exports.smsSendCode = smsSendCode;
