import React from "react";

const PaymentConfirmation = ({ paymentSuccess, paymentDetails, bookingId }) => {
  return (
    <div>
      {" "}
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 shadow-2xl w-full max-w-md transform transition-all border-t-4 border-green-600 animate-fade-in">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-6">
              Your booking has been confirmed and you will be redirected
              shortly.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-gray-500 text-left">Booking ID:</div>
                <div className="font-medium text-gray-800 text-right">
                  {bookingId}
                </div>

                <div className="text-gray-500 text-left">Payment ID:</div>
                <div className="font-medium text-gray-800 text-right">
                  {paymentDetails.razorpay_payment_id}
                </div>

                <div className="text-gray-500 text-left">Amount Paid:</div>
                <div className="font-medium text-green-600 text-right">
                  ₹{paymentDetails.amount}
                </div>
              </div>
            </div>

            <div className="animate-pulse flex justify-center items-center space-x-2 text-gray-400">
              <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
              <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
              <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
              <span className="text-sm">Redirecting</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
