const CCAvenue = require('../utils/ccAvanue');
const EstampPayment = require('../model/eStampPaymentSchema');

const BookingIdRegistry = require('../model/documentsModel/bookingId');
const orderModel = require('../model/order/order');
require('dotenv').config();

async function generateBookingId() {
    const prefix = "DM";
    let unique = false;
    let bookingId;

    while (!unique) {
        const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
        bookingId = `${prefix}${randomNumber}`;

        const exists = await BookingIdRegistry.findOne({ bookingId });
        if (!exists) {
            await new BookingIdRegistry({ bookingId }).save();
            unique = true;
        }
    }

    return bookingId;
}

const initiatePayment = async (req, res) => {
    try {
        console.log('\n╔════════════════════════════════════════╗');
        console.log('║   CCAvenue Payment Initiation         ║');
        console.log('╚════════════════════════════════════════╝\n');

        // VERIFY WORKING KEY EXISTS
        console.log('🔍 Verifying CCAvenue Configuration...');
        if (!process.env.CCAVENUE_WORKING_KEY) {
            console.error('❌ CCAVENUE_WORKING_KEY is not set!');
            return res.status(500).json({
                success: false,
                message: 'CCAvenue Working Key is not configured'
            });
        }



        // INITIALIZE CCAVENUE HERE (NOT AT MODULE LEVEL)
        console.log('\n🔐 Initializing CCAvenue...');
        const ccavenue = new CCAvenue(process.env.CCAVENUE_WORKING_KEY);
        console.log('✅ CCAvenue initialized');

        const orderData = req.body;

        console.log('\n📦 Order Details:');
        console.log('   Amount:', orderData.totalAmount);
        console.log('   Requestor:', orderData.requestorName);
        console.log('   Mobile:', orderData.mobileNumber);

        // Generate IDs
        const bookingId = await generateBookingId();
        const orderId = `ESTAMP_${bookingId}_${Date.now()}`;

        console.log('\n🔢 Generated IDs:');
        console.log('   Booking ID:', bookingId);
        console.log('   Order ID:', orderId);

        // Save to database
        const newPayment = new EstampPayment({
            ...orderData,
            bookingId: bookingId,
            orderId: orderId,
            paymentStatus: 'pending',
            paymentMethod: 'ccavenue'
        });
        await newPayment.save();
        console.log('✅ Order saved to database');

        // Prepare CCAvenue parameters
        const ccavenueParams = {
            merchant_id: process.env.CCAVENUE_MERCHANT_ID,
            order_id: orderId,
            currency: 'INR',
            amount: parseFloat(orderData.totalAmount).toFixed(2),
            redirect_url: `${process.env.BACKEND_URL}/payment/response`,
            cancel_url: `${process.env.BACKEND_URL}/payment/response`,
            language: 'EN',

            billing_name: orderData.requestorName || 'Customer',
            billing_tel: orderData.mobileNumber || '0000000000',
            billing_email: orderData.deliveryAddress?.email || 'noreply@example.com',
            billing_address: orderData.deliveryAddress?.addressLine1 || 'NA',
            billing_city: orderData.deliveryAddress?.city || 'NA',
            billing_state: orderData.deliveryAddress?.state || 'NA',
            billing_zip: orderData.deliveryAddress?.pincode || '000000',
            billing_country: 'India',

            delivery_name: orderData.requestorName || 'Customer',
            delivery_address: orderData.deliveryAddress?.addressLine1 || 'NA',
            delivery_city: orderData.deliveryAddress?.city || 'NA',
            delivery_state: orderData.deliveryAddress?.state || 'NA',
            delivery_zip: orderData.deliveryAddress?.pincode || '000000',
            delivery_country: 'India',
            delivery_tel: orderData.mobileNumber || '0000000000',

            merchant_param1: bookingId,
            merchant_param2: orderData.documentType || 'EStamp',
            merchant_param3: orderData.deliveryType || 'in-store',
        };

        console.log('\n🔐 CCAvenue Parameters:');
        console.log('   Merchant ID:', ccavenueParams.merchant_id);
        console.log('   Order ID:', ccavenueParams.order_id);
        console.log('   Amount:', ccavenueParams.amount);

        // Build parameter string
        const queryParams = [];
        for (const [key, value] of Object.entries(ccavenueParams)) {
            if (value !== undefined && value !== null && value !== '') {
                queryParams.push(`${key}=${encodeURIComponent(value)}`);
            }
        }
        const paramString = queryParams.join('&');

        console.log('\n📝 Parameter String:');
        console.log('   Length:', paramString.length);
        console.log('   Sample:', paramString.substring(0, 150) + '...');

        // Encrypt
        console.log('\n🔒 Encrypting with CCAvenue...');
        console.log('   Using Working Key length:', process.env.CCAVENUE_WORKING_KEY.length);

        const encryptedData = ccavenue.encrypt(paramString);

        console.log('✅ Encryption successful!');
        console.log('   Encrypted Length:', encryptedData.length);
        console.log('   Encrypted Sample:', encryptedData.substring(0, 100) + '...');

        console.log('\n✅ Payment initiation successful');
        console.log('═══════════════════════════════════════\n');

        res.status(200).json({
            success: true,
            encRequest: encryptedData,
            accessCode: process.env.CCAVENUE_ACCESS_CODE,
            orderId: orderId,
            bookingId: bookingId
        });

    } catch (error) {
        console.error('\n❌ ERROR in initiatePayment:');
        console.error('   Message:', error.message);
        console.error('   Stack:', error.stack);
        console.log('═══════════════════════════════════════\n');

        res.status(500).json({
            success: false,
            message: 'Failed to initiate payment',
            error: error.message
        });
    }
};

