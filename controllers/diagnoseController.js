const Diagnose = require("../models/diagnoseModel.js");

const getDiagnose = async (req, res, next) => {
  try {
    const diagnoses = await Diagnose.findOne({
      patient: req.userLogin._id,
    })
      .populate("patient", "name email")
      .populate("doctor", "name email");

    if (!diagnoses) {
      return res
        .status(200)
        .json({ message: "Not diagnosed yet", responseCode: "200" });
    }
    res.status(200).json(diagnoses);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const postDiagnose = async (req, res, next) => {
  try {
    const { patient_id, description, medicine_recipe } = req.body;

    if (!patient_id || !description || !medicine_recipe) {
      return res
        .status(400)
        .json({ message: "All parameters is required", responseCode: "400" });
    }
    await Diagnose.create({
      patient: patient_id,
      description,
      medicine_recipe,
      doctor: req.userLogin._id,
    });

    res.status(200).json({ message: "Diagnose created", responseCode: "200" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDiagnose,
  postDiagnose,
};
