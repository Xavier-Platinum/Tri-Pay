"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

exports.initializePayment = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(form) {
    var options;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            options = {
              url: "https://api.paystack.co/transaction/initialize",
              headers: {
                authorization: "Bearer sk_test_4a57d0b227e96cd5e84aa5e8d7a454971e1439c3",
                "content-type": "application/json",
                "cache-control": "no-cache"
              },
              method: "POST",
              data: form
            };
            return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
                var response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _axios["default"].request(options);

                      case 3:
                        response = _context.sent;
                        resolve(response.data);
                        _context.next = 10;
                        break;

                      case 7:
                        _context.prev = 7;
                        _context.t0 = _context["catch"](0);
                        reject(_context.t0);

                      case 10:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[0, 7]]);
              }));

              return function (_x2, _x3) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyPayment = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ref) {
    var options;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            options = {
              url: "https://api.paystack.co/transaction/verify/" + encodeURIComponent(ref),
              headers: {
                authorization: "Bearer sk_test_4a57d0b227e96cd5e84aa5e8d7a454971e1439c3",
                "content-type": "application/json",
                "cache-control": "no-cache"
              },
              method: "GET"
            };
            return _context4.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
                var data;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return _axios["default"].request(options);

                      case 3:
                        data = _context3.sent;
                        resolve(data);
                        _context3.next = 10;
                        break;

                      case 7:
                        _context3.prev = 7;
                        _context3.t0 = _context3["catch"](0);
                        reject(_context3.t0);

                      case 10:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, null, [[0, 7]]);
              }));

              return function (_x5, _x6) {
                return _ref4.apply(this, arguments);
              };
            }()));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x4) {
    return _ref3.apply(this, arguments);
  };
}();