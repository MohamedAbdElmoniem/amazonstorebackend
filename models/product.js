var mongoose = require("mongoose");

var ProductModel = new mongoose.model("Products", {
  _id: mongoose.Schema.Types.ObjectId,
  product_name: String,
  brand: String,
  model: String,
  color: String,
  price: String,
  discount: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Categories" }
});

module.exports = ProductModel;
