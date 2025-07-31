import { useEffect, useState } from "react";
import HufForm from "./HufForm";
import HufPreview from "./HufPreview";

import { useNavigate, useParams } from "react-router-dom";
import SuccessNotification from "../../serviceNotification/SuccessNotification";
import ErrorNoification from "../../serviceNotification/ErrorNoification";
import {
  getDocumentPrviewPage,
  updateAggrementData,
} from "../../../../api/service/axiosService";

export default function PreviewHufAgreement() {
  const { bookingId } = useParams();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    formId: "DM-HUF-12",
    title: "Mr",
    name: "",
    relationTo: "",
    relationName: "",
    age: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      pinCode: "",
    },
    aadhaarNo: "",
    hufName: "",
    hufExistenceDate: "",
    place: "",
    day: "1",
    month: "April",
    year: "2025",
    coparceners: [{ name: "", relationship: "", address: "" }],
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

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCoparcenerChange = (index, field, value) => {
    // Clear error notification when user starts typing
    if (showErrorNotification) {
      setShowErrorNotification(false);
      setValidationError("");
    }

    const updatedCoparceners = [...formData.coparceners];
    updatedCoparceners[index] = {
      ...updatedCoparceners[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      coparceners: updatedCoparceners,
    });
  };

  // Function to add new coparcener
  const addCoparcener = () => {
    setFormData({
      ...formData,
      coparceners: [
        ...formData.coparceners,
        { name: "", relationship: "", address: "" },
      ],
    });
  };

  // Function to remove a coparcener
  const removeCoparcener = (index) => {
    if (formData.coparceners.length > 1) {
      const updatedCoparceners = formData.coparceners.filter(
        (_, i) => i !== index
      );
      setFormData({
        ...formData,
        coparceners: updatedCoparceners,
      });
    }
  };

  // Add form validation function
  const validateForm = () => {
    // Validate karta details
    if (!formData.name.trim()) {
      setValidationError("Please enter the Karta's name");
      return false;
    }

    if (!formData.relationTo.trim()) {
      setValidationError("Please select the relation type");
      return false;
    }

    if (!formData.relationName.trim()) {
      setValidationError("Please enter the relation name");
      return false;
    }

    if (!formData.age.trim()) {
      setValidationError("Please enter the age");
      return false;
    } else if (isNaN(formData.age) || parseInt(formData.age) <= 0) {
      setValidationError("Please enter a valid age");
      return false;
    }

    // Validate address
    if (!formData.address.line1.trim()) {
      setValidationError("Please enter the address line 1");
      return false;
    }

    if (!formData.address.city.trim()) {
      setValidationError("Please enter the city");
      return false;
    }

    if (!formData.address.state.trim()) {
      setValidationError("Please enter the state");
      return false;
    }

    if (!formData.address.pinCode.trim()) {
      setValidationError("Please enter the PIN code");
      return false;
    } else if (!/^\d{6}$/.test(formData.address.pinCode)) {
      setValidationError("PIN code must be 6 digits");
      return false;
    }

    // Validate Aadhaar number
    if (!formData.aadhaarNo.trim()) {
      setValidationError("Please enter Aadhaar number");
      return false;
    } else if (!/^\d{12}$/.test(formData.aadhaarNo)) {
      setValidationError("Aadhaar number must be 12 digits");
      return false;
    }

    // Validate HUF name
    if (!formData.hufName.trim()) {
      setValidationError("Please enter the HUF name");
      return false;
    }

    // Validate HUF existence date
    if (!formData.hufExistenceDate.trim()) {
      setValidationError("Please enter the HUF existence date");
      return false;
    }

    // Validate at least one coparcener
    let hasValidCoparcener = false;
    for (let i = 0; i < formData.coparceners.length; i++) {
      const coparcener = formData.coparceners[i];
      if (
        coparcener.name.trim() &&
        coparcener.relationship.trim() &&
        coparcener.address.trim()
      ) {
        hasValidCoparcener = true;
        break;
      }
    }

    if (!hasValidCoparcener) {
      setValidationError(
        "Please add at least one coparcener with complete details"
      );
      return false;
    }

    // Validate date and place
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
    <div className="container-fluid mx-auto max-w-8xl py-2 sm:py-4 md:py-6 lg:py-8 px-1 sm:px-2 md:px-4 lg:px-6">
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

      <div className="flex flex-col lg:flex-row gap-2 sm:gap-4 md:gap-6">
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 mb-4 lg:mb-0">
            <HufForm
              formData={formData}
              handleChange={handleChange}
              handleCoparcenerChange={handleCoparcenerChange}
              addCoparcener={addCoparcener}
              removeCoparcener={removeCoparcener}
            />
            {submissionError && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded text-sm sm:text-base">
                {submissionError}
              </div>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="lg:sticky lg:top-4">
            <div className="bg-gray-50 rounded-lg p-1 sm:p-2 md:p-4">
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 text-center text-gray-800 lg:hidden">
                Preview
              </h3>
              <div className="transform scale-90 sm:scale-95 md:scale-100 origin-top -mx-2 sm:mx-0">
                <HufPreview formData={formData} />
              </div>
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
