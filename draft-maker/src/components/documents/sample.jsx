import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getStampAndDeliveryCharges } from "../../api/service/axiosService";

const DocumentPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("Location", location);
  const { bookingId, documentDetails, mobileNumber } = location.state || {};
  console.log(bookingId, documentDetails, mobileNumber);

  const [selectedService, setSelectedService] = useState(null);
  const [stampDutyOptions, setStampDutyOptions] = useState([]);
  const [deliveryChargeOptions, setDeliveryChargeOptions] = useState([]);
  const [selectedStampDuty, setSelectedStampDuty] = useState(null);
  const [selectedDeliveryCharge, setSelectedDeliveryCharge] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStampAndDeliveryCharges();
        console.log("response", response);
        setStampDutyOptions(response.data.stampDuty || []);
        setDeliveryChargeOptions(response.data.deliveryCharges || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Dynamic service options based on documentDetails
  const getServiceOptions = () => [
    {
      id: "draft",
      name: "Draft Only",
      description: "Get your document drafted by experts.",
      price: documentDetails?.draftCharge || 0,
      hasNotary: documentDetails?.draftNotaryCharge > 0,
      notaryCharge: documentDetails?.draftNotaryCharge || 0,
      requiresStamp: false,
      requiresDelivery: false,
    },
    {
      id: "draft_estamp",
      name: "Draft + e-Stamp",
      description: "Includes e-stamp along with document draft.",
      price: documentDetails?.draftCharge || 0,
      hasNotary: documentDetails?.draftNotaryCharge > 0,
      notaryCharge: documentDetails?.draftNotaryCharge || 0,
      requiresStamp: true,
      requiresDelivery: false,
    },
    {
      id: "draft_estamp_delivery",
      name: "Draft + e-Stamp + Delivery",
      description: "Complete service including document delivery.",
      price: documentDetails?.draftCharge || 0,
      hasNotary: documentDetails?.draftNotaryCharge > 0,
      notaryCharge: documentDetails?.draftNotaryCharge || 0,
      requiresStamp: true,
      requiresDelivery: true,
    },
  ];

  const handlePackageSelect = (service) => {
    setSelectedService(service);
    // Reset selections when changing package
    if (!service.requiresStamp) {
      setSelectedStampDuty(null);
    }
    if (!service.requiresDelivery) {
      setSelectedDeliveryCharge(null);
    }
  };

  const handleStampDutySelect = (stampDuty) => {
    setSelectedStampDuty(stampDuty);
  };

  const handleDeliveryChargeSelect = (deliveryCharge) => {
    setSelectedDeliveryCharge(deliveryCharge);
  };

  const calculateStampDutyAmount = (stampDuty, baseAmount = 1000) => {
    if (stampDuty.calculationType === "fixed") {
      return stampDuty.fixedAmount;
    } else if (stampDuty.calculationType === "percentage") {
      let amount = (baseAmount * stampDuty.percentage) / 100;
      if (stampDuty.minAmount > 0) {
        amount = Math.max(amount, stampDuty.minAmount);
      }
      if (stampDuty.maxAmount > 0) {
        amount = Math.min(amount, stampDuty.maxAmount);
      }
      return amount;
    }
    return 0;
  };

  const calculateTotalAmount = () => {
    if (!selectedService) return 0;

    let total = selectedService.price;

    if (selectedService.hasNotary) {
      total += selectedService.notaryCharge;
    }

    if (selectedService.requiresStamp && selectedStampDuty) {
      total += calculateStampDutyAmount(selectedStampDuty);
    }

    if (selectedService.requiresDelivery && selectedDeliveryCharge) {
      total += selectedDeliveryCharge.charge;
    }

    return total;
  };

  const canProceedToPayment = () => {
    if (!selectedService) return false;

    if (selectedService.requiresStamp && !selectedStampDuty) return false;
    if (selectedService.requiresDelivery && !selectedDeliveryCharge)
      return false;

    return true;
  };

  const handlePayment = () => {
    if (!canProceedToPayment()) {
      alert(
        "Please complete all required selections before proceeding to payment."
      );
      return;
    }

    const totalAmount = calculateTotalAmount();
    alert(`Proceeding to pay ₹${totalAmount} for ${selectedService.name}`);
    // Redirect or trigger payment logic
  };

  const goBack = () => {
    navigate(-1); // Go back
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={goBack}
                className="mr-4 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Go back"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mr-3 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Select Service Package
              </h1>
            </div>
          </div>
          <p className="text-gray-600 mt-2 ml-12">
            Choose the right service package for your document needs
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-lg border-t-4 border-red-600 overflow-hidden">
          {/* Booking Info */}
          <div className="bg-red-50 p-6 border-b border-red-100">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center">
                <p className="font-medium text-red-800 text-sm uppercase tracking-wider mr-3">
                  Booking Details
                </p>
                <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                  #{bookingId}
                </span>
              </div>
              <div className="flex space-x-6 text-sm">
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Document Type:</span>
                  <span className="font-semibold text-gray-800 bg-white px-2 py-1 rounded">
                    {documentDetails?.documentType}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Mobile:</span>
                  <span className="font-semibold text-gray-800 bg-white px-2 py-1 rounded">
                    +91{mobileNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <p className="text-gray-600 text-lg mb-8">
              Choose from our service packages below:
            </p>

            {/* Service Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {getServiceOptions().map((service) => (
                <button
                  key={service.id}
                  onClick={() => handlePackageSelect(service)}
                  className={`bg-white border-2 ${
                    selectedService?.id === service.id
                      ? "border-red-500 ring-4 ring-red-100 shadow-lg"
                      : "border-gray-200 hover:border-red-300 hover:shadow-md"
                  } rounded-xl p-6 flex flex-col text-left transition-all duration-200 group relative`}
                >
                  {selectedService?.id === service.id && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
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
                  )}

                  <div className="flex items-center mb-4">
                    <div className="mr-4 p-3 bg-red-50 rounded-xl text-red-500 group-hover:bg-red-100 transition-colors">
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
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800 mb-1">
                        {service.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-auto">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Draft charge:</span>
                        <span className="font-bold text-red-600 text-lg">
                          ₹{service.price}
                        </span>
                      </div>
                      {service.hasNotary && service.notaryCharge > 0 && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">+ Notary:</span>
                          <span className="font-medium text-gray-800">
                            ₹{service.notaryCharge}
                          </span>
                        </div>
                      )}
                      {service.requiresStamp && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">+ e-Stamp:</span>
                          <span className="font-medium text-gray-800">
                            {selectedStampDuty
                              ? `₹${calculateStampDutyAmount(
                                  selectedStampDuty
                                )}`
                              : "Select below"}
                          </span>
                        </div>
                      )}
                      {service.requiresDelivery && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">+ Delivery:</span>
                          <span className="font-medium text-gray-800">
                            {selectedDeliveryCharge
                              ? `₹${selectedDeliveryCharge.charge}`
                              : "Select below"}
                          </span>
                        </div>
                      )}
                      <div className="border-t pt-2 flex justify-between items-center">
                        <span className="font-bold text-gray-800">Total:</span>
                        <span className="font-bold text-red-600 text-xl">
                          ₹
                          {selectedService?.id === service.id
                            ? calculateTotalAmount()
                            : service.price +
                              (service.hasNotary ? service.notaryCharge : 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Stamp Duty Selection */}
            {selectedService?.requiresStamp && (
              <div className="mb-8 p-6 bg-gray-50 rounded-xl border">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Select Stamp Duty Type
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stampDutyOptions.map((stampDuty) => (
                    <button
                      key={stampDuty._id}
                      onClick={() => handleStampDutySelect(stampDuty)}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        selectedStampDuty?._id === stampDuty._id
                          ? "border-red-500 bg-red-50 ring-2 ring-red-200"
                          : "border-gray-200 hover:border-red-300 bg-white hover:bg-red-50"
                      }`}
                    >
                      <div className="font-medium text-gray-800 text-sm mb-2">
                        {stampDuty.documentType}
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        Article: {stampDuty.articleNo}
                      </div>
                      <div className="font-bold text-red-600">
                        {stampDuty.calculationType === "fixed"
                          ? `₹${stampDuty.fixedAmount}`
                          : `${stampDuty.percentage}% (Min: ₹${
                              stampDuty.minAmount
                            }${
                              stampDuty.maxAmount > 0
                                ? `, Max: ₹${stampDuty.maxAmount}`
                                : ""
                            })`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Delivery Charge Selection */}
            {selectedService?.requiresDelivery && (
              <div className="mb-8 p-6 bg-gray-50 rounded-xl border">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  Select Delivery Service
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {deliveryChargeOptions.map((deliveryCharge) => (
                    <button
                      key={deliveryCharge._id}
                      onClick={() => handleDeliveryChargeSelect(deliveryCharge)}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        selectedDeliveryCharge?._id === deliveryCharge._id
                          ? "border-red-500 bg-red-50 ring-2 ring-red-200"
                          : "border-gray-200 hover:border-red-300 bg-white hover:bg-red-50"
                      }`}
                    >
                      <div className="font-medium text-gray-800 text-sm mb-2">
                        {deliveryCharge.serviceName}
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        {deliveryCharge.description}
                      </div>
                      <div className="font-bold text-red-600">
                        ₹{deliveryCharge.charge}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <button
                onClick={goBack}
                className="px-6 py-3 text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Go Back
              </button>

              {canProceedToPayment() ? (
                <button
                  onClick={handlePayment}
                  className="px-8 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center font-medium text-lg shadow-lg hover:shadow-xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Pay ₹{calculateTotalAmount()}
                </button>
              ) : (
                <div className="text-gray-500 text-sm bg-gray-100 px-6 py-3 rounded-lg">
                  {!selectedService
                    ? "Please select a service package to continue"
                    : "Please complete all required selections"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPaymentPage;
