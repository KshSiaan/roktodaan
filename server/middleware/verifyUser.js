const { jwtVerify } = require("jose");

const verifyUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  // console.log(authHeader);

  if (!token) {
    return res
      .status(401)
      .json({ error: "Unauthorized access. Token is missing." });
  }

  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secretKey);
    next();
  } catch {
    return res
      .status(403)
      .json({ error: "Forbidden access. Invalid or expired token." });
  }
};

module.exports = verifyUser;
