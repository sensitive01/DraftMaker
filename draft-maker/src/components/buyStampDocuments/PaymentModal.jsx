import React from "react";

const PaymentModal = ({setShowPaymentModal,requestorName,setRequestorName,paymentErrors,mobileNumber,setMobileNumber,handlePayment,getTotalAmount}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 shadow-2xl w-full max-w-md transform transition-all border-t-4 border-red-600">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Payment Details
            </h2>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="text-gray-400 hover:text-red-600 focus:outline-none transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="h-0.5 w-full bg-gray-100 my-4"></div>
        </div>

        {/* Requestor Name Field */}
        <div className="mb-6">
          <label
            htmlFor="requestorName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Requestor Name *
          </label>
          <input
            type="text"
            id="requestorName"
            value={requestorName}
            onChange={(e) => setRequestorName(e.target.value)}
            placeholder="Enter your name"
            className={`w-full px-4 py-2.5 border ${
              paymentErrors.requestorName ? "border-red-300" : "border-gray-300"
            } rounded-md focus:ring-red-500 focus:border-red-500 text-sm`}
          />
          {paymentErrors.requestorName && (
            <p className="mt-1 text-sm text-red-600">
              {paymentErrors.requestorName}
            </p>
          )}
        </div>

        {/* Mobile Number Field */}
        <div className="mb-6">
          <label
            htmlFor="paymentMobile"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Mobile Number *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500 text-sm font-medium">+91</span>
            </div>
            <input
              type="tel"
              id="paymentMobile"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter 10-digit mobile number"
              className={`w-full pl-12 pr-4 py-2.5 border ${
                paymentErrors.mobileNumber
                  ? "border-red-300"
                  : "border-gray-300"
              } rounded-md focus:ring-red-500 focus:border-red-500 text-sm`}
              maxLength="10"
            />
          </div>
          {paymentErrors.mobileNumber && (
            <p className="mt-1 text-sm text-red-600">
              {paymentErrors.mobileNumber}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
          <button
            onClick={() => setShowPaymentModal(false)}
            className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-medium shadow-sm transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            className="w-full sm:w-auto px-6 py-2.5 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-medium transition duration-200"
          >
            Pay ₹{getTotalAmount()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
