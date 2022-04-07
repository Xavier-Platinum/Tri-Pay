"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var statusSchema = new Schema({
  name: {
    type: String
  },
  status_code: {
    type: Number
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].model("Status", statusSchema);

exports["default"] = _default;