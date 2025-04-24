const express = require("express");
const router = express.Router();
const User = require('../models/userSchema');
const Category = require('../models/categorySchema');
const Product = require('../models/productSchema');
const Order = require('../models/orderSchema');
const mongoose = require('mongoose'); // Added mongoose import
const {
  createProductController,
  updateProductController,
  getAllProductsController,
  getProductByIdController,
  deleteProductController,
  uploadImage,
} = require("../controllers/product");

const {
  createCategoryController,
  updateCategoryController,
  getAllCategoriesController,
} = require("../controllers/category");

const {
  getAllUser
} = require("../controllers/cms");

// ✅ Product Routes
router.get("/users", getAllUser);

router.post("/products", uploadImage, createProductController);
router.get("/products", getAllProductsController);
router.get("/products/:productId", getProductByIdController);
router.put("/products/:productId", uploadImage, updateProductController);
router.delete("/products/:productId", deleteProductController);

// New endpoint for updating stock
router.put('/products/:productId/stock', async (req, res) => {
  try {
    const { productId } = req.params;
    const { stock } = req.body;

    if (stock == null || stock < 0) {
      return res.status(400).json({ success: false, message: 'Stock value is required and must be non-negative' });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { stock: Number(stock) },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Stock updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/category/create", uploadImage, createCategoryController);
router.put("/category/:categoryId", uploadImage, updateCategoryController);
router.get("/category", getAllCategoriesController);

router.get('/products/count', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    console.log('Products count:', count); // Debug log
    res.status(200).json({ success: true, count });
  } catch (error) {
    console.error('Error fetching products count:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/categories/count', async (req, res) => {
  try {
    const count = await Category.countDocuments();
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/users/count', async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/orders/count', async (req, res) => {
  try {
    const count = await Order.countDocuments();
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;