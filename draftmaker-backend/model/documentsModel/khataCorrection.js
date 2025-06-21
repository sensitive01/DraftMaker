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
  },
  { _id: false }
);

const dualApplicantSchema = new mongoose.Schema(
  {
    name1: { type: String },
    relation1: { type: String },
    age1: { type: Number },
    address1: { type: String },
    aadhaar1: { type: String },

    name2: { type: String },
    relation2: { type: String },
    age2: { type: Number },
    address2: { type: String },
    aadhaar2: { type: String },

    propertyAddress: { type: String },
    wardNumber: { type: String },
    zone: { type: String },
    authority: { type: String },
    khataNo: { type: String },
    sasNumber: { type: String },

    authorizedPerson: { type: String },

    place: { type: String },
    day: { type: String },
    month: { type: String },
    year: { type: String },

    bookingId: { type: String },
    mobileNumber: { type: String },
    documentType: { type: String },
    formId: { type: String },

    doumentStatus: {
      type: String,
      default: "Pending",
    },
    userName: { type: String },
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

    // ✅ Added fields for financial calculations
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
    },
  },
  {
    timestamps: true,
  }
);

const khataCorrection = mongoose.model("khataCorrection", dualApplicantSchema);

module.exports = khataCorrection;
