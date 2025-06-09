import React, { useEffect, useState } from "react";
import { getStampAndDeliveryCharges, sendTheEstampData } from "../../api/service/axiosService";

const BuyEStampDocuments = () => {
  const [stampDutyData, setStampDutyData] = useState([]);
  const [deliveryCharges, setDeliveryCharges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [firstPartyName, setFirstPartyName] = useState("");
  const [secondPartyName, setSecondPartyName] = useState("");
  const [selectedDocument, setSelectedDocument] = useState("");
  const [deliveryType, setDeliveryType] = useState("in-store"); // 'in-store' or 'delivery'
  const [selectedDeliveryService, setSelectedDeliveryService] = useState("");

  // Modal states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [requestorName, setRequestorName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  // Error states
  const [formErrors, setFormErrors] = useState({});
  const [paymentErrors, setPaymentErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getStampAndDeliveryCharges();
        setStampDutyData(response.data.stampDuty || []);
        setDeliveryCharges(response.data.deliveryCharges || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch stamp duty and delivery charges");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const validateForm = () => {
    const errors = {};

    if (!firstPartyName.trim()) {
      errors.firstPartyName = "First party name is required";
    }

    if (!secondPartyName.trim()) {
      errors.secondPartyName = "Second party name is required";
    }

    if (!selectedDocument) {
      errors.selectedDocument = "Please select a document type";
    }

    if (deliveryType === "delivery" && !selectedDeliveryService) {
      errors.selectedDeliveryService = "Please select a delivery service";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePaymentForm = () => {
    const errors = {};

    if (!requestorName.trim()) {
      errors.requestorName = "Requestor name is required";
    }

    if (!mobileNumber.trim()) {
      errors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      errors.mobileNumber = "Please enter a valid 10-digit mobile number";
    }

    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getSelectedDocumentData = () => {
    return stampDutyData.find((doc) => doc._id === selectedDocument);
  };

  const getSelectedDeliveryData = () => {
    return deliveryCharges.find(
      (service) => service._id === selectedDeliveryService
    );
  };

  const calculateStampAmount = (documentData, value = 0) => {
    if (!documentData) return 0;

    if (documentData.calculationType === "fixed") {
      return documentData.fixedAmount;
    } else if (documentData.calculationType === "percentage") {
      const calculatedAmount = (value * documentData.percentage) / 100;
      const minAmount = documentData.minAmount || 0;
      const maxAmount = documentData.maxAmount || Infinity;

      return Math.max(minAmount, Math.min(calculatedAmount, maxAmount));
    }
    return 0;
  };

  const getTotalAmount = () => {
    const documentData = getSelectedDocumentData();
    const deliveryData = getSelectedDeliveryData();

    const stampAmount = calculateStampAmount(documentData);
    const deliveryAmount =
      deliveryType === "delivery" && deliveryData ? deliveryData.charge : 0;

    return stampAmount + deliveryAmount;
  };

  const handleProceedToPayment = () => {
    if (validateForm()) {
      setShowPaymentModal(true);
    }
  };

  // Optional: Helper function to reset form after successful payment
  const resetForm = () => {
    setFirstPartyName("");
    setSecondPartyName("");
    setSelectedDocument("");
    setDeliveryType("in-store");
    setSelectedDeliveryService("");
    setRequestorName("");
    setMobileNumber("");
    setFormErrors({});
    setPaymentErrors({});
  };

  // Optional: Function to send data to backend (implement as needed)
  const sendOrderToBackend = async (orderData) => {
    try {
      const response = await sendTheEstampData(orderData)
      console.log(response)
      return response
      
      
    } catch (error) {
      console.error('Error sending order to backend:', error);
      throw error;
    }
  };

  const handlePayment = () => {
    if (validatePaymentForm()) {
      // Prepare all the data to send to backend
      const selectedDocumentData = getSelectedDocumentData();
      const selectedDeliveryData = getSelectedDeliveryData();
      
      const paymentData = {
        // Party Information
        firstPartyName: firstPartyName.trim(),
        secondPartyName: secondPartyName.trim(),
        
        // Document Information
        selectedDocumentId: selectedDocument,
        documentType: selectedDocumentData?.documentType,
        documentCalculationType: selectedDocumentData?.calculationType,
        documentFixedAmount: selectedDocumentData?.fixedAmount,
        documentPercentage: selectedDocumentData?.percentage,
        documentMinAmount: selectedDocumentData?.minAmount,
        documentMaxAmount: selectedDocumentData?.maxAmount,
        
        // Calculated Amounts
        stampDutyAmount: calculateStampAmount(selectedDocumentData),
        
        // Delivery Information
        deliveryType: deliveryType,
        selectedDeliveryServiceId: selectedDeliveryService || null,
        deliveryServiceName: selectedDeliveryData?.serviceName || null,
        deliveryCharge: deliveryType === "delivery" && selectedDeliveryData ? selectedDeliveryData.charge : 0,
        deliveryDescription: selectedDeliveryData?.description || null,
        
        // Payment Information
        requestorName: requestorName.trim(),
        mobileNumber: mobileNumber.trim(),
        totalAmount: getTotalAmount(),
        
        // Timestamp
        orderDate: new Date().toISOString(),
        
        // Additional metadata
        paymentMethod: "razorpay",
        currency: "INR"
      };

      // Integrate Razorpay here
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: getTotalAmount() * 100, // Amount in paise
        currency: "INR",
        name: "E-Stamp Service",
        description: `${selectedDocumentData?.documentType} - ${
          deliveryType === "delivery" ? "With Delivery" : "In-Store Pickup"
        }`,
        handler: function (response) {
          // Payment successful - log all data
          console.log("=== PAYMENT SUCCESSFUL ===");
          console.log("Razorpay Response:", response);
          console.log("=== ORDER DETAILS TO SEND TO BACKEND ===");
          console.log(JSON.stringify(paymentData, null, 2));
          
          // Add payment response data to the payload
          const finalPaymentData = {
            ...paymentData,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id || null,
            razorpaySignature: response.razorpay_signature || null,
            paymentStatus: "completed",
            paymentCompletedAt: new Date().toISOString()
          };
          
          console.log("=== FINAL PAYLOAD WITH PAYMENT DETAILS ===");
          console.log(JSON.stringify(finalPaymentData, null, 2));
          
          // Here you would typically send this data to your backend
          // Example API call (uncomment and modify as needed):
          sendOrderToBackend(finalPaymentData)
            .then(result => {
              console.log("Order saved successfully:", result);
              alert("Payment successful! Order has been processed.");
              // Reset form or redirect to success page
              resetForm();
            })
            .catch(error => {
              console.error("Error saving order:", error);
              alert("Payment successful but there was an issue saving your order. Please contact support.");
            });
          
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
          setShowPaymentModal(false);
          
          // Optional: Reset form after successful payment
          // resetForm();
        },
        prefill: {
          name: requestorName,
          contact: mobileNumber,
        },
        theme: {
          color: "#dc2626",
        },
        modal: {
          ondismiss: function() {
            console.log("Payment modal closed by user");
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        console.log("=== PAYMENT FAILED ===");
        console.log("Error:", response.error);
        
        const failedPaymentData = {
          ...paymentData,
          paymentStatus: "failed",
          paymentFailedAt: new Date().toISOString(),
          errorCode: response.error.code,
          errorDescription: response.error.description,
          errorSource: response.error.source,
          errorStep: response.error.step,
          errorReason: response.error.reason
        };
        
        console.log("=== FAILED PAYMENT DATA ===");
        console.log(JSON.stringify(failedPaymentData, null, 2));
        
        alert("Payment failed: " + response.error.description);
      });
      
      rzp.open();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Loading stamp duty information...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-600">
          <p className="text-lg font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg border-t-4 border-red-600 overflow-hidden">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Buy E-Stamp Documents
            </h1>
            <p className="mt-1 text-gray-600">
              Complete the form below to purchase your e-stamp document
            </p>
          </div>

          <div className="p-6">
            {/* Party Names Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="firstPartyName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  First Party Name *
                </label>
                <input
                  type="text"
                  id="firstPartyName"
                  value={firstPartyName}
                  onChange={(e) => setFirstPartyName(e.target.value)}
                  placeholder="Enter first party name"
                  className={`w-full px-4 py-2.5 border ${
                    formErrors.firstPartyName
                      ? "border-red-300"
                      : "border-gray-300"
                  } rounded-md focus:ring-red-500 focus:border-red-500 text-sm`}
                />
                {formErrors.firstPartyName && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.firstPartyName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="secondPartyName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Second Party Name *
                </label>
                <input
                  type="text"
                  id="secondPartyName"
                  value={secondPartyName}
                  onChange={(e) => setSecondPartyName(e.target.value)}
                  placeholder="Enter second party name"
                  className={`w-full px-4 py-2.5 border ${
                    formErrors.secondPartyName
                      ? "border-red-300"
                      : "border-gray-300"
                  } rounded-md focus:ring-red-500 focus:border-red-500 text-sm`}
                />
                {formErrors.secondPartyName && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.secondPartyName}
                  </p>
                )}
              </div>
            </div>

            {/* Document Type Selection */}
            <div className="mb-6">
              <label
                htmlFor="documentType"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Document Type *
              </label>
              <div className="relative">
                <select
                  id="documentType"
                  value={selectedDocument}
                  onChange={(e) => setSelectedDocument(e.target.value)}
                  className={`w-full px-4 py-2.5 border ${
                    formErrors.selectedDocument
                      ? "border-red-300"
                      : "border-gray-300"
                  } rounded-md focus:ring-red-500 focus:border-red-500 text-sm bg-white appearance-none cursor-pointer hover:border-gray-400 transition-colors`}
                >
                  <option value="" className="text-gray-500">
                    Select a document type
                  </option>
                  {stampDutyData.map((doc) => (
                    <option key={doc._id} value={doc._id} className="py-2">
                      {doc.documentType} - ₹
                      {doc.calculationType === "fixed"
                        ? doc.fixedAmount
                        : `${doc.percentage}% (Min: ₹${doc.minAmount || 0}${
                            doc.maxAmount ? `, Max: ₹${doc.maxAmount}` : ""
                          })`}
                    </option>
                  ))}
                </select>
                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {formErrors.selectedDocument && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.selectedDocument}
                </p>
              )}

              {/* Show selected document details */}
              {selectedDocument && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="flex items-start">
                    <svg
                      className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="text-sm">
                      <p className="font-medium text-blue-800">
                        {getSelectedDocumentData()?.documentType}
                      </p>
                      <p className="text-blue-600 mt-1">
                        Stamp Duty: ₹
                        {calculateStampAmount(getSelectedDocumentData())}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Delivery Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Delivery Type *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    deliveryType === "in-store"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    id="in-store"
                    name="deliveryType"
                    type="radio"
                    value="in-store"
                    checked={deliveryType === "in-store"}
                    onChange={(e) => setDeliveryType(e.target.value)}
                    className="absolute top-4 right-4 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                  />
                  <label htmlFor="in-store" className="cursor-pointer block">
                    <div className="flex items-center mb-2">
                      <svg
                        className="w-5 h-5 text-red-600 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6"
                        />
                      </svg>
                      <span className="font-medium text-gray-900">
                        In-Store Pickup
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 ml-7">
                      Collect your document from our office
                    </p>
                    <p className="text-sm font-medium text-green-600 ml-7 mt-1">
                      Free
                    </p>
                  </label>
                </div>

                <div
                  className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    deliveryType === "delivery"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    id="delivery"
                    name="deliveryType"
                    type="radio"
                    value="delivery"
                    checked={deliveryType === "delivery"}
                    onChange={(e) => setDeliveryType(e.target.value)}
                    className="absolute top-4 right-4 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                  />
                  <label htmlFor="delivery" className="cursor-pointer block">
                    <div className="flex items-center mb-2">
                      <svg
                        className="w-5 h-5 text-red-600 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                        />
                      </svg>
                      <span className="font-medium text-gray-900">
                        Home Delivery
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 ml-7">
                      Get your document delivered to your address
                    </p>
                    <p className="text-sm font-medium text-blue-600 ml-7 mt-1">
                      Charges apply
                    </p>
                  </label>
                </div>
              </div>
            </div>

            {/* Delivery Service Selection (shown when delivery is selected) */}
            {deliveryType === "delivery" && (
              <div className="mb-6">
                <label
                  htmlFor="deliveryService"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Delivery Service *
                </label>
                <div className="relative">
                  <select
                    id="deliveryService"
                    value={selectedDeliveryService}
                    onChange={(e) => setSelectedDeliveryService(e.target.value)}
                    className={`w-full px-4 py-2.5 border ${
                      formErrors.selectedDeliveryService
                        ? "border-red-300"
                        : "border-gray-300"
                    } rounded-md focus:ring-red-500 focus:border-red-500 text-sm bg-white appearance-none cursor-pointer hover:border-gray-400 transition-colors`}
                  >
                    <option value="" className="text-gray-500">
                      Select a delivery service
                    </option>
                    {deliveryCharges.map((service) => (
                      <option
                        key={service._id}
                        value={service._id}
                        className="py-2"
                      >
                        {service.serviceName} - ₹{service.charge}
                        {service.description && ` (${service.description})`}
                      </option>
                    ))}
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {formErrors.selectedDeliveryService && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.selectedDeliveryService}
                  </p>
                )}

                {/* Show selected delivery service details */}
                {selectedDeliveryService && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-start">
                      <svg
                        className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div className="text-sm">
                        <p className="font-medium text-green-800">
                          {getSelectedDeliveryData()?.serviceName}
                        </p>
                        <p className="text-green-600 mt-1">
                          Delivery Charge: ₹{getSelectedDeliveryData()?.charge}
                        </p>
                        {getSelectedDeliveryData()?.description && (
                          <p className="text-green-600 text-xs mt-1">
                            {getSelectedDeliveryData()?.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Price Summary */}
            {selectedDocument && (
              <div className="bg-red-50 p-4 rounded-lg mb-6 border border-red-100">
                <h3 className="font-medium text-red-800 mb-3 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  Price Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-700">Stamp Duty:</span>
                    <span className="font-medium text-gray-900">
                      ₹{calculateStampAmount(getSelectedDocumentData())}
                    </span>
                  </div>
                  {deliveryType === "delivery" && selectedDeliveryService && (
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700">Delivery Charges:</span>
                      <span className="font-medium text-gray-900">
                        ₹{getSelectedDeliveryData()?.charge || 0}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-red-200 pt-2 mt-3">
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span className="text-red-800">Total Amount:</span>
                      <span className="text-red-600">₹{getTotalAmount()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="flex justify-end">
              <button
                onClick={handleProceedToPayment}
                disabled={!selectedDocument}
                className={`px-8 py-3 rounded-md font-medium transition-all duration-200 ${
                  selectedDocument
                    ? "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
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
                  paymentErrors.requestorName
                    ? "border-red-300"
                    : "border-gray-300"
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

            {/* Action Buttons */}
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
      )}
    </div>
  );
};

export default BuyEStampDocuments;
