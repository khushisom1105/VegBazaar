const express = require("express");
const authRoutes = require("./userAuth");
const categoryRoutes = require("./category");
const productRoutes = require("./product")
const cmsRoutes = require("./cms");
const Order = require("../models/orderSchema");
const orderRoutes = require("./orderRoutes")
const router = express.Router();

router.use("/auth", authRoutes);   
router.use("/category",categoryRoutes); 
router.use("/products", productRoutes); 
router.use("/cms", cmsRoutes); 
router.use("/order", orderRoutes); 
module.exports = router;