const userSchema = require("../validations/userSchema"); // Assuming schema is in another file

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false }); // abortEarly to gather all errors

  if (error) {
    const details = error.details.map((err) => ({
      field: err.context.key,
      message: err.message.replace(/"/g, ""), // Clean up quotes around field names
    }));
    console.log(req.body);

    return res.status(417).json(details);
  }

  next(); // Continue to the next middleware if no validation error
};

module.exports = validateUser;
