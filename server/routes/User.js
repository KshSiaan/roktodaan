const express = require("express");
const { userCreate, userGet } = require("../controller/UserController");
const route = express.Router();
const validateUser = require("../middleware/userValidator");
const verifyUser = require("../middleware/verifyUser");

route.post("/", validateUser, userCreate); // POST route at "/user"
route.get("/", verifyUser, userGet);

module.exports = route;
