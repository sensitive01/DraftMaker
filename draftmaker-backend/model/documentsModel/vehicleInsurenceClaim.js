const mongoose = require("mongoose");

// Sub-schemas
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

const vehicleAccidentSchema = new mongoose.Schema(
  {
    // Personal Info
    title: { type: String },
    name: { type: String },
    relation: { type: String },
    age: { type: Number },
    address: { type: String },
    aadhaarNo: { type: String },
    guardianName: { type: String },

    // Vehicle Info
    vehicleNo: { type: String },
    vehicleModel: { type: String },
    engineNo: { type: String },
    chassisNo: { type: String },

    // Insurance Info
    insurer: { type: String },
    policyNo: { type: String },
    policyStart: { type: String },
    policyEnd: { type: String },

    // Accident Info
    driverName: { type: String },
    accidentDetails: { type: String },

    // Document Info
    place: { type: String },
    day: { type: String },
    month: { type: String },
    year: { type: String },
    bookingId: { type: String },
    mobileNumber: { type: String },
    userName: { type: String },
    documentType: { type: String },
    formId: { type: String },
    doumentStatus: { type: String, default: "Pending" },
    paymentStatus: { type: String, default: "Pending" },

    paymentDetails: {
      paymentId: { type: String },
      paidAmount: { type: Number },
      serviceType: { type: String },
      serviceName: { type: String },
      includesNotary: { type: Boolean, default: false },
    },

    // ✅ Newly added fields for charge breakdown
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

module.exports = mongoose.model("VehicleAccident", vehicleAccidentSchema);
