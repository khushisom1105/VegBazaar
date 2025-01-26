const { StatusCodes } = require("http-status-codes");
const categoryServices = require("../services/category.js"); // Import category services
const cloudinary = require("../config/cloudinary.js"); // Import Cloudinary configuration
const multer = require("multer"); // Import multer for file uploads
const upload = multer({ dest: "uploads/" }); // Configure multer to use a temporary 'uploads/' folder

const createCategoryController = async (req, res) => {
  try {
    // Destructure fields from the request body
    const { name, description, slug, status } = req.body;

    if (!name || !slug) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Name and slug are required." });
    }

    const imageFile = req.file;

    // Upload the image to Cloudinary, if provided
    let imageUrl = null;
    if (imageFile) {
      const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
        folder: "VegBazaar",
        use_filename: true,
        unique_filename: false,
      });
      imageUrl = uploadResult.secure_url; // Cloudinary URL for the uploaded image
    }

    // Create category data object
    const categoryData = {
      name,
      description,
      slug,
      image: imageUrl, // Assign the uploaded image URL
      status: status || "active", // Default to 'active' if not provided
    };

    // Save the category using the service layer
    const newCategory = await categoryServices.createCategory(categoryData);

    // Send success response
    res.status(StatusCodes.CREATED).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error creating category", error: error.message });
  }
};

// Middleware to handle file uploads
const uploadImage = upload.single("image");

const updateCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params; // Category ID from URL params
    const { name, description, slug, status } = req.body;

    if (!name && !description && !slug && !status && !req.file) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "At least one field must be provided to update." });
    }

    const imageFile = req.file;
    let imageUrl = null;

    // Upload new image if provided
    if (imageFile) {
      const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
        folder: "categories",
        use_filename: true,
        unique_filename: false,
      });
      imageUrl = uploadResult.secure_url;
    }

    const categoryData = {
      ...(name && { name }),
      ...(description && { description }),
      ...(slug && { slug }),
      ...(imageUrl && { image: imageUrl }),
      ...(status && { status }),
    };

    const updatedCategory = await categoryServices.updateCategory(
      categoryId,
      categoryData
    );

    if (!updatedCategory) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Category not found." });
    }

    res.status(StatusCodes.OK).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error updating category", error: error.message });
  }
};

// Fetch All Categories Controller
const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await categoryServices.getAllCategories();

    res.status(StatusCodes.OK).json({
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching categories", error: error.message });
  }
};

// Export Controllers
module.exports = {
  uploadImage,
  createCategoryController,
  updateCategoryController,
  getAllCategoriesController,
};