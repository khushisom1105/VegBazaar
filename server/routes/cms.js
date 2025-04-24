const express = require("express");
const router = express.Router();
const User = require('../models/userSchema');
const Category = require('../models/categorySchema');
const Product = require('../models/productSchema');
const Order = require('../models/orderSchema');
const Comment = require('../models/commentSchema');
const mongoose = require('mongoose');

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

// ✅ User Routes
router.get("/users", getAllUser);

// ✅ Product Routes
router.post("/products", uploadImage, createProductController);
router.get("/products", getAllProductsController);
router.get("/products/:productId", getProductByIdController);
router.put("/products/:productId", uploadImage, updateProductController);
router.delete("/products/:productId", deleteProductController);

// Update product stock
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

// ✅ Category Routes
router.post("/category/create", uploadImage, createCategoryController);
router.put("/category/:categoryId", uploadImage, updateCategoryController);
router.get("/category", getAllCategoriesController);

// ✅ Comment Routes
router.post('/comments', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }
    const comment = new Comment({ message });
    await comment.save();
    res.status(201).json({ success: true, comment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/comments/:commentId/reply', async (req, res) => {
  try {
    const { commentId } = req.params;
    const { reply } = req.body;
    if (!reply) {
      return res.status(400).json({ success: false, message: 'Reply is required' });
    }
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ success: false, message: 'Invalid comment ID' });
    }
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { reply, replied: true },
      { new: true, runValidators: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }
    res.status(200).json({ success: true, comment: updatedComment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Order Routes
router.get('/orders/count', async (req, res) => {
  try {
    const count = await Order.countDocuments();
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Fetch all orders
router.get('/order', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'email')
      .populate('products.product');
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update order status
router.put('/order/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['pending', 'shipped', 'delivered', 'cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: pending, shipped, delivered, cancelled',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid order ID' });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = status;
    order.updatedAt = Date.now();
    await order.save();

    // Populate user and product details for the response
    const updatedOrder = await Order.findById(id)
      .populate('user', 'email')
      .populate('products.product');

    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Count Routes
router.get('/products/count', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    console.log('Products count:', count);
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

module.exports = router;