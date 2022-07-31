const express = require("express");
const router = express.Router();

// MIDDLEWARES
const { runValidation } = require("../validator");
const { categoryValidation } = require("../validator/category");
const {
  requireSignin,
  adminMiddleWare,
  authMiddleware,
} = require("../controller/auth");
//CONTROLLER
const {
  createCategory,
  allCategory,
  readCategory,
  deleteCategory,
} = require("../controller/category");

//ROUTER POST
router.post(
  "/create-category",
  categoryValidation,
  runValidation,
  requireSignin,
  adminMiddleWare,
  createCategory
);
router.get("/all-category", allCategory);
router.get("/:slug", readCategory);
router.delete("/delete/:id", requireSignin, adminMiddleWare, deleteCategory);
module.exports = router;
