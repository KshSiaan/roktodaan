const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    patient_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    situation: { type: String, required: true },
    donation_date: { type: String, required: true },
    location: { type: String, required: true },
    district: { type: String, required: true },
    blood_type: { type: String, required: true },
    blood_bag_quantity: { type: Number, required: true },
    hospital_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: false,
    },
    status: {
      type: String,
      enum: ["new", "pending", "completed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
