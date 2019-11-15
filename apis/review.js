var mongoose = require("mongoose");
var ReviewModel = require("../models/review");

function createReviewsApis(app) {
  // add-review api

  app.post("/addreview", async (req, resp) => {
    try {
      const { content, user, product, review_date, rate } = req.body;

      let review = new ReviewModel({
        _id: mongoose.Types.ObjectId(),
        content,
        user,
        product,
        review_date,
        rate
      });

      await review.save();
      resp.json({ message: "success" });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });

  // remove product - api

  app.post("/removereview", async (req, resp) => {
    const { id } = req.body;
    await ReviewModel.remove({ _id: id });
    resp.json({ message: "removed" });
  });

  // find all reviews api

  app.post("/getallreviews", async (req, resp) => {
    const { product_id } = req.body;
    // ana bgeb kol el products bto3 review mo3yna mn 5lal el review_id
    let reviews = await ReviewModel.find({ product: product_id });
    resp.json({ message: "success", reviews: reviews });
  });

  // update review api

  app.post("/updatereview", async (req, resp) => {
    const { id, content, user, product, rate } = req.body;

    // 3mlt update
    //new Date().toString()  --> current Date
    await ProductModel.findOneAndUpdate(
      { _id: id },
      { content, user, product, rate, review_date: new Date().toString() }
    );

    // b-find el data bta3t el review mn el database b3d el update
    let updatedReview = await ReviewModel.findOne({ _id: id });

    // brg3 el response shayl el category b3d el update
    resp.json({ message: "success", review: updatedReview });
  });
}

module.exports = createReviewsApis;
