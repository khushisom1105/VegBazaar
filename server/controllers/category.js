const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const { createUser, getUserById, getUserByemail, getUserByPhone } = require("../services/category.js");
require("dotenv").config();
const categoryServices = require('../services/category.js');  // Make sure you import the services
const cloudinary = require('../utils/cloudinary.js');  // Cloudinary config
const multer = require('multer');  // Multer for file handling

// Configure multer for temporary image storage
const upload = multer({ dest: 'uploads/' });  // Store images temporarily before Cloudinary upload

const createCategoryController = async (req, res) => {
  try {
    // Get category data from the request body
    const { name, description, slug, status } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ message: 'Name and slug are required.' });
    }

    // If image is uploaded, use multer to handle it
    const imageFile = req.file;

    let imageUrl = null;  // Initialize imageUrl as null

    // If an image was uploaded, handle the upload to Cloudinary
    if (imageFile) {
      const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
        folder: 'categories',  // Upload images to 'categories' folder on Cloudinary
        use_filename: true,
        unique_filename: false,
      });

      imageUrl = uploadResult.secure_url;  // Get the image URL from Cloudinary
    }

    // Create category data object
    const categoryData = {
      name,
      description,
      slug,
      image: imageUrl || null,  // If no image, set to null
      status: status || 'active', // Default to active if not provided
    };

    // Call the service to create the category
    const newCategory = await categoryServices.createCategory(categoryData);

    // Respond with the newly created category
    res.status(201).json({
      message: 'Category created successfully',
      category: newCategory,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Error creating category', error: error.message });
  }
};

// Middleware to handle image upload (for the create route)
const uploadImage = upload.single('image');  
const updateCategoryController = async (req, res) => {
    try {
      const { categoryId } = req.params;  // Get categoryId from URL parameter
      const { name, description, slug, image, status } = req.body;
  
      // Ensure that at least one field is provided to update
      if (!name && !slug && !description && !status) {
        return res.status(400).json({ message: 'At least one field must be provided to update.' });
      }
  
      // Prepare the category data for update
      const categoryData = {
        name,
        description,
        slug,
        image: image || null,
        status: status || 'active',
      };
  
      // Call service to update category
      const updatedCategory = await categoryServices.updateCategory(categoryId, categoryData);
  
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found.' });
      }
  
      // Return the updated category
      res.status(200).json({
        message: 'Category updated successfully',
        category: updatedCategory,
      });
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ message: 'Error updating category', error: error.message });
    }
  };
  
  // Controller function to fetch all categories
  const getAllCategoriesController = async (req, res) => {
    try {
      const categories = await categoryServices.getAllCategories();
      res.status(200).json({
        message: 'Categories fetched successfully',
        categories: categories,
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
  };
  
  module.exports = {
    createCategoryController,
    updateCategoryController,
    getAllCategoriesController
  };
  
