// models/uploadDocumentModel.js
const mongoose = require("mongoose");

const uploadDocumentSchema = new mongoose.Schema(
  {
    userName: {
      type: String,

      trim: true,
    },
    userMobile: {
      type: String,

      trim: true,
    },
    emailAddress: { type: String },
    documentType: {
      type: String,

    },
    formId: {
      type: String,

    },
  documents: [{
    url: {
      type: String,
      required: true
    },
    fileName: {
      type: String,
      required: true
    },
    fileType: {
      type: String,
      default: 'application/pdf'
    },
    fileSize: {
      type: Number,
      default: 0
    }
  }],
    totalDocuments: {
      type: Number,

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
      orderId: String,
      paymentId: String,
      totalAmount: Number,
      paymentStatus: {
        type: String,
        enum: ['PENDING', 'SUCCESS', 'FAILED', 'CANCELLED'],
        default: 'PENDING'
      },
      paymentDate: Date,
      ccavenueResponse: {
        orderStatus: String,
        trackingId: String,
        bankRefNo: String,
        paymentMode: String,
        cardName: String,
        statusMessage: String,
        currency: { type: String, default: 'INR' },
        amount: Number,
        transDate: String,
        responseCode: String,
        merchantParams: {
          param1: String,
          param2: String,
          param3: String,
          param4: String,
          param5: String
        },
        rawResponse: String
      }
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UploadDocument", uploadDocumentSchema);
