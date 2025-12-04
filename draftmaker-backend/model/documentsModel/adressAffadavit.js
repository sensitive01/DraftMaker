const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  line1: { type: String },
  line2: { type: String },
  city: { type: String },
  state: { type: String },
  pinCode: { type: String },
});

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

const affidavitSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    documentType: { type: String },
    gender: { type: String },
    age: { type: Number },
    relatedPersonName: { type: String },
    permanentAddress: { type: addressSchema },
    presentAddress: { type: addressSchema },
    aadhaarNo: { type: String },
    currentResidenceAddress: { type: String },
    companyName: { type: String },
    purposeOfAffidavit: { type: String },
    date: { type: String },
    place: { type: String },
    bookingId: { type: String },
    formId: { type: String },
    mobileNumber: { type: String },
    userName: { type: String },
    documentStatus: {
      type: String,
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    paymentDetails: {
      paymentId: String,
      paidAmount: Number,
      serviceType: String,
      serviceName: String,
      includesNotary: {
        type: Boolean,
        default: false,
      },
    },
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

module.exports = mongoose.model("Affidavit", affidavitSchema);
