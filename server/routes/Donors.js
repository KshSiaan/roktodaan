const express = require("express");
const { DonorGet } = require("../controller/DonorsController");
const route = express.Router();
route.get("/", DonorGet);

module.exports = route;
