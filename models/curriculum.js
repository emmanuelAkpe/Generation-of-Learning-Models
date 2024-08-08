const mongoose = require("mongoose");

const PerformanceIndicatorSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  suggestedTimeframe: String,
  assessmentCriteria: String,
  resources: String,
});

const SubStrandSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  performanceIndicators: [PerformanceIndicatorSchema],
});

const StrandSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  subStrands: [SubStrandSchema],
});

const CourseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  strands: [StrandSchema],
});

const CurriculumSchema = new mongoose.Schema({
  gradeLevel: { type: Number, required: true, min: 1 },
  courses: [CourseSchema],
});

module.exports = mongoose.model("Curriculum", CurriculumSchema);
