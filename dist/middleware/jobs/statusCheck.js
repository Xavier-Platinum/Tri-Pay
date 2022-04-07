"use strict";

var _axios = _interopRequireDefault(require("axios"));

var _Status = _interopRequireDefault(require("../../models/Init/Status"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var paystack_availability = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _axios["default"])({
              method: "GET",
              url: "https://api.paystack.co/transaction/initialize",
              headers: {
                Authorization: "Bearer sk_test_4a57d0b227e96cd5e84aa5e8d7a454971e1439c3"
              }
            }).then( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(res) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _Status["default"].findOne({
                          name: "paystack"
                        }).then(function (data) {
                          if (!data) {
                            _Status["default"].create({
                              name: "paystack",
                              status_code: res.data.status
                            });

                            console.log("Paystack status Created");
                          } else {
                            _Status["default"].updateOne({
                              name: "paystack"
                            }, {
                              $set: {
                                status_code: res.data.status
                              }
                            });

                            console.log("Paystack status updated");
                          }
                        })["catch"](function (err) {
                          return console.log(err);
                        });

                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x) {
                return _ref2.apply(this, arguments);
              };
            }())["catch"](err = console.log(err));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function paystack_availability() {
    return _ref.apply(this, arguments);
  };
}();

var flutterwave_availability = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _axios["default"])({
              method: "GET",
              url: "https://api.flutterwave.com/v3/payments",
              headers: {
                Authorization: "Bearer FLWSECK_TEST-9d887eea66819974d4ad447fccca4c1c-X"
              }
            }).then( /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(res) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return _Status["default"].findOne({
                          name: "flutterwave"
                        }).then(function (data) {
                          if (!data) {
                            _Status["default"].create({
                              name: "flutterwave",
                              status_code: res.data.status
                            });

                            console.log("Flutterwave Status Created");
                          } else {
                            _Status["default"].updateOne({
                              name: "flutterwave"
                            }, {
                              $set: {
                                status_code: res.data.status
                              }
                            });

                            console.log("Flutterwave Status Updated");
                          }
                        })["catch"](function (err) {
                          return console.log(err);
                        });

                      case 2:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x2) {
                return _ref4.apply(this, arguments);
              };
            }())["catch"](err = console.log(err));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function flutterwave_availability() {
    return _ref3.apply(this, arguments);
  };
}();