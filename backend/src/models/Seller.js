const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: String,
    country: String,
    state: String,
    skills: [String],
    password: { type: String, required: true },
    role: { type: String, default: "seller" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Seller", sellerSchema);
