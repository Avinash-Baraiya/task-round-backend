import Product from "../models/product.model.js";
import ErrorHandler from "../middleware/error.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";

// GET all products (with optional query filtering)
const getProducts = catchAsyncErrors(async (req, res, next) => {
  const query = req.query || {};
  const products = await Product.find(query);
  res.status(200).json(products);
});

// GET single product by ID
const getProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json(product);
});

// POST create product
const createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// PUT update product
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json(product);
});

// DELETE product
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

export {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
