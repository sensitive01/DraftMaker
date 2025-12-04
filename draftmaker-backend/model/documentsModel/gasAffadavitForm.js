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
    considerationAmount: Number,
    quantity: Number,
    serviceCharge: Number,
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

const gasFormDataSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    fatherName: {
      type: String,
    },

    relation: {
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
    gasCompanyName: {
      type: String,
    },
    serviceAddress: {
      type: String,
    },
    connectionDate: {
      type: String,
    },
    consumerNumber: {
      type: String,
    },
    subscriptionVoucher: {
      type: String,
    },
    cylinderCount: {
      type: Number,
    },
    regulatorCount: {
      type: Number,
    },
    depositAmount: {
      type: Number,
    },
    previousAddress: {
      type: String,
    },
    reason: {
      type: String,
      default: "shifting",
    },
    lostItem: {
      type: String,
      default: "subscription",
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
    documentStatus: {
      type: String,
      default: "Pending",
    },
    userName: {
      type: String,
    },
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    documentType: {
      type: String,
    },
    formId: {
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
    firstParty: { type: String },
    secondParty: { type: String },
    stampDutyPaidBy: { type: String },
  },
  {
    timestamps: true,
  }
);

const GasFormData = mongoose.model("GasFormData", gasFormDataSchema);

module.exports = GasFormData;
