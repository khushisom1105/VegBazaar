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

const {
    createCategoryController,
    updateCategoryController,
    getAllCategoriesController,
    //uploadImage, // Middleware for handling image uploads
  } = require("../controllers/category");

const {
getAllUser
} = require("../controllers/cms");


// ✅ Product Routes
router.get("/users", getAllUser);

router.post("/products", uploadImage, createProductController);
router.get("/products", getAllProductsController);
router.get("/products/:productId", getProductByIdController);
router.put("/products/:productId", uploadImage, updateProductController);
router.delete("/products/:productId", deleteProductController);

router.post("category/create", uploadImage, createCategoryController);
router.put("/category/:categoryId", uploadImage, updateCategoryController);
router.get("/category", getAllCategoriesController);


module.exports = router;
