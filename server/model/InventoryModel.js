const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    hospital_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    blood_group: { type: String, required: true },
    available_bags: { type: Number, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
