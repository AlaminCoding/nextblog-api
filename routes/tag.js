const express = require("express");
const router = express.Router();

// MIDDLEWARE
const { requireSignin, adminMiddleWare } = require("../controller/auth");
// CONSTROLLER
const { createTag, allTag, readTag, deleteTag } = require("../controller/tag");
// VALIDATION
const { runValidation } = require("../validator");
const { tagValidation } = require("../validator/tag");

router.post(
  "/create",
  tagValidation,
  runValidation,
  requireSignin,
  adminMiddleWare,
  createTag
);

router.get("/", allTag);
router.get("/:slug", readTag);
router.delete("/delete/:slug", requireSignin, adminMiddleWare, deleteTag);
module.exports = router;
