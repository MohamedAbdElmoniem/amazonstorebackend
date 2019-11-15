var mongoose = require("mongoose");

var ReviewModel = new mongoose.model("Reviews", {
  _id: mongoose.Schema.Types.ObjectId,
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
  review_date: String,
  rate: { type: Number, max: 5, min: 1 }
});

module.exports = ReviewModel;
