const { Router } = require("express");

const getSaved = Router();

const { Sequelize, SavedQuestion } = require("../../models");
const Op = Sequelize.Op;

getSaved.get("/", async (req, res, next) => {});

module.exports = getSaved;
