const express = require("express");
const route = express.Router();
const diagnoseController = require("../controllers/diagnoseController");
const Authentication = require("../middlewares/auth");
const { AuthorizationDoctor, Authorization } = require("../middlewares/authz");

route.get("/", Authentication, diagnoseController.getDiagnose);
route.get(
  "/history",
  Authentication,
  Authorization,
  diagnoseController.historyDiagnose
);
route.post(
  "/",
  Authentication,
  AuthorizationDoctor,
  diagnoseController.postDiagnose
);

module.exports = route;
