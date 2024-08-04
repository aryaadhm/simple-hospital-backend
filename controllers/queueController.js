const Queue = require("../models/queueModel");

const getQueues = async (req, res, next) => {
  try {
    const { date } = req.query;
    let queues;
    if (date) {
      queues = await Queue.find({ status: false, date }).populate(
        "patient",
        "name email"
      );
    } else {
      queues = await Queue.find({ status: false }).populate(
        "patient",
        "name email"
      );
    }

    if (queues.length === 0) {
      return res
        .status(200)
        .json({ message: "There is no queue yet", responseCode: "200" });
    }

    res
      .status(200)
      .json({ message: "Succues", responseCode: "200", data: queues });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const postQueues = async (req, res, next) => {
  try {
    const { patient_id, date } = req.body;

    if (!patient_id || !date) {
      return res
        .status(400)
        .json({ message: "All parameters is required", responseCode: "400" });
    }
    await Queue.create({
      patient: patient_id,
      date,
      status: false,
    });

    res.status(200).json({ message: "Queue created", responseCode: "200" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  postQueues,
  getQueues,
};
