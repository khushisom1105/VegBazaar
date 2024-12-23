const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const { createUser, getUserById ,getUserByemail,getUserByphone} = require("../services/userOperation.js");
const { setUser, getuser } = require("../services/userAuth.js")
require("dotenv").config();

const signUp = async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await getUserById({ email });
    const existingUserPhone = await getUserById({ phone });
    if (existingUser || existingUserPhone) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User already registered.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const userData = {
      firstName,
      lastName,
      phone,
      email,
      hashPassword, 
    };

    const user = await createUser(userData);
    res.status(StatusCodes.OK).json({
      success: true,
      data: user,
      message: "Product Registerd Successfully"
    });
  } catch (error) {

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    console.log("Sign In");
    // let user;
    // const { email, phone, password, flag } = req.body;
    // if (flag) {
    //   user = await getUserByemail(email);
    //   console.log(user , "this isthe")
    // } else {
    //   user = await getUserByphone( phone);
    // }

    // if (user != null) {
    //   if (await user.authenticate(password, user.hashPassword)) {
    //     const token = setUser(user.id, user.email);

    //     const { _id, firstName, lastName, phone, email } = user;
    //     return res.status(StatusCodes.OK).json({       
    //       token,
    //       user: { _id, firstName, lastName, phone, email },
    //       message: "Login Successful"
    //     });
    //   } else {
    //     return res.status(StatusCodes.UNAUTHORIZED).json({
    //       message: "Invalid email or password.",
    //     });
    //   }
    // } else {
    //   return res.status(StatusCodes.BAD_REQUEST).json({
    //     message: "User does not exist..!",
    //   });
    // }
  } catch (error) {

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};


module.exports = { signUp, signIn };