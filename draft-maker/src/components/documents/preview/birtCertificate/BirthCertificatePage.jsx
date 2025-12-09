import React, { useEffect, useState } from "react";
import BirtCertificatePreview from "./BirtCertificatePreview";
import BirtCertificateForm from "./BirtCertificateForm";

import { useNavigate, useParams } from "react-router-dom";
import ErrorNoification from "../../serviceNotification/ErrorNoification";
import SuccessNotification from "../../serviceNotification/SuccessNotification";
import {
  getDocumentPrviewPage,
  updateAggrementData,
} from "../../../../api/service/axiosService";

// Main Page Component containing both form and preview
export default function PreviewBirthCertificatePage() {
 const { bookingId, orderId } = useParams();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDocumentPrviewPage(bookingId);
      if (response.status === 200) {
        setFormData(response.data.data);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear error notification when user starts typing
    if (showErrorNotification) {
      setShowErrorNotification(false);
      setValidationError("");
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add form validation function
  const validateForm = () => {
    // Parent details validation
    if (!formData.parentName.trim()) {
      setValidationError("Please enter parent's name");
      return false;
    }

    // Spouse details validation
    if (!formData.spouseName.trim()) {
      setValidationError("Please enter spouse's name");
      return false;
    }

    // Address validation
    if (!formData.address.trim()) {
      setValidationError("Please enter your address");
      return false;
    }

    // Aadhaar validation
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
    // if (!formData.firstParty) {
    //   setValidationError("Please enter who will pay the stamp duty");
    //   return false;
    // }
    // if (!formData.secondParty) {
    //   setValidationError("Please enter the second party details");
    //   return false;
    // }

    // Child details validation
    if (!formData.childName.trim()) {
      setValidationError("Please enter child's name");
      return false;
    }

    // Certificate details validation
    if (!formData.certificateNumber.trim()) {
      setValidationError("Please enter certificate number");
      return false;
    }

    // Name correction details validation
    if (!formData.incorrectName.trim()) {
      setValidationError("Please enter the incorrect name");
      return false;
    }

    if (!formData.correctName.trim()) {
      setValidationError("Please enter the correct name");
      return false;
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

    if (!formData.place.trim()) {
      setValidationError("Please enter the place");
      return false;
    }

    return true;
  };

  const handleUpdateData = async () => {
    setIsSubmitting(true);
    try {
      const response = await updateAggrementData(formData, bookingId);
      console.log("response", response);
      if (response.status === 200) {
        setIsSubmitting(false);
        setShowSuccessNotification(response.data.message);
        setTimeout(() => {
          navigate(
            `/documents/home/payment-success?orderId=${orderId}&bookingId=${bookingId}`
          );
        }, 1500);
      }
    } catch (err) {
      console.log("error in updating the data", err);
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
      {showSuccessNotification && (
        <SuccessNotification
          successMessage={showSuccessNotification}
          setSuccess={setShowSuccessNotification}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Left column: Form */}
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
        </div>

        {/* Right column: Preview */}
        <div>
          <BirtCertificatePreview formData={formData} />
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <div className="flex flex-row flex-wrap justify-center gap-4 w-full md:w-1/2">
          <button
            onClick={handleUpdateData}
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform transition duration-300 hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 h-5 w-5 text-white"
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
                Processing...
              </>
            ) : (
              "Review Completed"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
