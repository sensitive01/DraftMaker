import { useState, useRef } from "react";
import DualNameChangePreview from "./DualNameChangePreview";
import DualNameChangeForm from "./DualNameChangeForm";
import {
  createDualNameChangePaymentData,
  sendDualNameCorrectionData,
} from "../../../api/service/axiosService";
import ServicePackageNotification from "../serviceNotification/ServicePackageNotification";
import PaymentConfirmation from "../serviceNotification/PaymentConfirmation";
import MobileNumberInput from "../serviceNotification/MobileNumberInput";
import ErrorNoification from "../serviceNotification/ErrorNoification"; // Import the error notification component
import { useNavigate } from "react-router-dom";

export default function DualNameChange() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    formId: "DM-DNC-1",
    namePrefix: "",
    fullName: "",
    relation: "S/o",
    relationName: "",
    age: "",
    permanentAddress: "",
    aadhaarNo: "",
    name1: "",
    document1: "",
    documentNo1: "",
    // Changed to array structure for multiple documents
    additionalDocuments: [
      {
        id: 1,
        name: "",
        document: "",
        documentNo: "",
      },
    ],
    place: "",
    day: "",
    month: "",
    year: "2025",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [validationError, setValidationError] = useState(""); // Add validation error state
  const [showErrorNotification, setShowErrorNotification] = useState(false); // Add error notification state
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

  const previewRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear error notification when user starts typing
    if (showErrorNotification) {
      setShowErrorNotification(false);
      setValidationError("");
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes for additional documents
  const handleAdditionalDocumentChange = (index, field, value) => {
    if (showErrorNotification) {
      setShowErrorNotification(false);
      setValidationError("");
    }

    setFormData((prev) => ({
      ...prev,
      additionalDocuments: prev.additionalDocuments.map((doc, i) =>
        i === index ? { ...doc, [field]: value } : doc
      ),
    }));
  };

  // Add a new document
  const addDocument = () => {
    const newId =
      Math.max(...formData.additionalDocuments.map((doc) => doc.id)) + 1;
    setFormData((prev) => ({
      ...prev,
      additionalDocuments: [
        ...prev.additionalDocuments,
        {
          id: newId,
          name: "",
          document: "",
          documentNo: "",
        },
      ],
    }));
  };

  // Remove a document
  const removeDocument = (index) => {
    if (formData.additionalDocuments.length > 1) {
      setFormData((prev) => ({
        ...prev,
        additionalDocuments: prev.additionalDocuments.filter(
          (_, i) => i !== index
        ),
      }));
    }
  };

  // Updated form validation function
  const validateForm = () => {
    // Personal details validation
    if (!formData.fullName.trim()) {
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

    // Address validation
    if (!formData.permanentAddress.trim()) {
      setValidationError("Please enter your permanent address");
      return false;
    }

    // Aadhaar validation
    if (!formData.aadhaarNo.trim()) {
      setValidationError("Please enter your Aadhaar number");
      return false;
    } else if (!/^\d{12}$/.test(formData.aadhaarNo)) {
      setValidationError("Aadhaar number must be 12 digits");
      return false;
    }

    // First document validation
    if (!formData.name1.trim()) {
      setValidationError("Please enter the first document name");
      return false;
    }

    if (!formData.document1.trim()) {
      setValidationError("Please enter the first document type");
      return false;
    }

    if (!formData.documentNo1.trim()) {
      setValidationError("Please enter the first document number");
      return false;
    }

    // Additional documents validation
    for (let i = 0; i < formData.additionalDocuments.length; i++) {
      const doc = formData.additionalDocuments[i];

      if (!doc.name.trim()) {
        setValidationError(`Please enter the name for document ${i + 2}`);
        return false;
      }

      if (!doc.document.trim()) {
        setValidationError(
          `Please enter the document type for document ${i + 2}`
        );
        return false;
      }

      if (!doc.documentNo.trim()) {
        setValidationError(
          `Please enter the document number for document ${i + 2}`
        );
        return false;
      }
    }

    // Date and place validation
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

      const response = await sendDualNameCorrectionData(dataWithMobile);
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
          formId: "DM-DNC-1",
        },
      });

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

  return (
    <div className="container-fluid mx-auto py-8">
      {showErrorNotification && validationError && (
        <ErrorNoification
          validationError={validationError}
          setShowErrorNotification={setShowErrorNotification}
        />
      )}

      <div className="grid md:grid-cols-1 gap-8">
        <div className="print:hidden">
          <DualNameChangeForm
            formData={formData}
            handleChange={handleChange}
            handleAdditionalDocumentChange={handleAdditionalDocumentChange}
            addDocument={addDocument}
            removeDocument={removeDocument}
          />

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
