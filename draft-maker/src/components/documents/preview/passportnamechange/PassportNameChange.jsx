import React, { useEffect, useState } from "react";
import PassportNameChangeForm from "./PassportNameChangeForm";
import PassportNameChangePreview from "./PassportNameChangePreview";

import { useNavigate, useParams } from "react-router-dom";
import SuccessNotification from "../../serviceNotification/SuccessNotification";
import {
  getDocumentPrviewPage,
  updateAggrementData,
} from "../../../../api/service/axiosService";

const PreviewPassportNameChange = () => {
  const { bookingId } = useParams();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    formId: "DM-PNC-15",
    name: "",
    gender: "",
    age: "",
    relatedPersonName: "",
    permanentAddress: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      pinCode: "",
    },
    presentAddress: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      pinCode: "",
    },
    aadhaarNo: "",
    passportNo: "",
    currentGivenName: "",
    currentSurname: "",
    newGivenName: "",
    newSurname: "",
    date: "",
    place: "",
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

    // Handle nested objects (addresses)
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Add form validation function
  const validateForm = () => {
    if (!formData.name.trim()) {
      setValidationError("Please enter your full name");
      return false;
    }

    if (!formData.gender.trim()) {
      setValidationError("Please select your gender");
      return false;
    }

    if (!formData.age.trim()) {
      setValidationError("Please enter your age");
      return false;
    } else if (isNaN(formData.age) || parseInt(formData.age) <= 0) {
      setValidationError("Please enter a valid age");
      return false;
    }

    if (!formData.relatedPersonName.trim()) {
      setValidationError("Please enter related person's name");
      return false;
    }

    // Validate permanent address
    if (!formData.permanentAddress.line1.trim()) {
      setValidationError("Please enter your permanent address line 1");
      return false;
    }

    if (!formData.permanentAddress.city.trim()) {
      setValidationError("Please enter your permanent address city");
      return false;
    }

    if (!formData.permanentAddress.state.trim()) {
      setValidationError("Please enter your permanent address state");
      return false;
    }

    if (!formData.permanentAddress.pinCode.trim()) {
      setValidationError("Please enter your permanent address pin code");
      return false;
    } else if (!/^\d{6}$/.test(formData.permanentAddress.pinCode)) {
      setValidationError("Pin code must be 6 digits");
      return false;
    }

    // Validate present address
    if (!formData.presentAddress.line1.trim()) {
      setValidationError("Please enter your present address line 1");
      return false;
    }

    if (!formData.presentAddress.city.trim()) {
      setValidationError("Please enter your present address city");
      return false;
    }

    if (!formData.presentAddress.state.trim()) {
      setValidationError("Please enter your present address state");
      return false;
    }

    if (!formData.presentAddress.pinCode.trim()) {
      setValidationError("Please enter your present address pin code");
      return false;
    } else if (!/^\d{6}$/.test(formData.presentAddress.pinCode)) {
      setValidationError("Pin code must be 6 digits");
      return false;
    }

    if (!formData.aadhaarNo.trim()) {
      setValidationError("Please enter Aadhaar number");
      return false;
    } else if (!/^\d{12}$/.test(formData.aadhaarNo)) {
      setValidationError("Aadhaar number must be 12 digits");
      return false;
    }

    if (!formData.passportNo.trim()) {
      setValidationError("Please enter passport number");
      return false;
    }

    if (!formData.currentGivenName.trim()) {
      setValidationError("Please enter your current given name");
      return false;
    }

    if (!formData.currentSurname.trim()) {
      setValidationError("Please enter your current surname");
      return false;
    }

    if (!formData.newGivenName.trim()) {
      setValidationError("Please enter your new given name");
      return false;
    }

    if (!formData.newSurname.trim()) {
      setValidationError("Please enter your new surname");
      return false;
    }

    // Validate verification details
    if (!formData.place.trim()) {
      setValidationError("Please enter the place");
      return false;
    }

    if (!formData.date.trim()) {
      setValidationError("Please enter the date");
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
    <div className="container-fluid mx-auto py-8 px-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <PassportNameChangeForm
            formData={formData}
            handleChange={handleChange}
          />
          {submissionError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              {submissionError}
            </div>
          )}
        </div>
        <div className="print-content">
          <PassportNameChangePreview formData={formData} />
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

      <style jsx>{`
        @media print {
          .print-content {
            width: 100%;
            margin: 0;
            padding: 0;
          }

          body * {
            visibility: hidden;
          }

          .print-content,
          .print-content * {
            visibility: visible;
          }

          .print-content {
            position: absolute;
            left: 0;
            top: 0;
          }

          h2.print:hidden {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default PreviewPassportNameChange;
