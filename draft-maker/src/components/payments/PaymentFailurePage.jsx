import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentFailurePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get('orderId');
  const message = searchParams.get('message') || 'Payment was not successful';
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
          <svg
            className="h-10 w-10 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Failed
        </h2>
        <p className="text-gray-600 mb-6">
          {message}
        </p>

        {(orderId || error) && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
            <div className="space-y-2 text-sm">
              {orderId && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium text-gray-900">{orderId}</span>
                </div>
              )}
              {error && (
                <div className="flex flex-col">
                  <span className="text-gray-600 mb-1">Error:</span>
                  <span className="text-red-600 text-xs">{error}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <p className="text-sm text-gray-500 mb-6">
          Don't worry, no amount has been deducted from your account.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/documents/buy-estamp')}
            className="w-full bg-red-600 text-white py-2.5 px-4 rounded-md hover:bg-red-700 transition-colors font-medium"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/documents/home')}
            className="w-full bg-gray-200 text-gray-700 py-2.5 px-4 rounded-md hover:bg-gray-300 transition-colors font-medium"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailurePage;