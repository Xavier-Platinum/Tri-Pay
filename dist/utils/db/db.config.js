"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sequelize = new _sequelize["default"]('postgres://postgres:8857@localhost:5432/postgres', {
  host: "localhost",
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false
});
exports.sequelize = sequelize;
sequelize.authenticate().then(function () {
  console.log('Connection has been established successfully.');
})["catch"](function (err) {
  console.error('Unable to connect to the database:', err);
});