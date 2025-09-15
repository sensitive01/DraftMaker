import { useState } from "react";
import GasAffadavitForm from "./GasAffadavitForm";
import GasAffadavitPreview from "./GasAffadavitPreview";
import PaymentConfirmation from "../serviceNotification/PaymentConfirmation";
import ServicePackageNotification from "../serviceNotification/ServicePackageNotification";
import MobileNumberInput from "../serviceNotification/MobileNumberInput";
import ErrorNoification from "../serviceNotification/ErrorNoification";
import {
  createGassAffadavitPaymentData,
  sendGasCorrectionData,
} from "../../../api/service/axiosService";
import { useNavigate } from "react-router-dom";

export default function GasAffidavitForm() {
  const navigate = useNavigate();

  // Storage key for session
  const STORAGE_KEY = "gasAffidavit_temp";

  // Load saved data from sessionStorage or fallback to defaults
  const getSavedData = () => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : {
            formId: "DM-GAS-5",
            fullName: "",
            relation: "S/o",
            fatherName: "",
            age: "",
            permanentAddress: "",
            aadhaarNo: "",
            gasCompanyName: "",
            serviceAddress: "",
            connectionDate: "",
            consumerNumber: "",
            subscriptionVoucher: "",
            cylinderCount: "1",
            regulatorCount: "1",
            depositAmount: "",
            previousAddress: "",
            reason: "shifting",
            lostItem: "subscription",
            place: "",
            day: "1",
            month: "",
            year: "2025",
          };
    } catch {
      return {};
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
  const [bookingId, setBookingId] = useState("");
  const [documentDetails, setDocumentDetails] = useState(null);
  const [userName, setUserName] = useState();

  // Save form data to sessionStorage
  const saveFormData = () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  };

  // Clear form data
  const handleClearForm = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setFormData(getSavedData());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (showErrorNotification) {
      setShowErrorNotification(false);
      setValidationError("");
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setValidationError("Please enter your full name");
      return false;
    }
    if (!formData.fatherName.trim()) {
      setValidationError("Please enter father's/relation's name");
      return false;
    }
    if (!formData.age.trim()) {
      setValidationError("Please enter your age");
      return false;
    } else if (isNaN(formData.age) || parseInt(formData.age) <= 0) {
      setValidationError("Please enter a valid age");
      return false;
    }
    if (!formData.permanentAddress.trim()) {
      setValidationError("Please enter your permanent address");
      return false;
    }
    if (!formData.aadhaarNo.trim()) {
      setValidationError("Please enter your Aadhaar number");
      return false;
    } else if (!/^\d{12}$/.test(formData.aadhaarNo)) {
      setValidationError("Aadhaar number must be 12 digits");
      return false;
    }
    if (!formData.gasCompanyName.trim()) {
      setValidationError("Please enter the gas company name");
      return false;
    }
    if (!formData.serviceAddress.trim()) {
      setValidationError("Please enter the service address");
      return false;
    }
    if (!formData.connectionDate.trim()) {
      setValidationError("Please enter the connection date");
      return false;
    }
    if (!formData.consumerNumber.trim()) {
      setValidationError("Please enter the consumer number");
      return false;
    }
    if (!formData.subscriptionVoucher.trim()) {
      setValidationError("Please enter the subscription voucher details");
      return false;
    }
    if (!formData.depositAmount.trim()) {
      setValidationError("Please enter the deposit amount");
      return false;
    } else if (
      isNaN(formData.depositAmount) ||
      parseFloat(formData.depositAmount) <= 0
    ) {
      setValidationError("Please enter a valid deposit amount");
      return false;
    }
    // if (formData.reason === "shifting" && !formData.previousAddress.trim()) {
    //   setValidationError("Please enter your previous address");
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
    if (!formData.year.trim()) {
      setValidationError("Please enter the year");
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
      saveFormData(); // ✅ Save before modal
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

      const response = await sendGasCorrectionData(dataWithMobile);
      const responseData = response.data;
      setBookingId(responseData.bookingId || "");
      setDocumentDetails(responseData.documentDetails || null);

      navigate("/documents/payment-page", {
        state: {
          bookingId: responseData.bookingId,
          documentDetails: responseData.documentDetails,
          mobileNumber,
          userName,
          formId: "DM-GAS-5",
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
    <div className="container-fluid mx-auto p-4 bg-gray-50 min-h-screen">
      {showErrorNotification && validationError && (
        <ErrorNoification
          validationError={validationError}
          setShowErrorNotification={setShowErrorNotification}
        />
      )}

      <div className="grid md:grid-cols-1 gap-8">
        <div className="print:hidden">
          <GasAffadavitForm formData={formData} handleChange={handleChange} />
          {submissionError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
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
    </div>
  );
}
