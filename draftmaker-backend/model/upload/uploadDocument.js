const mongoose = require("mongoose");

// -------------------- Document File Schema --------------------
const documentFileSchema = new mongoose.Schema({
  url: String,
  fileName: String,
  fileType: String,
  fileSize: Number,
});

// -------------------- CCAVENUE RESPONSE SCHEMA --------------------
const ccavenueResponseSchema = new mongoose.Schema({
  orderStatus: String,
  trackingId: String,
  bankRefNo: String,
  paymentMode: String,
  cardName: String,
  statusMessage: String,
  currency: { type: String, default: "INR" },
  amount: Number,
  transDate: String,
  responseCode: String,
  merchantParams: {
    param1: String,
    param2: String,
    param3: String,
    param4: String,
    param5: String,
  },
  rawResponse: String,
});

// -------------------- PAYMENT SCHEMA --------------------
const paymentSchema = new mongoose.Schema({
  orderId: String,
  paymentId: String,
  totalAmount: Number,
  paymentStatus: {
    type: String,
    enum: ["PENDING", "SUCCESS", "FAILED", "CANCELLED"],
    default: "PENDING",
  },
  paymentDate: Date,
  ccavenueResponse: ccavenueResponseSchema,
});

// -------------------- MAIN SCHEMA --------------------
const uploadDocumentSchema = new mongoose.Schema(
  {
    bookingId: String,
    
    // USER INFO (FROM FRONTEND)
    mobileNumber: String,
    fullName: String,
    userName: String,
    emailAddress: String,

    // DOCUMENT INFO
    documentType: String,
    formId: String,

    // SERVICE INFO (FROM FRONTEND)
    serviceType: String,
    serviceName: String,
    basePrice: Number,
    includesNotary: Boolean,
    notaryCharge: Number,

    // STAMP DUTY (FROM FRONTEND)
    selectedStampDutyId: String,
    stampDutyDocumentType: String,
    stampDutyCalculationType: String,
    stampDutyAmount: Number,
    considerationAmount: Number,
    quantity: Number,
    serviceCharge: Number,

    // DELIVERY (FROM FRONTEND)
    selectedDeliveryServiceId: String,
    deliveryServiceName: String,
    deliveryCharge: Number,
    deliveryDescription: String,
    deliveryAddress: Object,

    // PAYMENT INFO (FROM FRONTEND)
    totalAmount: Number,
    orderDate: String,
    paymentMethod: String,
    currency: String,

    // FULL PAYMENT DETAILS (FROM BACKEND)
    payment: paymentSchema,

    // UPLOADED DOCUMENTS
    uploadedDocuments: [documentFileSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UploadDocument", uploadDocumentSchema);
