// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    bookingId: { type: String, required: true },
    formId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    paymentMethod: { type: String, default: 'ccavenue' },
    status: {
        type: String,
        enum: ['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'],
        default: 'PENDING'
    },
    paymentStatus: {
        type: String,
        enum: ['PENDING', 'SUCCESS', 'FAILED', 'CANCELLED'],
        default: 'PENDING'
    },
    transactionId: { type: String },
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
    },
    paymentDetails: { type: Object },
    paymentResponse: { type: Object },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);