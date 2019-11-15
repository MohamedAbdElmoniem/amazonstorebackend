var mongoose = require("mongoose");
var PurchaseModel = require("../models/purchase");

function createReviewsApis(app) {
  // add-review api

  app.post("/addpurchase", async (req, resp) => {
    try {
      const {
        user,
        product,
        quantity,
        purchase_date,
        payment_method,
        paid,
        remaining
      } = req.body;

      let purchase = new PurchaseModel({
        _id: mongoose.Types.ObjectId(),
        user,
        product,
        quantity,
        purchase_date,
        payment_method,
        paid,
        remaining
      });

      await review.save();
      resp.json({ message: "success" });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });

  // remove product - api

  //   app.post("/removereview", async (req, resp) => {
  //     const { id } = req.body;
  //     await PurchaseModel.remove({ _id: id });
  //     resp.json({ message: "removed" });
  //   });

  // find all reviews api

  app.post("/getallpurchasesbyuserid", async (req, resp) => {
    const { user_id } = req.body;
    // ana bgeb kol el products bto3 review mo3yna mn 5lal el review_id
    let purchases = await PurchaseModel.find({ user: user_id });
    resp.json({ message: "success", purchases: purchases });
  });

  app.post("/getallpurchasesbyproductid", async (req, resp) => {
    const { product_id } = req.body;
    // ana bgeb kol el products bto3 review mo3yna mn 5lal el review_id
    let purchases = await PurchaseModel.find({ product: product_id });
    resp.json({ message: "success", purchases: purchases });
  });

  // update review api

  app.post("/updatepurchase", async (req, resp) => {
    const { id, content, user, product, rate } = req.body;

    // 3mlt update
    //new Date().toString()  --> current Date
    await ProductModel.findOneAndUpdate(
      { _id: id },
      { user, product, quantity, payment_method, paid, remaining }
    );

    // b-find el data bta3t el review mn el database b3d el update
    let updatedReview = await PurchaseModel.findOne({ _id: id });

    // brg3 el response shayl el category b3d el update
    resp.json({ message: "success", review: updatedReview });
  });
}

module.exports = createReviewsApis;
