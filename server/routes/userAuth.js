const express = require("express");
const router = express.Router();

const { signUp, signIn } = require("../controllers/userAuth");
const {
    validateSignUpRequest,
    isRequestValidated,
    validateSignInRequest 
} = require("../validator/auth");

router.route("/signIn").post(validateSignInRequest, isRequestValidated, signIn); 
router.route("/signUp").post(validateSignUpRequest, isRequestValidated, signUp);

module.exports = router;
