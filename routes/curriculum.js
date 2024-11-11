const express = require("express");
const {
  createCurriculum,
  getCurriculumByGrade,
  getAllCurriculums,
  updateCurriculum,
  deleteCurriculum,
  bulkGetCurriculums,
} = require("../controllers/curriculum");
const { searchCurriculumHandler } = require("../controllers/searchCurricula");

const router = express.Router();

// Create new curriculum
router.post("/curriculum/create", createCurriculum);

// Get curriculum by grade
router.get("/curriculum/grade/:grade", getCurriculumByGrade);

// Get all curriculums
router.get("/curriculum/all", getAllCurriculums);

// Update curriculum
router.put("/curriculum/update/:code", updateCurriculum);

// Delete curriculum
router.delete(
  "/curriculum/delete/:code",

  deleteCurriculum
);

// Bulk get curriculums
router.post("/curriculum/bulk", bulkGetCurriculums);

// Search routes
router.get(
  "/curriculum/search",

  searchCurriculumHandler
);

module.exports = router;
