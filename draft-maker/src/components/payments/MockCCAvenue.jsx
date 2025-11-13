import React from 'react';

const MockCCAvenue = ({
  amount,
  orderId,
  customerName,
  customerEmail,
  customerPhone,
  onSuccess,
  onError,
  onClose,
}) => {
  const handleMockPayment = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful payment response
      const mockResponse = {
        tracking_id: `TRA${Date.now()}`,
        payment_mode: 'Credit Card',
        status: 'Success',
        amount: amount,
        order_id: orderId,
      };
      
      onSuccess(mockResponse);
    } catch (error) {
      onError({ message: 'Payment failed. Please try again.' });
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-md mb-4">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> This is a mock CCAvenue payment for testing. No real payment will be processed.
        </p>
      </div>
      
      <div className="p-4 border border-gray-200 rounded-md mb-4">
        <p className="font-medium mb-2">Order Summary:</p>
        <div className="text-sm space-y-1">
          <p>Order ID: {orderId}</p>
          <p>Amount: ₹{amount}</p>
          <p>Name: {customerName}</p>
          <p>Email: {customerEmail}</p>
          <p>Phone: +91 {customerPhone}</p>
        </div>
      </div>
      
      <div className="flex flex-col space-y-2">
        <button
          onClick={handleMockPayment}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
        >
          Pay with CCAvenue (Mock) - ₹{amount}
        </button>
        
        <button
          onClick={() => onError({ message: 'Payment was cancelled by user' })}
          className="w-full bg-red-100 hover:bg-red-200 text-red-700 py-2 px-4 rounded-md font-medium transition-colors"
        >
          Simulate Payment Failure
        </button>
        
        <button
          onClick={onClose}
          className="w-full border border-gray-300 hover:bg-gray-50 py-2 px-4 rounded-md font-medium transition-colors mt-2"
        >
          Cancel Payment
        </button>
      </div>
    </div>
  );
};

export default MockCCAvenue;
