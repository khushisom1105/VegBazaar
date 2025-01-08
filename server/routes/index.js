const express = require("express");
const authRoutes = require("./userAuth");

const router = express.Router();
router.use("/auth", authRoutes);   
router.use("/category", ()=>{console.log("category");}); 
router.use("/products", ()=>{
    console.log("products");
}
); 

module.exports = router;