const cartServices = require('../services/cartServices');

/**
 * Get the cart for a user
 */
const getCart = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is extracted from auth middleware
    const cart = await cartServices.getUserCart(userId);
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Add a product to the cart
 */
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ success: false, message: 'Product ID and quantity are required' });
    }

    const updatedCart = await cartServices.addToCart(userId, productId, quantity);
    res.status(200).json({ success: true, message: 'Product added to cart', cart: updatedCart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update quantity of a product in the cart
 */
const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({ success: false, message: 'Product ID and new quantity are required' });
    }

    const updatedCart = await cartServices.updateCartQuantity(userId, productId, quantity);
    res.status(200).json({ success: true, message: 'Cart updated', cart: updatedCart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Remove a product from the cart
 */
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    const updatedCart = await cartServices.removeFromCart(userId, productId);
    res.status(200).json({ success: true, message: 'Product removed from cart', cart: updatedCart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Clear the entire cart
 */
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    await cartServices.clearCart(userId);
    res.status(200).json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
};
