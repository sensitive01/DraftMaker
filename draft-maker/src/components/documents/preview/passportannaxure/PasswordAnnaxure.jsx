import { useEffect, useState } from "react";
import PassportAnnaxureForm from "./PassportAnnaxureForm";
import PassportAnnaxurePreview from "./PassportAnnaxurePreview";

import { useNavigate, useParams } from "react-router-dom";
import SuccessNotification from "../../serviceNotification/SuccessNotification";
import ErrorNoification from "../../serviceNotification/ErrorNoification";
import {
  getDocumentPrviewPage,
  updateAggrementData,
} from "../../../../api/service/axiosService";

export default function PreviewPasswordAnnaxure() {
  const { bookingId, orderId } = useParams();

  const navigate = useNavigate();
  // Initialize state with default values
  const [formData, setFormData] = useState({
    formId: "DM-PAF-14",
    name: "",
    relationType: "", // Changed from relationToName to relationType (dropdown)
    guardianName: "", // Added for guardian's name
    age: "",
    permanentAddress: "",
    presentAddress: "",
    aadhaarNo: "",
    passportNo: "",
    incidentDetails: "",
    travelled: "NO",
    travelDetails: "",
    trConcessions: "NO",
    concessionDetails: "",
    nonResidentIndian: "NO",
    passportObjection: "NO",
    objectionDetails: "",
    deported: "NO",
    deportationDetails: "",
    date: "",
    place: "",
    useNameAsSignature: false,
    residences: [{ country: "", periodFrom: "", periodTo: "", pageNos: "" }],
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

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDetailChange = (field, value) => {
    // Clear error notification when user changes details
    if (showErrorNotification) {
      setShowErrorNotification(false);
      setValidationError("");
    }

    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleResidenceChange = (index, field, value) => {
    // Clear error notification when user changes residence details
    if (showErrorNotification) {
      setShowErrorNotification(false);
      setValidationError("");
    }

    const updatedResidences = [...formData.residences];
    updatedResidences[index] = {
      ...updatedResidences[index],
      [field]: value,
    };

    setFormData((prevState) => ({
      ...prevState,
      residences: updatedResidences,
    }));
  };

  // Handle signature checkbox
  const handleSignatureCheck = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      useNameAsSignature: e.target.checked,
    }));
  };

  // Add form validation function
  const validateForm = () => {
    if (!formData.name.trim()) {
      setValidationError("Please enter your full name");
      return false;
    }

    if (!formData.relationType.trim()) {
      setValidationError("Please select a relation type");
      return false;
    }

    if (!formData.guardianName.trim()) {
      setValidationError("Please enter guardian name");
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

    if (!formData.presentAddress.trim()) {
      setValidationError("Please enter your present address");
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
    <div className="container-fluid mx-auto p-4">
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
        {/* Left column: Form */}
        <div>
          <PassportAnnaxureForm
            formData={formData}
            handleChange={handleChange}
            handleDetailChange={handleDetailChange}
            handleResidenceChange={handleResidenceChange}
            handleSignatureCheck={handleSignatureCheck}
          />
          {submissionError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              {submissionError}
            </div>
          )}
        </div>
        <div className="print-content">
          <PassportAnnaxurePreview formData={formData} />
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
