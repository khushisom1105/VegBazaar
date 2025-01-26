const Product = require("../models/productSchema"); // Import the Product model

// Create a new product
const createProduct = async (productData) => {
  const product = new Product(productData);
  await product.save();
  return product;
};

// Get all products
const getAllProducts = async () => {
  return await Product.find().populate("category"); // Populating category for better readability
};

// Get a product by ID
const getProductById = async (productId) => {
  return await Product.findById(productId).populate("category");
};

// Update a product by ID
const updateProduct = async (productId, productData) => {
  return await Product.findByIdAndUpdate(productId, productData, { new: true }).populate("category");
};

// Delete a product by ID
const deleteProduct = async (productId) => {
  return await Product.findByIdAndDelete(productId);
};

// Get products by category
const getProductsByCategory = async (categoryId) => {
  return await Product.find({ category: categoryId }).populate("category");
};

// Search products by name
const searchProductsByName = async (name) => {
  return await Product.find({ name: { $regex: name, $options: "i" } }).populate("category");
};

// Update product status
const updateProductStatus = async (productId, status) => {
  return await Product.findByIdAndUpdate(productId, { status }, { new: true });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProductsByName,
  updateProductStatus,
};
