import { useEffect, useState } from "react";
import VehicleInsuranceClamingForm from "./VehicleInsuranceClamingForm";
import VehicleInsuranceClamingPreview from "./VehicleInsuranceClamingPreview";

import { useNavigate, useParams } from "react-router-dom";
import SuccessNotification from "../../serviceNotification/SuccessNotification";
import ErrorNoification from "../../serviceNotification/ErrorNoification";
import {
  getDocumentPrviewPage,
  updateAggrementData,
} from "../../../../api/service/axiosService";

const PreviewVehicleInsuranceClamingPage = () => {
  const { bookingId } = useParams();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    formId: "DM-VIC-11",
    title: "",
    name: "",

    relation: "",
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
    <div className="container-fluid mx-auto p-2 sm:p-4 lg:p-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
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
        </div>

        {/* Right column: Preview */}
        <div className="w-full">
          <VehicleInsuranceClamingPreview formData={formData} />
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

export default PreviewVehicleInsuranceClamingPage;
