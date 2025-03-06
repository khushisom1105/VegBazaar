const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");


// ✅ Place Order (User)
router.post("/", orderController.placeOrder);

// ✅ Fetch Orders for a User
router.get("/user", orderController.getUserOrders);

// ✅ Fetch All Orders (Admin)
router.get("/", orderController.getAllOrders);

module.exports = router;
