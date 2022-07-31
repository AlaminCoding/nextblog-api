const express = require("express");
const router = express.Router();

// CONTROLLER IMPORT
const { root } = require("../controller");

router.get("/", root);

module.exports = router;
