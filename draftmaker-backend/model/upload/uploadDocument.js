// models/uploadDocumentModel.js
const mongoose = require("mongoose");

const uploadDocumentSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    userMobile: {
      type: String,
      required: true,
      trim: true,
    },
    emailAddress: { type: String },
    documentType: {
      type: String,
      required: true,
    },
    formId: {
      type: String,
      required: true,
    },
    documents: [
      {
        type: String,
        required: true,
      },
    ],
    totalDocuments: {
      type: Number,
      required: true,
    },
    documentStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    bookingId: {
      type: String,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    selectedService: {
      serviceId: String,
      serviceName: String,
      basePrice: Number,
      hasNotary: Boolean,
      notaryCharge: Number,
      requiresStamp: Boolean,
      requiresDelivery: Boolean,
    },
    stampDuty: {
      stampDutyId: String,
      documentType: String,
      articleNo: String,
      calculationType: String,
      fixedAmount: Number,
      percentage: Number,
      quantity: String,
      considerationAmount: Number,
      calculatedAmount: Number,
      serviceCharge: Number,
    },
    delivery: {
      deliveryChargeId: String,
      serviceName: String,
      charge: Number,
      address: {
        type: Object,
      },
    },
    payment: {
      totalAmount: Number,
      paymentId: String,
      paymentStatus: String,
      paymentDate: Date,
      paymentStatus: { type: String, default: "Success" },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UploadDocument", uploadDocumentSchema);
