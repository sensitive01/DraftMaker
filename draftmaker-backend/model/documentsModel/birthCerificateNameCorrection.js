
const mongoose = require("mongoose");

const nameCorrectionFormSchema = new mongoose.Schema(
  {
    parentTitle: {
      type: String,
      enum: ["Mr.", "Mrs.", "Dr.", "Shri"], 
      default: "Mr.",
    },
    parentName: {
      type: String,
    },
    spouseTitle: {
      type: String,
      enum: ["Mrs.", "Ms.", "Dr.", "Smt."],
      default: "Mrs.",
    },
    spouseName: {
      type: String,
    },
    address: {
      type: String,
    },
    parentAadhaar: {
      type: String,
    },
    spouseAadhaar: {
      type: String,
    },
    childRelation: {
      type: String,
      enum: ["Daughter", "Son", "Child"],
      default: "Daughter",
    },
    childName: {
      type: String,
    },
    certificateNumber: {
      type: String,
    },
    incorrectName: {
      type: String,
    },
    correctName: {
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
      default: "April",
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

const BirthCertificateNameCorrection = mongoose.model(
  "birtCertificateNameCorrection",
  nameCorrectionFormSchema
);

module.exports = BirthCertificateNameCorrection;
