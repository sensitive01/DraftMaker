import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentFailedPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [countdown, setCountdown] = useState(5);

    const orderId = searchParams.get("orderId");
    const message = searchParams.get("message");


    return (
        <div className="min-h-[60vh] bg-gray-50 flex items-start pt-10 justify-center px-4 py-2">
            <div className="max-w-md w-full">
                {/* Failed Card */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-red-600 px-6 py-6 text-center">
                        <div className="flex justify-center mb-3">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                <svg
                                    className="w-7 h-7 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-xl font-bold text-white mb-1">
                            Payment Failed
                        </h1>
                        <p className="text-red-50 text-sm">
                            Your transaction could not be completed
                        </p>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-4">
                        

                        {/* Order ID */}
                        {orderId && (
                            <div className="flex items-center justify-between py-2 border-b border-gray-100 mb-4">
                                <span className="text-xs text-gray-500">Order ID</span>
                                <span className="text-sm font-semibold text-gray-900 break-all text-right ml-2">
                                    {orderId}
                                </span>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2 mb-3">
                            <button
                                onClick={() => navigate("/documents/home/buy-e-stamp")}
                                className="flex-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium text-xs"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => navigate("/")}
                                className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium text-xs"
                            >
                                Go to Home
                            </button>
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailedPage;