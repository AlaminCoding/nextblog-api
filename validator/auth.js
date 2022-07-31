const { check } = require("express-validator");

exports.userSignupValidation = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Email is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password Must be greater than 7 digit"),
];

exports.userSigninValidation = [
  check("email").isEmail().withMessage("Email is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password Must be greater than 7 digit"),
];
