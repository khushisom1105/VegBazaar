const { StatusCodes } = require("http-status-codes");
const crypto = require('crypto'); 
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");
const { createUser, getUserById, getUserByemail, getUserByPhone,getUserByEmail } = require("../services/userOperation.js");
const { setUser, getuser } = require("../services/userAuth.js");
require("dotenv").config();

const generateOtp = () => {
  return crypto.randomInt(100000, 999999); 
};


const sendOtpEmail = async (email, otp) => {
  console.log(process.env.EMAIL)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.EMAIL_PASSWORD,  
    },
    tls: {
      rejectUnauthorized: false,
    }
  });
 
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'OTP for Verification',
    text: `OTP is: ${otp}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('OTP sent: ' + info.response);
  } catch (error) {
    console.error('Error sending OTP email:', error);
  }
};

const forgotPass = async (req, res) => {
  try {
    console.log("Forgot Password API Hit");
    const { email } = req.body;

    const user = await getUserByemail(email); 
    if (user) {
      const otp = generateOtp();

      user.otp = otp;
      user.otpExpiry = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

      await user.save(); 

      // Send OTP to the user via email
      await sendOtpEmail(email, otp);
      return res.status(StatusCodes.OK).json({
        message: 'OTP sent to your email for password reset.',
      });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'User does not exist with this email.',
      });
    }
  } catch (error) {
    console.error('Error in forgotPass:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};
const getAllUsers = () =>{
  return User.find();
}
// Sign Up API function (create new user)
const signUp = async (req, res) => {
  const {firstName, lastName, phone, email, password} = req.body;

  try {
    console.log("hey")
    // Check if user already exists by email or phone
    const existingUser = await getUserByEmail(email);
    const existingUserPhone = await getUserByPhone(phone);
    console.log("api")
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
console.log("User Data" , userData)
   
    const user = await createUser(userData);
    res.status(StatusCodes.OK).json({
      success: true,
      data: user,
      message: "User Registered Successfully",
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

// Sign In API function (user login)
const signIn = async (req, res) => {
  try {
    console.log("Sign In");
    const { email, phone, password, flag } = req.body;
    let user;

    // If flag is true, find by email, otherwise find by phone
    if (flag) {
      user = await getUserById({ email });
    } else {
      user = await getUserById({ phone });
    }

    if (user) {
     console.log(password,user.hashPassword)
      if (await user.authenticate(password, user.hashPassword)) {
        const token = setUser(user.id, user.email);

        const { _id, firstName, lastName, phone, email } = user;
        return res.status(StatusCodes.OK).json({       
          token,
          user: { _id, firstName, lastName, phone, email },
          message: "Login Successful"
        });
      } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Invalid email or password.",
        });
      }
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User does not exist..!",
      });
    }
   
    
  } catch (error) {
    console.error('Error in signIn:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
  console.log("otp",otp);
    // Retrieve user by email
    const user = await getUserByemail(email);
    if (user) {
      
      if (user.otp === otp && Date.now() < user.otpExpiry) {
        return res.status(StatusCodes.OK).json({
          message: 'OTP is valid. You can now reset your password.',
        });
      } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid or expired OTP. Please try again.',
        });
      }
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'User does not exist with this email.',
      });
    }
  } catch (error) {
    console.error('Error in verifyOtp:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  } 
};
const emailVerification = async(req,res) =>
{
  try {
    console.log("OTP API Hit 1");
    const { email } = req.body;

      const otp = generateOtp();
      console.log("otp");
       // user.otp = otp;
       // user.otpExpiry = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

       // await user.save(); 

       // Send OTP to the user via email
      await sendOtpEmail(email, otp);
      return res.status(StatusCodes.OK).json({
        data:{
          otp:otp
        },
        message: 'OTP sent to your email .',
      });
   
  } catch (error) {
    console.error('Error in sending OTP:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }

}
const updatePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await getUserByemail(email);
    if (user) {
    
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword; 
      user.otp = null;
      user.otpExpiry = null; 

      await user.save(); 

      return res.status(StatusCodes.OK).json({
        message: 'Password successfully updated.',
      });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'User does not exist with this email.',
      });
    }
  } catch (error) {
    console.error('Error in updatePassword:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

module.exports = { signUp, signIn, forgotPass, verifyOtp, updatePassword ,sendOtpEmail ,emailVerification };