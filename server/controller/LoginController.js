const User = require("../model/UserModel");
const argon2 = require("argon2");
const { makeJWT } = require("../services/jwtOperations");

const loginPost = async (req, res) => {
  console.log("hit");

  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res.status(400).json({
        field: !email ? "email" : "password",
        message: `${!email ? "Email" : "Password"} is required.`,
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        field: "password",
        message: "Invalid email or password.",
      });
    }

    // Verify password
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(401).json({
        field: "password",
        message: "Invalid email or password.",
      });
    }

    const jwt = await makeJWT({
      _id: user._id,
      email: user.email,
      role: user.role,
      is_donor: user.is_donor,
    });

    // Successful login
    return res.status(200).json({ token: jwt });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      error: {
        message: "An unexpected error occurred. Please try again later.",
      },
    });
  }
};

module.exports = {
  loginPost,
};
