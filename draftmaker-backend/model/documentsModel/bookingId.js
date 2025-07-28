const mongoose = require("mongoose");

const bookingIdRegistrySchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookingIdRegistry", bookingIdRegistrySchema);
