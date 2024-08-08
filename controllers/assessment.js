const Assessment = require("../models/assessment");
const Curriculum = require("../models/curriculum");
const { generateContent } = require("../utils/Gemini");

function cleanGeneratedContent(content) {
  console.log("Generated content:", content);

  return content
    .replace(/```json\n/, "")
    .replace(/```$/, "")
    .trim();
}

async function generateAssessment(req, res) {
  const {
    gradeLevel,
    courseName,
    strandName,
    assessmentType,
    numberOfQuestions,
    difficultyLevel,
    questionType,
  } = req.body;

  try {
    // Validate required fields
    if (!gradeLevel) {
      return res.status(400).json({ message: "GradeLevel is required." });
    }
    if (!courseName) {
      return res.status(400).json({ message: "CourseName is required." });
    }
    if (!strandName) {
      return res.status(400).json({ message: "StrandName is required." });
    }
    if (!assessmentType) {
      return res.status(400).json({ message: "AssessmentType is required." });
    }
    if (numberOfQuestions === undefined || numberOfQuestions <= 0) {
      return res
        .status(400)
        .json({ message: "NumberOfQuestions must be a positive integer." });
    }
    if (!difficultyLevel) {
      return res.status(400).json({ message: "DifficultyLevel is required." });
    }
    if (!questionType) {
      return res.status(400).json({ message: "QuestionType is required." });
    }

    const curriculum = await Curriculum.findOne({
      gradeLevel,
      "courses.courseName": courseName,
    });

    if (!curriculum) {
      return res.status(404).json({
        message: `No curriculum found for grade level ${gradeLevel} with course ${courseName}`,
      });
    }

    const course = curriculum.courses.find((c) => c.courseName === courseName);
    if (!course) {
      return res
        .status(404)
        .json({ message: `No course found with name ${courseName}` });
    }

    const strand = course.strands.find((strand) => strand.name === strandName);
    if (!strand) {
      return res
        .status(404)
        .json({ message: `No strand found with name ${strandName}` });
    }

    const prompt = `
        Generate an assessment for grade ${gradeLevel} for the course ${courseName}.
        The assessment should be of type ${assessmentType} and have ${numberOfQuestions} questions.
        The difficulty level of the questions should be ${difficultyLevel} and the question type should be ${questionType}.
        
        Provide the assessment content as a JSON array of questions, where each question has the following structure:
        {
          "questionText": "string",
          "options": ["string"],
          "correctAnswer": "string",
          "points": number
        }
        
        Ensure the total points for the assessment and the duration are included in the response.
      `;

    const generatedText = await generateContent(prompt);
    console.log("Generated text:", generatedText);

    const cleanedText = cleanGeneratedContent(generatedText);

    let questions;
    try {
      questions = JSON.parse(cleanedText);
    } catch (error) {
      return res.status(500).json({
        message: `Failed to parse generated content as JSON: ${error.message}`,
      });
    }

    const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

    const assessment = new Assessment({
      courseCode: course.courseCode,
      strandCode: strand.code,
      assessmentType,
      questions,
      totalPoints,
      duration: 60,
      questionType,
      difficultyLevel,
      numberOfQuestions,
    });

    await assessment.save();
    res.status(201).json(assessment);
  } catch (error) {
    console.error("Error generating assessment:", error);
    res
      .status(500)
      .json({ message: "Error generating assessment", error: error.message });
  }
}

module.exports = {
  generateAssessment,
};
