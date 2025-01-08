const express = require("express");
const router = express.Router();

const { } = require("../controllers/category");
const {
    validateSignUpRequest,
    isRequestValidated,
    validateSignInRequest ,
    validateForgotRequest
} = require("../validator/auth");

router.route("/fetch").post( isRequestValidated); 
router.route("/create").post( isRequestValidated);
router.route("/update").post(isRequestValidated);

module.exports = router;