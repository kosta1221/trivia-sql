const { Router } = require("express");

// Require all routes
const generate = require("./generate");

const router = Router();

// Use every required route

router.use("/generate", generate);

module.exports = router;
