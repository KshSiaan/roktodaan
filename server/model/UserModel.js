const mongoose = require("mongoose");
const argon2 = require("argon2");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"], // Adjust roles as per your application
      default: "user",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
      trim: true,
    },
    blood_group: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    date_of_birth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    district: {
      type: String,
      required: true,
    },
    is_donor: {
      type: Boolean,
      default: false,
    },
    donation_count: {
      type: Number,
      default: 0,
    },
    last_donation_date: {
      type: Date,
    },
    emergency_donor: {
      type: Boolean,
      default: false,
    },
    note: {
      type: String,
    },
    profile_pic_url: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const updatedPassword = await argon2.hash(this.password); // Use 'this' to access the instance's password
      this.password = updatedPassword; // Assign the hashed password to the document
      next();
    } catch (error) {
      next(error); // Pass any errors to the next middleware
    }
  } else {
    next(); // If password isn't modified, just proceed
  }
});

module.exports = mongoose.model("User", userSchema);
