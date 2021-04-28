const { Router } = require("express");

// Require all routes
const fetchQuestion = require("./fetch-question");
const rate = require("./rate");
const signup = require("./signup");
const login = require("./login");
const leaderboards = require("./leaderboards");
const getAvatars = require("./get-avatars");
const accessTokenGenerate = require("./access-token-generate");

const router = Router();

// Use every required route

router.use("/fetch-question", fetchQuestion);
router.use("/rate", rate);
router.use("/signup", signup);
router.use("/login", login);
router.use("/access-token-generate", accessTokenGenerate);
router.use("/leaderboards", leaderboards);
router.use("/get-avatars", getAvatars);

module.exports = router;
