var mongoose = require("mongoose");

var PurchasesModel = new mongoose.model("Purchases", {
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
  quantity: { type: Number, min: 1, max: 10 },
  purchase_date: String,
  payment_method: String,
  paid: Number,
  remaining: Number
});

module.exports = PurchasesModel;
