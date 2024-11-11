const mongoose = require("mongoose");
const { indexCurriculum } = require("../services/ai/curriculum.service");

const Schema = mongoose.Schema;

// Schema for Create Curriculum
const curriculumSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    grade: { type: Number, required: true, min: 1 },
    strands: [
      {
        name: { type: String, required: true },
        code: { type: String, required: true },
        subStrand: [
          {
            code: { type: String, required: true },
            title: { type: String, required: true },
            contentStandards: { type: String },
            learningIndicators: [String],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

// Add post-save middleware for automatic indexing
curriculumSchema.post("save", async function (doc) {
  try {
    await indexCurriculum(doc);
  } catch (error) {
    console.error("Error indexing curriculum:", error);
  }
});

// Add post-update middleware to handle updates
curriculumSchema.post("findOneAndUpdate", async function (doc) {
  if (doc) {
    try {
      await indexCurriculum(doc);
    } catch (error) {
      console.error("Error indexing updated curriculum:", error);
    }
  }
});

// Add pre-remove middleware to remove from index if needed
curriculumSchema.pre("remove", async function () {
  try {
    const curriculumId = this._id.toString();
    await index.delete1({ ids: [curriculumId] });
  } catch (error) {
    console.error("Error removing curriculum from index:", error);
  }
});

const curriculumModel = mongoose.model("curriculumModel", curriculumSchema);

module.exports = curriculumModel;
