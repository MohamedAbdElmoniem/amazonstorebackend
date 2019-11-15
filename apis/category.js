var mongoose = require("mongoose");
var CategoryModel = require("../models/category");

function createCategoryApis(app) {
  // add-category api

  app.post("/addcategory", async (req, resp) => {
    try {
      const { category_name, type } = req.body;

      let category = new CategoryModel({
        _id: mongoose.Types.ObjectId(),
        category_name: category_name,
        type: type
      });

      await category.save();
      resp.json({ message: "success" });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });

  // removecategory - api

  app.post("/removecategory", async (req, resp) => {
    const { id } = req.body;
    await CategoryModel.remove({ _id: id });
    resp.json({ message: "removed" });
  });

  // find all categories api

  app.get("/getallcategories", async (req, resp) => {
    let categories = await CategoryModel.find({});
    resp.json({ message: "success", categories: categories });
  });

  // update category api

  app.post("/updatecategory", async (req, resp) => {
    const { id, category_name, type } = req.body;

    // 3mlt update
    await CategoryModel.findOneAndUpdate(
      { _id: id },
      { category_name: category_name, type: type }
    );

    // b-find el data bta3t el category mn el database b3d el update
    let updatedCategory = await CategoryModel.findOne({ _id: id });

    // brg3 el response shayl el category b3d el update
    resp.json({ message: "success", category: updatedCategory });
  });
}

module.exports = createCategoryApis;
