import React, { useState } from "react";
import BirtCertificateForm from "./BirtCertificateForm";
import PaymentConfirmation from "../serviceNotification/PaymentConfirmation";
import ServicePackageNotification from "../serviceNotification/ServicePackageNotification";
import MobileNumberInput from "../serviceNotification/MobileNumberInput";
import ErrorNoification from "../serviceNotification/ErrorNoification";
import {
  birthCerticateNameCorrectionData,
  birthCerticateNameCorrectionPaymentData,
} from "../../../api/service/axiosService";
import { useNavigate } from "react-router-dom";

// Key for sessionStorage
const STORAGE_KEY = "birthCert_temp";

export default function BirthCertificatePage() {
  const navigate = useNavigate();

  const initialFormData = {
    formId: "DM-BC-MNC-7",
    parentTitle: "Mr.",
    parentName: "",
    spouseTitle: "Mrs.",
    spouseName: "",
    address: "",
    parentAadhaar: "",
    spouseAadhaar: "",
    childRelation: "Daughter",
    childName: "",
    certificateNumber: "",
    incorrectName: "",
    correctName: "",
    place: "",
    day: "1",
    month: "April",
    year: "2025",
    firstParty: "",
    secondParty: "",
  };

  // Load saved data from sessionStorage or use initial data
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
  const [userName, setUserName] = useState();

  // Save formData to sessionStorage whenever updated
  const saveFormData = (updatedData) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    } catch (error) {
      console.warn("Could not save form data");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (showErrorNotification) {
      setShowErrorNotification(false);
      setValidationError("");
    }

    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    saveFormData(updatedData); // persist in sessionStorage
  };

  // Validation function (same as before)
  const validateForm = () => {
    if (!formData.parentName.trim()) {
      setValidationError("Please enter parent's name");
      return false;
    }
    if (!formData.spouseName.trim()) {
      setValidationError("Please enter spouse's name");
      return false;
    }
    if (!formData.address.trim()) {
      setValidationError("Please enter your address");
      return false;
    }
    if (!formData.parentAadhaar.trim()) {
      setValidationError("Please enter parent's Aadhaar number");
      return false;
    } else if (!/^\d{12}$/.test(formData.parentAadhaar)) {
      setValidationError("Parent's Aadhaar number must be 12 digits");
      return false;
    }
    if (!formData.spouseAadhaar.trim()) {
      setValidationError("Please enter spouse's Aadhaar number");
      return false;
    } else if (!/^\d{12}$/.test(formData.spouseAadhaar)) {
      setValidationError("Spouse's Aadhaar number must be 12 digits");
      return false;
    }
    if (!formData.childName.trim()) {
      setValidationError("Please enter child's name");
      return false;
    }
    if (!formData.certificateNumber.trim()) {
      setValidationError("Please enter certificate number");
      return false;
    }
    if (!formData.incorrectName.trim()) {
      setValidationError("Please enter the incorrect name");
      return false;
    }
    if (!formData.correctName.trim()) {
      setValidationError("Please enter the correct name");
      return false;
    }
    // if (!formData.firstParty) {
    //   setValidationError("Please enter who will pay the stamp duty");
    //   return false;
    // }
    // if (!formData.secondParty) {
    //   setValidationError("Please enter the second party details");
    //   return false;
    // }
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
    if (!formData.place.trim()) {
      setValidationError("Please enter the place");
      return false;
    }

    return true;
  };

  const handleSubmitButtonClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowMobileModal(true);
    } else {
      setShowErrorNotification(true);
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

      const response = await birthCerticateNameCorrectionData(dataWithMobile);
      const responseData = response.data;

      setBookingId(responseData.bookingId || "");
      setDocumentDetails(responseData.documentDetails || null);

      navigate("/documents/payment-page", {
        state: {
          bookingId: responseData.bookingId,
          documentDetails: responseData.documentDetails,
          mobileNumber,
          userName,
          formId: "DM-BC-MNC-7",
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
      {showErrorNotification && validationError && (
        <ErrorNoification
          validationError={validationError}
          setShowErrorNotification={setShowErrorNotification}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 sm:gap-6 lg:gap-8">
        <div className="print:hidden">
          <BirtCertificateForm
            formData={formData}
            handleChange={handleChange}
          />
          {submissionError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded text-sm">
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

      <div className="mt-6 sm:mt-8 flex flex-col items-center">
        <button
          onClick={handleSubmitButtonClick}
          disabled={isSubmitting}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base lg:text-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mb-4 transition duration-300 ease-in-out shadow-md"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
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
}
