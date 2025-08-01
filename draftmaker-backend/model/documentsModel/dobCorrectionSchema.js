const mongoose = require("mongoose");

// Stamp duty subschema
const stampDutySchema = new mongoose.Schema(
  {
    documentType: String,
    articleNo: String,
    calculationType: String,
    fixedAmount: Number,
    percentage: Number,
    minAmount: Number,
    maxAmount: Number,
  },
  { _id: false }
);

// Delivery charge subschema
const deliveryChargeSchema = new mongoose.Schema(
  {
    serviceName: String,
    description: String,
    charge: Number,
    serviceType: String,
  },
  { _id: false }
);

// Service details subschema
const serviceDetailsSchema = new mongoose.Schema(
  {
    basePrice: Number,
    notaryCharge: Number,
    stampDutyAmount: Number,
    deliveryCharge: Number,
    requiresStamp: Boolean,
    requiresDelivery: Boolean,
    considerationAmount: Number,
    quantity: Number,
    serviceCharge: Number,
  },
  { _id: false }
);

const dobCorrectionSchema = new mongoose.Schema(
  {
    bookingId: { type: String },
    fullName: { type: String },
    relation: { type: String, default: "S/o" },
    relationName: { type: String },
    age: { type: Number },
    permanentAddress: { type: String },
    aadhaarNo: { type: String },

    dob1: { type: String },
    document1: { type: String },
    documentNo1: { type: String },

    dob2: { type: String },
    document2: { type: String },
    documentNo2: { type: String },

    place: { type: String },
    day: { type: Number },
    month: { type: String },
    year: { type: Number, default: 2025 },

    mobileNumber: { type: String },
    documentType: { type: String },
    doumentStatus: { type: String, default: "Pending" },
    userName: { type: String },
    paymentStatus: { type: String, default: "Pending" },
    formId: { type: String },

    paymentDetails: {
      paymentId: { type: String },
      paidAmount: { type: Number },
      serviceType: { type: String },
      serviceName: { type: String },
      includesNotary: { type: Boolean, default: false },
    },

    // New fields
    selectedStampDuty: {
      type: stampDutySchema,
      default: null,
    },
    selectedDeliveryCharge: {
      type: deliveryChargeSchema,
      default: null,
    },
    serviceDetails: {
      type: serviceDetailsSchema,
      default: null,
    },
    deliveryAddress: {
      addressLine1: { type: String },
      addressLine2: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
      landmark: { type: String },
      email: { type: String },
    },
    email: { type: String },
  },
  {
    timestamps: true,
  }
);

const dobCorrection = mongoose.model("dobCorrection", dobCorrectionSchema);

module.exports = dobCorrection;
