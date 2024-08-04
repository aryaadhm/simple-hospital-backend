const Authorization = async (req, res, next) => {
  try {
    console;
    if (req.userLogin.role !== "Admin") {
      throw new Error("FORBIDDEN");
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const AuthorizationDoctor = async (req, res, next) => {
  try {
    if (req.userLogin.role !== "Doctor") {
      throw new Error("FORBIDDEN");
    }
    next();
  } catch (error) {
    next(error);
  }
};

const AuthorizationQueue = async (req, res, next) => {
  try {
    if (req.userLogin.role !== "Doctor" && req.userLogin.role !== "Admin") {
      throw new Error("FORBIDDEN");
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { Authorization, AuthorizationDoctor, AuthorizationQueue };
