"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var transactionSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  amount: Number,
  reference: String,
  currency: String,
  channel: String,
  ip_address: String,
  status: {
    type: String,
    "enum": ["pending", "success", "error"],
    trim: true
  },
  payment_gateway: {
    type: String,
    "enum": ["paystack", "flutter-wave", "payu"],
    "default": "paystack"
  },
  access_code: String
}, {
  timestamps: true
});

var _default = _mongoose["default"].model("Transactions", transactionSchema);

exports["default"] = _default;