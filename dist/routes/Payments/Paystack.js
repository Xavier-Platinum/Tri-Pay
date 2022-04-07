"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _controllers = require("../../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

// Initializing payment
router.get("/verify", _controllers.paystack_verify_payment);
var _default = router;
exports["default"] = _default;