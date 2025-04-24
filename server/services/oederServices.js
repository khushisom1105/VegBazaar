const Order = require("../models/orderSchema");
const Product = require("../models/productSchema")
class OrderService {
  // ✅ Place a new order
  static async placeOrder(userId, orderData) {
    try {

      for (const item of orderData.products) {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Product with ID ${item.product} not found`);
        }
        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product: ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`);
        }
      }

      const order = new Order({ user: userId, ...orderData });
      await order.save();
      console.log(orderData , "orderData")

      for (const item of orderData.products) {
        await Product.findByIdAndUpdate(
          item.product,
          { $inc: { stock: -item.quantity } }, // Decrease stock
          { new: true }
        );
      }

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
