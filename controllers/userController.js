const User = require("../models/userModel");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const validateEmail = require("../helpers/validateEmail");

const registerUser = async (req, res, next) => {
  try {
    const { email, password, role, name } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All parameters is required", responseCode: "400" });
    }

    const isEMailValid = validateEmail(email);

    if (!isEMailValid) {
      return res
        .status(400)
        .json({ message: "Invalid email", responseCode: "400" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "Email already exist", responseCode: "400" });
    }

    await User.create({ email, password, role, name });

    res.status(200).json({ message: "User created", responseCode: "200" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All parameters is required", responseCode: "400" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email or password is incorrect",
        responseCode: "400",
      });
    }

    const isValidPassword = comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Email or password is incorrect",
        responseCode: "400",
      });
    }

    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = signToken(payload);

    res.status(200).json({
      message: "Success",
      responseCode: "200",
      accessToken: token,
      expiredIn: "3600000",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getPatients = async (req, res, next) => {
  try {
    const patients = await User.find(
      { role: "Patient" },
      { role: 1, email: 1, _id: 1, name: 1 }
    );

    res
      .status(200)
      .json({ message: "Success", responseCode: "200", data: patients });
  } catch (error) {
    next(error);
  }
};

const getPatient = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const user = await User.findOne({ _id: user_id, role: "Patient" });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", responseCode: "400" });
    }
    res
      .status(200)
      .json({ message: "Success", responseCode: "200", data: user });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const newPass = hashPassword(password);
    await User.updateOne(
      {
        _id: req.userLogin._id,
      },
      {
        password: newPass,
      }
    );
    res.status(200).json({ message: "Password updated", responseCode: "200" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getPatients,
  getPatient,
  changePassword,
};
