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

// ✅ Additional documents subschema
const additionalDocumentSchema = new mongoose.Schema(
  {
    id: { type: Number, },
    name: { type: String, },
    document: { type: String, },
    documentNo: { type: String, },
  },
  { _id: false }
);

const dualNameCorrection = new mongoose.Schema(
  {
    formId: {
      type: String,
      default: "DM-DNC-1",
    },
    bookingId: String,
    docId: String,
    documentType: String,

    namePrefix: { type: String, },
    fullName: { type: String, },
    relation: { type: String, default: "S/o" },
    relationNamePrefix: String,
    relationName: { type: String, },
    age: { type: Number, },
    permanentAddress: { type: String, },
    aadhaarNo: { type: String, },
    mobileNumber: { type: String, },

    // Old single documents (optional – you can remove if only array is used)
    name1: { type: String, },
    document1: { type: String, },
    documentNo1: { type: String, },
    name2: { type: String, },
    document2: { type: String, },
    documentNo2: { type: String, },

    // ✅ New field for multiple documents
    additionalDocuments: {
      type: [additionalDocumentSchema],
      default: [],
    },

    place: { type: String, },
    day: { type: String, },
    month: { type: String, },
    year: { type: String, default: "2025" },

    doumentStatus: { type: String, default: "Pending" },
    userName: String,
    paymentStatus: { type: String, default: "Pending" },
    paymentDetails: {
      paymentId: String,
      paidAmount: Number,
      serviceType: String,
      serviceName: String,
      includesNotary: { type: Boolean, default: false },
    },

    selectedStampDuty: { type: stampDutySchema, default: null },
    selectedDeliveryCharge: { type: deliveryChargeSchema, default: null },
    serviceDetails: { type: serviceDetailsSchema, default: null },

    deliveryAddress: {
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      pincode: String,
      landmark: String,
      email: String,
    },
    email: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("dualNameCorrection", dualNameCorrection);
