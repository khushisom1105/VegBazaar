const Order = require("../models/orderSchema");

class OrderService {
  // ✅ Place a new order
  static async placeOrder(userId, orderData) {
    try {
      const order = new Order({ user: userId, ...orderData });
      await order.save();
      return order;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // ✅ Fetch orders for a specific user
  static async getUserOrders(userId) {
    try {
      return await Order.find({ user: userId }).populate("products.product");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // ✅ Fetch all orders (Admin)
  static async getAllOrders() {
    try {
      return await Order.find().populate("user", "name email").populate("products.product");
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = OrderService;
