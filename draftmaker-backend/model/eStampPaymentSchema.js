const mongoose = require("mongoose");

const estampPaymentSchema = new mongoose.Schema(
  {
    bookingId: String,
    firstPartyName: String,
    secondPartyName: String,
    selectedDocumentId: String,
    documentType: String,
    documentCalculationType: {
      type: String,
      enum: ["fixed", "percentage"],
    },

    documentFixedAmount: { type: Number, default: 0 },
    documentPercentage: { type: Number, default: 0 },
    documentMinAmount: { type: Number, default: 0 },
    documentMaxAmount: { type: Number, default: 0 },

    stampDutyAmount: Number,
    deliveryType: String,
    selectedDeliveryServiceId: String,
    deliveryServiceName: String,
    deliveryCharge: { type: Number, default: 0 },
    deliveryDescription: String,

    requestorName: String,
    mobileNumber: String,
    totalAmount: Number,

    orderDate: { type: Date, default: Date.now },
    paymentMethod: String,
    currency: { type: String, default: "INR" },

    paymentStatus: { type: String, default: "Pending" },
    paymentCompletedAt: Date,

    considerationAmount: Number,
    documentStatus: { type: String, default: "Pending" },

    stampDutyPayer: String,
    description: String,
    serviceCharge: Number,

    quantity: { type: Number, default: 1 },

    deliveryAddress: {
      email: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      pincode: String,
      landmark: String,
    },

    // ----------------------------
    //   CCAvenue Required Fields
    // ----------------------------


    orderId: String,
    ccavenueOrderStatus: String,
    ccavenueTrackingId: String,
    ccavenueBankRefNo: String,
    ccavenuePaymentMode: String,
    ccavenueCardName: String,
    ccavenueStatusMessage: String,
    ccavenueFailureMessage: String,
    ccavenueCurrency: String,
    ccavenueAmount: String,
    ccavenueTransDate: String,
    ccavenueResponseCode: String,
    ccavenueMerchantParam1: String,
    ccavenueMerchantParam2: String,
    ccavenueMerchantParam3: String,
    ccavenueMerchantParam4: String,
    ccavenueMerchantParam5: String,
    ccavenueRawResponse: String,       
  },
  { timestamps: true }
);

module.exports = mongoose.model("EstampPayment", estampPaymentSchema);
