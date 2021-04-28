const { Router } = require("express");

// Require all routes
const signup = require("./signup");
const login = require("./login");
const accessTokenGenerate = require("./access-token-generate");

const router = Router();

// Use every required route

router.use("/signup", signup);
router.use("/login", login);
router.use("/access-token-generate", accessTokenGenerate);

module.exports = router;
