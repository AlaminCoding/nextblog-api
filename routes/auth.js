const express = require("express");
const router = express.Router();

// MIDDLEWARES
const { runValidation } = require("../validator");
const {
  userSignupValidation,
  userSigninValidation,
} = require("../validator/auth");

// CONTROLLER
const {
  signup,
  signin,
  signout,
  requireSignin,
} = require("../controller/auth");

router.post("/signup", userSignupValidation, runValidation, signup);
router.post("/signin", userSigninValidation, runValidation, signin);
router.get("/signout", signout);
module.exports = router;
