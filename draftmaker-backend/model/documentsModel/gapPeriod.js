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

const gapPeriodSchema = new mongoose.Schema({
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  reason: {
    type: String,
  },
});

const gapCertificateSchema = new mongoose.Schema(
  {
    name: {
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
    address: {
      type: String,
    },
    aadhaarNo: {
      type: String,
    },
    authority: {
      type: String,
    },
    place: {
      type: String,
    },
    day: {
      type: String,
    },
    month: {
      type: String,
    },
    year: {
      type: String,
    },

    gapPeriods: {
      type: [gapPeriodSchema],
      default: [],
    },
    bookingId: {
      type: String,
    },
    documentType: {
      type: String,
    },
    formId: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
    documentStatus: {
      type: String,
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    userName: {
      type: String,
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
    firstParty: { type: String },
    secondParty: { type: String },
    stampDutyPayer:{ type: String },

    // Added fields for stamp duty, delivery charge, and service details
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

const gapPeriod = mongoose.model("GapPeriod", gapCertificateSchema);

module.exports = gapPeriod;
