const mongoose = require("mongoose");

// Reusable sub-schemas
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

const deliveryChargeSchema = new mongoose.Schema(
  {
    serviceName: String,
    description: String,
    charge: Number,
    serviceType: String,
  },
  { _id: false }
);

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

const nameChangeSchema = new mongoose.Schema(
  {
    prefix: { type: String },
    fullName: { type: String },
    relation: { type: String, default: "S/o" },
    relationName: { type: String },
    age: { type: Number },
    permanentAddress: { type: String },
    aadhaarNo: { type: String },
    oldName: { type: String },
    newName: { type: String },
    place: { type: String },
    day: { type: Number },
    month: { type: String },
    year: { type: Number, default: 2025 },
    documentType: { type: String },
    formId: { type: String },
    bookingId: { type: String },
    mobileNumber: { type: String },
    userName: { type: String },
    doumentStatus: { type: String, default: "Pending" },
    paymentStatus: { type: String, default: "Pending" },
    paymentDetails: {
      paymentId: { type: String },
      paidAmount: { type: Number },
      serviceType: { type: String },
      serviceName: { type: String },
      includesNotary: { type: Boolean, default: false },
    },

    // ✅ Newly added fields
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

const nameChange = mongoose.model("nameChangeSchema", nameChangeSchema);

module.exports = nameChange;
