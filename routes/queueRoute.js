const express = require("express");
const route = express.Router();
const queueController = require("../controllers/queueController");
const Authentication = require("../middlewares/auth");
const { Authorization, AuthorizationDoctor } = require("../middlewares/authz");

route.get("/", Authentication, AuthorizationDoctor, queueController.getQueues);
route.post("/", Authentication, Authorization, queueController.postQueues);

module.exports = route;
