const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    website_url: { type: String },
    address: { type: String },
    city: { type: String },
    district: { type: String },
    country: { type: String },
    contact_number: { type: Number },
    point_of_contact: { type: String },
    poc_phone: { type: Number },
    poc_email: { type: String },
    registration_number: { type: Number, unique: true },
    is_verified: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
