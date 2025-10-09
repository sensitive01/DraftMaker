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

const documentVerificationSchema = new mongoose.Schema(
  {
    // Personal details
    name: { type: String },
    relation: { type: String },
    age: { type: Number },
    address: { type: String },
    aadhaar: { type: String },

    // Document details
    year: { type: String },
    semester: { type: String },
    program: { type: String },
    authority: { type: String },
    collegeName: { type: String },
    batch: { type: String },
    regNumber: { type: String },
    documentName: { type: String },

    // Date and location
    place: { type: String },
    day: { type: String },
    month: { type: String },
    year_verification: { type: String },

    // Meta
    bookingId: { type: String },
    mobileNumber: { type: String },
    doumentStatus: {
      type: String,
      default: "Pending",
    },
    userName: { type: String },
    documentType: { type: String },
    formId: { type: String },
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    paymentDetails: {
      paymentId: { type: String },
      paidAmount: { type: Number },
      serviceType: { type: String },
      serviceName: { type: String },
      includesNotary: {
        type: Boolean,
        default: false,
      },
    },

    // ✅ New added fields for charges and financial details
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
    firstParty: { type: String },
    secondParty: { type: String },
    stampDutyPaidBy: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "DocumentVerification",
  documentVerificationSchema
);
