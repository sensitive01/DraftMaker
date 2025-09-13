import React, { useEffect, useState } from "react";
import {
  getStampAndDeliveryCharges,
  sendTheEstampData,
} from "../../api/service/axiosService";
import { useNavigate } from "react-router-dom";
import AddressLineSection from "./AddressLineSection";
import PaymentModal from "./PaymentModal";

const BuyEStampDocuments = () => {
  const navigate = useNavigate();
  const [stampDutyData, setStampDutyData] = useState([]);
  const [deliveryCharges, setDeliveryCharges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serviceChrge, setServiceCharge] = useState(0);

  const [firstPartyName, setFirstPartyName] = useState("");
  const [secondPartyName, setSecondPartyName] = useState("");
  const [stampDutyPayer, setStampDutyPayer] = useState("");
  const [selectedDocument, setSelectedDocument] = useState("");
  const [considerationAmount, setConsiderationAmount] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryType, setDeliveryType] = useState("in-store");
  const [selectedDeliveryService, setSelectedDeliveryService] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [deliveryAddress, setDeliveryAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    email: "",
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [requestorName, setRequestorName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const [paymentErrors, setPaymentErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getStampAndDeliveryCharges();
        console.log("--->", response.data.stampDuty);
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

  const calculateProgress = () => {
    const selectedDocumentData = getSelectedDocumentData();
    const isFixedType = selectedDocumentData?.calculationType === "fixed";
    const isSpecialDocument = selectedDocument === "684143fdb333b68bfef00574";

    let completedSteps = 0;
    let totalSteps = isFixedType && !isSpecialDocument ? 5 : 6;

    if (deliveryType === "delivery") {
      totalSteps += 6;
    }

    if (firstPartyName.trim()) completedSteps++;
    if (secondPartyName.trim()) completedSteps++;
    if (stampDutyPayer) completedSteps++;
    if (selectedDocument) completedSteps++;
    if (description.trim()) completedSteps++;

    if ((!isFixedType || isSpecialDocument) && considerationAmount.trim())
      completedSteps++;

    if (quantity > 0) completedSteps++;

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
    const isSpecialDocument = selectedDocument === "684143fdb333b68bfef00574";

    if (!firstPartyName.trim()) {
      errors.firstPartyName = "First party name is required";
    }

    if (!secondPartyName.trim()) {
      errors.secondPartyName = "Second party name is required";
    }

    if (!stampDutyPayer) {
      errors.stampDutyPayer = "Please select who pays the stamp duty";
    }

    if (!selectedDocument) {
      errors.selectedDocument = "Please select a document type";
    }

    if (quantity <= 0) {
      errors.quantity = "Quantity must be at least 1";
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

    if (!isFixedType || isSpecialDocument) {
      if (!considerationAmount.trim()) {
        errors.considerationAmount = "Consideration amount is required";
      } else if (
        isNaN(considerationAmount) ||
        parseFloat(considerationAmount) <= 0
      ) {
        errors.considerationAmount = "Please enter a valid amount";
      }
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

  const getConsiderationDescription = () => {
    const stampDescriptions = { 
      "684145ffb333b68bfef00580": "(0.5% on AAR, Fine, Premium, Advance)",
      "6841457bb333b68bfef0057c":
        "(0.5% on average annual rent fine premium subject to maximum of Rs.500)",
      "6841452ab333b68bfef0057a":
        "(Rs.2 for every Rs.100 or part thereof subject to minimum of Rs.100)",
      "6841463db333b68bfef00582":
        "(2% on the consideration price subject to maximum of Rs.500)",
    };

    return (
      stampDescriptions[selectedDocument] 
      
    );
  };

  const calculateStampAmount = () => {
    const selectedDocumentData = getSelectedDocumentData();
    if (!selectedDocumentData) return 0;

    if (selectedDocumentData.calculationType === "fixed") {
      return selectedDocumentData.fixedAmount * quantity;
    }

    if (
      selectedDocumentData.calculationType === "percentage" ||
      selectedDocument === "684143fdb333b68bfef00574"
    ) {
      if (!considerationAmount || isNaN(considerationAmount)) return 0;

      const amount = parseFloat(considerationAmount);
      const percentage = selectedDocumentData.percentage;
      const minAmount = selectedDocumentData.minAmount;
      const maxAmount = selectedDocumentData.maxAmount;

      let stampDuty = 0;

      if (minAmount === 0 && maxAmount === 0) {
        if (amount <= 100000) {
          stampDuty = (amount * selectedDocumentData.percentage) / 100;
        } else {
          stampDuty = (amount * selectedDocumentData.percentage) / 100;
        }
        stampDuty = Math.max(stampDuty, 100);
      } else {
        if (amount <= 100000) {
          stampDuty = (amount * percentage) / 100;
          if (minAmount > 0) {
            stampDuty = Math.max(stampDuty, minAmount);
          }
        } else {
          if (maxAmount > 0) {
            stampDuty = maxAmount;
          } else {
            stampDuty = (amount * percentage) / 100;
            if (minAmount > 0) {
              stampDuty = Math.max(stampDuty, minAmount);
            }
          }
        }
      }

      return Math.round(stampDuty) * quantity;
    }

    return 0;
  };

  const calculateServiceCharge = () => {
    const selectedDocumentData = getSelectedDocumentData();
    if (!selectedDocumentData) return 0;

    return selectedDocumentData.serviceCharge * quantity;
  };

  const getTotalAmount = () => {
    const deliveryData = getSelectedDeliveryData();
    const stampAmount = calculateStampAmount();
    const serviceCharge = calculateServiceCharge();
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
    setQuantity(1);
    setFormErrors({});
    setPaymentErrors({});
    setDeliveryAddress({
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
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
        firstPartyName: firstPartyName.trim(),
        secondPartyName: secondPartyName.trim(),
        stampDutyPayer: stampDutyPayer,

        selectedDocumentId: selectedDocument,
        documentType: selectedDocumentData?.documentType,
        calculationType: selectedDocumentData?.calculationType,
        considerationAmount:
          selectedDocumentData?.calculationType === "percentage" ||
          selectedDocument === "684143fdb333b68bfef00574"
            ? parseFloat(considerationAmount)
            : null,
        description: description.trim(),
        quantity: quantity,

        stampDutyAmount: calculateStampAmount(),
        serviceCharge: calculateServiceCharge(),

        deliveryType: deliveryType,
        selectedDeliveryServiceId: selectedDeliveryService || null,
        deliveryServiceName: selectedDeliveryData?.serviceName || null,
        deliveryCharge:
          deliveryType === "delivery" && selectedDeliveryData
            ? selectedDeliveryData.charge
            : 0,
        deliveryDescription: selectedDeliveryData?.description || null,

        requestorName: requestorName.trim(),
        mobileNumber: mobileNumber.trim(),
        totalAmount: getTotalAmount(),

        orderDate: new Date().toISOString(),

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
              navigate("/documents/home");
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

  const getCalculationExplanation = () => {
    const selectedDocumentData = getSelectedDocumentData();
    if (!selectedDocumentData) return null;

    if (selectedDocumentData.calculationType === "fixed") {
      return `₹${
        selectedDocumentData.fixedAmount
      } × ${quantity} = ₹${calculateStampAmount()}`;
    }

    if (
      (selectedDocumentData.calculationType === "percentage" ||
        selectedDocument === "684143fdb333b68bfef00574") &&
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
          ? `${percentage}% of ₹${amount.toLocaleString("en-IN")} = ₹${(
              (amount * percentage) /
              100
            ).toLocaleString(
              "en-IN"
            )} × ${quantity} = ₹${calculateStampAmount().toLocaleString(
              "en-IN"
            )} (Minimum: ₹100)`
          : `${percentage}% of ₹${amount.toLocaleString("en-IN")} = ₹${(
              (amount * percentage) /
              100
            ).toLocaleString(
              "en-IN"
            )} × ${quantity} = ₹${calculateStampAmount().toLocaleString(
              "en-IN"
            )}`;
      } else {
        if (amount <= 100000) {
          return `${percentage}% of ₹${amount.toLocaleString("en-IN")} = ₹${(
            (amount * percentage) /
            100
          ).toLocaleString(
            "en-IN"
          )} × ${quantity} = ₹${calculateStampAmount().toLocaleString(
            "en-IN"
          )}${minAmount > 0 ? ` (Minimum: ₹${minAmount})` : ""}`;
        } else {
          return maxAmount >= 0
            ? `Fixed amount of ₹${maxAmount} × ${quantity} = ₹${calculateStampAmount().toLocaleString(
                "en-IN"
              )} for amounts above ₹1,00,000`
            : `${percentage}% of ₹${amount.toLocaleString("en-IN")} = ₹${(
                (amount * percentage) /
                100
              ).toLocaleString(
                "en-IN"
              )} × ${quantity} = ₹${calculateStampAmount().toLocaleString(
                "en-IN"
              )}${minAmount > 0 ? ` (Minimum: ₹${minAmount})` : ""}`;
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
                    setConsiderationAmount("");
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
                      {doc.documentType}
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

            {selectedDocument &&
              (getSelectedDocumentData()?.calculationType === "percentage" ||
                selectedDocument === "684143fdb333b68bfef00574") && (
                <div className="mb-6">
                  <label
                    htmlFor="considerationAmount"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Consideration Amount (₹) * {getConsiderationDescription()}
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

            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Quantity *
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                min="1"
                className={`w-full px-4 py-2.5 border ${
                  formErrors.quantity ? "border-red-300" : "border-gray-300"
                } rounded-md focus:ring-red-500 focus:border-red-500 text-sm`}
              />
              {formErrors.quantity && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.quantity}
                </p>
              )}
            </div>

            {selectedDocument && getCalculationExplanation() && (
              <div className="mb-6 pt-3 bg-blue-50 border border-blue-200 rounded-md">
                <div className="flex items-start ml-2">
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
                      Stamp Duty Calculation: {getCalculationExplanation()}
                    </p>
                  </div>
                </div>
              </div>
            )}

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
              <AddressLineSection
                requestorName={requestorName}
                setRequestorName={setRequestorName}
                paymentErrors={paymentErrors}
                mobileNumber={mobileNumber}
                setMobileNumber={setMobileNumber}
                formErrors={formErrors}
                deliveryAddress={deliveryAddress}
                setDeliveryAddress={setDeliveryAddress}
              />
            )}

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
                      {selectedDocument && getSelectedDocumentData() ? (
                        <>
                          ₹{getSelectedDocumentData().serviceCharge} ×{" "}
                          {quantity} = ₹{calculateServiceCharge()}
                        </>
                      ) : (
                        "₹0"
                      )}
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

      {showPaymentModal && (
        <PaymentModal
          setShowPaymentModal={setShowPaymentModal}
          requestorName={requestorName}
          setRequestorName={setRequestorName}
          paymentErrors={paymentErrors}
          mobileNumber={mobileNumber}
          setMobileNumber={setMobileNumber}
          handlePayment={handlePayment}
          getTotalAmount={getTotalAmount}
        />
      )}
    </div>
  );
};

export default BuyEStampDocuments;
