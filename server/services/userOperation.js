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

const getUserByEmail = async (email) => {
  try {
   // console.log("in fun",email)
   
    const user = await User.findOne({email:email});
  
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Unable to fetch user by email. Please try again later.");
  }
};
const getUserByemail = async (email) => {
  console.log(email)
  const emaill = email.email
  return await User.findOne(emaill);
};

const getUserByPhone = async (phone) => {
  try {
    if (!phone) {
      throw new Error("Phone number is required.");
    }

    console.log("Searching for user with phone:", phone);

    const user = await User.findOne({ phone: phone });

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  } catch (error) {
    console.error("Error in getUserByPhone:", error.message);
    return null; // Return null to indicate no user found
  }
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
  getUserByPhone,
  getUserByEmail
};