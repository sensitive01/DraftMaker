import React, { useEffect, useState } from "react";
import JoinKhataTransferForm from "./JoinKhataTransferForm";
import JoinKhataTransferPreview from "./JoinKhataTransferPreview";

import { useNavigate, useParams } from "react-router-dom";
import SuccessNotification from "../../serviceNotification/SuccessNotification";
import ErrorNoification from "../../serviceNotification/ErrorNoification";
import {
  getDocumentPrviewPage,
  updateAggrementData,
} from "../../../../api/service/axiosService";

const PreviewJointKhataTransfer = () => {
  const { bookingId } = useParams();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    formId: "DM-KH-10",
    // First applicant
    name1: "",
    relation1: "",
    age1: "",
    address1: "",
    aadhaar1: "",

    // Second applicant
    name2: "",
    relation2: "",
    age2: "",
    address2: "",
    aadhaar2: "",

    // Property details
    propertyAddress: "",
    wardNumber: "",
    zone: "",
    authority: "BBMP",
    khataNo: "",
    sasNumber: "",

    // Authorization
    authorizedPerson: "",

    // Verification
    place: "",
    day: "1",
    month: "April",
    year: "2025",
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

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Add form validation function
  const validateForm = () => {
    // Validate first applicant details
    if (!formData.name1.trim()) {
      setValidationError("Please enter the first applicant's name");
      return false;
    }

    if (!formData.relation1.trim()) {
      setValidationError("Please enter the first applicant's relation");
      return false;
    }

    if (!formData.age1.trim()) {
      setValidationError("Please enter the first applicant's age");
      return false;
    } else if (isNaN(formData.age1) || parseInt(formData.age1) <= 0) {
      setValidationError("Please enter a valid age for the first applicant");
      return false;
    }

    if (!formData.address1.trim()) {
      setValidationError("Please enter the first applicant's address");
      return false;
    }

    if (!formData.aadhaar1.trim()) {
      setValidationError("Please enter the first applicant's Aadhaar number");
      return false;
    } else if (!/^\d{12}$/.test(formData.aadhaar1)) {
      setValidationError("First applicant's Aadhaar number must be 12 digits");
      return false;
    }

    // Validate second applicant details
    if (!formData.name2.trim()) {
      setValidationError("Please enter the second applicant's name");
      return false;
    }

    if (!formData.relation2.trim()) {
      setValidationError("Please enter the second applicant's relation");
      return false;
    }

    if (!formData.age2.trim()) {
      setValidationError("Please enter the second applicant's age");
      return false;
    } else if (isNaN(formData.age2) || parseInt(formData.age2) <= 0) {
      setValidationError("Please enter a valid age for the second applicant");
      return false;
    }

    if (!formData.address2.trim()) {
      setValidationError("Please enter the second applicant's address");
      return false;
    }

    if (!formData.aadhaar2.trim()) {
      setValidationError("Please enter the second applicant's Aadhaar number");
      return false;
    } else if (!/^\d{12}$/.test(formData.aadhaar2)) {
      setValidationError("Second applicant's Aadhaar number must be 12 digits");
      return false;
    }

    // Validate property details
    if (!formData.propertyAddress.trim()) {
      setValidationError("Please enter the property address");
      return false;
    }

    if (!formData.wardNumber.trim()) {
      setValidationError("Please enter the ward number");
      return false;
    }

    if (!formData.zone.trim()) {
      setValidationError("Please enter the zone");
      return false;
    }

    if (!formData.khataNo.trim()) {
      setValidationError("Please enter the Khata number");
      return false;
    }

    if (!formData.sasNumber.trim()) {
      setValidationError("Please enter the SAS number");
      return false;
    }

    // Validate authorized person
    if (!formData.authorizedPerson.trim()) {
      setValidationError("Please select an authorized person");
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

    if (!formData.year.trim()) {
      setValidationError("Please enter the year");
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
          navigate("/");
        }, 1500);
      }
    } catch (err) {
      console.log("error in updating the data", err);
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
      {showSuccessNotification && (
        <SuccessNotification
          successMessage={showSuccessNotification}
          setSuccess={setShowSuccessNotification}
        />
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left column: Form */}
        <div className="print:hidden">
          <JoinKhataTransferForm
            formData={formData}
            handleChange={handleChange}
          />
          {submissionError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              {submissionError}
            </div>
          )}
        </div>

        {/* Right column: Preview */}
        <div>
          <JoinKhataTransferPreview formData={formData} />
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center">
        <div className="flex flex-row flex-wrap justify-center gap-4 w-full md:w-1/2">
          <button
            onClick={handleUpdateData}
            disabled={isSubmitting}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg flex-1 transition duration-300 ease-in-out shadow-md"
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
                Updating...
              </span>
            ) : (
              "Update Application"
            )}
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg flex-1 transition duration-300 ease-in-out shadow-md"
          >
            Back To Home
          </button>
        </div>
      </div>
    </div>
  );
};
export default PreviewJointKhataTransfer;
