const express = require("express");
const authRoutes = require("./userAuth");
const categoryRoutes = require("./category");

const router = express.Router();

router.use("/auth", authRoutes);   
router.use("/category",categoryRoutes); 
router.use("/products", ()=>{
    console.log("products");
}
); 

module.exports = router;