const User = require("../models/userSchema");

const createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

const getAllUsers = async () => {
  return await User.find();
};

const getUserById = async (userId) => {
  return await User.findOne(userId);
};

const updateUser = async (userId, userData) => {
  return await User.findByIdAndUpdate(userId, userData, { new: true });
};

const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
