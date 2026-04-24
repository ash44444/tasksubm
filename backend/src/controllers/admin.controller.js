const Seller = require("../models/Seller");
const bcrypt = require("bcrypt");
const { sendToken } = require("../utils/generateToken");
const { sellerSchema } = require("../validations/seller.validation");

//  Admin Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email !== "admin@gmail.com" || password !== "admin123") {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = sendToken(res, { role: "admin" });

    res.status(200).json({
      token,
      role: "admin",
    });
  } catch (err) {
    next(err);
  }
};

//  Create Seller (SECURE VERSION)
exports.createSeller = async (req, res, next) => {
  try {
    //  Validate input using Zod
    const data = sellerSchema.parse(req.body);

    const exists = await Seller.findOne({ email: data.email });
    if (exists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Hash password
    const hashed = await bcrypt.hash(data.password, 10);

    // Whitelist fields (NO ...req.body)
    const seller = await Seller.create({
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      country: data.country,
      state: data.state,
      skills: data.skills,
      password: hashed,
    });

    res.status(201).json(seller);
  } catch (err) {
    next(err);
  }
};

// Get Sellers (Pagination)
exports.getSellers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const sellers = await Seller.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      page,
      data: sellers,
    });
  } catch (err) {
    next(err);
  }
};
