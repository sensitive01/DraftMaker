import React, { useEffect, useState } from "react";
import BirthCertificateParentNameCorrectionForm from "./BirthCertificateParentNameCorrectionForm";
import BirtCertificateParentNameCorrectionPreview from "./BirtCertificateParentNameCorrectionPreview";

import { useNavigate, useParams } from "react-router-dom";
import ErrorNoification from "../../serviceNotification/ErrorNoification";
import SuccessNotification from "../../serviceNotification/SuccessNotification";
import {
  getDocumentPrviewPage,
  updateAggrementData,
} from "../../../../api/service/axiosService";

// Main Page Component containing both form and preview
export default function PreviewBirthCertificateParentNameCorrectionPage() {
  const { bookingId, orderId } = useParams();

  const navigate = useNavigate();
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
      setValidationError(
        "Please enter incorrect father's name as printed on certificate"
      );
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

    if (!formData.incorrectMotherName.trim()) {
      setValidationError(
        "Please enter incorrect mother's name as printed on certificate"
      );
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
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
        <div className="print:hidden">
          <BirthCertificateParentNameCorrectionForm
            formData={formData}
            handleChange={handleChange}
          />
          {submissionError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded text-sm">
              {submissionError}
            </div>
          )}
        </div>

        <div className="w-full overflow-x-auto">
          <BirtCertificateParentNameCorrectionPreview formData={formData} />
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
