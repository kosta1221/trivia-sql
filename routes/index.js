const { Router } = require("express");

// Require all routes
const generate = require("./generate");
const rate = require("./rate");

const router = Router();

// Use every required route

router.use("/generate", generate);
router.use("/rate", rate);

module.exports = router;
