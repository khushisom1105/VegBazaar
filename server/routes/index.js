const express = require("express");
 const authRoutes = require("./userAuth");
// const productRoutes = require("./product");
const router = express.Router();

router.use("/auth", authRoutes);    
router.use("/veggie", ()=>{
    console.log("veggie");}
); 

module.exports = router;
