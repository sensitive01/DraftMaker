import React, { useEffect, useState } from "react";
import {
  getStampAndDeliveryCharges,
  sendTheEstampData,
} from "../../api/service/axiosService";

const BuyEStampDocuments = () => {
  const [stampDutyData, setStampDutyData] = useState([]);
  const [deliveryCharges, setDeliveryCharges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [firstPartyName, setFirstPartyName] = useState("");
  const [secondPartyName, setSecondPartyName] = useState("");
  const [stampDutyPayer, setStampDutyPayer] = useState("");
  const [selectedDocument, setSelectedDocument] = useState("");
  const [considerationAmount, setConsiderationAmount] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryType, setDeliveryType] = useState("in-store");
  const [selectedDeliveryService, setSelectedDeliveryService] = useState("");
  const [isConsideration, setIsConsideration] = useState(false);

  const [deliveryAddress, setDeliveryAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    email: "",
  });

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

  // Get service charge based on selected document
  const getServiceCharge = () => {
    const selectedDocumentData = getSelectedDocumentData();
    return selectedDocumentData?.serviceCharge || 210; // Default to 210 if no document selected or no service charge
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    const selectedDocumentData = getSelectedDocumentData();
    const isFixedType = selectedDocumentData?.calculationType === "fixed";

    let completedSteps = 0;
    let totalSteps = isFixedType ? 5 : 6; // Base steps

    // Add delivery address steps if delivery is selected
    if (deliveryType === "delivery") {
      totalSteps += 6; // fullName, phoneNumber, addressLine1, city, state, pincode
    }

    // Count completed base steps
    if (firstPartyName.trim()) completedSteps++;
    if (secondPartyName.trim()) completedSteps++;
    if (stampDutyPayer) completedSteps++;
    if (selectedDocument) completedSteps++;
    if (description.trim()) completedSteps++;

    // Only count consideration amount for percentage type
    if (!isFixedType && considerationAmount.trim()) completedSteps++;

    // Count delivery address steps if applicable
    if (deliveryType === "delivery") {
      if (deliveryAddress.addressLine1.trim()) completedSteps++;
      if (deliveryAddress.city.trim()) completedSteps++;
      if (deliveryAddress.state.trim()) completedSteps++;
      if (deliveryAddress.pincode.trim()) completedSteps++;
    }

    return Math.round((completedSteps / totalSteps) * 100);
  };

  const validateForm = () => {
    const errors = {};
    const selectedDocumentData = getSelectedDocumentData();
    const isFixedType = selectedDocumentData?.calculationType === "fixed";

    // First Party Name validation
    if (!firstPartyName.trim()) {
      errors.firstPartyName = "First party name is required";
    } else if (firstPartyName.length > 50) {
      errors.firstPartyName = "First party name must not exceed 50 characters";
    }

    // Second Party Name validation
    if (!secondPartyName.trim()) {
      errors.secondPartyName = "Second party name is required";
    } else if (secondPartyName.length > 50) {
      errors.secondPartyName =
        "Second party name must not exceed 50 characters";
    }

    if (!stampDutyPayer) {
      errors.stampDutyPayer = "Please select who pays the stamp duty";
    }

    if (!selectedDocument) {
      errors.selectedDocument = "Please select a document type";
    }

    if (deliveryType === "delivery") {
      if (!selectedDeliveryService) {
        errors.selectedDeliveryService = "Please select a delivery service";
      }

      if (!deliveryAddress.addressLine1.trim()) {
        errors.deliveryAddressLine1 = "Address line 1 is required";
      }
      if (!deliveryAddress.city.trim()) {
        errors.deliveryCity = "City is required";
      }
      if (!deliveryAddress.state.trim()) {
        errors.deliveryState = "State is required";
      }
      if (!deliveryAddress.pincode.trim()) {
        errors.deliveryPincode = "Pincode is required";
      } else if (!/^\d{6}$/.test(deliveryAddress.pincode)) {
        errors.deliveryPincode = "Please enter a valid 6-digit pincode";
      }
    }

    // Only validate consideration amount for percentage type
    if (!isFixedType) {
      if (!considerationAmount.trim()) {
        errors.considerationAmount = "Consideration amount is required";
      } else if (
        isNaN(considerationAmount) ||
        parseFloat(considerationAmount) <= 0
      ) {
        errors.considerationAmount = "Please enter a valid amount";
      }
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

  const handleFirstPartyNameChange = (e) => {
    const value = e.target.value;
    setFirstPartyName(value);

    // Clear existing error if user starts typing again and length is valid
    if (formErrors.firstPartyName && value.length <= 50) {
      setFormErrors((prev) => ({ ...prev, firstPartyName: null }));
    }

    // Show error immediately if exceeds 50 characters
    if (value.length > 50) {
      setFormErrors((prev) => ({
        ...prev,
        firstPartyName: "First party name must not exceed 50 characters",
      }));
    }
  };

  const handleSecondPartyNameChange = (e) => {
    const value = e.target.value;
    setSecondPartyName(value);

    // Clear existing error if user starts typing again and length is valid
    if (formErrors.secondPartyName && value.length <= 50) {
      setFormErrors((prev) => ({ ...prev, secondPartyName: null }));
    }

    // Show error immediately if exceeds 50 characters
    if (value.length > 50) {
      setFormErrors((prev) => ({
        ...prev,
        secondPartyName: "Second party name must not exceed 50 characters",
      }));
    }
  };

  const calculateStampAmount = () => {
    const selectedDocumentData = getSelectedDocumentData();
    if (!selectedDocumentData) return 0;

    if (selectedDocumentData.calculationType === "fixed") {
      return selectedDocumentData.fixedAmount;
    }

    if (selectedDocumentData.calculationType === "percentage") {
      if (!considerationAmount || isNaN(considerationAmount)) return 0;

      const amount = parseFloat(considerationAmount);
      const percentage = selectedDocumentData.percentage;
      const minAmount = selectedDocumentData.minAmount;
      const maxAmount = selectedDocumentData.maxAmount;

      let stampDuty = 0;

      // If minAmount and maxAmount are both 0, use the custom 1%/2% logic
      if (minAmount === 0 && maxAmount === 0) {
        if (amount <= 100000) {
          stampDuty = (amount * selectedDocumentData.percentage) / 100; // 1% for amounts up to 1 lakh
        } else {
          stampDuty = (amount * selectedDocumentData.percentage) / 100; // 2% for amounts above 1 lakh
        }
        // Minimum stamp duty is ₹100
        stampDuty = Math.max(stampDuty, 100);
      } else {
        // Use the percentage from the document data
        if (amount <= 100000) {
          stampDuty = (amount * percentage) / 100;
          // Apply minimum amount if specified
          if (minAmount > 0) {
            stampDuty = Math.max(stampDuty, minAmount);
          }
        } else {
          // For amounts above 1 lakh, if maxAmount is specified, use it as fixed amount
          if (maxAmount > 0) {
            stampDuty = maxAmount;
          } else {
            stampDuty = (amount * percentage) / 100;
            // Apply minimum amount if specified
            if (minAmount > 0) {
              stampDuty = Math.max(stampDuty, minAmount);
            }
          }
        }
      }

      return Math.round(stampDuty);
    }

    return 0;
  };

  const getTotalAmount = () => {
    const deliveryData = getSelectedDeliveryData();
    const stampAmount = calculateStampAmount();
    const serviceCharge = getServiceCharge();
    const deliveryAmount =
      deliveryType === "delivery" && deliveryData ? deliveryData.charge : 0;

    return stampAmount + serviceCharge + deliveryAmount;
  };

  const handleProceedToPayment = () => {
    if (validateForm()) {
      setShowPaymentModal(true);
    }
  };

  const resetForm = () => {
    setFirstPartyName("");
    setSecondPartyName("");
    setStampDutyPayer("");
    setSelectedDocument("");
    setConsiderationAmount("");
    setDescription("");
    setDeliveryType("in-store");
    setSelectedDeliveryService("");
    setRequestorName("");
    setMobileNumber("");
    setFormErrors({});
    setPaymentErrors({});
    setDeliveryAddress({
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
      email: "",
    });
  };

  const sendOrderToBackend = async (orderData) => {
    try {
      const response = await sendTheEstampData(orderData);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error sending order to backend:", error);
      throw error;
    }
  };

  const handlePayment = () => {
    if (validatePaymentForm()) {
      const selectedDocumentData = getSelectedDocumentData();
      const selectedDeliveryData = getSelectedDeliveryData();

      const paymentData = {
        // Party Information
        firstPartyName: firstPartyName.trim(),
        secondPartyName: secondPartyName.trim(),
        stampDutyPayer: stampDutyPayer,

        // Document Information
        selectedDocumentId: selectedDocument,
        documentType: selectedDocumentData?.documentType,
        calculationType: selectedDocumentData?.calculationType,
        considerationAmount:
          selectedDocumentData?.calculationType === "percentage"
            ? parseFloat(considerationAmount)
            : null,
        description: description.trim(),

        // Calculated Amounts
        stampDutyAmount: calculateStampAmount(),
        serviceCharge: getServiceCharge(),

        // Delivery Information
        deliveryType: deliveryType,
        selectedDeliveryServiceId: selectedDeliveryService || null,
        deliveryServiceName: selectedDeliveryData?.serviceName || null,
        deliveryCharge:
          deliveryType === "delivery" && selectedDeliveryData
            ? selectedDeliveryData.charge
            : 0,
        deliveryDescription: selectedDeliveryData?.description || null,

        // Payment Information
        requestorName: requestorName.trim(),
        mobileNumber: mobileNumber.trim(),
        totalAmount: getTotalAmount(),

        // Timestamp
        orderDate: new Date().toISOString(),

        // Additional metadata
        paymentMethod: "razorpay",
        currency: "INR",

        deliveryAddress:
          deliveryType === "delivery"
            ? {
                addressLine1: deliveryAddress.addressLine1.trim(),
                addressLine2: deliveryAddress.addressLine2.trim(),
                city: deliveryAddress.city.trim(),
                state: deliveryAddress.state.trim(),
                pincode: deliveryAddress.pincode.trim(),
                landmark: deliveryAddress.landmark.trim(),
                email: deliveryAddress.email.trim(),
              }
            : null,
      };

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: getTotalAmount() * 100,
        currency: "INR",
        name: "E-Stamp Service",
        description: `${selectedDocumentData?.documentType} - ${
          deliveryType === "delivery" ? "With Delivery" : "In-Store Pickup"
        }`,
        handler: function (response) {
          console.log("=== PAYMENT SUCCESSFUL ===");
          console.log("Razorpay Response:", response);
          console.log("=== ORDER DETAILS TO SEND TO BACKEND ===");
          console.log(JSON.stringify(paymentData, null, 2));

          const finalPaymentData = {
            ...paymentData,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id || null,
            razorpaySignature: response.razorpay_signature || null,
            paymentStatus: "completed",
            paymentCompletedAt: new Date().toISOString(),
          };

          console.log("=== FINAL PAYLOAD WITH PAYMENT DETAILS ===");
          console.log(JSON.stringify(finalPaymentData, null, 2));

          sendOrderToBackend(finalPaymentData)
            .then((result) => {
              console.log("Order saved successfully:", result);
              alert("Payment successful! Order has been processed.");
              resetForm();
            })
            .catch((error) => {
              console.error("Error saving order:", error);
              alert(
                "Payment successful but there was an issue saving your order. Please contact support."
              );
            });

          alert(
            "Payment successful! Payment ID: " + response.razorpay_payment_id
          );
          setShowPaymentModal(false);
        },
        prefill: {
          name: requestorName,
          contact: mobileNumber,
        },
        theme: {
          color: "#dc2626",
        },
        modal: {
          ondismiss: function () {
            console.log("Payment modal closed by user");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
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
          errorReason: response.error.reason,
        };

        console.log("=== FAILED PAYMENT DATA ===");
        console.log(JSON.stringify(failedPaymentData, null, 2));

        alert("Payment failed: " + response.error.description);
      });

      rzp.open();
    }
  };

  // Helper function to get calculation explanation
  const getCalculationExplanation = () => {
    const selectedDocumentData = getSelectedDocumentData();
    if (!selectedDocumentData) return null;

    if (selectedDocumentData.calculationType === "fixed") {
      return `Fixed stamp duty of ₹${selectedDocumentData.fixedAmount}`;
    }

    if (
      selectedDocumentData.calculationType === "percentage" &&
      considerationAmount &&
      !isNaN(considerationAmount)
    ) {
      const amount = parseFloat(considerationAmount);

      const percentage = selectedDocumentData.percentage;
      console.log("percentage", selectedDocumentData.percentage);
      const minAmount = selectedDocumentData.minAmount;
      const maxAmount = selectedDocumentData.maxAmount;

      if (minAmount === 0 && maxAmount === 0) {
        return amount <= 100000
          ? `${percentage}% of ₹${amount.toLocaleString(
              "en-IN"
            )} = ₹${calculateStampAmount()} (Minimum: ₹100)`
          : `${percentage}%of ₹${amount.toLocaleString(
              "en-IN"
            )} = ₹${calculateStampAmount()}`;
      } else {
        if (amount <= 100000) {
          return `${percentage}% of ₹${amount.toLocaleString(
            "en-IN"
          )} = ₹${calculateStampAmount()}${
            minAmount > 0 ? ` (Minimum: ₹${minAmount})` : ""
          }`;
        } else {
          return maxAmount >= 0
            ? `Fixed amount of ₹${maxAmount} for amounts above ₹1,00,000`
            : `${percentage}% of ₹${amount.toLocaleString(
                "en-IN"
              )} = ₹${calculateStampAmount()}${
                minAmount > 0 ? ` (Minimum: ₹${minAmount})` : ""
              }`;
        }
      }
    }

    return null;
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

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Form Completion
                </span>
                <span className="text-sm font-medium text-red-600">
                  {calculateProgress()}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
            </div>
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
                  onChange={handleFirstPartyNameChange}
                  placeholder="Enter first party name"
                  className={`w-full px-4 py-2.5 border ${
                    formErrors.firstPartyName || firstPartyName.length > 50
                      ? "border-red-300"
                      : "border-gray-300"
                  } rounded-md focus:ring-red-500 focus:border-red-500 text-sm`}
                />
                <div className="flex justify-between items-center mt-1">
                  {(formErrors.firstPartyName ||
                    firstPartyName.length > 50) && (
                    <p className="text-sm text-red-600">
                      {formErrors.firstPartyName ||
                        "First party name must not exceed 50 characters"}
                    </p>
                  )}
                  <p
                    className={`text-xs ml-auto ${
                      firstPartyName.length > 50
                        ? "text-red-500 font-medium"
                        : firstPartyName.length > 45
                        ? "text-orange-500"
                        : "text-gray-400"
                    }`}
                  >
                    {firstPartyName.length}/50
                  </p>
                </div>
              </div>

              {/* Second Party Name with character counter */}
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
                  onChange={handleSecondPartyNameChange}
                  placeholder="Enter second party name"
                  className={`w-full px-4 py-2.5 border ${
                    formErrors.secondPartyName || secondPartyName.length > 50
                      ? "border-red-300"
                      : "border-gray-300"
                  } rounded-md focus:ring-red-500 focus:border-red-500 text-sm`}
                />
                <div className="flex justify-between items-center mt-1">
                  {(formErrors.secondPartyName ||
                    secondPartyName.length > 50) && (
                    <p className="text-sm text-red-600">
                      {formErrors.secondPartyName ||
                        "Second party name must not exceed 50 characters"}
                    </p>
                  )}
                  <p
                    className={`text-xs ml-auto ${
                      secondPartyName.length > 50
                        ? "text-red-500 font-medium"
                        : secondPartyName.length > 45
                        ? "text-orange-500"
                        : "text-gray-400"
                    }`}
                  >
                    {secondPartyName.length}/50
                  </p>
                </div>
              </div>
            </div>

            {/* Stamp Duty Payer Selection */}
            <div className="mb-6">
              <label
                htmlFor="stampDutyPayer"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Who Pays the Stamp Duty? *
              </label>
              <div className="relative">
                <select
                  id="stampDutyPayer"
                  value={stampDutyPayer}
                  onChange={(e) => setStampDutyPayer(e.target.value)}
                  className={`w-full px-4 py-2.5 border ${
                    formErrors.stampDutyPayer
                      ? "border-red-300"
                      : "border-gray-300"
                  } rounded-md focus:ring-red-500 focus:border-red-500 text-sm bg-white appearance-none cursor-pointer hover:border-gray-400 transition-colors`}
                >
                  <option value="" className="text-gray-500">
                    Select who pays the stamp duty
                  </option>
                  <option value="first-party">First Party</option>
                  <option value="second-party">Second Party</option>
                </select>
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
              {formErrors.stampDutyPayer && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.stampDutyPayer}
                </p>
              )}
            </div>

            {/* Document Type Selection */}
            <div className="mb-6">
              <label
                htmlFor="documentType"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Stamp Article *
              </label>
              <div className="relative">
                <select
                  id="documentType"
                  value={selectedDocument}
                  onChange={(e) => {
                    setSelectedDocument(e.target.value);
                    setConsiderationAmount(""); // Reset consideration amount when document changes
                  }}
                  className={`w-full px-4 py-2.5 border ${
                    formErrors.selectedDocument
                      ? "border-red-300"
                      : "border-gray-300"
                  } rounded-md focus:ring-red-500 focus:border-red-500 text-sm bg-white appearance-none cursor-pointer hover:border-gray-400 transition-colors`}
                >
                  <option value="" className="text-gray-500">
                    Select a stamp article
                  </option>
                  {stampDutyData.map((doc) => (
                    <option key={doc._id} value={doc._id} className="py-2">
                      {doc.documentType}{" "}
                      {doc.calculationType === "fixed"
                        ? "(Fixed)"
                        : "(Percentage)"}
                    </option>
                  ))}
                </select>
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
            </div>

            <input
              type="checkbox"
              onClick={() => setIsConsideration(true)}
            ></input>

            {isConsideration && (
              <div className="mb-6">
                <label
                  htmlFor="considerationAmount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Consideration Amount (₹) *
                </label>
                <input
                  type="number"
                  id="considerationAmount"
                  value={considerationAmount}
                  onChange={(e) => setConsiderationAmount(e.target.value)}
                  placeholder="Enter consideration amount"
                  min="0"
                  step="0.01"
                  className={`w-full px-4 py-2.5 border ${
                    formErrors.considerationAmount
                      ? "border-red-300"
                      : "border-gray-300"
                  } rounded-md focus:ring-red-500 focus:border-red-500 text-sm`}
                />
                {formErrors.considerationAmount && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.considerationAmount}
                  </p>
                )}
              </div>
            )}

            {/* Consideration Amount - Only show for percentage calculation type */}
            {selectedDocument &&
              getSelectedDocumentData()?.calculationType === "percentage" && (
                <div className="mb-6">
                  <label
                    htmlFor="considerationAmount"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Consideration Amount (₹) *
                  </label>
                  <input
                    type="number"
                    id="considerationAmount"
                    value={considerationAmount}
                    onChange={(e) => setConsiderationAmount(e.target.value)}
                    placeholder="Enter consideration amount"
                    min="0"
                    step="0.01"
                    className={`w-full px-4 py-2.5 border ${
                      formErrors.considerationAmount
                        ? "border-red-300"
                        : "border-gray-300"
                    } rounded-md focus:ring-red-500 focus:border-red-500 text-sm`}
                  />
                  {formErrors.considerationAmount && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.considerationAmount}
                    </p>
                  )}
                </div>
              )}

            {/* Show stamp duty calculation */}
            {selectedDocument && getCalculationExplanation() && (
              <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
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
                      Stamp Duty Calculation:
                    </p>
                    <p className="text-blue-600 mt-1">
                      {getCalculationExplanation()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter document description"
                rows="3"
                className={`w-full px-4 py-2.5 border ${
                  formErrors.description ? "border-red-300" : "border-gray-300"
                } rounded-md focus:ring-red-500 focus:border-red-500 text-sm resize-vertical`}
              />
              {formErrors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.description}
                </p>
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

            {/* Delivery Service Selection */}
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

            {deliveryType === "delivery" && selectedDeliveryService && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Delivery Address
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={requestorName}
                      onChange={(e) => setRequestorName(e.target.value)}
                      placeholder="Enter full name"
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

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-500 text-sm font-medium">
                          +91
                        </span>
                      </div>
                      <input
                        type="tel"
                        id="paymentMobile"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="Enter 10-digit phone number"
                        maxLength="10"
                        className={`w-full pl-12 pr-4 py-2.5 border ${
                          paymentErrors.mobileNumber
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-md focus:ring-red-500 focus:border-red-500 text-sm`}
                      />
                    </div>
                    {paymentErrors.mobileNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {paymentErrors.mobileNumber}
                      </p>
                    )}
                  </div>

                  {/* Email Id */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Id *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="emailId"
                        value={deliveryAddress.email}
                        onChange={(e) =>
                          setDeliveryAddress((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder="Enter Your Email Id"
                        className={`w-full pl-3 py-2.5 border ${
                          formErrors.emailId
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-md focus:ring-red-500 focus:border-red-500 text-sm`}
                      />
                    </div>
                    {paymentErrors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {paymentErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4">
                  {/* Address Line 1 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress.addressLine1}
                      onChange={(e) =>
                        setDeliveryAddress((prev) => ({
                          ...prev,
                          addressLine1: e.target.value,
                        }))
                      }
                      placeholder="House/Flat number, Building name, Street"
                      className={`w-full px-4 py-2.5 border ${
                        formErrors.deliveryAddressLine1
                          ? "border-red-300"
                          : "border-gray-300"
                      } rounded-md focus:ring-red-500 focus:border-red-500 text-sm`}
                    />
                    {formErrors.deliveryAddressLine1 && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.deliveryAddressLine1}
                      </p>
                    )}
                  </div>

                  {/* Address Line 2 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress.addressLine2}
                      onChange={(e) =>
                        setDeliveryAddress((prev) => ({
                          ...prev,
                          addressLine2: e.target.value,
                        }))
                      }
                      placeholder="Area, Colony, Sector (Optional)"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress.city}
                      onChange={(e) =>
                        setDeliveryAddress((prev) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                      placeholder="Enter city"
                      className={`w-full px-4 py-2.5 border ${
                        formErrors.deliveryCity
                          ? "border-red-300"
                          : "border-gray-300"
                      } rounded-md focus:ring-red-500 focus:border-red-500 text-sm`}
                    />
                    {formErrors.deliveryCity && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.deliveryCity}
                      </p>
                    )}
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress.state}
                      onChange={(e) =>
                        setDeliveryAddress((prev) => ({
                          ...prev,
                          state: e.target.value,
                        }))
                      }
                      placeholder="Enter state"
                      className={`w-full px-4 py-2.5 border ${
                        formErrors.deliveryState
                          ? "border-red-300"
                          : "border-gray-300"
                      } rounded-md focus:ring-red-500 focus:border-red-500 text-sm`}
                    />
                    {formErrors.deliveryState && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.deliveryState}
                      </p>
                    )}
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress.pincode}
                      onChange={(e) =>
                        setDeliveryAddress((prev) => ({
                          ...prev,
                          pincode: e.target.value,
                        }))
                      }
                      placeholder="Enter 6-digit pincode"
                      maxLength="6"
                      className={`w-full px-4 py-2.5 border ${
                        formErrors.deliveryPincode
                          ? "border-red-300"
                          : "border-gray-300"
                      } rounded-md focus:ring-red-500 focus:border-red-500 text-sm`}
                    />
                    {formErrors.deliveryPincode && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.deliveryPincode}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  {/* Landmark */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Landmark
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress.landmark}
                      onChange={(e) =>
                        setDeliveryAddress((prev) => ({
                          ...prev,
                          landmark: e.target.value,
                        }))
                      }
                      placeholder="Nearby landmark (Optional)"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-sm"
                    />
                  </div>
                </div>
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
                      ₹{calculateStampAmount()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-700">
                      Service Charge (Inc. GST):
                    </span>
                    <span className="font-medium text-gray-900">
                      ₹{getServiceCharge()}
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
