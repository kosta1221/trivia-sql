const { Router } = require("express");

// Require all routes
const fetchQuestion = require("./fetch-question");
const rate = require("./rate");
const savePlayer = require("./save-player");
const leaderboards = require("./leaderboards");
const getAvatars = require("./get-avatars");

const router = Router();

// Use every required route

router.use("/fetch-question", fetchQuestion);
router.use("/rate", rate);
router.use("/save-player", savePlayer);
router.use("/leaderboards", leaderboards);
router.use("/get-avatars", getAvatars);

module.exports = router;
