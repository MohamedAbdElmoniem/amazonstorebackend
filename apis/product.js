var mongoose = require("mongoose");
var ProductModel = require("../models/product");

function createProductApis(app) {
  // add-product api

  app.post("/addproduct", async (req, resp) => {
    try {
      const {
        product_name,
        brand,
        model,
        color,
        price,
        discount,
        category
      } = req.body;

      let product = new ProductModel({
        _id: mongoose.Types.ObjectId(),
        product_name,
        brand,
        model,
        color,
        price,
        discount,
        category
      });

      await product.save();
      resp.json({ message: "success" });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });

  // remove product - api

  app.post("/removeproduct", async (req, resp) => {
    const { id } = req.body;
    await ProductModel.remove({ _id: id });
    resp.json({ message: "removed" });
  });

  // find all categories api

  app.post("/getallproducts", async (req, resp) => {
    const { category_id } = req.body;
    // ana bgeb kol el products bto3 category mo3yna mn 5lal el category_id
    let products = await ProductModel.find({ category: category_id });
    resp.json({ message: "success", products: products });
  });

  // update category api

  app.post("/updateproduct", async (req, resp) => {
    const { id, product_name, price, discount, color, brand, model } = req.body;

    // 3mlt update
    await ProductModel.findOneAndUpdate(
      { _id: id },
      { product_name, price, discount, brand, model, color }
    );

    // b-find el data bta3t el product mn el database b3d el update
    let updatedProduct = await ProductModel.findOne({ _id: id });

    // brg3 el response shayl el category b3d el update
    resp.json({ message: "success", product: updatedProduct });
  });
}

module.exports = createProductApis;
