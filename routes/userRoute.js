const express = require("express");
const route = express.Router();
const userController = require("../controllers/userController");
const Authentication = require("../middlewares/auth");
const { Authorization } = require("../middlewares/authz");

route.get("/", userController.getPatients);
route.post(
  "/register",
  Authentication,
  Authorization,
  userController.registerUser
);
route.post("/login", userController.loginUser);
route.get("/:user_id", userController.getPatient);
// route.delete("/:user_id", studentController.deleteStudent);

module.exports = route;
