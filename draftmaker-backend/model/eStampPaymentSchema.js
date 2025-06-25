const mongoose = require("mongoose");

const estampPaymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
    },
    firstPartyName: {
      type: String,
    },
    secondPartyName: {
      type: String,
    },
    selectedDocumentId: {
      type: String,
    },
    documentType: {
      type: String,
    },
    documentCalculationType: {
      type: String,
      enum: ["fixed", "percentage"],
    },
    documentFixedAmount: {
      type: Number,
      default: 0,
    },
    documentPercentage: {
      type: Number,
      default: 0,
    },
    documentMinAmount: {
      type: Number,
      default: 0,
    },
    documentMaxAmount: {
      type: Number,
      default: 0,
    },
    stampDutyAmount: {
      type: Number,
    },
    deliveryType: {
      type: String,
    },
    selectedDeliveryServiceId: {
      type: String,
    },
    deliveryServiceName: {
      type: String,
    },
    deliveryCharge: {
      type: Number,
      default: 0,
    },
    deliveryDescription: {
      type: String,
    },
    requestorName: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
    totalAmount: {
      type: Number,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    paymentMethod: {
      type: String,
    },
    currency: {
      type: String,
      default: "INR",
    },
    razorpayPaymentId: {
      type: String,
    },
    razorpayOrderId: {
      type: String,
    },
    razorpaySignature: {
      type: String,
    },
    paymentStatus: {
      type: String,
      default: "Success",
    },
    paymentCompletedAt: {
      type: Date,
    },
    considerationAmount: {
      type: Number,
    },
    documentStatus: {
      type: String,
      default: "Pending",
    },

    stampDutyPayer: {
      type: String,
    },

    description: {
      type: String,
    },
    deliveryAddress: {
      email: { type: String },
      addressLine1: { type: String },
      addressLine2: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
      landmark: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EstampPayment", estampPaymentSchema);
