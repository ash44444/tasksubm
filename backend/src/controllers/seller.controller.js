const Seller = require("../models/Seller");
const bcrypt = require("bcrypt");
const { sendToken } = require("../utils/generateToken");
const { loginSchema } = require("../validations/seller.validation");

//  Seller Login
exports.login = async (req, res, next) => {
  try {
    //  Validate input
    const data = loginSchema.parse(req.body);

    //  Find seller
    const seller = await Seller.findOne({ email: data.email });

    if (!seller) {
      return res.status(404).json({
        message: "Seller not found",
      });
    }

    //  Compare password
    const match = await bcrypt.compare(data.password, seller.password);

    if (!match) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    //  Generate token
    const token = sendToken(res, {
      id: seller._id,
      role: "seller",
    });

    res.status(200).json({
      token,
      role: "seller",
    });

  } catch (err) {
    next(err);
  }
};
