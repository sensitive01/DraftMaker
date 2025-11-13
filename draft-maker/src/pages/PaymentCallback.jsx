import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleCCavenueResponse } from '../services/ccavenueService';

const PaymentCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState('processing');
  const [message, setMessage] = useState('Processing your payment...');

  useEffect(() => {
    const processResponse = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const encResponse = params.get('encResp');
        
        if (!encResponse) {
          throw new Error('No payment response received');
        }

        // Process the response (in a real app, this would be done on the server)
        const response = handleCCavenueResponse(encResponse);
        
        // Update UI based on response
        setPaymentStatus('success');
        setMessage('Payment successful! Thank you for your purchase.');
        
        // You can add additional logic here, like updating order status in your database
        
      } catch (error) {
        console.error('Payment processing error:', error);
        setPaymentStatus('error');
        setMessage(error.message || 'An error occurred while processing your payment.');
      }
    };

    processResponse();
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        {paymentStatus === 'processing' && (
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-6"></div>
        )}
        
        {paymentStatus === 'success' && (
          <div className="text-green-500 mb-6">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        )}
        
        {paymentStatus === 'error' && (
          <div className="text-red-500 mb-6">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
        )}
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {paymentStatus === 'success' ? 'Payment Successful!' : 
           paymentStatus === 'error' ? 'Payment Failed' : 'Processing Payment...'}
        </h2>
        
        <p className="text-gray-600 mb-8">{message}</p>
        
        <button
          onClick={() => navigate('/')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentCallback;
