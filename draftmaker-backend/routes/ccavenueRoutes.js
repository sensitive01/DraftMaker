const express = require('express');
const paymentRouter = express.Router();
const { initiatePayment, handleResponse } = require('../controller/ccavenueController');

// Initiate payment
paymentRouter.post('/initiate-payment', initiatePayment);

// Handle CCAvenue response (both success and cancel redirects here)
paymentRouter.post('/response', handleResponse);

module.exports = paymentRouter;