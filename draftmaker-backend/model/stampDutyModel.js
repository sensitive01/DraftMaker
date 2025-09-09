const mongoose = require("mongoose");

const stampDutySchema = new mongoose.Schema(
  {
    documentType: {
      type: String,
    },
    articleNo: {
      type: String,
    },
    calculationType: {
      type: String,
      enum: ["fixed", "percentage"],

      default: "fixed",
    },
    fixedAmount: {
      type: Number,
      default: 0,
    },
    percentage: {
      type: Number,
      default: 0,
    },
    minAmount: {
      type: Number,
      default: 0,
    },
    maxAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: Boolean,
      default: true,
    },
    serviceCharge:{type:Number}
  },
  { timestamps: true }
);

module.exports = mongoose.model("stampDutySchema", stampDutySchema);
