const productServices = require("../services/product"); // Import the product services
const cloudinary = require("../utils/cloudinary"); // Import Cloudinary configuration
const multer = require("multer"); // Multer for file uploads

const upload = multer({ dest: "uploads/" }); // Temporary file storage for Multer

// Create a new product
const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, status, discount } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, price, and category are required." });
    }

    // Handle image upload
    let imageUrl = null;
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
        use_filename: true,
        unique_filename: false,
      });
      imageUrl = uploadResult.secure_url;
    }

    const productData = {
      name,
      description,
      price,
      category,
      images: imageUrl,
      status: status || "active",
      discount: discount || 0,
    };

    const newProduct = await productServices.createProduct(productData);

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};

// Update a product by ID
const updateProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, price, category, status, discount } = req.body;

    if (!name && !description && !price && !category && !status && !discount && !req.file) {
      return res.status(400).json({ message: "At least one field must be provided to update." });
    }

    // Handle image upload
    let imageUrl = null;
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
        use_filename: true,
        unique_filename: false,
      });
      imageUrl = uploadResult.secure_url;
    }

    const productData = {
      ...(name && { name }),
      ...(description && { description }),
      ...(price && { price }),
      ...(category && { category }),
      ...(status && { status }),
      ...(discount && { discount }),
      ...(imageUrl && { images: imageUrl }), // Add image only if uploaded
    };

    const updatedProduct = await productServices.updateProduct(productId, productData);

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

// Middleware to handle image upload
const uploadImage = upload.single("image");

// Get all products
const getAllProductsController = async (req, res) => {
  try {
    const products = await productServices.getAllProducts();
    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

// Get a product by ID
const getProductByIdController = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await productServices.getProductById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};

// Delete a product by ID
const deleteProductController = async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await productServices.deleteProduct(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};

module.exports = {
  createProductController,
  updateProductController,
  getAllProductsController,
  getProductByIdController,
  deleteProductController,
  uploadImage,
};
