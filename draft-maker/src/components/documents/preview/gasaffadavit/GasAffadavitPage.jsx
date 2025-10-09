import { useEffect, useState } from "react";
import GasAffadavitForm from "./GasAffadavitForm";
import GasAffadavitPreview from "./GasAffadavitPreview";

import { useNavigate, useParams } from "react-router-dom";
import SuccessNotification from "../../serviceNotification/SuccessNotification";
import ErrorNoification from "../../serviceNotification/ErrorNoification";
import {
  getDocumentPrviewPage,
  updateAggrementData,
} from "../../../../api/service/axiosService";

export default function PreviewGasAffidavitForm() {
  const { bookingId } = useParams();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    formId: "DM-GAS-5",
    fullName: "",
    relation: "S/o", // Default relation
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
    firstParty: "",
    secondParty: "",
    stampDutyPaidBy: "",
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
    // Personal details validation
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

    // Gas connection details validation
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

    // Validation for subscription voucher
    if (!formData.subscriptionVoucher.trim()) {
      setValidationError("Please enter the subscription voucher details");
      return false;
    }

    // Validation for deposit amount
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
    if (!formData.firstParty) {
      setValidationError("Please enter the first party name");
      return false;
    }
    if (!formData.secondParty) {
      setValidationError("Please enter the second party name");
      return false;
    }
    if (!formData.stampDutyPaidBy) {
      setValidationError("Please select who will pay the stamp duty");
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
          <GasAffadavitForm formData={formData} handleChange={handleChange} />
          {submissionError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              {submissionError}
            </div>
          )}
        </div>

        {/* Right column: Preview */}
        <div>
          <GasAffadavitPreview formData={formData} />
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
}
