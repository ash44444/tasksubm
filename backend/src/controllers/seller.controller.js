const Seller = require("../models/Seller");
const bcrypt = require("bcrypt");
const { sendToken } = require("../utils/generateToken");

exports.login = async (req, res, next) => {
  try {
    const seller = await Seller.findOne({ email: req.body.email });

    if (!seller) return res.status(404).json({ message: "Seller not found" });

    const match = await bcrypt.compare(req.body.password, seller.password);

    if (!match) return res.status(401).json({ message: "Invalid password" });

    const token = sendToken(res, { id: seller._id, role: "seller" });

    res.json({ token, role: "seller" });
  } catch (err) {
    next(err);
  }
};
