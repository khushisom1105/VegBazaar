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

const getUserByemail = async (email) => {
  return await User.findOne({ email: email });
};

const getUserByPhone = async (phone) => {
  return await User.findOne({ phone: phone });
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
  getUserByemail,
  getUserByPhone
};