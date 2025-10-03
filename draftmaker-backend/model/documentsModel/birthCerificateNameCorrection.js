const mongoose = require("mongoose");

// Stamp Duty Subschema
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

// Delivery Charge Subschema
const deliveryChargeSchema = new mongoose.Schema(
  {
    serviceName: String,
    description: String,
    charge: Number,
    serviceType: String,
  },
  { _id: false }
);

// Service Details Subschema
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

const nameCorrectionFormSchema = new mongoose.Schema(
  {
    parentTitle: {
      type: String,
      enum: ["Mr.", "Mrs.", "Dr.", "Shri"],
      default: "Mr.",
    },
    parentName: { type: String },
    spouseTitle: {
      type: String,
      enum: ["Mrs.", "Ms.", "Dr.", "Smt."],
      default: "Mrs.",
    },
    spouseName: { type: String },
    address: { type: String },
    parentAadhaar: { type: String },
    spouseAadhaar: { type: String },
    childRelation: {
      type: String,
    },
    childName: { type: String },
    certificateNumber: { type: String },
    incorrectName: { type: String },
    correctName: { type: String },
    place: { type: String },
    day: { type: Number },
    month: {
      type: String,
      default: "April",
    },
    year: {
      type: Number,
      default: 2025,
    },
    bookingId: { type: String },
    mobileNumber: { type: String },
    userName: { type: String },
    doumentStatus: {
      type: String,
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    documentType: { type: String },
    formId: { type: String },

    paymentDetails: {
      paymentId: String,
      paidAmount: Number,
      serviceType: String,
      serviceName: String,
      includesNotary: {
        type: Boolean,
        default: false,
      },
    },

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
  },
  {
    timestamps: true,
  }
);

const BirthCertificateNameCorrection = mongoose.model(
  "birthCertificateNameCorrection",
  nameCorrectionFormSchema
);

module.exports = BirthCertificateNameCorrection;