const handleResponse = async (req, res) => {
    // Set CORS headers for all responses
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, *');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');

    try {
        console.log('\n╔════════════════════════════════════════╗');
        console.log('║   CCAvenue Response Handler           ║');
        console.log('╚════════════════════════════════════════╝\n');

        // Log the raw request for debugging
        console.log('📨 Request received:', {
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            body: req.body || {},
            query: req.query || {},
            rawBody: req.rawBody || 'No raw body'
        });

        // Handle both form data and raw body
        let encResponse;

        // First try to get from raw body
        if (req.rawBody) {
            const rawBody = req.rawBody.toString();
            try {
                // Try to parse as URL-encoded form data
                const params = new URLSearchParams(rawBody);
                encResponse = params.get('encResp') || params.get('encResponse') || params.get('enc_request');
            } catch (e) {
                console.log('Error parsing raw body:', e);
            }
        }

        // If not found in raw body, try parsed body and query
        if (!encResponse) {
            encResponse =
                (req.body && (req.body.encResp || req.body.encResponse || req.body.enc_request)) ||
                (req.query && (req.query.encResp || req.query.encResponse || req.query.enc_request));
        }

        if (!encResponse) {
            const errorMsg = '❌ No encrypted response data found in request';
            console.error(errorMsg);
            console.log('Request body keys:', Object.keys(req.body));
            console.log('Query parameters:', req.query);

            // Try to get the raw body if available
            if (req.rawBody) {
                console.log('Raw request body:', req.rawBody.toString());
            }

            return res.status(400).json({
                success: false,
                message: errorMsg,
                receivedData: {
                    body: req.body,
                    query: req.query
                }
            });
        }

        // Initialize CCAvenue for decryption
        const ccavenue = new CCAvenue(process.env.CCAVENUE_WORKING_KEY);

        // Decrypt
        console.log('🔐 Encrypted response received, attempting decryption...');
        let decryptedData;
        try {
            decryptedData = ccavenue.decrypt(encResponse);
            console.log('✅ Response decrypted successfully');
        } catch (decryptError) {
            console.error('❌ Decryption failed:', decryptError);
            return res.redirect(`${process.env.FRONTEND_URL || 'https://draftmaker.in'}/payment-failed?error=Invalid payment response`);
        }

        // Parse the decrypted data
        const responseParams = {};
        try {
            decryptedData.split('&').forEach(param => {
                const [key, value] = param.split('=');
                if (key) {
                    responseParams[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                }
            });
            console.log('📊 Decrypted response params:', JSON.stringify(responseParams, null, 2));
        } catch (parseError) {
            console.error('❌ Failed to parse response:', parseError);
            return res.redirect(`${process.env.FRONTEND_URL || 'https://draftmaker.in'}/payment-failed?error=Failed to process payment response`);
        }

        const orderId = responseParams.order_id;
        const orderStatus = responseParams.order_status;
        const trackingId = responseParams.tracking_id || 'N/A';
        const bookingId = responseParams.merchant_param1 || 'N/A';

        if (!orderId) {
            console.error('❌ No order_id in response');
            return res.redirect(`${process.env.FRONTEND_URL || 'https://draftmaker.in'}/payment-failed?error=Invalid payment response`);
        }

        console.log(`🔍 Looking up order: ${orderId}`);
        const payment = await EstampPayment.findOne({ orderId: orderId });

        if (!payment) {
            console.error(`❌ Order not found: ${orderId}`);
            return res.redirect(`${process.env.FRONTEND_URL || 'https://draftmaker.in'}/payment-failed?orderId=${orderId}&error=Order not found`);
        }

        // Update payment record
        payment.ccavenueTrackingId = trackingId;
        payment.ccavenueStatusMessage = responseParams.status_message || '';
        payment.ccavenuePaymentMode = responseParams.payment_mode || '';
        payment.ccavenueBankRefNo = responseParams.bank_ref_no || '';
        payment.updatedAt = new Date();

        if (orderStatus === 'Success') {
            payment.paymentStatus = 'completed';
            payment.paymentCompletedAt = new Date();
            await payment.save();

            console.log(`✅ Payment successful for order: ${orderId}`);
            return res.redirect(
                `${process.env.FRONTEND_URL || 'https://draftmaker.in'}/payment-success?` +
                `orderId=${encodeURIComponent(orderId)}` +
                `&bookingId=${encodeURIComponent(bookingId)}` +
                `&trackingId=${encodeURIComponent(trackingId)}`
            );
        } else {
            payment.paymentStatus = 'failed';
            payment.ccavenueFailureMessage = responseParams.failure_message || 'Payment failed';
            payment.paymentFailedAt = new Date();
            await payment.save();

            console.log(`❌ Payment failed for order: ${orderId} - ${responseParams.failure_message || 'Unknown error'}`);
            return res.redirect(
                `${process.env.FRONTEND_URL || 'https://draftmaker.in'}/payment-failed?` +
                `orderId=${encodeURIComponent(orderId)}` +
                `&message=${encodeURIComponent(responseParams.failure_message || 'Payment failed')}`
            );
        }

    } catch (error) {
        console.error('❌ Unhandled error in response handler:', error);
        return res.redirect(
            `${process.env.FRONTEND_URL || 'https://draftmaker.in'}/payment-failed?` +
            `error=${encodeURIComponent(error.message || 'An unexpected error occurred')}`
        );
    }
};


