const express = require("express");
const router = express.Router();

const {
    createCategoryController,
    updateCategoryController,
    getAllCategoriesController,
    uploadImage, // Middleware for handling image uploads
  } = require("../controllers/category");
const {
    isRequestValidated,
} = require("../validator/auth");

router.post("/create",isRequestValidated, uploadImage, createCategoryController);
router.put("/:categoryId",isRequestValidated, uploadImage, updateCategoryController);
router.get("/fetch",isRequestValidated, getAllCategoriesController);

module.exports = router;