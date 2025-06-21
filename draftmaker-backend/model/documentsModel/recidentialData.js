const mongoose = require("mongoose");

// Sub-schemas
const fixtureSchema = new mongoose.Schema(
  {
    item: { type: String },
    quantity: { type: String },
  },
  { _id: false }
);

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
  },
  { _id: false }
);

const recidentailAgreementSchema = new mongoose.Schema(
  {
    agreementDate: { type: String },

    // Lessor Details
    lessors: [
      {
        name: { type: String },
        addressLine1: { type: String },
        addressLine2: { type: String },
        city: { type: String },
        state: { type: String },
        pinCode: { type: String },
      },
    ],

    lessorAddressLine1: { type: String },
    lessorAddressLine2: { type: String },
    lessorCity: { type: String },
    lessorState: { type: String },
    lessorPinCode: { type: String },

    // Lessee Details
    lessees: [
      {
        name: { type: String },
        aadhaar: { type: String },
        permanentAddressLine1: { type: String },
        permanentAddressLine2: { type: String },
        permanentCity: { type: String },
        permanentState: { type: String },
        permanentPinCode: { type: String },
      },
    ],
    lesseeAadhaar: { type: String },
    lesseePermanentAddressLine1: { type: String },
    lesseePermanentAddressLine2: { type: String },
    lesseePermanentCity: { type: String },
    lesseePermanentState: { type: String },
    lesseePermanentPinCode: { type: String },

    // Rental Details
    rentAmount: { type: Number },
    rentAmountWords: { type: String },
    rentDueDate: { type: String, default: "5" },
    depositAmount: { type: Number },
    depositAmountWords: { type: String },
    paymentMode: { type: String },
    agreementStartDate: { type: String },
    agreementEndDate: { type: String },
    rentIncreasePercentage: { type: String },
    noticePeriod: { type: String },
    terminationPeriod: { type: String },
    paintingCharges: { type: String },
    usePurpose: { type: String },

    // Property Configuration
    bhkConfig: { type: String },
    bedroomCount: { type: String },
    hallCount: { type: String },
    kitchenCount: { type: String },
    toiletCount: { type: String },

    // Fixtures
    fixtures: [fixtureSchema],

    // Booking Info
    bookingId: { type: String },
    mobileNumber: { type: String },
    documentType: { type: String },
    formId: { type: String },
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
    additionaldetails: { type: String },
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

module.exports = mongoose.model(
  "recidentialAggrement",
  recidentailAgreementSchema
);
