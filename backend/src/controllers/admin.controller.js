const Seller = require("../models/Seller");
const bcrypt = require("bcrypt");
const { sendToken } = require("../utils/generateToken");

exports.login = async (req, res, next) => {
  try {
    if (
      req.body.email !== "admin@gmail.com" ||
      req.body.password !== "admin123"
    ) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = sendToken(res, { role: "admin" });
    res.json({ token, role: "admin" });
  } catch (err) {
    next(err);
  }
};

exports.createSeller = async (req, res, next) => {
  try {
    const exists = await Seller.findOne({ email: req.body.email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashed = await bcrypt.hash(req.body.password, 10);

    const seller = await Seller.create({
      ...req.body,
      password: hashed,
    });

    res.status(201).json(seller);
  } catch (err) {
    next(err);
  }
};

exports.getSellers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const sellers = await Seller.find()
      .skip((page - 1) * 5)
      .limit(5);

    res.json(sellers);
  } catch (err) {
    next(err);
  }
};
