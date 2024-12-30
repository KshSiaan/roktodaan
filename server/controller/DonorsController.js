const User = require("../model/UserModel");

const DonorGet = async (req, res) => {
  try {
    const donors = await User.find({ is_donor: true });
    return res.status(200).json({ success: true, data: donors });
  } catch (error) {
    console.error("Error fetching donors:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching donor information.",
    });
  }
};

module.exports = {
  DonorGet,
};
