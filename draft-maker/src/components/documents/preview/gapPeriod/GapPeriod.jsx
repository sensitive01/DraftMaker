import { useEffect, useState } from "react";
import GapPeriodForm from "./GapPeriodForm";
import AffidavitDisplay from "./GapPeriodPreview"; // Make sure this import matches your actual file name

import { useNavigate, useParams } from "react-router-dom";
import SuccessNotification from "../../serviceNotification/SuccessNotification";
import ErrorNoification from "../../serviceNotification/ErrorNoification";
import { getDocumentPrviewPage, updateAggrementData } from "../../../../api/service/axiosService";

export default function PreviewGapPeriod() {
    const { bookingId } = useParams();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    formId: "DM-GP-13",
    name: "",
    relation: "S/o",
    relationName: "",
    age: "",
    address: "",
    aadhaarNo: "",
    authority: "",
    place: "",
    day: "1",
    month: "April",
    year: "2025",
    gapPeriods: [{ from: "", to: "", reason: "" }],
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

    setFormData({ ...formData, [name]: value });
  };

  const handleGapPeriodChange = (index, field, value) => {
    // Clear error notification when user starts typing in gap period fields
    if (showErrorNotification) {
      setShowErrorNotification(false);
      setValidationError("");
    }

    const updatedGapPeriods = [...formData.gapPeriods];
    updatedGapPeriods[index][field] = value;
    setFormData({ ...formData, gapPeriods: updatedGapPeriods });
  };

  const addGapPeriod = () => {
    setFormData({
      ...formData,
      gapPeriods: [...formData.gapPeriods, { from: "", to: "", reason: "" }],
    });
  };

  const removeGapPeriod = (index) => {
    if (formData.gapPeriods.length > 1) {
      const updatedGapPeriods = formData.gapPeriods.filter(
        (_, i) => i !== index
      );
      setFormData({ ...formData, gapPeriods: updatedGapPeriods });
    }
  };

  // Add form validation function
  const validateForm = () => {
    // Personal details validation
    if (!formData.name.trim()) {
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
    if (!formData.address.trim()) {
      setValidationError("Please enter your address");
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

    // Gap period validations
    for (let i = 0; i < formData.gapPeriods.length; i++) {
      const period = formData.gapPeriods[i];

      if (!period.from.trim()) {
        setValidationError(
          `Please enter the starting date for gap period ${i + 1}`
        );
        return false;
      }

      if (!period.to.trim()) {
        setValidationError(
          `Please enter the ending date for gap period ${i + 1}`
        );
        return false;
      }

      if (!period.reason.trim()) {
        setValidationError(`Please enter the reason for gap period ${i + 1}`);
        return false;
      }
    }

    // Authority validation
    if (!formData.authority.trim()) {
      setValidationError("Please enter the authority");
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
    <div className="container-fluid mx-auto py-2 sm:py-4 md:py-6 lg:py-8 px-1 sm:px-2 md:px-4 lg:px-6">
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

      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
        {/* Left column: Form */}
        <div className="print:hidden w-full">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 mb-4 lg:mb-0">
            <GapPeriodForm
              formData={formData}
              handleGapPeriodChange={handleGapPeriodChange}
              handleChange={handleChange}
              addGapPeriod={addGapPeriod}
              removeGapPeriod={removeGapPeriod}
            />
            {submissionError && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded text-sm sm:text-base">
                {submissionError}
              </div>
            )}
          </div>
        </div>

        {/* Right column: Preview */}
        <div className="w-full">
          <div className="bg-gray-50 rounded-lg p-1 sm:p-2 md:p-4 lg:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 text-center text-gray-800 lg:hidden">
              Preview
            </h3>
            <div className="transform scale-90 sm:scale-95 md:scale-100 origin-top -mx-2 sm:mx-0">
              <AffidavitDisplay data={formData} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 flex flex-col items-center px-2 sm:px-4">
        <button
          onClick={handleUpdateData}
          disabled={isSubmitting}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-lg text-sm sm:text-base md:text-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mb-4 transition duration-300 ease-in-out shadow-md"
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
              Updating...
            </span>
          ) : (
            "Update Application"
          )}
        </button>
      </div>
    </div>
  );
}
