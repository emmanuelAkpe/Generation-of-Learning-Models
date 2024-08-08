const express = require("express");
const { createCurriculum } = require("../controllers/curriculum");

const router = express.Router();

router.route("/create/curriculum").post(createCurriculum);

module.exports = router;
