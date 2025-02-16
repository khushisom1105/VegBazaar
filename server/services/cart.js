const Cart = require('../models/cart');

/**
 * Get a user's cart
 * @param {string} userId - ID of the user
 * @returns {Promise<Object>} - The user's cart
 */
const getUserCart = async (userId) => {
  return await Cart.findOne({ userId }).populate('products.productId');
};

/**
 * Add a product to the cart
 * @param {string} userId - ID of the user
 * @param {string} productId - ID of the product
 * @param {number} quantity - Quantity of the product
 * @returns {Promise<Object>} - Updated cart
 */
const addToCart = async (userId, productId, quantity) => {
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    // Create new cart if not found
    cart = new Cart({ userId, products: [{ productId, quantity }] });
  } else {
    // Check if product already exists in cart
    const existingProduct = cart.products.find(item => item.productId.toString() === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
  }

  return await cart.save();
};

/**
 * Update product quantity in the cart
 * @param {string} userId - ID of the user
 * @param {string} productId - ID of the product
 * @param {number} quantity - New quantity
 * @returns {Promise<Object>} - Updated cart
 */
const updateCartQuantity = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) throw new Error('Cart not found');

  const product = cart.products.find(item => item.productId.toString() === productId);
  if (!product) throw new Error('Product not found in cart');

  if (quantity > 0) {
    product.quantity = quantity;
  } else {
    cart.products = cart.products.filter(item => item.productId.toString() !== productId);
  }

  return await cart.save();
};

/**
 * Remove a product from the cart
 * @param {string} userId - ID of the user
 * @param {string} productId - ID of the product
 * @returns {Promise<Object>} - Updated cart
 */
const removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new Error('Cart not found');

  cart.products = cart.products.filter(item => item.productId.toString() !== productId);
  return await cart.save();
};

/**
 * Clear the entire cart for a user
 * @param {string} userId - ID of the user
 * @returns {Promise<Object>} - Empty cart
 */
const clearCart = async (userId) => {
  return await Cart.findOneAndDelete({ userId });
};

module.exports = {
  getUserCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart
};
