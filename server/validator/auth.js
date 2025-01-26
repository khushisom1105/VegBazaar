const { check,validationResult } = require("express-validator");
//const { StatusCodes } = require("http-status-codes");
const { getUser } = require("../services/userAuth");
//const { unwatchFile } = require("fs");
const { getUserById } = require("../services/userOperation");
//const {getByUserId ,checkBarcode, getProductById, getProduct} = require("../services/productOperations");
//const { param } = require("../routes/auth");

const validateSignUpRequest = [
  check("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters"),

  check("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters"),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail()
    .optional(),

  check("phone")
    .optional()
    .matches(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/)
    .withMessage("Phone number must be a valid Indian phone number"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage(
      "Password must contain at least one special character (e.g. @, $, %, *, ?, &)"
    ),
];

const validateSignInRequest = [
  check("email")
    .notEmpty()
    .withMessage("Email can not be empty")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail()
    .optional(),
  check("password")
    .notEmpty()
    .withMessage("Password can not be empty")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];

const validateForgotRequest = [
  check("email")
  .notEmpty()
  .withMessage("Email can not be empty")
  .isEmail()
  .withMessage("Valid email is required")
  .normalizeEmail()
  .optional(),
];
const isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }
  next();
};

const checkAuth = async (req, res, next) => {
  const auth = getUser(req.headers.authorization);
  const {date }=req;
 console.log("Request ",date);
  if (!auth) {
    return res.status(402).json({
      sucess: false,
      message: "Token is Invalid",
    });
  }
  req.user = auth;
  console.log("user in check auth ",req.user);
  const user = await getUserById( auth.id );
  console.log("got the user",user);
  if (!user) {
    return res.status(402).json({
      sucess: false,
      message: "User Not Found In Database",
    });
  }
  next();

};

module.exports = {
  validateSignUpRequest,
  isRequestValidated,
  validateSignInRequest,
  checkAuth,
  validateForgotRequest
};
