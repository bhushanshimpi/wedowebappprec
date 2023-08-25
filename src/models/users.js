const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  dob: {
    type: Date,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  countryCode: {
    type: String,
    required: false,
  },
  mobileNumber: {
    type: String,
    required: false,
  },
  wholeMobileNumber: {
    type: String,
    required: false,
  },
  socialType: {
    type: String,
    required: false,
  },
  socialToken: {
    type: String,
    required: false,
  },
  isOnline: {
    type: String,
    default: "0",
  },
  isVerified: {
    type: String,
    required: false,
    default: "0",
  },
  deviceType: {
    type: String,
    required: false,
  },
  deviceToken: {
    type: String,
    required: false,
  },
  prpPoints: {
    type: String,
    required: false,
  },
  currentStatus: {
    type: String,
    default: "Offline",
  },
  profileVerificationOpt: {
    type: String,
    required: false,
  },
  profileVerificationOptOptExpiredAt: {
    type: Number,
    required: false,
  },
  forgotPasswordOpt: {
    type: String,
    required: false,
  },
  forgotPasswordOptExpiredAt: {
    type: Number,
    required: false,
  },
  profileDeleteOpt: {
    type: String,
    required: false,
  },
  profileDeleteOptExpiredAt: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  updatedAt: {
    type: Number,
    default: Date.now(),
  },
  deletedAt: {
    type: Number,
    default: 0,
  },
});

const user = mongoose.model("Users", userSchema);
module.exports = user;
