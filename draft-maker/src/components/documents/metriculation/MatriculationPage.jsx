import React, { useState } from "react";
import MetriculationForm from "./MetriculationForm";
import MetriculationPreview from "./MetriculationPreview";
import PaymentConfirmation from "../serviceNotification/PaymentConfirmation";
import ServicePackageNotification from "../serviceNotification/ServicePackageNotification";
import MobileNumberInput from "../serviceNotification/MobileNumberInput";
import ErrorNoification from "../serviceNotification/ErrorNoification";
import {
  createMetriculationLostPaymentData,
  sendMetriculationLostData,
} from "../../../api/service/axiosService";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "matriculationPage_temp";

const MatriculationPage = () => {
  const navigate = useNavigate();

  const initialFormData = {
    formId: "DM-MAL-9",
    // Personal details
    name: "",
    relation: "",
    age: "",
    address: "",
    aadhaar: "",

    // Document details
    year: "",
    semester: "",
    program: "",
    authority: "",
    collegeName: "",
    batch: "",
    regNumber: "",
    documentName: "Matriculation Certificate",

    // Verification
    place: "",
    day: "1",
    month: "April",
    year_verification: "2025",
    firstParty: "",
    secondParty: "",
  };

  // Load saved data or use initial data
  const getSavedData = () => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialFormData;
    } catch {
      return initialFormData;
    }
  };

  const [formData, setFormData] = useState(getSavedData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [showServiceOptionsModal, setShowServiceOptionsModal] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [documentDetails, setDocumentDetails] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [userName, setUserName] = useState("");

  // Manual save function
  const saveFormData = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      console.log("Form data saved!");
    } catch (error) {
      console.warn("Could not save form data");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear error notification when user starts typing
    if (showErrorNotification) {
      setShowErrorNotification(false);
      setValidationError("");
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Add form validation function
  const validateForm = () => {
    // Validate personal details
    if (!formData.name.trim()) {
      setValidationError("Please enter your name");
      return false;
    }

    if (!formData.relation.trim()) {
      setValidationError("Please enter your relation");
      return false;
    }

    if (!formData.age.trim()) {
      setValidationError("Please enter your age");
      return false;
    } else if (isNaN(formData.age) || parseInt(formData.age) <= 0) {
      setValidationError("Please enter a valid age");
      return false;
    }

    if (!formData.address.trim()) {
      setValidationError("Please enter your address");
      return false;
    }

    if (!formData.aadhaar.trim()) {
      setValidationError("Please enter Aadhaar number");
      return false;
    } else if (!/^\d{12}$/.test(formData.aadhaar)) {
      setValidationError("Aadhaar number must be 12 digits");
      return false;
    }
    if (!formData.firstParty) {
      setValidationError("Please enter who will pay the stamp duty");
      return false;
    }
    if (!formData.secondParty) {
      setValidationError("Please enter the second party details");
      return false;
    }

    // Validate document details
    if (!formData.year.trim()) {
      setValidationError("Please enter the year");
      return false;
    }

    if (!formData.semester.trim()) {
      setValidationError("Please enter the semester");
      return false;
    }

    if (!formData.program.trim()) {
      setValidationError("Please enter the program");
      return false;
    }

    if (!formData.authority.trim()) {
      setValidationError("Please enter the authority");
      return false;
    }

    if (!formData.collegeName.trim()) {
      setValidationError("Please enter the college name");
      return false;
    }

    if (!formData.batch.trim()) {
      setValidationError("Please enter the batch");
      return false;
    }

    if (!formData.regNumber.trim()) {
      setValidationError("Please enter the registration number");
      return false;
    }

    // Validate verification details
    if (!formData.place.trim()) {
      setValidationError("Please enter the place");
      return false;
    }

    if (!formData.day.trim()) {
      setValidationError("Please enter the day");
      return false;
    } else if (
      isNaN(formData.day) ||
      parseInt(formData.day) <= 0 ||
      parseInt(formData.day) > 31
    ) {
      setValidationError("Please enter a valid day (1-31)");
      return false;
    }

    if (!formData.month.trim()) {
      setValidationError("Please select a month");
      return false;
    }

    if (!formData.year_verification.trim()) {
      setValidationError("Please enter the year");
      return false;
    }

    return true;
  };

  const handleSubmitButtonClick = (e) => {
    e.preventDefault();

    // Save form data before proceeding
    saveFormData();

    // Validate form before showing mobile modal
    if (validateForm()) {
      setShowMobileModal(true);
    } else {
      setShowErrorNotification(true);
      // Auto-hide the error notification after 5 seconds
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
        userName,
      };

      const response = await sendMetriculationLostData(dataWithMobile);
      console.log("responsein", response);

      const responseData = response.data;
      setBookingId(responseData.bookingId || "");
      setDocumentDetails(responseData.documentDetails || null);
      navigate("/documents/payment-page", {
        state: {
          bookingId: responseData.bookingId,
          documentDetails: responseData.documentDetails,
          mobileNumber,
          userName,
          formId: "DM-MAL-9",
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionError(
        error.message || "An error occurred while submitting your form"
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid mx-auto p-2 sm:p-4 bg-gray-50 min-h-screen">
      {/* Add Error Notification Component */}
      {showErrorNotification && validationError && (
        <ErrorNoification
          validationError={validationError}
          setShowErrorNotification={setShowErrorNotification}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-8">
        {/* Left column: Form */}
        <div className="print:hidden">
          <MetriculationForm formData={formData} handleChange={handleChange} />

          {submissionError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded text-sm sm:text-base">
              {submissionError}
            </div>
          )}
          <div className="text-black font-bold text-center mt-4">
            <p>
              🔒 Preview and editing options will be available after successful
              payment.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 flex flex-col items-center px-2 sm:px-4">
        <button
          onClick={handleSubmitButtonClick}
          disabled={isSubmitting}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 sm:px-6 rounded-lg text-base sm:text-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mb-4 transition duration-300 ease-in-out shadow-md"
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
    </div>
  );
};

export default MatriculationPage;
