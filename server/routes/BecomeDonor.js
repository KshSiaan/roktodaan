const express = require("express");
const route = express.Router();
const verifyUser = require("../middleware/verifyUser");
const { decodeJwt } = require("jose");
const User = require("../model/UserModel");
route.get("/", verifyUser, async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    const jwt = decodeJwt(token);
    console.log(jwt);
    console.log("lol");
    const updatedUser = await User.findByIdAndUpdate(jwt._id, {
      is_donor: true,
    });

    return res.status(200).json({ name: updatedUser.name });
  } catch (error) {
    return res.status(401).json({ error });
  }
});
module.exports = route;
