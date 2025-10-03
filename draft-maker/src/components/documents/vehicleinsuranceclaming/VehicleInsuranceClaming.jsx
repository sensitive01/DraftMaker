import { useState } from "react";
import VehicleInsuranceClamingForm from "./VehicleInsuranceClamingForm";
import VehicleInsuranceClamingPreview from "./VehicleInsuranceClamingPreview";
import PaymentConfirmation from "../serviceNotification/PaymentConfirmation";
import ServicePackageNotification from "../serviceNotification/ServicePackageNotification";
import MobileNumberInput from "../serviceNotification/MobileNumberInput";
import ErrorNoification from "../serviceNotification/ErrorNoification";
import {
  createVehicleInsurencePaymentData,
  sendVehicleInsurenceData,
} from "../../../api/service/axiosService";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "vehicleInsuranceClaming_temp";

const VehicleInsuranceClaming = () => {
  const navigate = useNavigate();

  const initialFormData = {
    formId: "DM-VIC-11",
    title: "",
    name: "",
    relation: "",
    guardianName:"",
    age: "",
    address: "",
    aadhaarNo: "",
    vehicleNo: "",
    vehicleModel: "",
    engineNo: "",
    chassisNo: "",
    insurer: "",
    policyNo: "",
    policyStart: "",
    policyEnd: "",
    driverName: "",
    accidentDetails: "",
    place: "",
    day: "1",
    month: "April",
    year: "2025",
    firstParty: "",
    secondParty: "",
  };

  // Load saved data or use initial data
  const getSavedData = () => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialFormData;
    } catch {
      return initialFormData;
    }
  };

  const [formData, setFormData] = useState(getSavedData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [showServiceOptionsModal, setShowServiceOptionsModal] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [documentDetails, setDocumentDetails] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [userName, setUserName] = useState("");
  const [validationError, setValidationError] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);

  // Manual save function
  const saveFormData = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      console.log("Form data saved!");
    } catch (error) {
      console.warn("Could not save form data");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear error notification when user starts typing
    if (showErrorNotification) {
      setShowErrorNotification(false);
      setValidationError("");
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Add form validation function
  const validateForm = () => {
    if (!formData.title.trim()) {
      setValidationError("Please select your title");
      return false;
    }

    if (!formData.name.trim()) {
      setValidationError("Please enter your full name");
      return false;
    }

    if (!formData.relation.trim()) {
      setValidationError("Please enter your relation");
      return false;
    }

    if (!formData.age.trim()) {
      setValidationError("Please enter your age");
      return false;
    } else if (isNaN(formData.age) || parseInt(formData.age) <= 0) {
      setValidationError("Please enter a valid age");
      return false;
    }

    if (!formData.address.trim()) {
      setValidationError("Please enter your address");
      return false;
    }
     if (!formData.firstParty) {
      setValidationError("Please enter who will pay the stamp duty");
      return false;
    }
    if (!formData.secondParty) {
      setValidationError("Please enter the second party details");
      return false;
    }

    if (!formData.aadhaarNo.trim()) {
      setValidationError("Please enter your Aadhaar number");
      return false;
    } else if (!/^\d{12}$/.test(formData.aadhaarNo)) {
      setValidationError("Aadhaar number must be 12 digits");
      return false;
    }

    if (!formData.vehicleNo.trim()) {
      setValidationError("Please enter your vehicle number");
      return false;
    }

    if (!formData.vehicleModel.trim()) {
      setValidationError("Please enter your vehicle model");
      return false;
    }

    if (!formData.engineNo.trim()) {
      setValidationError("Please enter your engine number");
      return false;
    }

    if (!formData.chassisNo.trim()) {
      setValidationError("Please enter your chassis number");
      return false;
    }

    if (!formData.insurer.trim()) {
      setValidationError("Please enter your insurer name");
      return false;
    }

    if (!formData.policyNo.trim()) {
      setValidationError("Please enter your policy number");
      return false;
    }

    if (!formData.policyStart.trim()) {
      setValidationError("Please enter your policy start date");
      return false;
    }

    if (!formData.policyEnd.trim()) {
      setValidationError("Please enter your policy end date");
      return false;
    }

    if (!formData.driverName.trim()) {
      setValidationError("Please enter driver's name");
      return false;
    }

    if (!formData.accidentDetails.trim()) {
      setValidationError("Please enter accident details");
      return false;
    }

    if (!formData.place.trim()) {
      setValidationError("Please enter the place");
      return false;
    }

    if (
      !formData.day.trim() ||
      !formData.month.trim() ||
      !formData.year.trim()
    ) {
      setValidationError("Please enter the complete date");
      return false;
    }

    return true;
  };

  const handleSubmitButtonClick = (e) => {
    e.preventDefault();

    // Save form data before proceeding
    saveFormData();

    // Validate form before showing mobile modal
    if (validateForm()) {
      setShowMobileModal(true);
    } else {
      setShowErrorNotification(true);
      // Auto-hide the error notification after 5 seconds
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

      const response = await sendVehicleInsurenceData(dataWithMobile);
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
          formId: "DM-VIC-11",
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
    <div className="container-fluid mx-auto p-2 sm:p-4 lg:p-6">
      {/* Add Error Notification Component */}
      {showErrorNotification && validationError && (
        <ErrorNoification
          validationError={validationError}
          setShowErrorNotification={setShowErrorNotification}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-8">
        {/* Left column: Form */}
        <div className="print:hidden w-full">
          <VehicleInsuranceClamingForm
            formData={formData}
            handleChange={handleChange}
          />
          {submissionError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded text-sm sm:text-base">
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

      <div className="mt-6 sm:mt-8 flex flex-col items-center px-2 sm:px-4">
        <button
          onClick={handleSubmitButtonClick}
          disabled={isSubmitting}
          className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-base sm:text-lg w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 mb-4 transition duration-300 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
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
              <span className="text-sm sm:text-base">Submitting...</span>
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
};

export default VehicleInsuranceClaming;
