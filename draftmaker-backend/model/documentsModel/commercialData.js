const mongoose = require("mongoose");

// Fixture subschema
const fixtureSchema = new mongoose.Schema(
  {
    item: { type: String },
    quantity: { type: String },
  },
  { _id: false }
);

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

const commercialAgreementSchema = new mongoose.Schema(
  {
    agreementDate: { type: String },

    // Lessor
    lessorName: { type: String },
    lessorAddressLine1: { type: String },
    lessorAddressLine2: { type: String },
    lessorCity: { type: String },
    lessorState: { type: String },
    lessorPinCode: { type: String },

    // Lessee
    lesseeName: { type: String },
    lesseeAadhaar: { type: String },
    lesseePermanentAddressLine1: { type: String },
    lesseePermanentAddressLine2: { type: String },
    lesseePermanentCity: { type: String },
    lesseePermanentState: { type: String },
    lesseePermanentPinCode: { type: String },

    // Financials
    rentAmount: { type: Number },
    rentAmountWords: { type: String },
    rentDueDate: { type: String, default: "5" },
    depositAmount: { type: Number },
    depositAmountWords: { type: String },
    paymentMode: { type: String },

    // Dates
    agreementStartDate: { type: String },
    agreementEndDate: { type: String },

    // Terms
    rentIncreasePercentage: { type: String },
    noticePeriod: { type: String },
    terminationPeriod: { type: String },
    paintingCharges: { type: String },
    usePurpose: { type: String },

    // BHK
    bhkConfig: { type: String },
    bedroomCount: { type: String },
    hallCount: { type: String },
    kitchenCount: { type: String },
    toiletCount: { type: String },

    // Fixtures
    fixtures: [fixtureSchema],

    // Meta
    formId: { type: String },
    bookingId: { type: String },
    mobileNumber: { type: String },
    documentType: { type: String },
    doumentStatus: { type: String, default: "Pending" },
    userName: { type: String },
    paymentStatus: { type: String, default: "Pending" },

    // Payment
    paymentDetails: {
      paymentId: String,
      paidAmount: Number,
      serviceType: String,
      serviceName: String,
      includesNotary: { type: Boolean, default: false },
    },

    // New Additions
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

    commercialType: { type: String },
    squareFeet: { type: String },
    additionaldetails: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "commercialAggrement",
  commercialAgreementSchema
);
