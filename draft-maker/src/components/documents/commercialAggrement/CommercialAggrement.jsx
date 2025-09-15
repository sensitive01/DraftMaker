import { useState } from "react";
import RentalForm from "./CommercialForm";
import CommercialPreview from "./CommercialPreview";
import { useNavigate, useParams } from "react-router-dom";
import PaymentConfirmation from "../serviceNotification/PaymentConfirmation";
import ServicePackageNotification from "../serviceNotification/ServicePackageNotification";
import MobileNumberInput from "../serviceNotification/MobileNumberInput";
import ErrorNotification from "../serviceNotification/ErrorNoification"; // Import the error notification component
import {
  createCommercialPaymentData,
  sendCommercialData,
} from "../../../api/service/axiosService";

export default function CommercialAggrement() {
  const navigate = useNavigate();
  const { type } = useParams();
  const STORAGE_KEY = "commercialAgreement_temp";

  // Load saved data from sessionStorage or use defaults
  const getSavedData = () => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : {
            agreementDate: "",
            lessors: [
              {
                name: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                pinCode: "",
              },
            ],
            lessees: [
              {
                name: "",
                aadhaar: "",
                permanentAddressLine1: "",
                permanentAddressLine2: "",
                permanentCity: "",
                permanentState: "",
                permanentPinCode: "",
              },
            ],
            rentAmount: "",
            rentAmountWords: "",
            depositAmount: "",
            depositAmountWords: "",
            rentDueDate: "5",
            agreementStartDate: "",
            agreementEndDate: "",
            noticePeriod: "",
            fixtures: [{ item: "", quantity: "" }],
            formId: "DM-CFD-17",
            bhkConfig: "",
            bedroomCount: "",
            hallCount: "",
            kitchenCount: "",
            toiletCount: "",
            commercialType: "",
            squareFeet: "",
            additionaldetails: "",
          };
    } catch {
      return {
        agreementDate: "",
        lessors: [
          {
            name: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            pinCode: "",
          },
        ],
        lessees: [
          {
            name: "",
            aadhaar: "",
            permanentAddressLine1: "",
            permanentAddressLine2: "",
            permanentCity: "",
            permanentState: "",
            permanentPinCode: "",
          },
        ],
        rentAmount: "",
        rentAmountWords: "",
        depositAmount: "",
        depositAmountWords: "",
        rentDueDate: "5",
        agreementStartDate: "",
        agreementEndDate: "",
        noticePeriod: "",
        fixtures: [{ item: "", quantity: "" }],
        formId: "DM-CFD-17",
        bhkConfig: "",
        bedroomCount: "",
        hallCount: "",
        kitchenCount: "",
        toiletCount: "",
        commercialType: "",
        squareFeet: "",
        additionaldetails: "",
      };
    }
  };

  const [formData, setFormData] = useState(getSavedData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [documentDetails, setDocumentDetails] = useState(null);
  const [userName, setUserName] = useState();

  // Save to sessionStorage
  const saveFormData = (data) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  // Handle input changes with auto-save
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (showErrorNotification) {
      setShowErrorNotification(false);
      setValidationError("");
    }

    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    saveFormData(updatedData);
  };

  // Lessor and Lessee handlers
  const addLessor = () => {
    const updatedData = {
      ...formData,
      lessors: [
        ...formData.lessors,
        {
          name: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          pinCode: "",
        },
      ],
    };
    setFormData(updatedData);
    saveFormData(updatedData);
  };
  const removeLessor = (index) => {
    const updatedData = {
      ...formData,
      lessors: formData.lessors.filter((_, i) => i !== index),
    };
    setFormData(updatedData);
    saveFormData(updatedData);
  };
  const handleLessorChange = (index, e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      lessors: formData.lessors.map((lessor, i) =>
        i === index ? { ...lessor, [name]: value } : lessor
      ),
    };
    setFormData(updatedData);
    saveFormData(updatedData);
  };

  const addLessee = () => {
    const updatedData = {
      ...formData,
      lessees: [
        ...formData.lessees,
        {
          name: "",
          aadhaar: "",
          permanentAddressLine1: "",
          permanentAddressLine2: "",
          permanentCity: "",
          permanentState: "",
          permanentPinCode: "",
        },
      ],
    };
    setFormData(updatedData);
    saveFormData(updatedData);
  };
  const removeLessee = (index) => {
    const updatedData = {
      ...formData,
      lessees: formData.lessees.filter((_, i) => i !== index),
    };
    setFormData(updatedData);
    saveFormData(updatedData);
  };
  const handleLesseeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      lessees: formData.lessees.map((lessee, i) =>
        i === index ? { ...lessee, [name]: value } : lessee
      ),
    };
    setFormData(updatedData);
    saveFormData(updatedData);
  };

  // Fixtures
  const handleFixtureChange = (index, field, value) => {
    const updatedFixtures = [...formData.fixtures];
    updatedFixtures[index] = { ...updatedFixtures[index], [field]: value };
    const updatedData = { ...formData, fixtures: updatedFixtures };
    setFormData(updatedData);
    saveFormData(updatedData);
  };
  const addFixture = () => {
    const updatedData = {
      ...formData,
      fixtures: [...formData.fixtures, { item: "", quantity: "" }],
    };
    setFormData(updatedData);
    saveFormData(updatedData);
  };
  const removeFixture = (index) => {
    const updatedData = {
      ...formData,
      fixtures: formData.fixtures.filter((_, i) => i !== index),
    };
    setFormData(updatedData);
    saveFormData(updatedData);
  };

  // Form validation
  const validateForm = () => {
    if (
      !formData.rentAmount.trim() ||
      isNaN(formData.rentAmount) ||
      parseFloat(formData.rentAmount) <= 0
    ) {
      setValidationError("Please enter a valid rent amount");
      return false;
    }
    if (!formData.rentAmountWords.trim()) {
      setValidationError("Please enter rent amount in words");
      return false;
    }
    if (
      !formData.depositAmount.trim() ||
      isNaN(formData.depositAmount) ||
      parseFloat(formData.depositAmount) <= 0
    ) {
      setValidationError("Please enter a valid deposit amount");
      return false;
    }
    if (!formData.depositAmountWords.trim()) {
      setValidationError("Please enter deposit amount in words");
      return false;
    }
    if (!formData.agreementDate.trim()) {
      setValidationError("Please enter agreement date");
      return false;
    }
    if (
      !formData.noticePeriod.trim() ||
      isNaN(formData.noticePeriod) ||
      parseInt(formData.noticePeriod) <= 0
    ) {
      setValidationError("Please enter a valid notice period in months");
      return false;
    }
    const hasValidFixture = formData.fixtures.some(
      (f) => f.item.trim() && f.quantity.trim()
    );
    if (formData.fixtures.length > 0 && !hasValidFixture) {
      setValidationError(
        "Please enter at least one fixture item and quantity or remove empty entries"
      );
      return false;
    }
    return true;
  };

  // Submit handlers
  const handleSubmitButtonClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
      saveFormData(formData);
      setShowMobileModal(true);
    } else {
      setShowErrorNotification(true);
      setTimeout(() => setShowErrorNotification(false), 5000);
    }
  };

  const handleMobileSubmit = async () => {
    if (!mobileNumber.trim()) {
      setMobileError("Mobile number is required");
      return;
    }
    if (!/^[0-9]{10}$/.test(mobileNumber)) {
      setMobileError("Please enter a valid 10-digit mobile number");
      return;
    }
    setMobileError("");
    setShowMobileModal(false);
    setIsSubmitting(true);
    setSubmissionError("");
    try {
      const dataWithMobile = { ...formData, mobileNumber, userName };
      const response = await sendCommercialData(dataWithMobile);
      const responseData = response.data;
      setBookingId(responseData.bookingId || "");
      setDocumentDetails(responseData.documentDetails || null);
      navigate("/documents/payment-page", {
        state: {
          bookingId: responseData.bookingId,
          documentDetails: responseData.documentDetails,
          mobileNumber,
          userName,
          formId: "DM-CFD-17",
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
    <div className="container-fluid mx-auto p-4">
      {/* Add Error Notification Component */}
      {showErrorNotification && validationError && (
        <ErrorNotification
          validationError={validationError}
          setShowErrorNotification={setShowErrorNotification}
        />
      )}

      <div className="flex flex-col md:flex-row gap-6 md:items-start">
        <div className="w-full ">
          <RentalForm
            formData={formData}
            handleChange={handleChange}
            handleFixtureChange={handleFixtureChange}
            addFixture={addFixture}
            removeFixture={removeFixture}
            addLessor={addLessor}
            removeLessor={removeLessor}
            addLessee={addLessee}
            removeLessee={removeLessee}
            handleLessorChange={handleLessorChange}
            handleLesseeChange={handleLesseeChange}
          />
          {submissionError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
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
        {/* <div
          className="w-full md:w-1/2 bg-white shadow-lg rounded-lg"
          style={{ height: "2100px", overflowY: "scroll" }}
        >
          <CommercialPreview formData={formData} />
        </div> */}
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
    </div>
  );
}
