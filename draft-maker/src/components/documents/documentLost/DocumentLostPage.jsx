import React, { useState } from "react";
import DocumentLostForm from "./DocumentLostForm";
import DocumentLostPreview from "./DocumentLostPreview";
import MobileNumberInput from "../serviceNotification/MobileNumberInput";
import ServicePackageNotification from "../serviceNotification/ServicePackageNotification";
import PaymentConfirmation from "../serviceNotification/PaymentConfirmation";
import ErrorNoification from "../serviceNotification/ErrorNoification";
import {
  createDocumentLostPaymentData,
  sendDocumentLostData,
} from "../../../api/service/axiosService";
import { useNavigate } from "react-router-dom";

export default function DocumentLostPage() {
  const navigate = useNavigate();

  // 🔹 Define storage key
  const STORAGE_KEY = "documentLost_temp";

  // 🔹 Initial default form data
  const initialFormData = {
    formId: "DM-DOC-LOST-5",
    personTitle: "Mr.",
    personName: "",
    relationType: "S/o",
    relationName: "",
    age: "",
    address: "",
    aadhaarNumber: "",
    documentType: "",
    documentNumber: "",
    firNumber: "",
    firDay: "",
    firMonth: "",
    firYear: "",
    place: "",
    day: "",
    month: "April",
    year: "2024",
    firstParty: "",
    secondParty: "",
  };

  // 🔹 Load saved data from sessionStorage
  const getSavedData = () => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialFormData;
    } catch {
      return initialFormData;
    }
  };

  // 🔹 State
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

  // 🔹 Save to sessionStorage
  const saveFormData = () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  };

  // 🔹 Clear form + storage
  const handleClearForm = () => {
    setFormData(initialFormData);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (showErrorNotification) {
      setShowErrorNotification(false);
      setValidationError("");
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Form validation
  const validateForm = () => {
    if (!formData.personName.trim()) {
      setValidationError("Please enter your full name");
      return false;
    }
    if (!formData.relationName.trim()) {
      setValidationError("Please enter relation name");
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
    if (!formData.aadhaarNumber.trim()) {
      setValidationError("Please enter your Aadhaar number");
      return false;
    } else if (!/^\d{12}$/.test(formData.aadhaarNumber)) {
      setValidationError("Aadhaar number must be 12 digits");
      return false;
    }
    if (!formData.documentType.trim()) {
      setValidationError("Please enter the document type");
      return false;
    }
    if (!formData.documentNumber.trim()) {
      setValidationError("Please enter the document number");
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
    if (!formData.month.trim()) {
      setValidationError("Please select a month");
      return false;
    }
    if (!formData.place.trim()) {
      setValidationError("Please enter the place");
      return false;
    }
    return true;
  };

  // 🔹 Handle submit button
  const handleSubmitButtonClick = (e) => {
    e.preventDefault();

    if (validateForm()) {
      saveFormData(); // Save before showing mobile modal
      setShowMobileModal(true);
    } else {
      setShowErrorNotification(true);
      setTimeout(() => {
        setShowErrorNotification(false);
      }, 5000);
    }
  };

  // 🔹 Handle mobile number + submit final form
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

      const response = await sendDocumentLostData(dataWithMobile);
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
          formId: "DM-DOC-LOST-5",
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
      {/* 🔹 Error Notification */}
      {showErrorNotification && validationError && (
        <ErrorNoification
          validationError={validationError}
          setShowErrorNotification={setShowErrorNotification}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 sm:gap-6 lg:gap-8">
        {/* 🔹 Form */}
        <div className="print:hidden">
          <DocumentLostForm formData={formData} handleChange={handleChange} />
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

      {/* 🔹 Submit Button */}
      <div className="mt-6 sm:mt-8 flex flex-col items-center px-2 sm:px-4">
        <button
          onClick={handleSubmitButtonClick}
          disabled={isSubmitting}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base lg:text-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mb-4 transition duration-300 ease-in-out shadow-md"
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
              <span className="text-xs sm:text-sm lg:text-base">
                Submitting...
              </span>
            </span>
          ) : (
            "Submit Application"
          )}
        </button>
      </div>

      {/* 🔹 Mobile Input Modal */}
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
