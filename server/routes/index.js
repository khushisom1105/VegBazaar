const express = require("express");
const authRoutes = require("./userAuth");
<<<<<<< HEAD

const router = express.Router();
router.use("/auth", authRoutes);   
router.use("/category", ()=>{console.log("category");}); 
=======
const categoryRoutes = require("./category");

const router = express.Router();

router.use("/auth", authRoutes);   
router.use("/category",categoryRoutes); 
>>>>>>> 8d869660922595893a7b0a91b7031b9085c99c40
router.use("/products", ()=>{
    console.log("products");
}
); 

module.exports = router;