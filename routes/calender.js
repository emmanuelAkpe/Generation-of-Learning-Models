const express = require("express");
const { generateCalendar } = require("../controllers/calender");

const router = express.Router();

router.route("/create/calender").post(generateCalendar);

module.exports = router;
