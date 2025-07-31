import React, { useState } from "react";
import AddressAffidavitForm from "./AddressAffadavitForm";
import AffidavitPreview from "./AddressAffadavitPreview";

import MobileNumberInput from "../serviceNotification/MobileNumberInput";
import { sendAddressAffadavitData } from "../../../api/service/axiosService";
import ErrorNoification from "../serviceNotification/ErrorNoification";
import { useNavigate } from "react-router-dom";

const AddressAffidavit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    formId: "DM-AAF-16",
    name: "",
    gender: "",
    age: "",
    relatedPersonName: "", // Field for father's/husband's name
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
    currentResidenceAddress: "",
    companyName: "",
    purposeOfAffidavit: "",
    date: "",
    place: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileError, setMobileError] = useState("");

  const [userName, setUserName] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (showErrorNotification) {
      setShowErrorNotification(false);
      setValidationError("");
    }

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

  const validateForm = () => {
    if (!formData.name.trim()) {
      setValidationError("Please enter your name");
      return false;
    }

    if (!formData.gender) {
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
      setValidationError("Please enter your father's/husband's name");
      return false;
    }

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
      setValidationError("Permanent address pin code must be 6 digits");
      return false;
    }

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
      setValidationError("Present address pin code must be 6 digits");
      return false;
    }

    if (!formData.aadhaarNo.trim()) {
      setValidationError("Please enter your Aadhaar number");
      return false;
    }

    if (!formData.currentResidenceAddress.trim()) {
      setValidationError("Please enter your current residence address");
      return false;
    }

    if (!formData.purposeOfAffidavit.trim()) {
      setValidationError("Please enter the purpose of this affidavit");
      return false;
    }

    if (!formData.date) {
      setValidationError("Please select a date");
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

      const response = await sendAddressAffadavitData(dataWithMobile);
      console.log("responsein", response);

      const responseData = response.data;

      navigate("/documents/payment-page", {
        state: {
          bookingId: responseData.bookingId,
          documentDetails: responseData.documentDetails,
          mobileNumber,
          userName,
          formId: "DM-AAF-16",
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
    <div className="container-fluid mx-auto py-8 px-4">
      {showErrorNotification && validationError && (
        <ErrorNoification
          validationError={validationError}
          setShowErrorNotification={setShowErrorNotification}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        <div>
          <AddressAffidavitForm
            formData={formData}
            handleChange={handleChange}
          />

          {submissionError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              {submissionError}
            </div>
          )}
        </div>
        {/* <div className="print-content">
          <AffidavitPreview formData={formData} />
        </div> */}
        <div className="text-black font-bold text-center mt-4">
          <p>
            🔒 Preview and editing options will be available after successful
            payment.
          </p>
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

export default AddressAffidavit;
