const express = require('express');
const paymentRouter = express.Router();
const { initiatePayment, handleResponse } = require('../controller/ccavenueController');
const cors = require('cors');

// CORS configuration for the response endpoint
const ccAvenueCors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, *');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
};

// Initiate payment (with CORS for your frontend)
paymentRouter.post('/initiate-payment', cors(), initiatePayment);

// Handle CCAvenue response - special CORS handling for CCAvenue's server
paymentRouter.post('/response', ccAvenueCors, handleResponse);

// Add a GET handler for browser redirects (if any)
paymentRouter.get('/response', (req, res) => {
    res.redirect(process.env.FRONTEND_URL || 'https://draftmaker.in');
});

// Handle OPTIONS preflight for the response endpoint
paymentRouter.options('/response', ccAvenueCors, (req, res) => {
    res.status(200).end();
});

module.exports = paymentRouter;