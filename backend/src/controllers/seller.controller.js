const Seller = require("../models/Seller");
const bcrypt = require("bcrypt");
const { sendToken } = require("../utils/generateToken");
const { loginSchema } = require("../validations/seller.validation");

//  Seller Login
exports.login = async (req, res, next) => {
  try {
    //  Validate input (Zod)
    const data = loginSchema.parse(req.body);

    //  Find seller
    const seller = await Seller.findOne({ email: data.email });

    if (!seller) {
      const err = new Error("Seller not found");
      err.status = 404;
      throw err;
    }

    //  Compare password
    const match = await bcrypt.compare(data.password, seller.password);

    if (!match) {
      const err = new Error("Invalid credentials"); // security ke liye generic message
      err.status = 401;
      throw err;
    }

    //  Generate token
    const token = sendToken(res, {
      id: seller._id,
      role: "seller",
    });

    res.status(200).json({
      success: true,
      token,
      role: "seller",
    });

  } catch (err) {
    next(err);
  }
};
