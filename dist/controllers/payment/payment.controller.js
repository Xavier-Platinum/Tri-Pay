"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paystack_verify_payment = exports.flutterwave_verify_payment = exports.create_payment = void 0;

var _Payment = _interopRequireDefault(require("../../models/Payments/Payment.model"));

var _flutterwave = require("../../utils/helpers/flutterwave");

var _paystack = require("../../utils/helpers/paystack");

var _crypto = _interopRequireDefault(require("crypto"));

var _Status = _interopRequireDefault(require("../../models/Init/Status"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var create_payment = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _Status["default"].find({
              name: "paystack"
            }).then( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(result) {
                var _req$body, name, email, amount, flutterwave_data, _yield$createPayment, data, transaction_payload, _req$body2, _name, _email, _amount, paystack_data, payment_gateway_response, transation_payload;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (!(result.status_code === 503)) {
                          _context3.next = 16;
                          break;
                        }

                        _req$body = req.body, name = _req$body.name, email = _req$body.email, amount = _req$body.amount;

                        if (!(!name || !email || !amount)) {
                          _context3.next = 4;
                          break;
                        }

                        return _context3.abrupt("return", res.json({
                          msg: "Invalid Body"
                        }));

                      case 4:
                        if (!(parseInt(amount) < 50)) {
                          _context3.next = 6;
                          break;
                        }

                        return _context3.abrupt("return", res.json({
                          msg: "Amount must be ₦500"
                        }));

                      case 6:
                        flutterwave_data = {
                          tx_ref: _crypto["default"].randomBytes(4).toString("hex"),
                          amount: amount,
                          currency: "NGN",
                          redirect_url: "http://localhost:5000/flutterwave/verify",
                          customer: {
                            email: email,
                            name: name
                          },
                          customizations: {
                            title: "Tri_Pay"
                          }
                        };
                        _context3.next = 9;
                        return (0, _flutterwave.createPayment)(flutterwave_data);

                      case 9:
                        _yield$createPayment = _context3.sent;
                        data = _yield$createPayment.data;
                        transaction_payload = {
                          amount: amount,
                          reference: tx_ref,
                          name: name,
                          email: email,
                          status: "pending",
                          payment_gateway: "flutter-wave"
                        };
                        _context3.next = 14;
                        return _Payment["default"].create(transaction_payload).then( /*#__PURE__*/function () {
                          var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(response) {
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    return _context.abrupt("return", res.status(301).json({
                                      message: "Saved",
                                      response: response,
                                      redirect_link: data.link
                                    }));

                                  case 1:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          }));

                          return function (_x5) {
                            return _ref3.apply(this, arguments);
                          };
                        }())["catch"](function (err) {
                          return res.status(400).json({
                            err: err
                          });
                        });

                      case 14:
                        _context3.next = 28;
                        break;

                      case 16:
                        _req$body2 = req.body, _name = _req$body2.name, _email = _req$body2.email, _amount = _req$body2.amount;

                        if (!(!_name || !_email || !_amount)) {
                          _context3.next = 19;
                          break;
                        }

                        return _context3.abrupt("return", res.json({
                          msg: "All fields are required"
                        }));

                      case 19:
                        if (!(parseInt(_amount) < 50)) {
                          _context3.next = 21;
                          break;
                        }

                        return _context3.abrupt("return", res.json({
                          msg: "Amount must be ₦500"
                        }));

                      case 21:
                        // payload to send to paystack to initialize a transaction
                        paystack_data = {
                          amount: parseInt(_amount) * 100,
                          email: _email,
                          reference: _crypto["default"].randomBytes(4).toString("hex")
                        };
                        _context3.next = 24;
                        return (0, _paystack.initializePayment)(paystack_data);

                      case 24:
                        payment_gateway_response = _context3.sent;
                        transation_payload = {
                          amount: parseInt(_amount),
                          status: "pending",
                          reference: paystack_data.reference,
                          access_code: payment_gateway_response.data.access_code,
                          payment_gateway: "paystack"
                        };
                        _context3.next = 28;
                        return _Payment["default"].create(transation_payload).then( /*#__PURE__*/function () {
                          var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(response) {
                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                              while (1) {
                                switch (_context2.prev = _context2.next) {
                                  case 0:
                                    return _context2.abrupt("return", res.status(301).json({
                                      message: "Saved",
                                      response: response,
                                      redirect_link: payment_gateway_response.data.authorization_url
                                    }));

                                  case 1:
                                  case "end":
                                    return _context2.stop();
                                }
                              }
                            }, _callee2);
                          }));

                          return function (_x6) {
                            return _ref4.apply(this, arguments);
                          };
                        }())["catch"](function (err) {
                          return res.status(400).json({
                            err: err
                          });
                        });

                      case 28:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }())["catch"](function (err) {
              res.json({
                msg: "No response recorded"
              });
            });

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function create_payment(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.create_payment = create_payment;

var flutterwave_verify_payment = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
    var transactionDetails, response;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!(req.query.status === 'successful')) {
              _context5.next = 13;
              break;
            }

            _context5.next = 3;
            return _Payment["default"].find({
              ref: req.query.tx_ref
            });

          case 3:
            transactionDetails = _context5.sent;
            _context5.next = 6;
            return flw.Transaction.verify({
              id: req.query.transaction_id
            });

          case 6:
            response = _context5.sent;
            console.log(response, transactionDetails);

            if (!(response.data.status === "successful" && response.data.amount === transactionDetails.amount && response.data.currency === "NGN")) {
              _context5.next = 13;
              break;
            }

            _context5.next = 11;
            return _Payment["default"].updateOne({
              reference: reference
            }, {
              $set: {
                status: "success"
              }
            });

          case 11:
            _context5.next = 13;
            break;

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function flutterwave_verify_payment(_x7, _x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

exports.flutterwave_verify_payment = flutterwave_verify_payment;

var paystack_verify_payment = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
    var trxref, payment_status, _payment_status$data$, status, ip_address, reference, currency, channel;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            trxref = req.query.trxref;

            if (trxref) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt("return", res.json({
              msg: "Transaction Ref not found"
            }));

          case 3:
            _context6.next = 5;
            return (0, _paystack.verifyPayment)(trxref);

          case 5:
            payment_status = _context6.sent;
            _payment_status$data$ = payment_status.data.data, status = _payment_status$data$.status, ip_address = _payment_status$data$.ip_address, reference = _payment_status$data$.reference, currency = _payment_status$data$.currency, channel = _payment_status$data$.channel;
            _context6.next = 9;
            return _Payment["default"].updateOne({
              reference: reference
            }, {
              $set: {
                status: status
              },
              ip_address: ip_address,
              reference: reference,
              currency: currency,
              channel: channel
            }).then(function (data) {
              return res.status(200).json({
                message: "success",
                body: data
              });
            })["catch"](function (err) {
              return res.status(400).json(err);
            });

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function paystack_verify_payment(_x10, _x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.paystack_verify_payment = paystack_verify_payment;