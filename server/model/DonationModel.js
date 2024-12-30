const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patient_name: { type: String, required: true },
    situation: { type: String, required: true },
    donation_date: { type: Date, required: true },
    location: { type: String, required: true },
    blood_bag_quantity: { type: Number, required: true },
    hospital_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    status: { type: String, required: true }, // You might want to use an enum for predefined status values
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
