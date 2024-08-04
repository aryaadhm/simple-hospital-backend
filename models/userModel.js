const Mongoose = require("mongoose");
const { hashPassword } = require("../helpers/bcrypt");
const validateEmail = require("../helpers/validateEmail");

const userSchema = new Mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["Admin", "Doctor", "Patient"],
  },
});

userSchema.pre("save", function (next) {
  this.password = hashPassword(this.password);
  next();
});

userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = Mongoose.model("User", userSchema);

module.exports = User;
