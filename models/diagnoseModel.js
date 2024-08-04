const Mongoose = require("mongoose");

const diagnose = new Mongoose.Schema({
  patient: {
    type: Mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  queue: {
    type: Mongoose.SchemaTypes.ObjectId,
    ref: "Queue",
    required: true,
  },
  description: {
    type: String,
  },
  medicine_recipe: {
    type: String,
  },
  doctor: {
    type: Mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String,
  },
});

const Diagnose = Mongoose.model("Diagnose", diagnose);

module.exports = Diagnose;
