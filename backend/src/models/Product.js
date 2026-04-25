const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: String,
  detail: String,
  image: String,
  price: Number,
});

const productSchema = new mongoose.Schema(
  {
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
    name: String,
    description: String,
    brands: [brandSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
