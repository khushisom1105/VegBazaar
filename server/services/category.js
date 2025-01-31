const Category = require("../models/categorySchema");  // Import the Category model

const createCategory = async (categoryData) => {
  const category = new Category(categoryData);
  await category.save();
  return category;
};

const getAllCategories = async () => {
  return await Category.find();
};

const getCategoryById = async (categoryId) => {
  return await Category.findById(categoryId);
};

const getCategoryBySlug = async (slug) => {
  return await Category.findOne({ slug: slug });
};

const updateCategory = async (categoryId, categoryData) => {
  return await Category.findByIdAndUpdate(categoryId, categoryData, { new: true });
};

const deleteCategory = async (categoryId) => {
  return await Category.findByIdAndDelete(categoryId);
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory
};