// Map formId to the corresponding update function
const documentUpdateHandlers = {
    'DM-DNC-1': { updateFn: 'updateDualNamePaymentData', saveFn: 'saveDualNameCorrection' },
    'DM-NC-2': { updateFn: 'saveNameCorrectionPaymentData', saveFn: 'saveNameCorrection' },
    'DM-DOBC-3': { updateFn: 'saveDobCorrectionPaymentData', saveFn: 'createDobCorrection' },
    'DM-GAS-5': { updateFn: 'saveGasCorrectionPaymentData', saveFn: 'createGasCorrection' },
    'DM-DOC-LOST-5': { updateFn: 'saveDocumentLostPaymentData', saveFn: 'createDocumentLost' },
    'DM-BCNCP-6': { updateFn: 'saveDobParentNameCorrection', saveFn: 'createDobParentNameCorrection' },
    'DM-BC-MNC-7': { updateFn: 'saveBirthCertificateNameCorrection', saveFn: 'createBirthCertificateNameCorrection' },
    'DM-GST-8': { updateFn: 'saveGstPaymentData', saveFn: 'saveGstData' },
    'DM-MAL-9': { updateFn: 'updateMetriculationLostPaymentData', saveFn: 'createMetriculationLostData' },
    'DM-KH-10': { updateFn: 'updateKhataCorrectionPaymentData', saveFn: 'createKhataCorrectionData' },
    'DM-VIC-11': { updateFn: 'updateVehicleInsurencePaymentData', saveFn: 'createVehicleInsurenceData' },
    'DM-HUF-12': { updateFn: 'updateHufPaymentData', saveFn: 'createHufData' },
    'DM-GP-13': { updateFn: 'updateGapPeriodPaymentData', saveFn: 'createGapPeriodData' },
    'DM-PAF-14': { updateFn: 'updatePasswordAnnaxurePaymentData', saveFn: 'createPasswordAnnaxureData' },
    'DM-PNC-15': { updateFn: 'updatePassportNameChangePaymentData', saveFn: 'createPassportNameChangeData' },
    'DM-AAF-16': { updateFn: 'updateAdressAffadavitPaymentData', saveFn: 'createAdressAffadavitData' },
    'DM-CFD-17': { updateFn: 'updateCommercialPaymentData', saveFn: 'createCommercialData' },
    'DM-RFD-18': { updateFn: 'updateRecidentialPaymentData', saveFn: 'createRecidentialData' }
};

