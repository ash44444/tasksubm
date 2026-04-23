const Product = require("../models/Product");
const { generatePDF } = require("../utils/pdfGenerator");

exports.add = async (req, res, next) => {
  try {
    const product = await Product.create({
      ...req.body,
      seller: req.user.id,
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const products = await Product.find({ seller: req.user.id })
      .skip((page - 1) * 5)
      .limit(5);

    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.getPDF = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    generatePDF(product, res);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await product.deleteOne();

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
