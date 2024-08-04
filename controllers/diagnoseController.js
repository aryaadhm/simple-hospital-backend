const Diagnose = require("../models/diagnoseModel");
const Queue = require("../models/queueModel");

const getDiagnose = async (req, res, next) => {
  try {
    if (req.userLogin.role === "Doctor") {
      const diagnoses = await Diagnose.find({
        doctor: req.userLogin._id,
      })
        .populate("queue", "status date")
        .populate("doctor", "name email")
        .populate("patient", "name email");

      if (diagnoses.length === 0) {
        return res
          .status(200)
          .json({ message: "Not diagnosed yet", responseCode: "200" });
      }

      res
        .status(200)
        .json({ message: "Succues", responseCode: "200", data: diagnoses });
    } else if (req.userLogin.role === "Patient") {
      const diagnoses = await Diagnose.find({
        patient: req.userLogin._id,
      })
        .populate("queue", "status date")
        .populate("doctor", "name email")
        .populate("patient", "name email");

      if (diagnoses.length === 0) {
        return res
          .status(200)
          .json({ message: "Not diagnosed yet", responseCode: "200" });
      }

      res
        .status(200)
        .json({ message: "Succues", responseCode: "200", data: diagnoses });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const postDiagnose = async (req, res, next) => {
  try {
    const { queue_id, description, medicine_recipe } = req.body;

    if (!queue_id || !description || !medicine_recipe) {
      return res
        .status(400)
        .json({ message: "All parameters is required", responseCode: "400" });
    }

    const queue = await Queue.findOne({ _id: queue_id, status: false });

    if (!queue) {
      return res
        .status(404)
        .json({ message: "Queue not found", responseCode: "404" });
    }

    await Diagnose.create({
      queue: queue_id,
      description,
      medicine_recipe,
      doctor: req.userLogin._id,
      patient: queue.patient,
    });

    await Queue.updateOne({ _id: queue_id }, { status: true });

    res.status(200).json({ message: "Diagnose created", responseCode: "200" });
  } catch (error) {
    console.log();
    next(error);
  }
};

const historyDiagnose = async (req, res, next) => {
  try {
    const diagnoses = await Diagnose.find()
      .populate("queue", "status date")
      .populate("patient", "name email")
      .populate("doctor", "name email");

    res
      .status(200)
      .json({ message: "Succues", responseCode: "200", data: diagnoses });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDiagnose,
  postDiagnose,
  historyDiagnose,
};
