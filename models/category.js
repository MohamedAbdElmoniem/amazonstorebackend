var mongoose = require("mongoose");

var CategoryModel = new mongoose.model("Categories", {
  _id: mongoose.Schema.Types.ObjectId,
  category_name: String,
  type: String
});

module.exports = CategoryModel