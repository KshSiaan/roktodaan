const jose = require("jose");
const { SignJWT } = jose;

async function makeJWT(data) {
  // Secret key for signing the JWT (ensure you set it in the environment)
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const { _id, email, role, is_donor } = data;

  // Create the payload with the user data
  const userPayload = {
    _id,
    email,
    role,
    is_donor,
  };

  const alg = "HS256"; // HMAC-SHA256 algorithm

  // Sign the JWT
  const jwt = await new SignJWT(userPayload)
    .setProtectedHeader({ alg }) // Set header with algorithm
    .setIssuedAt() // Set issued time (current time)
    .setExpirationTime("8d") // Set expiration time
    .sign(secret); // Sign the JWT with the secret key

  console.log(jwt); // Log the JWT for debugging purposes

  return jwt;
}

async function checkJWT() {}

module.exports = { makeJWT };
