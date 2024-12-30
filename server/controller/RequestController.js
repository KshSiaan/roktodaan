const { decodeJwt } = require("jose");
const Request = require("../model/RequestModel");
const requestCreate = async (req, res) => {
  try {
    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        field: "blood_bag_quantity",
        message: "Request body cannot be empty.",
      });
    }

    //
    let user = "000";
    if (req.headers["authorization"]) {
      const authHeader = req.headers["authorization"];
      const token = authHeader?.split(" ")[1];
      const tokenData = decodeJwt(token);
      user = tokenData._id;
    }

    const userData = req.body;

    const refinedUser = {
      user_id: user,
      patient_name: userData.patient_name, // From userData
      phone_number: userData.available_phone_number,
      situation: userData.situation || "Unknown", // Defaulting to 'Unknown' if not provided
      donation_date: userData.donation_date, // Current date in ISO format
      location: userData.location || "Not specified", // Default if location is missing
      district: userData.district || "Unknown", // Default district
      blood_type: userData.blood_type,
      blood_bag_quantity: userData.blood_bag_quantity || 1, // Default quantity
      hospital_id: userData.hospital_id,
    };

    const request = await Request.create(refinedUser);

    console.log(request);

    // Success response
    return res.status(200).json({ requestData: request });
  } catch (error) {
    console.error("Error in requestCreate:", error);
    return res.status(500).json({
      field: "blood_bag_quantity",
      message: "An internal server error occurred.",
    });
  }
};

const getRequests = async (req, res) => {
  const { bg, district, situation } = req.query;

  try {
    let query = {};

    // Conditionally add filters to the query object if the parameters are present
    if (bg) query.bg = bg; // Filter by bg
    if (district) query.district = district; // Filter by district
    if (situation) query.situation = situation; // Filter by situation

    // Fetch the filtered requests
    const requests = await Request.find(query);

    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "No requests found." });
    }

    return res.status(200).json({ requests });
  } catch (error) {
    console.error("Error fetching requests in getRequests:", error);
    return res.status(500).json({
      message: "An internal server error occurred.",
    });
  }
};

module.exports = { requestCreate, getRequests }; // Direct export for simplicity
