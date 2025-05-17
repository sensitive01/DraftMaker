const mongoose = require("mongoose");

const fixtureSchema = new mongoose.Schema({
  item: { type: String },
  quantity: { type: String },
});

const recidentailAgreementSchema = new mongoose.Schema(
  {
    agreementDate: { type: String },
    lessorName: { type: String },
    lessorAddressLine1: { type: String },
    lessorAddressLine2: { type: String },
    lessorCity: { type: String },
    lessorState: { type: String },
    lessorPinCode: { type: String },

    lesseeName: { type: String },
    lesseeAadhaar: { type: String },
    lesseePermanentAddressLine1: { type: String },
    lesseePermanentAddressLine2: { type: String },
    lesseePermanentCity: { type: String },
    lesseePermanentState: { type: String },
    lesseePermanentPinCode: { type: String },

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

    usePurpose: {
      type: String,
    },

    bhkConfig: { type: String },
    bedroomCount: { type: String },
    hallCount: { type: String },
    kitchenCount: { type: String },
    toiletCount: { type: String },

    fixtures: [fixtureSchema],

    bookingId: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
    documentType: {
      type: String,
    },
    formId: {
      type: String,
    },
    doumentStatus: {
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "recidentialAggrement",
  recidentailAgreementSchema
);
