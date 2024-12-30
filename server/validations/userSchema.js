const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().label("Name"),
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().min(8).required().label("Password"),
  repass: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .label("Confirm Password"),
  tnc: Joi.boolean().required().label("terms and conditions"),
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .label("Phone Number"),
  blood_group: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .required()
    .label("Blood Group"),
  dob: Joi.date()
    .less("now")
    .greater("1-1-1900")
    .required()
    .label("Date of Birth"),
  gender: Joi.string()
    .valid("male", "female", "other")
    .required()
    .label("Gender"),
  district: Joi.string().min(2).max(100).required().label("District"),
});

module.exports = userSchema;
