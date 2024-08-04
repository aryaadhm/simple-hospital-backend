const { verifyToken } = require("../helpers/jwt");
const User = require("../models/userModel.js");

const Authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    let token = authorization.split(" ");
    if (token[0] !== "Bearer") {
      throw new Error("INVALID_TOKEN");
    }

    let payload = verifyToken(token[1]);
    let user = await User.findOne({ email: payload.email });

    if (!user) {
      throw new Error("INVALID_TOKEN");
    }

    req.userLogin = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = Authentication;
