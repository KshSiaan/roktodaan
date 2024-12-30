const express = require("express");
const route = express.Router();
const verifyUser = require("../middleware/verifyUser");
const {
  requestCreate,
  getRequests,
} = require("../controller/RequestController");

route.post("/", requestCreate); // POST route at "/request"
route.get("/", getRequests);
module.exports = route;
