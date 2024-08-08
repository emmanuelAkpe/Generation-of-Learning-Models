const Curriculum = require("../models/curriculum");

// Create a new curriculum
exports.createCurriculum = async (req, res) => {
  try {
    const newCurriculum = new Curriculum(req.body);
    await newCurriculum.save();
    res.status(201).json(newCurriculum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get curriculum by grade level
exports.getCurriculumByGrade = async (req, res) => {
  try {
    const curriculum = await Curriculum.findOne({
      gradeLevel: req.params.gradeLevel,
    });
    if (!curriculum) {
      return res.status(404).json({ message: "Curriculum not found" });
    }
    res.json(curriculum);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update curriculum
exports.updateCurriculum = async (req, res) => {
  try {
    const updatedCurriculum = await Curriculum.findOneAndUpdate(
      { gradeLevel: req.params.gradeLevel },
      req.body,
      { new: true }
    );
    if (!updatedCurriculum) {
      return res.status(404).json({ message: "Curriculum not found" });
    }
    res.json(updatedCurriculum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete curriculum
exports.deleteCurriculum = async (req, res) => {
  try {
    const deletedCurriculum = await Curriculum.findOneAndDelete({
      gradeLevel: req.params.gradeLevel,
    });
    if (!deletedCurriculum) {
      return res.status(404).json({ message: "Curriculum not found" });
    }
    res.json({ message: "Curriculum deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
