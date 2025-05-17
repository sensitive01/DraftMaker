const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  line1: { type: String },
  line2: { type: String },
  city: { type: String },
  state: { type: String },
  pinCode: { type: String },
});

const nameChangeSchema = new mongoose.Schema(
  {
    name: {
      type: String,

      trim: true,
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
    passportNo: {
      type: String,
      required: false,
    },
    currentGivenName: {
      type: String,
    },
    currentSurname: {
      type: String,
    },
    newGivenName: {
      type: String,
    },
    newSurname: {
      type: String,
    },
    date: {
      type: String, // You can use Date if it's a JS date object
    },
    documentType: {
      type: String,
    },
    formId: {
      type: String,
    },
    place: {
      type: String,
    },
    bookingId: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
    userName: {
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

const passportNameChange = mongoose.model(
  "passoportNameChange",
  nameChangeSchema
);

module.exports = passportNameChange;
