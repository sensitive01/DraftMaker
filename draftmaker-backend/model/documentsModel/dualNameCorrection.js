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

const dualNameCorrection = new mongoose.Schema(
  {
    formId: {
      type: String,
      default: "DM-DNC-1",
    },
    bookingId: {
      type: String,
    },
    docId: {
      type: String,
    },
    documentType: {
      type: String,
    },
    namePrefix: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    relation: {
      type: String,
      default: "S/o",
    },
    relationNamePrefix: {
      type: String, // ✅ Added field
    },
    relationName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    aadhaarNo: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    name1: {
      type: String,
      required: true,
    },
    document1: {
      type: String,
      required: true,
    },
    documentNo1: {
      type: String,
      required: true,
    },
    name2: {
      type: String,
      required: true,
    },
    document2: {
      type: String,
      required: true,
    },
    documentNo2: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      default: "2025",
    },
    doumentStatus: {
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
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("dualNameCorrection", dualNameCorrection);
