const express = require("express");
const { loginPost } = require("../controller/LoginController");
const route = express.Router();
route.post("/", loginPost);
route.get("/", (res) => {
  res.send("Login route");
});

module.exports = route;
