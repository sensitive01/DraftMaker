import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getStampAndDeliveryCharges,
  createAddressAffadavitPaymentData,
  createDualNameChangePaymentData,
  createNameChangePaymentData,
  createDobParentNameCorrectionPaymentData,
  birthCerticateNameCorrectionPaymentData,
  createCommercialPaymentData,
  createDobCorrectionPaymentData,
  createDocumentLostPaymentData,
  createGapPeriodPaymentData,
  gstPaymentData,
  createHufPaymentData,
  updateKhataCorrectionPaymentData,
  createMetriculationLostPaymentData,
  createPasswordAnnaxurePaymentData,
  createPassportnameChangePaymentData,
  createRecidentailPaymentData,
  createGassAffadavitPaymentData,
  createVehicleInsurencePaymentData,
} from "../../api/service/axiosService";
import DocumentDelivaryAddress from "./DocumentDelivaryAddress";
import SuccessNotification from "./serviceNotification/SuccessNotification";
import ErrorNoification from "./serviceNotification/ErrorNoification";

const DocumentPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("Location", location);
  const {
    bookingId,
    documentDetails,
    mobileNumber,
    userName,
    formData,
    formId,
  } = location.state || {};
  console.log(formId);

  const [selectedService, setSelectedService] = useState(null);
  const [stampDutyOptions, setStampDutyOptions] = useState([]);
  const [deliveryChargeOptions, setDeliveryChargeOptions] = useState([]);
  const [selectedStampDuty, setSelectedStampDuty] = useState(null);
  const [selectedDeliveryCharge, setSelectedDeliveryCharge] = useState(null);
  const [emailAddress, setEmailAddress] = useState(""); // New state for email
  const [includeNotary, setIncludeNotary] = useState(false); // NEW: Notary checkbox state
  const [deliveryAddress, setDeliveryAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [showNameChangePopup, setShowNameChangePopup] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [successNotification, setSuccessNotification] = useState();

  // New state variables for e-stamp logic
  const [considerationAmount, setConsiderationAmount] = useState("");
  const [quantity, setQuantity] = useState(1);
  const SERVICE_CHARGE_PER_DOCUMENT = documentDetails?.serviceCharge || 210;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStampAndDeliveryCharges();
        setStampDutyOptions(response.data.stampDuty || []);
        setDeliveryChargeOptions(response.data.deliveryCharges || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Auto-select stamp duty based on formId - Updated to trigger when service is selected
  useEffect(() => {
    if (
      stampDutyOptions.length > 0 &&
      formId &&
      selectedService?.requiresStamp
    ) {
      let stampDutyId;

      if (formId === "DM-CFD-17") {
        stampDutyId = "684145ffb333b68bfef00580";
      } else if (formId === "DM-RFD-18") {
        stampDutyId = "6841457bb333b68bfef0057c";
      } else {
        stampDutyId = "68414437b333b68bfef00576";
      }

      const selectedStamp = stampDutyOptions.find(
        (sd) => sd._id === stampDutyId
      );
      setSelectedStampDuty(selectedStamp || null);
    }
  }, [stampDutyOptions, formId, selectedService]); // Added selectedService dependency
  const handleContactUs = () => {
    navigate("/home/contact-us");
  };

  const getConsiderationLabelText = (formId) => {
    if (!formId) {
      return {
        main: "Consideration Amount (₹)",
        description: null,
      };
    }

    if (formId === "DM-RFD-18") {
      return {
        main: "Consideration Amount (₹)",
        description:
          "(0.5% on average annual rent fine premium subject to maximum of Rs.500)",
      };
    } else if (formId === "DM-CFD-17") {
      return {
        main: "Consideration Amount (₹)",
        description: "(0.5% on AAR, Fine, Premium, Advance)",
      };
    }

    return {
      main: "Consideration Amount (₹)",
      description: null,
    };
  };

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
      requiresEmail: true, // Requires email
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
      requiresEmail: true, // Requires email
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
      requiresEmail: false, // Email not required for delivery option
    },
  ];

  const handlePackageSelect = (service) => {
    console.log("Selected Service:", service);
    setSelectedService(service);

    // Reset stamp duty when not required
    if (!service.requiresStamp) {
      setSelectedStampDuty(null);
    }

    // Reset delivery charge when not required
    if (!service.requiresDelivery) {
      setSelectedDeliveryCharge(null);
    }

    // Reset email when not required
    if (!service.requiresEmail) {
      setEmailAddress("");
    }

    // MODIFIED: Reset notary checkbox when service changes
    setIncludeNotary(false);
  };

  const handleAddressChange = (field, value) => {
    setDeliveryAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const calculateStampDutyAmount = (stampDuty, baseAmount = 1000) => {
    if (!stampDuty) return 0;

    if (stampDuty.calculationType === "fixed") {
      return stampDuty.fixedAmount * quantity;
    } else if (stampDuty.calculationType === "percentage") {
      // Use consideration amount if provided, otherwise fallback to baseAmount
      const amount = considerationAmount
        ? parseFloat(considerationAmount)
        : baseAmount;
      let calculatedAmount = (amount * stampDuty.percentage) / 100;

      if (stampDuty.minAmount > 0) {
        calculatedAmount = Math.max(calculatedAmount, stampDuty.minAmount);
      }
      if (stampDuty.maxAmount > 0) {
        calculatedAmount = Math.min(calculatedAmount, stampDuty.maxAmount);
      }

      return calculatedAmount * quantity;
    }
    return 0;
  };

  const calculateTotalAmount = () => {
    if (!selectedService) return 0;

    const qty = parseInt(quantity) || 1;
    let total = 0;

    // 1. Draft price × qty
    total += (selectedService.price || 0) * qty;

    // 2. Notary charge × qty (only if opted)
    if (selectedService.hasNotary && includeNotary) {
      total += (selectedService.notaryCharge || 0) * qty;
    }

    // 3. Stamp duty × qty (if required)
    if (selectedService.requiresStamp && selectedStampDuty) {
      total += calculateStampDutyAmount(selectedStampDuty) * qty;
      // ❗ if calculateStampDutyAmount already includes qty, remove "* qty"
    }

    // 4. Delivery charge (added once, not multiplied)
    if (selectedService.requiresDelivery && selectedDeliveryCharge) {
      total += selectedDeliveryCharge.charge || 0;
    }

    return total;
  };

  const canProceedToPayment = () => {
    if (!selectedService) return false;

    // Check email requirement
    if (
      selectedService.requiresEmail &&
      (!emailAddress || !isValidEmail(emailAddress))
    ) {
      return false;
    }

    if (selectedService.requiresStamp && !selectedStampDuty) return false;
    if (selectedService.requiresDelivery && !selectedDeliveryCharge)
      return false;

    // Check if delivery address is complete when delivery is required
    if (selectedService.requiresDelivery && selectedDeliveryCharge) {
      const requiredFields = ["addressLine1", "city", "state", "pincode"];
      for (let field of requiredFields) {
        if (!deliveryAddress[field] || deliveryAddress[field].trim() === "") {
          return false;
        }
      }
    }

    // Validate consideration amount for percentage-based stamps
    if (
      selectedStampDuty?.calculationType === "percentage" &&
      (!considerationAmount || isNaN(parseFloat(considerationAmount)))
    ) {
      return false;
    }

    return true;
  };

  // Razorpay Integration Functions
  const initializeRazorpay = async (service, totalPrice) => {
    try {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: totalPrice * 100,
        currency: "INR",
        name: "Draft Maker",
        description: `${documentDetails.documentType} - ${service.name}`,
        handler: function (response) {
          console.log("razorpay response", response);
          handlePaymentSuccess({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            bookingId: bookingId,
            mobileNumber: mobileNumber,
            documentType: documentDetails.documentType,
            fullName: formData?.fullName || userName,
            serviceType: service.id,
            serviceName: service.name,
            amount: totalPrice,
            includesNotary: service.hasNotary && includeNotary, // MODIFIED: Check both conditions
            userName: userName,
            emailAddress: emailAddress, // Include email in payment data
            // Additional selected service details
            selectedStampDuty: selectedStampDuty,
            selectedDeliveryCharge: selectedDeliveryCharge,
            serviceDetails: {
              basePrice: service.price,
              notaryCharge:
                service.hasNotary && includeNotary ? service.notaryCharge : 0, // MODIFIED
              stampDutyAmount: selectedStampDuty
                ? calculateStampDutyAmount(selectedStampDuty)
                : 0,
              deliveryCharge: selectedDeliveryCharge
                ? selectedDeliveryCharge.charge
                : 0,
              requiresStamp: service.requiresStamp,
              requiresDelivery: service.requiresDelivery,
              deliveryAddress: selectedService?.requiresDelivery
                ? JSON.stringify(deliveryAddress)
                : null,
              considerationAmount: considerationAmount,
              quantity: quantity,
              serviceCharge: SERVICE_CHARGE_PER_DOCUMENT * quantity,
            },
          });
        },
        prefill: {
          name: userName,
          contact: mobileNumber,
          email: emailAddress, // Prefill email if provided
        },
        notes: {
          bookingId: bookingId,
          serviceType: service.id,
          serviceName: service.name,
          stampDutyId: selectedStampDuty?._id || null,
          deliveryChargeId: selectedDeliveryCharge?._id || null,
          documentType: documentDetails.documentType,
          emailAddress: emailAddress,
          includesNotary: includeNotary, // NEW: Include notary state
        },
        theme: {
          color: "#dc2626",
        },
        modal: {
          ondismiss: function () {
            console.log("Checkout form closed");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on("payment.failed", function (response) {
        fetch("/api/payment-failed", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            error: response.error,
            bookingId: bookingId,
            mobileNumber: mobileNumber,
            serviceType: service.id,
            serviceName: service.name,
            userName: userName,
            emailAddress: emailAddress,
            status: "failed",
            selectedStampDuty: selectedStampDuty,
            selectedDeliveryCharge: selectedDeliveryCharge,
            includesNotary: includeNotary, // NEW
          }),
        }).catch((error) => {
          console.error("Error logging payment failure:", error);
        });

        console.error("Payment failed:", response.error);
        alert(`Payment failed: ${response.error.description}`);
      });
    } catch (error) {
      console.error("Error in Razorpay initialization:", error);
      alert("Payment initialization failed. Please try again.");
    }
  };

  const handlePaymentSuccess = async (paymentData) => {
    try {
      const paymentConfirmationData = {
        paymentId: paymentData.razorpay_payment_id,
        orderId: paymentData.razorpay_order_id,
        signature: paymentData.razorpay_signature,
        bookingId: paymentData.bookingId,
        mobileNumber: paymentData.mobileNumber,
        documentType: documentDetails.documentType,
        fullName: formData?.fullName || userName,
        serviceType: paymentData.serviceType,
        serviceName: paymentData.serviceName,
        amount: paymentData.amount,
        includesNotary: paymentData.includesNotary,
        status: "success",
        userName: userName,
        emailAddress: paymentData.emailAddress, // Include email
        // Additional service details
        selectedStampDuty: paymentData.selectedStampDuty,
        selectedDeliveryCharge: paymentData.selectedDeliveryCharge,
        serviceDetails: paymentData.serviceDetails,
        deliveryAddress: selectedService?.requiresDelivery
          ? deliveryAddress
          : null,
        considerationAmount: considerationAmount,
        quantity: quantity,
      };
      let confirmationResponse;

      if (formId === "DM-DNC-1") {
        confirmationResponse = await createDualNameChangePaymentData(
          paymentConfirmationData
        );
      }
      if (formId == "DM-NC-2") {
        confirmationResponse = await createNameChangePaymentData(
          paymentConfirmationData
        );
      }
      if (formId === "DM-DOBC-3") {
        confirmationResponse = await createDobCorrectionPaymentData(
          paymentConfirmationData
        );
      }
      if (formId === "DM-GAS-5") {
        confirmationResponse = await createGassAffadavitPaymentData(
          paymentConfirmationData
        );
      }
      if (formId === "DM-DOC-LOST-5") {
        confirmationResponse = await createDocumentLostPaymentData(
          paymentConfirmationData
        );
      }
      if (formId === "DM-BCNCP-6") {
        confirmationResponse = await createDobParentNameCorrectionPaymentData(
          paymentConfirmationData
        );
      }
      if (formId === "DM-BC-MNC-7") {
        confirmationResponse = await birthCerticateNameCorrectionPaymentData(
          paymentConfirmationData
        );
      }
      if (formId === "DM-GST-8") {
        confirmationResponse = await gstPaymentData(paymentConfirmationData);
      }
      if (formId === "DM-MAL-9") {
        confirmationResponse = await createMetriculationLostPaymentData(
          paymentConfirmationData
        );
      }
      if (formId === "DM-KH-10") {
        confirmationResponse = await updateKhataCorrectionPaymentData(
          paymentConfirmationData
        );
      }
      if (formId === "DM-VIC-11") {
        confirmationResponse = await createVehicleInsurencePaymentData(
          paymentConfirmationData
        );
      }
      if (formId === "DM-HUF-12") {
        confirmationResponse = await createHufPaymentData(
          paymentConfirmationData
        );
      }
      if (formId === "DM-GP-13") {
        confirmationResponse = await createGapPeriodPaymentData(
          paymentConfirmationData
        );
      }
      if (formId === "DM-PAF-14") {
        confirmationResponse = await createPasswordAnnaxurePaymentData(
          paymentConfirmationData
        );
      }
      if (formId === "DM-PNC-15") {
        confirmationResponse = await createPassportnameChangePaymentData(
          paymentConfirmationData
        );
      }
      if (formId === "DM-AAF-16") {
        confirmationResponse = await createAddressAffadavitPaymentData(
          paymentConfirmationData
        );
      }
      if (formId === "DM-CFD-17") {
        confirmationResponse = await createCommercialPaymentData(
          paymentConfirmationData
        );
      }
      if (formId === "DM-RFD-18") {
        confirmationResponse = await createRecidentailPaymentData(
          paymentConfirmationData
        );
      }

      if (confirmationResponse.status === 200) {
        const { bookingId, formId } = confirmationResponse.data.data;
        setShowSuccessNotification(true);
        setSuccessNotification(confirmationResponse.data.message);

        if (formId === "DM-PNC-15") {
          setShowNameChangePopup(true);
        } else {
          setTimeout(() => {
            // window.location.href = `/documents/name/name-correction`;
            window.location.href = `/documents/preview-page/${formId}/${bookingId}`;
          }, 1500);
        }
      } else {
        const errorData = confirmationResponse.data.data;
        throw new Error(errorData.message || "Failed to confirm payment");
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      setErrorMessage(true);
      setShowErrorNotification(
        error.response.data.message || "Failed to confirm payment"
      );
    }
  };

  const handlePayment = async () => {
    if (!canProceedToPayment()) {
      let errorMessage =
        "Please complete all required selections before proceeding to payment.";

      if (
        selectedService?.requiresEmail &&
        (!emailAddress || !isValidEmail(emailAddress))
      ) {
        errorMessage = "Please enter a valid email address to continue.";
      }

      alert(errorMessage);
      return;
    }

    try {
      const totalPrice = calculateTotalAmount();

      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = () => {
          initializeRazorpay(selectedService, totalPrice);
        };

        script.onerror = () => {
          console.error("Razorpay SDK failed to load");
          alert("Payment gateway failed to load. Please try again later.");
        };

        document.body.appendChild(script);
      } else {
        initializeRazorpay(selectedService, totalPrice);
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
      alert("Payment initialization failed. Please try again.");
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const NameChangeAffidavitPopup = () => {
    if (!showNameChangePopup) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="bg-red-600 text-white p-4 rounded-t-lg">
            <h2 className="text-lg font-bold">News Paper Advertisment</h2>
          </div>

          <div className="p-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 18.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-1">
                    Important Notice
                  </h3>
                  <p className="text-yellow-700 text-sm">
                    For Name Change Affidavit News Paper Advertisement is also
                    done here .
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-3">
              <button
                onClick={() => {
                  setShowNameChangePopup(false);
                  // Navigate to the same page that goes after payment success
                  window.location.href = `/documents/preview-page/${formId}/${bookingId}`;
                }}
                className="flex-1 px-4 py-2 text-gray-700 border-2 border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleContactUs}
                className="flex-1 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <NameChangeAffidavitPopup />
      {showErrorNotification && (
        <ErrorNoification
          validationError={errorMessage}
          setShowErrorNotification={setShowErrorNotification}
        />
      )}
      {showSuccessNotification && (
        <SuccessNotification
          successMessage={successNotification}
          setSuccess={setShowSuccessNotification}
        />
      )}
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Page Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={goBack}
                className="mr-3 p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Go back"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Select Service Package
              </h1>
            </div>
          </div>
          <p className="text-gray-600 mt-1 ml-8">
            Choose the right service package for your document needs
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-lg border-t-4 border-red-600 overflow-hidden">
          {/* Booking Info */}
          <div className="bg-red-50 p-4 border-b border-red-100">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center">
                <p className="font-medium text-red-800 text-xs uppercase tracking-wider mr-2">
                  Booking Details
                </p>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                  #{bookingId}
                </span>
              </div>
              <div className="flex space-x-4 text-xs">
                <div className="flex items-center">
                  <span className="text-gray-600 mr-1">Document:</span>
                  <span className="font-semibold text-gray-800 bg-white px-2 py-1 rounded">
                    {documentDetails?.documentType}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-1">Mobile:</span>
                  <span className="font-semibold text-gray-800 bg-white px-2 py-1 rounded">
                    +91{mobileNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <p className="text-gray-600 text-sm mb-4">
              Choose from our service packages below:
            </p>

            {/* Service Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {getServiceOptions().map((service) => (
                <button
                  key={service.id}
                  onClick={() => handlePackageSelect(service)}
                  className={`bg-white border-2 ${
                    selectedService?.id === service.id
                      ? "border-red-500 ring-2 ring-red-100 shadow-md"
                      : "border-gray-200 hover:border-red-300 hover:shadow-sm"
                  } rounded-lg p-4 flex flex-col text-left transition-all duration-200 group relative`}
                >
                  {selectedService?.id === service.id && (
                    <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1 shadow-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
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

                  <div className="flex items-center mb-3">
                    <div className="mr-3 p-2 bg-red-50 rounded-lg text-red-500 group-hover:bg-red-100 transition-colors">
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
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-base text-gray-800 mb-1">
                        {service.name}
                      </h3>
                      {service.requiresEmail && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                          Email Required
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3 text-xs leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-auto">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 text-sm">
                          Draft charge:
                        </span>
                        <span className="font-bold text-red-600 text-base">
                          ₹{service.price}
                        </span>
                      </div>
                      {service.hasNotary && service.notaryCharge > 0 && (
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-600">
                            + Notary (Optional):
                          </span>
                          <span className="font-medium text-gray-800">
                            ₹{service.notaryCharge}
                          </span>
                        </div>
                      )}
                      {service.requiresStamp && (
                        <div className="flex justify-between items-center text-xs">
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
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-600">+ Delivery:</span>
                          <span className="font-medium text-gray-800">
                            {selectedDeliveryCharge
                              ? `₹${selectedDeliveryCharge.charge}`
                              : "Select below"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* NEW: Notary Checkbox Section */}
            {selectedService?.hasNotary && selectedService.notaryCharge > 0 && (
              <div className="mb-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Notary Service (Optional)
                </h3>
                <div className="flex items-start space-x-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="includeNotary"
                      checked={includeNotary}
                      onChange={(e) => setIncludeNotary(e.target.checked)}
                      className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                    />
                    <label
                      htmlFor="includeNotary"
                      className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Include Notary Service
                    </label>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white p-3 rounded-lg border border-amber-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-800 text-sm">
                            Notary Attestation Service
                          </p>
                          <p className="text-xs text-gray-600 mt-0.5">
                            Professional notary attestation for your document
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-amber-600 text-base">
                            ₹{selectedService.notaryCharge}
                          </p>
                          {includeNotary && (
                            <p className="text-xs text-green-600 font-medium">
                              ✓ Included in total
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Email Address Input - Show for Draft and Draft+eStamp */}
            {selectedService?.requiresEmail && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Email Address
                  <span className="text-red-500 ml-1">*</span>
                </h3>
                <div className="max-w-md">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Enter your email address to receive the document
                  </label>
                  <input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className={`w-full px-3 py-2 border-2 ${
                      emailAddress && !isValidEmail(emailAddress)
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                    } rounded-md focus:ring-2 transition-all text-sm`}
                    placeholder="your.email@example.com"
                  />
                  {emailAddress && !isValidEmail(emailAddress) && (
                    <p className="text-red-600 text-xs mt-1">
                      Please enter a valid email address
                    </p>
                  )}
                  {emailAddress && isValidEmail(emailAddress) && (
                    <p className="text-green-600 text-xs mt-1 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-1"
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
                      Valid email address
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Document Details Section */}
            {selectedService?.requiresStamp && selectedStampDuty && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
                <h3 className="text-base font-semibold text-gray-800 mb-3">
                  Document Details
                </h3>

                <div className="space-y-3">
                  {/* Quantity Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value) || 1}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all text-sm"
                    />
                  </div>

                  {/* Consideration Amount (only show for percentage-based stamps) */}
                  {selectedStampDuty.calculationType === "percentage" && (
                    <div>
                      {(() => {
                        const labelInfo = getConsiderationLabelText(formId);
                        return (
                          <div className="mb-1">
                            <label className="block text-xs font-medium text-gray-700">
                              {labelInfo.main}
                            </label>
                            {labelInfo.description && (
                              <p className="text-xs text-gray-600 mt-1">
                                {labelInfo.description}
                              </p>
                            )}
                          </div>
                        );
                      })()}
                      <input
                        type="number"
                        min="0"
                        value={considerationAmount}
                        onChange={(e) => setConsiderationAmount(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all text-sm"
                        placeholder="Enter amount"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Delivery Charge Selection - Dropdown */}
            {selectedService?.requiresDelivery && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
                <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 text-red-600"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Choose Delivery Option
                    </label>
                    <select
                      value={selectedDeliveryCharge?._id || ""}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        const deliveryCharge = deliveryChargeOptions.find(
                          (dc) => dc._id === selectedId
                        );
                        setSelectedDeliveryCharge(deliveryCharge || null);
                      }}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all text-sm"
                    >
                      <option value="">-- Select Delivery Service --</option>
                      {deliveryChargeOptions.map((deliveryCharge) => (
                        <option
                          key={deliveryCharge._id}
                          value={deliveryCharge._id}
                        >
                          {deliveryCharge.serviceName} - ₹
                          {deliveryCharge.charge}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedDeliveryCharge && (
                    <div className="bg-white p-3 rounded-md border border-red-200">
                      <h4 className="font-medium text-gray-800 mb-2 text-sm">
                        Selected Delivery Service
                      </h4>
                      <div className="space-y-1 text-xs">
                        <p>
                          <span className="text-gray-600">Service:</span>{" "}
                          {selectedDeliveryCharge.serviceName}
                        </p>
                        <p>
                          <span className="text-gray-600">Description:</span>{" "}
                          {selectedDeliveryCharge.description}
                        </p>
                        <p className="font-bold text-red-600 text-sm">
                          Charge: ₹{selectedDeliveryCharge.charge}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedService?.requiresDelivery && selectedDeliveryCharge && (
              <DocumentDelivaryAddress
                deliveryAddress={deliveryAddress}
                handleAddressChange={handleAddressChange}
              />
            )}
            {selectedStampDuty && (
              <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200 mt-4 mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
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
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  Payment Summary
                </h3>

                <div className="space-y-3">
                  {/* Service Charge */}
                  <div className="flex justify-between items-center p-2 ">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700">
                        Service Charge ({quantity || 1}x)
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      ₹{selectedService.price} × {quantity || 1} = ₹
                      {selectedService.price * (parseInt(quantity) || 1)}
                    </span>
                  </div>

                  {/* Notary charge if selected */}
                  {selectedService.hasNotary && includeNotary && (
                    <div className="flex justify-between items-center p-2 ">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-700">
                          Notary Service ({quantity || 1}x)
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-800">
                        ₹{selectedService.notaryCharge} × {quantity || 1} = ₹
                        {selectedService.notaryCharge *
                          (parseInt(quantity) || 1)}
                      </span>
                    </div>
                  )}

                  {/* Stamp duty if applicable */}
                  {selectedService.requiresStamp && selectedStampDuty && (
                    <div className="flex justify-between items-center p-2  ">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-700">
                          Stamp Duty ({quantity || 1}x)
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-800">
                        ₹{calculateStampDutyAmount(selectedStampDuty)}
                      </span>
                    </div>
                  )}

                  {/* Delivery charge if selected */}
                  {selectedService.requiresDelivery &&
                    selectedDeliveryCharge && (
                      <div className="flex justify-between items-center p-2 ">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-700">
                            {selectedDeliveryCharge.serviceName}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-gray-800">
                          ₹{selectedDeliveryCharge.charge}
                        </span>
                      </div>
                    )}

                  {/* Total Section */}
                  <div className="mt-4 pt-3 border-t-2 border-red-300">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg  shadow-sm">
                      <div className="flex items-center">
                        <span className="text-base font-bold text-gray-800">
                          Total Amount
                        </span>
                      </div>
                      <span className="text-xl font-bold text-red-600">
                        ₹{calculateTotalAmount()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white mt-4 mb-4 rounded-lg overflow-hidden border border-gray-200">
              <div className="bg-red-600 text-white text-center py-3 font-bold text-lg">
                Important Note
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-800 text-sm">
                    Note: Printed documents will be discarded after 30 days. We
                    suggest adding "doorstep delivery" to retain a physical
                    copy.
                  </span>
                </div>

                <div className="flex items-start">
                  <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <span className="text-gray-800 font-medium text-sm">
                      Cut-off time: 3:30 PM (everyday)
                    </span>
                    <div className="ml-6 mt-1">
                      <div className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">
                          Payment received for orders after the cut-off time
                          will be processed on the next business day.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-800 text-sm">
                    Sunday and other state/central government
                    holidays/strikes/bandhs/riots are non-business days.
                  </span>
                </div>

                <div className="flex items-start">
                  <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-800 text-sm">
                    *Delivery of stamp paper is done by third party (courier
                    company), on best effort basis ONLY and can be delayed
                    (though very rarely) due to situations beyond our control.
                  </span>
                </div>

                <div className="flex items-start">
                  <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-800 text-sm">
                    Shipment can be returned back to shipper if address is
                    incorrect/incomplete, consignee not available at the
                    shipping address/door locked/no one to receive the
                    shipment/building security not ready to receive the
                    shipment.
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <button
                onClick={goBack}
                className="px-4 py-2 text-gray-700 border-2 border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center font-medium text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
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
                  className="px-6 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors flex items-center font-medium text-base shadow-md hover:shadow-lg"
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
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Pay ₹{calculateTotalAmount()}
                </button>
              ) : (
                <div className="text-gray-500 text-xs bg-gray-100 px-4 py-2 rounded-md">
                  {!selectedService
                    ? "Please select a service package to continue"
                    : selectedService.requiresEmail &&
                      (!emailAddress || !isValidEmail(emailAddress))
                    ? "Please enter a valid email address"
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
