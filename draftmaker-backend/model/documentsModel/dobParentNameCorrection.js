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

const parentCorrectionFormSchema = new mongoose.Schema(
  {
    fatherTitle: { type: String },
    fatherName: { type: String },
    motherTitle: { type: String },
    motherName: { type: String },
    address: { type: String },
    fatherAadhaar: { type: String },
    motherAadhaar: { type: String },
    childRelation: {
      type: String,
    },
    childName: { type: String },
    certificateNumber: { type: String },
    incorrectFatherName: { type: String },
    incorrectMotherName: { type: String },
    correctFatherName: { type: String },
    correctMotherName: { type: String },
    place: { type: String },
    day: { type: Number },
    month: { type: String, default: "April" },
    year: { type: Number, default: 2025 },
    bookingId: { type: String },
    mobileNumber: { type: String },
    doumentStatus: { type: String, default: "Pending" },
    paymentStatus: { type: String, default: "Pending" },
    userName: { type: String },
    documentType: { type: String },
    formId: { type: String },
    paymentDetails: {
      paymentId: { type: String },
      paidAmount: { type: Number },
      serviceType: { type: String },
      serviceName: { type: String },
      includesNotary: { type: Boolean, default: false },
    },

    // Newly added fields
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

const ParentCorrectionForm = mongoose.model(
  "dobParentNameCorrection",
  parentCorrectionFormSchema
);

module.exports = ParentCorrectionForm;
