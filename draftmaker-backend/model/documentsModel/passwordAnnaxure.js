const mongoose = require("mongoose");

// Sub-schemas
const residenceSchema = new mongoose.Schema(
  {
    country: { type: String },
    periodFrom: { type: String },
    periodTo: { type: String },
    pageNos: { type: String },
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
    considerationAmount: Number,
    quantity: Number,
    serviceCharge: Number,
  },
  { _id: false }
);

const passportAffidavitSchema = new mongoose.Schema(
  {
    name: { type: String },
    relationType: { type: String }, // e.g., "S/o", "D/o", "W/o"
    guardianName: { type: String },
    age: { type: Number },
    permanentAddress: { type: String },
    presentAddress: { type: String },
    aadhaarNo: { type: String },
    passportNo: { type: String },
    incidentDetails: { type: String },
    travelled: {
      type: String,
      enum: ["YES", "NO"],
      default: "NO",
    },
    travelDetails: { type: String },
    trConcessions: {
      type: String,
      enum: ["YES", "NO"],
      default: "NO",
    },
    concessionDetails: { type: String },
    nonResidentIndian: {
      type: String,
      enum: ["YES", "NO"],
      default: "NO",
    },
    passportObjection: {
      type: String,
      enum: ["YES", "NO"],
      default: "NO",
    },
    objectionDetails: { type: String },
    deported: {
      type: String,
      enum: ["YES", "NO"],
      default: "NO",
    },
    deportationDetails: { type: String },
    date: { type: String },
    place: { type: String },
    useNameAsSignature: {
      type: Boolean,
      default: false,
    },
    residences: {
      type: [residenceSchema],
      default: [],
    },
    bookingId: { type: String },
    mobileNumber: { type: String },
    documentStatus: {
      type: String,
      default: "Pending",
    },
    documentType: { type: String },
    formId: { type: String },
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
    firstParty: { type: String },
    secondParty: { type: String },
  },
  {
    timestamps: true,
  }
);

const passportAnnaxure = mongoose.model(
  "PassportAffidavit",
  passportAffidavitSchema
);

module.exports = passportAnnaxure;
