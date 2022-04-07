"use strict";

var _app = _interopRequireDefault(require("./app"));

require("@babel/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var PORT;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            PORT = process.env.PORT || 4000;
            _context.next = 3;
            return _app["default"].listen(PORT, function () {
              console.log("Server is responding at ".concat(PORT, " on ").concat(_app["default"].settings.env));
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _main.apply(this, arguments);
}

main();