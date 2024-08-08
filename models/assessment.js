const mongoose = require("mongoose");

const AssessmentSchema = new mongoose.Schema({
  courseCode: { type: String, required: true },
  strandCode: { type: String, required: true },
  subStrandCode: { type: String, required: false },
  performanceIndicatorCode: { type: String, required: false },
  assessmentType: {
    type: String,
    enum: ["Quiz", "Test", "Project", "Exam"],
    required: true,
  },
  questions: [
    {
      questionText: { type: String, required: true },
      options: [{ type: String }],
      correctAnswer: { type: String, required: true },
      points: { type: Number, required: true },
    },
  ],
  totalPoints: { type: Number, required: true },
  duration: { type: Number, required: true },
  questionType: { type: String, required: true },
  difficultyLevel: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  numberOfQuestions: { type: Number, required: true },
});

module.exports = mongoose.model("Assessment", AssessmentSchema);
