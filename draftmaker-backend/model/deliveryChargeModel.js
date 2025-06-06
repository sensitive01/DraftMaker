const mongoose = require("mongoose");

const deliveryChargeSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
    },
    description: {
      type: String,
    },
    charge: {
      type: Number,

      min: 0,
    },
    deliveryTime: {
      type: String,
    },
    serviceType: {
      type: String,
      default: "scan_delivery",
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("deliveryChargeSchema", deliveryChargeSchema);
