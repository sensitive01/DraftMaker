const mongoose = require("mongoose");

const dobCorrectionSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
    },
    fullName: {
      type: String,
    },
    relation: {
      type: String,
      default: "S/o",
    },
    relationName: {
      type: String,
    },
    age: {
      type: Number,
    },
    permanentAddress: {
      type: String,
    },
    aadhaarNo: {
      type: String,
    },
    dob1: {
      type: String,
    },
    document1: {
      type: String,
    },
    documentNo1: {
      type: String,
    },
    dob2: {
      type: String,
    },
    document2: {
      type: String,
    },
    documentNo2: {
      type: String,
    },
    place: {
      type: String,
    },
    day: {
      type: Number,
    },
    month: {
      type: String,
    },
    year: {
      type: Number,
      default: 2025,
    },
    bookingId: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
    doumentStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    documentType: {
      type: String,
    },
    formId: {
      type: String,
    },
    paymentDetails: {
      paymentId: {
        type: String,
      },
      paidAmount: {
        type: Number,
      },
      serviceType: {
        type: String,
      },
      serviceName: {
        type: String,
      },
      includesNotary: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const dobCorrection = mongoose.model("dobCorrection", dobCorrectionSchema);

module.exports = dobCorrection;
