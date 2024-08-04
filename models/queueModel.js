const Mongoose = require("mongoose");

const queueSchema = new Mongoose.Schema({
  patient: {
    type: Mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  //   doctor: {
  //     type: Mongoose.SchemaTypes.ObjectId,
  //     ref: "User",
  //     required: true,
  //   },
  date: {
    type: String,
  },
});

const Queue = Mongoose.model("Queue", queueSchema);

module.exports = Queue;
