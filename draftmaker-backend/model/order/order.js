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
    paymentDetails: { type: Object },
    paymentResponse: { type: Object },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);