const express = require("express");
const { generateAssessment } = require("../controllers/assessment");

const router = express.Router();

router.route("/create/assessment").post(generateAssessment);

module.exports = router;
