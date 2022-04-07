"use strict";

var _nodeCron = _interopRequireDefault(require("node-cron"));

var _statusCheck = require("./statusCheck");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// checking for availibility of service
_nodeCron["default"].schedule("5 * * * * *", function () {
  console.log("============ Checking now ===============");
  (0, _statusCheck.paystack_availability)();
  (0, _statusCheck.flutterwave_availability)();
  console.log("============ Done Checking =================");
});