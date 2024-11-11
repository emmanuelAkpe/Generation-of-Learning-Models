const { searchCurricula } = require("../services/ai/curriculum.service");

const searchCurriculumHandler = async (req, res) => {
  try {
    const {
      query, // Free text search
      grade, // Grade level
      code, // Curriculum code
      strandCode, // Strand code
      contentText, // Search in content standards
      limit = 20, // Number of results to return
    } = req.query;

    const filters = {
      grade: grade ? Number(grade) : undefined,
      code,
      strandCode,
    };

    // Remove undefined filters
    Object.keys(filters).forEach(
      (key) => filters[key] === undefined && delete filters[key]
    );

    const results = await searchCurricula(
      query || contentText, // Use either query or content text for searching
      filters,
      parseInt(limit)
    );

    res.json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error("Error in curriculum search:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  searchCurriculumHandler,
};
