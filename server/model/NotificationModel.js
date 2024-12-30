const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: { type: String, required: true },
    sent_at: { type: Date, default: Date.now }, // Default to the current datetime
    read_status: { type: Boolean, default: false }, // Default to unread
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
