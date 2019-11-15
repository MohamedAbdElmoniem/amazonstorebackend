var express = require("express");
var app = express();
var session = require("express-session");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var uuid = require("uuid/v4");
var mongoose = require("mongoose");

var UserAPIS = require("./apis/user");
var CategoryAPIS = require("./apis/category");
var ProductAPIS = require("./apis/product");
var ReviewAPIS = require("./apis/review");
var PurchaseAPIS = require("./apis/purchase");

// middleware
app.use(express.json()); // el line da bdal el body parser
app.use(
  session({
    genid: uuid,
    secret: "mysessionsecret...",
    saveUninitialized: false
  })
);
app.use(cookieParser());

mongoose.connect("mongodb://admin:admin123@ds063180.mlab.com:63180/amazonstore");

// default api
app.get("/", async (req, resp) => {
  resp.send("server is running....");
});

UserAPIS(app);
CategoryAPIS(app);
ProductAPIS(app);
ReviewAPIS(app);
PurchaseAPIS(app);

app.listen(process.env.PORT);
