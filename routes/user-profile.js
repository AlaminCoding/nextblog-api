const express = require("express");
const router = express.Router();

const {
  authMiddleware,
  requireSignin,
  adminMiddleWare,
} = require("../controller/auth");
const { read, readAll, remove } = require("../controller/user");

router.get("/profile", requireSignin, authMiddleware, read);
router.get("/all-profile", requireSignin, adminMiddleWare, readAll);
router.delete("/delete/:username", requireSignin, adminMiddleWare, remove);
module.exports = router;
