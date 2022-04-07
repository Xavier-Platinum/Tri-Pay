"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cors = cors;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function cors(_x, _x2, _x3) {
  return _cors.apply(this, arguments);
}

function _cors() {
  _cors = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
            res.header("Access-Control-Max-Age", "3600");
            res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token");
            next();

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _cors.apply(this, arguments);
}