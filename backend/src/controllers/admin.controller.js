const Seller = require("../models/Seller");
const bcrypt = require("bcrypt");
const { sendToken } = require("../utils/generateToken");
const { sellerSchema } = require("../validations/seller.validation");

//  Login (Admin + Seller from DB)
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Seller.findOne({ email });

    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      const err = new Error("Invalid credentials");
      err.status = 401;
      throw err;
    }

    const token = sendToken(res, {
      id: user._id,
      role: user.role,
    });

    res.status(200).json({
      success: true,
      token,
      role: user.role,
    });

  } catch (err) {
    next(err);
  }
};

// ➕ Create Seller (Admin only)
exports.createSeller = async (req, res, next) => {
  try {
    const data = sellerSchema.parse(req.body);

    const exists = await Seller.findOne({ email: data.email });

    if (exists) {
      const err = new Error("Email already exists");
      err.status = 400;
      throw err;
    }

    const hashed = await bcrypt.hash(data.password, 10);

    const seller = await Seller.create({
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      country: data.country,
      state: data.state,
      skills: data.skills,
      password: hashed,
      role: "seller", //  force seller
    });

    res.status(201).json({
      success: true,
      data: seller,
    });

  } catch (err) {
    next(err);
  }
};

//  Get Sellers (only sellers list)
exports.getSellers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const sellers = await Seller.find({ role: "seller" })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      page,
      data: sellers,
    });

  } catch (err) {
    next(err);
  }
};
