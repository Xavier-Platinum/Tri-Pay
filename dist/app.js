"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = require("./middleware/cors");

var _morgan = _interopRequireDefault(require("morgan"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _index = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MongoStore = require("connect-mongo"); //Importing Routes


var app = (0, _express["default"])(); // Mongoose

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true // serverApi: ServerApiVersion.v1

};

_mongoose["default"].connect("mongodb+srv://Vircom_v1:Vircom_2021@vircom-v1.xzwnx.mongodb.net/Vircom_v1?retryWrites=true&w=majority", options).then(function () {
  return console.log("Database connection established");
})["catch"](function (err) {
  return console.error("There was an error connecting to database, the err is ".concat(err));
}); //middlewares


app.all('*', _cors.cors);
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json({
  limit: '100mb'
}));
app.use(_express["default"].urlencoded({
  limit: '50mb',
  'extended': 'true'
}));
app.use(_express["default"].json({
  type: 'application/vnd.api+json'
}));
app.use((0, _cookieParser["default"])());
app.use((0, _expressSession["default"])({
  secret: "process.env.SESSION_SECRET",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1209600000
  },
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://Vircom_v1:Vircom_2021@vircom-v1.xzwnx.mongodb.net/Vircom_v1?retryWrites=true&w=majority" // autoReconnect: true,

  })
})); // check_availability();
//routes

app.use("/api/payment", _index["default"]);
var _default = app;
exports["default"] = _default;