const express = require("express");
const router = express.Router();
const {
  createProductController,
  updateProductController,
  getAllProductsController,
  getProductByIdController,
  deleteProductController,
  uploadImage,
} = require("../controllers/product");

const {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart
} = require("../controllers/cart");

// ✅ Product Routes
router.post("/products", uploadImage, createProductController);
router.get("/products", getAllProductsController);
router.get("/products/:productId", getProductByIdController);
router.put("/products/:productId", uploadImage, updateProductController);
router.delete("/products/:productId", deleteProductController);

// ✅ Cart Routes
router.get("/cart", getCart);
router.post("/cart/add", addToCart);
router.put("/cart/update", updateCartQuantity);
router.delete("/cart/remove", removeFromCart);
router.delete("/cart/clear", clearCart);

module.exports = router;
