// models/FormData.js
const mongoose = require("mongoose");

const nameChangeSchema = new mongoose.Schema(
  {
    prefix: {
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
    oldName: {
      type: String,
    },
    newName: {
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
    documentType: {
      type: String,
    },
    formId: {
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

const nameChange = mongoose.model("nameChangeSchema", nameChangeSchema);

module.exports = nameChange;
