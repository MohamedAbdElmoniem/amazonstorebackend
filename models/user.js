var mongoose = require("mongoose");

var UserModel = new mongoose.model("Users", {
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String,
  email: String,
  phone: String,
  address: String,
  role: String,
  age: { type: Number, maxLength: 2 }
});

module.exports = UserModel;
