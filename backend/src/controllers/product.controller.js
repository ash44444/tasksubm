const Product = require("../models/Product");
const { generatePDF } = require("../utils/pdfGenerator");
const { productSchema } = require("../validations/product.validation");

// ➕ Add Product
exports.add = async (req, res, next) => {
  try {
    //  Validate input
    const data = productSchema.parse(req.body);

    const product = await Product.create({
      name: data.name,
      description: data.description,
      brands: data.brands,
      seller: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: product,
    });

  } catch (err) {
    next(err);
  }
};

//  Get Products (Seller only)
exports.get = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const products = await Product.find({ seller: req.user.id })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
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
      const err = new Error("Product not found");
      err.status = 404;
      throw err;
    }

    //  Ownership check
    if (product.seller.toString() !== req.user.id) {
      const err = new Error("Forbidden");
      err.status = 403;
      throw err;
    }

    //  Generate PDF
    generatePDF(product, res);

  } catch (err) {
    next(err);
  }
};

//  Delete Product
exports.delete = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      const err = new Error("Product not found");
      err.status = 404;
      throw err;
    }

    //  Ownership check
    if (product.seller.toString() !== req.user.id) {
      const err = new Error("Forbidden");
      err.status = 403;
      throw err;
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });

  } catch (err) {
    next(err);
  }
};
