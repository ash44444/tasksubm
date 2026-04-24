const Product = require("../models/Product");
const { generatePDF } = require("../utils/pdfGenerator");
const { productSchema } = require("../validations/product.validation");

//  Add Product (SECURE)
exports.add = async (req, res, next) => {
  try {
    //  Validate using Zod
    const data = productSchema.parse(req.body);

    //  Whitelist fields (NO ...req.body)
    const product = await Product.create({
      name: data.name,
      description: data.description,
      brands: data.brands,
      seller: req.user.id,
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

//  Get Products (Only Logged-in Seller)
exports.get = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const products = await Product.find({ seller: req.user.id })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      page,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

//  Get Product PDF
exports.getPDF = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    //  Optional: ensure seller owns product
    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    generatePDF(product, res);
  } catch (err) {
    next(err);
  }
};

// Delete Product (Owner Only)
exports.delete = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await product.deleteOne();

    res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
