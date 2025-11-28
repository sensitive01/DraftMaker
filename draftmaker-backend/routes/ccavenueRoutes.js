const express = require('express');
const cors = require('cors');
const paymentRouter = express.Router();
const { initiatePayment, handleResponse } = require('../controller/ccavenueController');

const ccAvanueController =require("../controller/ccavenueController")

// Middleware to capture raw body for CCAvenue response
const rawBodyMiddleware = (req, res, next) => {
    let data = '';
    req.setEncoding('utf8');
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', () => {
        req.rawBody = data;
        next();
    });
};

// CORS configuration for CCAvenue response
const ccAvenueCors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, *');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');

    next();
};


paymentRouter.post('/initiate-payment', cors(), initiatePayment);
paymentRouter.post('/response', ccAvenueCors, handleResponse);

// CCAvenue Payment Routes documents
paymentRouter.post('/initiate-ccavenue-payment', ccAvanueController.initiateCCAVENUEPayment);
paymentRouter.post('/ccavenue/response', ccAvanueController.handleCCAVENUEResponse);
paymentRouter.get('/ccavenue/response', ccAvanueController.handleCCAVENUEResponse);

paymentRouter.get('/response', (req, res) => {
    res.redirect(process.env.FRONTEND_URL || 'https://draftmaker.in');
});

// Handle OPTIONS preflight for the response endpoint
paymentRouter.options('/response', ccAvenueCors, (req, res) => {
    res.status(200).end();
});

module.exports = paymentRouter;