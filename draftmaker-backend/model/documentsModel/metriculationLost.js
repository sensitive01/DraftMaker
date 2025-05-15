const mongoose = require("mongoose");

const documentVerificationSchema = new mongoose.Schema(
  {
    // Personal details
    name: {
      type: String,
    },
    relation: {
      type: String,
    },
    age: {
      type: Number,
    },
    address: {
      type: String,
    },
    aadhaar: {
      type: String,
    },

    // Document details
    year: {
      type: String,
    },
    semester: {
      type: String,
    },
    program: {
      type: String,
    },
    authority: {
      type: String,
    },
    collegeName: {
      type: String,
    },
    batch: {
      type: String,
    },
    regNumber: {
      type: String,
    },
    documentName: {
      type: String,
    },

    place: {
      type: String,
    },
    day: {
      type: String,
    },
    month: {
      type: String,
    },
    year_verification: {
      type: String,
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
    documentType: {
      type: String,
    },
    formId: {
      type: String,
    },
    paymentStatus: {
      type: String,
      default: "Pending",
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

module.exports = mongoose.model(
  "DocumentVerification",
  documentVerificationSchema
);
