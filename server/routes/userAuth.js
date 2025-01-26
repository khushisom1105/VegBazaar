const express = require("express");
const router = express.Router();

const { signUp, signIn , forgotPass, verifyOtp, updatePassword} = require("../controllers/userAuth");
const {
    validateSignUpRequest,
    isRequestValidated,
    validateSignInRequest ,
    validateForgotRequest
} = require("../validator/auth");

router.route("/signIn").post(validateSignInRequest, isRequestValidated, signIn); 
router.route("/signUp").post(validateSignUpRequest, isRequestValidated, signUp);
router.route("/forgotPass").post(validateForgotRequest, isRequestValidated, forgotPass);
router.post('/verify-otp', verifyOtp);
router.post('/update-password', updatePassword);

module.exports = router;