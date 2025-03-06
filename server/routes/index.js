const express = require("express");
const authRoutes = require("./userAuth");
const categoryRoutes = require("./category");
const productRoutes = require("./product")
const router = express.Router();

router.use("/auth", authRoutes);   
router.use("/category",categoryRoutes); 
router.use("/products", productRoutes); 

module.exports = router;