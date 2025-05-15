const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  line1: { type: String },
  line2: { type: String },
  city: { type: String },
  state: { type: String },
  pinCode: { type: String },
});

const affidavitSchema = new mongoose.Schema(
  {
    name: {
      type: String,

      trim: true,
    },
    documentType: {
      type: String,
    },
    gender: {
      type: String,
    },
    age: {
      type: Number,
    },
    relatedPersonName: {
      type: String,
    },
    permanentAddress: {
      type: addressSchema,
    },
    presentAddress: {
      type: addressSchema,
    },
    aadhaarNo: {
      type: String,
    },
    currentResidenceAddress: {
      type: String,
    },
    companyName: {
      type: String,
    },
    purposeOfAffidavit: {
      type: String,
    },
    date: {
      type: String,
    },
    place: {
      type: String,
    },
    bookingId: {
      type: String,
    },
    formId: {
      type: String,
    },
    documentType: {
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

module.exports = mongoose.model("Affidavit", affidavitSchema);
