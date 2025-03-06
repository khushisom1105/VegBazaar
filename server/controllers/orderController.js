const OrderService = require("../services/oederServices");
const { getUser } = require("../services/userAuth");
// ✅ Place Order
exports.placeOrder = async (req, res) => {
  try {
    const auth = getUser(req.headers.authorization);
    const userId = auth.id; 
    const orderData = req.body;
    const order = await OrderService.placeOrder(userId, orderData);
    res.status(201).json({ success: true, message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get orders for a specific user
exports.getUserOrders = async (req, res) => {
  try {
    const auth = getUser(req.headers.authorization);
    const userId = auth.id; 
    console.log("user id",userId)
    const orders = await OrderService.getUserOrders(userId);
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrderService.getAllOrders();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
