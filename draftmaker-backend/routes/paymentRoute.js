const express = require("express");
const paymentRouter = express.Router();
const { encrypt, decrypt } = require("../utils/ccAvanue");
const { createPendingEstampOrder, saveTheEstampData } = require("../controller/documentPriceController");
const {
    CCAVENUE_ACCESS_CODE,
    CCAVENUE_WORKING_KEY,
    CCAVENUE_MERCHANT_ID,
} = require("../config/variables/variables");

// From your config
const accessCode = CCAVENUE_ACCESS_CODE;
const workingKey = CCAVENUE_WORKING_KEY;
const merchantId = CCAVENUE_MERCHANT_ID;

paymentRouter.post("/create-order", createPendingEstampOrder);

/**
 * 🟢 STEP 1: FRONTEND calls this route to get a CCAvenue payment link
 */
paymentRouter.post("/ccavenue/initiate", async (req, res) => {
    try {
        const { orderId, amount, customerName, customerEmail, customerPhone } = req.body;
        console.log("Welcome to ccavenue initiate", req.body);
        const redirectUrl = "https://draftmaker.in/api/payment/ccavenue/response";
        const cancelUrl = "https://draftmaker.in/api/payment/ccavenue/response";


        const data = `merchant_id=${merchantId}&order_id=${orderId}&currency=INR&amount=${amount}&redirect_url=${redirectUrl}&cancel_url=${cancelUrl}&billing_name=${customerName}&billing_email=${customerEmail}&billing_tel=${customerPhone}`;

        const encRequest = encrypt(data, workingKey);

        const ccavenueUrl = `https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction&encRequest=${encRequest}&access_code=${accessCode}`;

        res.json({ success: true, url: ccavenueUrl });
    } catch (err) {
        console.error("Error initiating payment:", err);
        res.status(500).json({ error: "Failed to initiate CCAvenue transaction" });
    }
});





paymentRouter.post("/ccavenue/response", async (req, res) => {
    try {
        const encResponse = req.body.encResp;
        const decryptedResponse = decrypt(encResponse, workingKey);
        console.log("Decrypted Response:", decryptedResponse);

        const params = new URLSearchParams(decryptedResponse);
        const orderStatus = params.get("order_status");
        const paymentId = params.get("tracking_id");

        if (orderStatus === "Success") {
            console.log("✅ Payment Success:", paymentId);

            const mockReq = {
                body: {
                    orderData: {
                        paymentStatus: "completed",
                        ccavenuePaymentId: paymentId,
                        totalAmount: params.get("amount"),
                        orderId: params.get("order_id"),
                        requestorName: params.get("billing_name"),
                        mobileNumber: params.get("billing_tel"),
                    },
                },
            };

            const mockRes = {
                status: () => mockRes,
                json: () => { },
            };

            await saveTheEstampData(mockReq, mockRes);
        } else {
            console.log("❌ Payment Failed:", orderStatus);
        }

        // Redirect user to frontend
        if (orderStatus === "Success") {
            res.redirect("https://draftmaker.in/payment-success");
        } else {
            res.redirect("https://draftmaker.in/payment-failed");
        }
    } catch (err) {
        console.error("Error in /ccavenue/response:", err);
        res.redirect("https://draftmaker.in/payment-failed");
    }
});







module.exports = paymentRouter;
