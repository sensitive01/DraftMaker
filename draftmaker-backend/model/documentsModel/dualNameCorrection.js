const mongoose = require("mongoose");

const dualNameCorrection = new mongoose.Schema(
  {
    formId: {
      type: String,
      default: "DM-DNC-1",
    },
    bookingId: {
      type: String,
    },
    docId: {
      type: String,
    },
    documentType: {
      type: String,
    },
    namePrefix: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    relation: {
      type: String,
      default: "S/o",
    },
    relationNamePrefix: {
      type: String, // ✅ Added field
    },
    relationName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    aadhaarNo: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    name1: {
      type: String,
      required: true,
    },
    document1: {
      type: String,
      required: true,
    },
    documentNo1: {
      type: String,
      required: true,
    },
    name2: {
      type: String,
      required: true,
    },
    document2: {
      type: String,
      required: true,
    },
    documentNo2: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    documentType: {
      type: String,
    },
    formId: {
      type: String,
    },
    year: {
      type: String,
      default: "2025",
    },
    mobileNumber: {
      type: String,
    },
    doumentStatus: {
      type: String,
      default: "Pending",
    },
    userName: {
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

module.exports = mongoose.model("dualNameCorrection", dualNameCorrection);
