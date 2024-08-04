const express = require("express");
const route = express.Router();
const diagnoseController = require("../controllers/diagnoseController");
const Authentication = require("../middlewares/auth");
const { Authorization } = require("../middlewares/authz");

route.get(
  "/",
  Authentication,
  Authorization,
  diagnoseController.historyDiagnose
);

module.exports = route;
