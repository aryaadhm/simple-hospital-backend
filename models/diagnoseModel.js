const Mongoose = require("mongoose");

const diagnose = new Mongoose.Schema({
  patient: {
    // type: String,
    type: Mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
  },
  medicine_recipe: {
    type: String,
  },
  doctor: {
    // type: String,
    type: Mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
});

const Diagnose = Mongoose.model("Diagnose", diagnose);

module.exports = Diagnose;