// Initiate CCAvenue Payment
const initiateCCAVENUEPayment = async (req, res) => {
    try {
        console.log("initialize the cc avanue for the documents")
        const {
            bookingId,
            documentDetails,
            formData,
            formId,
            mobileNumber,
            userName,
            selectedService,
            selectedStampDuty,
            selectedDeliveryCharge,
            emailAddress,
            includeNotary,
            deliveryAddress,
            quantity = 1,
            considerationAmount,
            totalAmount,
            serviceDetails
        } = req.body;

        // Generate a unique order ID
        const orderId = `ORDER_${bookingId}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

        // Create order in database
        const order = new orderModel({
            orderId,
            bookingId,
            formId,
            amount: totalAmount,
            currency: 'INR',
            paymentMethod: 'ccavenue',
            status: 'PENDING',
            paymentStatus: 'PENDING',
            paymentDetails: {
                documentType: documentDetails?.documentType,
                serviceType: selectedService?.serviceType,
                serviceName: selectedService?.name,
                includesNotary: includeNotary || false,
                selectedStampDuty,
                selectedDeliveryCharge,
                serviceDetails,
                emailAddress,
                deliveryAddress
            }
        });

        await order.save();

        // Prepare CCAvenue request parameters
        const params = {
            merchant_id: ccAvenueConfig.merchantId,
            order_id: orderId,
            currency: 'INR',
            amount: totalAmount.toString(),
            redirect_url: ccAvenueConfig.redirectUrl,
            cancel_url: ccAvenueConfig.cancelUrl,
            language: 'EN',
            billing_name: userName || 'Customer',
            billing_tel: mobileNumber,
            billing_email: emailAddress || 'customer@example.com',
            merchant_param1: formId, // Store formId to identify document type in response
            merchant_param2: bookingId,
        };

        // Create form data string
        const formDataStr = Object.entries(params)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');

        // Encrypt the form data
        const encRequest = ccAvenueConfig.encrypt(formDataStr);

        res.status(200).json({
            success: true,
            encRequest,
            accessCode: ccAvenueConfig.accessCode,
            orderId,
            redirectUrl: ccAvenueConfig.redirectUrl
        });

    } catch (error) {
        console.error('Error initiating CCAvenue payment:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to initiate payment',
            error: error.message
        });
    }
};

// Handle CCAvenue Response
const handleCCAVENUEResponse = async (req, res) => {
    try {
        console.log("handle payment confirmation")
        const { encResp } = req.body;
        if (!encResp) {
            return res.redirect(`${process.env.FRONTEND_URL}/payment-failed?error=invalid_response`);
        }

        // Decrypt the response
        const decryptedResponse = ccAvenueConfig.decrypt(encResp);
        const responseObj = Object.fromEntries(
            decryptedResponse.split('&').map(pair => {
                const [key, value] = pair.split('=');
                return [key, decodeURIComponent(value)];
            })
        );

        // Find the order
        const order = await orderModel.findOne({ orderId: responseObj.order_id });
        if (!order) {
            return res.redirect(`${process.env.FRONTEND_URL}/payment-failed?error=order_not_found`);
        }

        // Update order status based on response
        if (responseObj.order_status === 'Success') {
            order.status = 'COMPLETED';
            order.paymentStatus = 'SUCCESS';
            order.transactionId = responseObj.bank_ref_no;
            order.paymentResponse = responseObj;

            // Get the formId from merchant_param1
            const formId = responseObj.merchant_param1;
            const bookingId = responseObj.merchant_param2;

            // Find the appropriate update function
            const handler = documentUpdateHandlers[formId];
            if (handler && handler.updateFn) {
                // Call the appropriate update function
                await exports[handler.updateFn]({
                    body: {
                        data: {
                            ...order.paymentDetails,
                            paymentId: order.transactionId,
                            status: 'completed',
                            bookingId,
                            formId,
                            amount: order.amount,
                            documentType: order.paymentDetails.documentType,
                            serviceType: order.paymentDetails.serviceType,
                            serviceName: order.paymentDetails.serviceName,
                            includesNotary: order.paymentDetails.includesNotary,
                            selectedStampDuty: order.paymentDetails.selectedStampDuty,
                            selectedDeliveryCharge: order.paymentDetails.selectedDeliveryCharge,
                            serviceDetails: order.paymentDetails.serviceDetails,
                            emailAddress: order.paymentDetails.emailAddress,
                            deliveryAddress: order.paymentDetails.deliveryAddress
                        }
                    }
                }, { json: () => { } });
            }
        } else {
            order.status = 'FAILED';
            order.paymentStatus = 'FAILED';
            order.paymentResponse = responseObj;
        }

        await order.save();

        // Redirect to success or failure page
        if (order.paymentStatus === 'SUCCESS') {
            return res.redirect(`${process.env.FRONTEND_URL}/payment-success?orderId=${order.orderId}`);
        } else {
            return res.redirect(`${process.env.FRONTEND_URL}/payment-failed?orderId=${order.orderId}&reason=${responseObj.failure_message || 'Payment failed'}`);
        }
    } catch (error) {
        console.error('Error processing CCAvenue response:', error);
        res.redirect(`${process.env.FRONTEND_URL}/payment-failed?error=processing_error`);
    }
};

module.exports = {
    initiatePayment,
    handleResponse,
    handleCCAVENUEResponse,
    initiateCCAVENUEPayment
};