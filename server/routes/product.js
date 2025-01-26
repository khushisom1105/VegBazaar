const express = require("express");
const router = express.Router();
const {
  createProductController,
  updateProductController,
  getAllProductsController,
  getProductByIdController,
  deleteProductController,
  uploadImage,
} = require("../controllers/product");

router.post("/", uploadImage, createProductController);
router.get("/", getAllProductsController);
router.get("/:productId", getProductByIdController);
router.put("/:productId", uploadImage, updateProductController);
router.delete("/:productId", deleteProductController);

module.exports = router;
