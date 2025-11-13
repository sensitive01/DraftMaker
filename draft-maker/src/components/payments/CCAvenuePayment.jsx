import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CCAvenuePayment = ({
    amount,
    orderId,
    customerName,
    customerEmail,
    customerPhone,
    onSuccess,
    onError,
    onClose
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const initiatePayment = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.post('/api/payments/ccavenue/create-order', {
                amount,
                orderId: orderId || `ORDER_${Date.now()}`,
                customerName,
                customerEmail,
                customerPhone,
                redirectUrl: `${window.location.origin}/payment/callback`,
                cancelUrl: `${window.location.origin}/payment/cancel`
            });

            if (response.data.success && response.data.data) {
                // Create and submit form
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = response.data.data.paymentUrl;

                const encryptedInput = document.createElement('input');
                encryptedInput.type = 'hidden';
                encryptedInput.name = 'encRequest';
                encryptedInput.value = response.data.data.encryptedData;
                form.appendChild(encryptedInput);

                const accessCodeInput = document.createElement('input');
                accessCodeInput.type = 'hidden';
                accessCodeInput.name = 'access_code';
                accessCodeInput.value = response.data.data.accessCode;
                form.appendChild(accessCodeInput);

                document.body.appendChild(form);
                form.submit();
            } else {
                throw new Error('Failed to initialize payment');
            }
        } catch (error) {
            console.error('Payment error:', error);
            setError(error.response?.data?.message || 'Failed to initialize payment');
            onError?.(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ccavenue-payment">
            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <button
                onClick={initiatePayment}
                disabled={loading}
                className="btn btn-primary w-100"
            >
                {loading ? 'Processing...' : `Pay with CCAvenue (₹${amount})`}
            </button>

            {onClose && (
                <button
                    onClick={onClose}
                    className="btn btn-link w-100 mt-2"
                >
                    Cancel
                </button>
            )}
        </div>
    );
};

export default CCAvenuePayment;