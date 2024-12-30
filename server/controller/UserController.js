const User = require("../model/UserModel");
const argon2 = require("argon2");
const jose = require("jose");
const { makeJWT } = require("../services/jwtOperations");
const { decodeJwt } = require("jose");
function formatDOB(dob) {
  // Ensure the input is converted to a Date object
  const date = new Date(dob);

  // Check if the resulting date is valid
  if (isNaN(date.getTime())) {
    return null;
  }

  // Format the date
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  return `${day}${month}${year}`;
}

const userCreate = async (req, res) => {
  const requestedUser = req.body;
  const updatedDOB = formatDOB(requestedUser.dob);
  if (formatDOB == null) {
    res
      .status(417)
      .json({ field: "dob", message: "Please input a valid date" });
  }

  const refinedUser = {
    name: requestedUser.name,
    email: requestedUser.email,
    password: requestedUser.password,
    phone_number: requestedUser.phone,
    blood_group: requestedUser.blood_group,
    date_of_birth: updatedDOB,
    gender: requestedUser.gender,
    district: requestedUser.district,
  };

  try {
    const user = await User.create(refinedUser);

    const jwt = await makeJWT({
      _id: user._id,
      email: user.email,
      role: user.role,
      is_donor: user.is_donor,
    });

    console.log(user);
    res.status(201).json({ token: jwt });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user." });
  }
};

const userGet = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const decodedUser = decodeJwt(token);
  try {
    const user = await User.findById(decodedUser._id);

    const safeUser = {
      _id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
      // password: '$argon2id$v=19$m=65536,t=3,p=4$8/SrdiES3bjU/hOXGg1ZwQ$Vq5/ZIznW25wocXvd3AxXtmKXVMbDrcMSbA4bkKZwMU',
      phone_number: user.phone_number,
      blood_group: user.blood_group,
      date_of_birth: user.date_of_birth,
      gender: user.gender,
      district: user.district,
      is_donor: user.is_donor,
      donation_count: user.donation_count,
      emergency_donor: user.emergency_donor,
    };

    return res.status(200).json(safeUser);
  } catch (error) {
    console.log(error);
    return res.status(417).json({ error: "User not found" });
  }
};

module.exports = {
  userCreate,
  userGet,
};
