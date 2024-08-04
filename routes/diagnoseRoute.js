const express = require("express");
const route = express.Router();
const diagnoseController = require("../controllers/diagnoseController");
const Authentication = require("../middlewares/auth");
const { AuthorizationDoctor } = require("../middlewares/authz");

route.get("/", Authentication, diagnoseController.getDiagnose);
route.post(
  "/",
  Authentication,
  AuthorizationDoctor,
  diagnoseController.postDiagnose
);

// route.get("/:diagnose_id", Authentication, diagnoseController.getStudents);
// route.put("/:diagnose_id", studentController.updateStudent);
// route.delete("/:diagnose_id", Authentication, diagnoseController.deleteStudent);

module.exports = route;
