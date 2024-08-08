const mongoose = require("mongoose");

const LessonPlanSchema = new mongoose.Schema({
  courseCode: { type: String, required: true },
  strandCode: String,
  subStrandCode: String,
  performanceIndicatorCode: String,
  title: String,
  objectives: [String],
  materials: [String],
  introduction: String,
  mainActivities: [String],
  conclusion: String,
  assessment: String,
  homework: String,
  duration: Number,
});

module.exports = mongoose.model("LessonPlan", LessonPlanSchema);
