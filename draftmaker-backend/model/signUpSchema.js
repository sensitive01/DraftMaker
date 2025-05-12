// models/User.js

const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
    },
    termsAccepted: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("signupSchema", signupSchema);
