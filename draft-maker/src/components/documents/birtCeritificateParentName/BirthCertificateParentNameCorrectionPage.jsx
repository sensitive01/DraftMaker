import React, { useState } from "react";
import BirthCertificateParentNameCorrectionForm from "./BirthCertificateParentNameCorrectionForm";
import BirtCertificateParentNameCorrectionPreview from "./BirtCertificateParentNameCorrectionPreview";
import MobileNumberInput from "../serviceNotification/MobileNumberInput";
import ServicePackageNotification from "../serviceNotification/ServicePackageNotification";
import PaymentConfirmation from "../serviceNotification/PaymentConfirmation";
import ErrorNoification from "../serviceNotification/ErrorNoification";
import {
  createDobParentNameCorrectionPaymentData,
  dobParentNameCorrectionData,
} from "../../../api/service/axiosService";
import { useNavigate } from "react-router-dom";

// Main Page Component containing both form and preview
export default function BirthCertificateParentNameCorrectionPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    formId: "DM-BCNCP-6",
    fatherTitle: "Mr.",
    fatherName: "",
    motherTitle: "Mrs.",
    motherName: "",
    address: "",
    fatherAadhaar: "",
    motherAadhaar: "",
    childRelation: "Daughter's",
    childName: "",
    certificateNumber: "",
    incorrectFatherName: "",
    incorrectMotherName: "",
    correctFatherName: "",
    correctMotherName: "",
    place: "",
    day: "1",
    month: "April",
    year: "2024",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [validationError, setValidationError] = useState(""); // Added for validation errors
  const [showErrorNotification, setShowErrorNotification] = useState(false); // Added to control error notification visibility
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [showServiceOptionsModal, setShowServiceOptionsModal] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [documentDetails, setDocumentDetails] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [userName, setUserName] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear error notifications when user makes changes
    if (showErrorNotification) {
      setShowErrorNotification(false);
      setValidationError("");
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation function - checks all required fields
  const validateForm = () => {
    // Father validation
    if (!formData.fatherName.trim()) {
      setValidationError("Please enter father's name");
      return false;
    }

    // Mother validation
    if (!formData.motherName.trim()) {
      setValidationError("Please enter mother's name");
      return false;
    }

    // Address validation
    if (!formData.address.trim()) {
      setValidationError("Please enter your address");
      return false;
    }

    // Aadhaar validation - can add pattern validation if needed
    if (!formData.fatherAadhaar.trim()) {
      setValidationError("Please enter father's Aadhaar number");
      return false;
    } else if (!/^\d{12}$/.test(formData.fatherAadhaar)) {
      setValidationError("Father's Aadhaar number must be 12 digits");
      return false;
    }

    if (!formData.motherAadhaar.trim()) {
      setValidationError("Please enter mother's Aadhaar number");
      return false;
    } else if (!/^\d{12}$/.test(formData.motherAadhaar)) {
      setValidationError("Mother's Aadhaar number must be 12 digits");
      return false;
    }

    // Child details validation
    if (!formData.childName.trim()) {
      setValidationError("Please enter child's name");
      return false;
    }

    // Certificate validation
    if (!formData.certificateNumber.trim()) {
      setValidationError("Please enter birth certificate number");
      return false;
    }

    // Name correction validation
    if (!formData.incorrectFatherName.trim()) {
      setValidationError("Please enter incorrect father's name as printed on certificate");
      return false;
    }

    if (!formData.incorrectMotherName.trim()) {
      setValidationError("Please enter incorrect mother's name as printed on certificate");
      return false;
    }

    if (!formData.correctFatherName.trim()) {
      setValidationError("Please enter correct father's name");
      return false;
    }

    if (!formData.correctMotherName.trim()) {
      setValidationError("Please enter correct mother's name");
      return false;
    }

    // Date and place validation
    if (!formData.place.trim()) {
      setValidationError("Please enter the place");
      return false;
    }

    if (!formData.day) {
      setValidationError("Please select a day");
      return false;
    }

    return true;
  };

  const handleSubmitButtonClick = (e) => {
    e.preventDefault();
    
    // First validate the form
    if (validateForm()) {
      setShowMobileModal(true);
    } else {
      // Show error notification
      setShowErrorNotification(true);
      // Auto-hide notification after 5 seconds
      setTimeout(() => {
        setShowErrorNotification(false);
      }, 5000);
    }
  };

  const handleMobileSubmit = async () => {
    if (!mobileNumber.trim()) {
      setMobileError("Mobile number is required");
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobileNumber)) {
      setMobileError("Please enter a valid 10-digit mobile number");
      return;
    }

    setMobileError("");
    setShowMobileModal(false);
    setIsSubmitting(true);
    setSubmissionError("");

    try {
      const dataWithMobile = {
        ...formData,
        mobileNumber,
        userName
      };

      const response = await dobParentNameCorrectionData(dataWithMobile);
      console.log("responsein", response);

      const responseData = response.data;
      setBookingId(responseData.bookingId || "");
      setDocumentDetails(responseData.documentDetails || null);
          navigate("/documents/payment-page",{state:{bookingId:responseData.bookingId,documentDetails:responseData.documentDetails,mobileNumber,userName,formId: "DM-BCNCP-6"}})

      // setShowServiceOptionsModal(true);
      // setIsSubmitting(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionError(
        error.message || "An error occurred while submitting your form"
      );
      setIsSubmitting(false);
    }
  };

  const getServiceOptions = () => {
    if (!documentDetails) return [];

    const options = [];

    options.push({
      id: "draft",
      name: "Draft Only",
      price: documentDetails.draftCharge || 0,
      hasNotary: documentDetails.hasDraftNotaryCharge,
      notaryCharge: documentDetails.draftNotaryCharge || 0,
      description: "Digital document sent to your email",
    });

    options.push({
      id: "draft_estamp",
      name: "Draft + E-stamp",
      price: documentDetails.pdfCharge || 0,
      hasNotary: documentDetails.hasPdfNotaryCharge,
      notaryCharge: documentDetails.pdfNotaryCharge || 0,
      description: "Digital document with legal e-stamp",
    });

    options.push({
      id: "draft_estamp_delivery",
      name: "Draft + E-stamp + Delivery",
      price: documentDetails.homeDropCharge || 0,

      hasNotary: documentDetails.hasHomeDropNotaryCharge,
      notaryCharge: documentDetails.homeDropNotaryCharge || 0,
      description: "Physical copy delivered to your address",
    });

    return options;
  };

  const handleServiceSelection = (service) => {
    setSelectedService(service);
    handlePayment(service);
  };

  const handlePayment = async (service) => {
    try {
      const totalPrice = service.hasNotary
        ? service.price + service.notaryCharge
        : service.price;

      setShowServiceOptionsModal(false);

      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = () => {
          initializeRazorpay(service, totalPrice);
        };

        script.onerror = () => {
          console.error("Razorpay SDK failed to load");
          alert("Payment gateway failed to load. Please try again later.");
        };

        document.body.appendChild(script);
      } else {
        initializeRazorpay(service, totalPrice);
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
      alert("Payment initialization failed. Please try again.");
    }
  };

  const initializeRazorpay = async (service, totalPrice) => {
    try {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: totalPrice * 100,
        currency: "INR",
        name: "Draft Maker",
        description: `Dual Name Change - ${service.name}`,
        handler: function (response) {
          console.log("razorpay response", response);
          handlePaymentSuccess({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            bookingId: bookingId,
            mobileNumber: mobileNumber,
            documentType: documentDetails.documentType,
            fullName: formData.fullName,
            serviceType: service.id,
            serviceName: service.name,
            amount: totalPrice,
            includesNotary: service.hasNotary,
            userName:userName
          });
        },
        prefill: {
          name: userName,
          contact: mobileNumber,
        },
        notes: {
          bookingId: bookingId,
          serviceType: service.id,
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
            status: "failed",
            userName:userName
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
      setPaymentSuccess(true);
      setPaymentDetails(paymentData);

      const paymentConfirmationData = {
        paymentId: paymentData.razorpay_payment_id,
        orderId: paymentData.razorpay_order_id,
        signature: paymentData.razorpay_signature,
        bookingId: paymentData.bookingId,
        mobileNumber: paymentData.mobileNumber,
        documentType: documentDetails.documentType,
        fullName: formData.fullName,
        serviceType: paymentData.serviceType,
        serviceName: paymentData.serviceName,
        amount: paymentData.amount,
        includesNotary: paymentData.includesNotary,
        userName:userName,
        status: "success",
      };

      const confirmationResponse =
        await createDobParentNameCorrectionPaymentData(paymentConfirmationData);
      if (confirmationResponse.status === 200) {
        const confirmationData = confirmationResponse.data.data;
        console.log("Payment confirmation successful:", confirmationData);

        setTimeout(() => {
          window.location.href = `/documents/name/name-correction`;
        }, 3000);
      } else {
        const errorData = confirmationResponse.data.data;
        throw new Error(errorData.message || "Failed to confirm payment");
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      alert(
        "Payment was processed but we couldn't update your booking. Our team will contact you shortly."
      );
    }
  };

  return (
    <div className="container-fluid mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Error notification component */}
      {showErrorNotification && validationError && (
        <ErrorNoification
          validationError={validationError}
          setShowErrorNotification={setShowErrorNotification}
        />
      )}
      


      <div className="grid md:grid-cols-2 gap-8">
        <div className="print:hidden">
          <BirthCertificateParentNameCorrectionForm
            formData={formData}
            handleChange={handleChange}
          />
          {submissionError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              {submissionError}
            </div>
          )}
        </div>

        <div>
          <BirtCertificateParentNameCorrectionPreview formData={formData} />
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center">
        <button
          onClick={handleSubmitButtonClick}
          disabled={isSubmitting}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg w-full md:w-1/3 mb-4 transition duration-300 ease-in-out shadow-md"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit Application"
          )}
        </button>
      </div>

      <MobileNumberInput
        mobileNumber={mobileNumber}
        showMobileModal={showMobileModal}
        setShowMobileModal={setShowMobileModal}
        setMobileNumber={setMobileNumber}
        mobileError={mobileError}
        handleMobileSubmit={handleMobileSubmit}
        username={userName}
        setUsername={setUserName}
      />
      {/* {showServiceOptionsModal && (
        <ServicePackageNotification
          setShowServiceOptionsModal={setShowServiceOptionsModal}
          bookingId={bookingId}
          mobileNumber={mobileNumber}
          documentName={documentDetails.documentType}
          getServiceOptions={getServiceOptions}
          handleServiceSelection={handleServiceSelection}
        />
      )} */}
      {paymentSuccess && paymentDetails && (
        <PaymentConfirmation
          paymentSuccess={paymentSuccess}
          paymentDetails={paymentDetails}
          bookingId={bookingId}
        />
      )}
    </div>
  );
}