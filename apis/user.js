var mongoose = require("mongoose");
var UserModel = require("../models/user");

function createUserApis(app) {
  // signup - api

  app.post("/signup", async (req, resp) => {
    try {
      // ana ba5od el data mn el body bta3 el request
      const { username, password, address, phone, email, age, role } = req.body;

      // b-create new user mn el UserModel
      let user = new UserModel({
        _id: mongoose.Types.ObjectId(), // el function ObjectId() --> bt-generate id gded
        username: username,
        password: password,
        age: age,
        email: email,
        phone: phone,
        role: role,
        address: address
      });
      // save --> 7ot el user fl database fl collection ( Users )
      await user.save();
      resp.json({ message: "success" });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });

  // signin - api

  app.post("/signin", async (req, resp) => {
    try {
      // ana hna ba5od el username wl password mn el body bta3 el request ely gy mn el frontend aw el postman
      const { username, password } = req.body;

      // ana hna b3ml find lel user mn el database
      let user = await UserModel.findOne({ username, password });

      // law el user mwgod f3lan fl database w reg3 mnha hro7 a3ml new session
      if (user) {
        req.session.user = user;
        resp.json({ message: "success", user: user });
      } else {
        resp.json({ message: "not found" });
      }
    } catch (err) {
      resp.json({ message: "error" });
    }
  });

  // logout - api

  app.get("/signout", async (req, resp) => {
    // destory --> btms7 el current session mn el application fl backend
    await req.session.destroy();
    resp.json({ message: "success" });
  });

  app.post("/getuserdetails", async (req, resp) => {
    const { id } = req.body;

    let user = await UserModel.findOne({ _id: id });
    if (user) {
      resp.json({ message: "success", user: user });
    } else {
      resp.json({ message: "error" });
    }
  });
}

module.exports = createUserApis;
