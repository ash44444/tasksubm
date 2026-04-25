const Seller = require("../models/Seller");
const bcrypt = require("bcrypt");
const { sendToken } = require("../utils/generateToken");
const { sellerSchema } = require("../validations/seller.validation");

//  Admin Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email !== "admin@gmail.com" || password !== "admin123") {
      const err = new Error("Invalid credentials");
      err.status = 401;
      throw err;
    }

    const token = sendToken(res, { role: "admin" });

    res.status(200).json({
      success: true,
      token,
      role: "admin",
    });
  } catch (err) {
    next(err);
  }
};

//  Create Seller
exports.createSeller = async (req, res, next) => {
  try {
    // Zod validation
    const data = sellerSchema.parse(req.body);

    //  Check existing user
    const exists = await Seller.findOne({ email: data.email });

    if (exists) {
      const err = new Error("Email already exists");
      err.status = 400;
      throw err;
    }

    //  Hash password
    const hashed = await bcrypt.hash(data.password, 10);

    //  Create seller
    const seller = await Seller.create({
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      country: data.country,
      state: data.state,
      skills: data.skills,
      password: hashed,
    });

    res.status(201).json({
      success: true,
      data: seller,
    });

  } catch (err) {
    next(err);
  }
};

//  Get Sellers (Pagination)
exports.getSellers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const sellers = await Seller.find()
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
