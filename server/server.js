const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());

// Import the UserRotes
const UserRoute = require("./routes/User");
const loginRoute = require("./routes/Login");
const RequestRoute = require("./routes/Request");
const BecomeDonorRoute = require("./routes/BecomeDonor");
const DonorsRoute = require("./routes/Donors");
// Allow CORS from localhost:3000 (accounting for the trailing slash issue)
app.use(
  cors({
    origin: "http://localhost:3000", // Correct the origin to not include a trailing slash
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Specify allowed HTTP methods
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers if needed
  })
);

app.listen(process.env.APP_PORT || 5000, () => {
  console.log("Listening to port: ", process.env.APP_PORT || 5000);
});

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); // Exit process with failure
  });

app.use("/user", UserRoute);
app.use("/login", loginRoute);
app.use("/request", RequestRoute);
app.use("/become-donor", BecomeDonorRoute);
app.use("/donors", DonorsRoute);
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to RoktoDaan! Your server is up and running.",
  });
});
