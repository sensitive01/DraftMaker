const CCAvenue = require('../utils/ccAvanue');
const EstampPayment = require('../model/eStampPaymentSchema'); 
const BookingIdRegistry = require('../model/documentsModel/bookingId');
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
    try {
        console.log('\n╔════════════════════════════════════════╗');
        console.log('║   CCAvenue Response Handler           ║');
        console.log('╚════════════════════════════════════════╝\n');
        
        const encResponse = req.body.encResp;
        
        if (!encResponse) {
            console.error('❌ No encrypted response');
            return res.redirect(`${process.env.FRONTEND_URL}/payment-failed?error=No response`);
        }

        // Initialize CCAvenue for decryption
        const ccavenue = new CCAvenue(process.env.CCAVENUE_WORKING_KEY);
        
        // Decrypt
        const decryptedData = ccavenue.decrypt(encResponse);
        console.log('✅ Response decrypted');

        // Parse
        const responseParams = {};
        decryptedData.split('&').forEach(param => {
            const [key, value] = param.split('=');
            responseParams[key] = decodeURIComponent(value || '');
        });

        console.log('📊 Response:', responseParams);

        const orderId = responseParams.order_id;
        const orderStatus = responseParams.order_status;
        const trackingId = responseParams.tracking_id;
        const bookingId = responseParams.merchant_param1;

        const payment = await EstampPayment.findOne({ orderId: orderId });

        if (!payment) {
            console.error('❌ Order not found');
            return res.redirect(`${process.env.FRONTEND_URL}/payment-failed?error=Order not found`);
        }

        if (orderStatus === 'Success') {
            payment.paymentStatus = 'completed';
            payment.ccavenueTrackingId = trackingId;
            payment.ccavenueBankRefNo = responseParams.bank_ref_no;
            payment.ccavenuePaymentMode = responseParams.payment_mode;
            payment.ccavenueStatusMessage = responseParams.status_message;
            payment.paymentCompletedAt = new Date();
            await payment.save();

            console.log('✅ Payment successful');
            return res.redirect(`${process.env.FRONTEND_URL}/payment-success?orderId=${orderId}&bookingId=${bookingId}&trackingId=${trackingId}`);
        } 
        else {
            payment.paymentStatus = 'failed';
            payment.ccavenueFailureMessage = responseParams.failure_message;
            payment.ccavenueStatusMessage = responseParams.status_message;
            payment.paymentFailedAt = new Date();
            await payment.save();

            console.log('❌ Payment failed');
            return res.redirect(`${process.env.FRONTEND_URL}/payment-failed?orderId=${orderId}&message=${encodeURIComponent(responseParams.failure_message || 'Payment failed')}`);
        }

    } catch (error) {
        console.error('❌ Response handler error:', error);
        return res.redirect(`${process.env.FRONTEND_URL}/payment-failed?error=Processing error`);
    }
};

module.exports = {
    initiatePayment,
    handleResponse
};