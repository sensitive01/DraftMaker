const mongoose = require("mongoose");

const parentCorrectionFormSchema = new mongoose.Schema(
  {
    fatherTitle: {
      type: String,
    },
    fatherName: {
      type: String,
    },
    motherTitle: {
      type: String,
    },
    motherName: {
      type: String,
    },
    address: {
      type: String,
    },
    fatherAadhaar: {
      type: String,
    },
    motherAadhaar: {
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
    incorrectFatherName: {
      type: String,
    },
    incorrectMotherName: {
      type: String,
    },
    correctFatherName: {
      type: String,
    },
    correctMotherName: {
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
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    userName: {
      type: String,
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

const ParentCorrectionForm = mongoose.model(
  "dobParentNameCorrection",
  parentCorrectionFormSchema
);

module.exports = ParentCorrectionForm;
