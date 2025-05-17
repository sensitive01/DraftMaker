// models/FIRFormData.js
const mongoose = require("mongoose");

const documentLost = new mongoose.Schema(
  {
    personTitle: {
      type: String,
    },
    personName: {
      type: String,
    },
    relationType: {
      type: String,
    },
    relationName: {
      type: String,
    },
    age: {
      type: Number,
    },
    address: {
      type: String,
    },
    aadhaarNumber: {
      type: String,
    },
    documentType: {
      type: String,
    },
    documentNumber: {
      type: String,
    },
    firNumber: {
      type: String,
    },
    firDay: {
      type: Number,
    },
    firMonth: {
      type: String,
    },
    firYear: {
      type: Number,
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
    userName: {
      type: String,
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

const documentLostSchema = mongoose.model("documentLost", documentLost);

module.exports = documentLostSchema;
