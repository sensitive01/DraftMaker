import { useState, useEffect } from "react";
import RentalForm from "./RentalForm";
import RentalPreview from "./RentalPreview";
import { useNavigate, useParams } from "react-router-dom";
import PaymentConfirmation from "../serviceNotification/PaymentConfirmation";
import ServicePackageNotification from "../serviceNotification/ServicePackageNotification";
import MobileNumberInput from "../serviceNotification/MobileNumberInput";
import ErrorNoification from "../serviceNotification/ErrorNoification";
import {
  createRecidentailPaymentData,
  sendRecidentailData,
} from "../../../api/service/axiosService";

export default function RentalAgreementForm() {
  const navigate = useNavigate();
  const { type } = useParams();
  const STORAGE_KEY = "rentalAgreement_temp"; // Key for sessionStorage

  // Load saved data from sessionStorage or use defaults
  const getSavedData = () => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : {
            formId: "DM-RFD-18",
            agreementDate: "",
            agreementStartDate: "",
            agreementEndDate: "",
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
            rentDueDate: "5",
            depositAmount: "",
            depositAmountWords: "",
            rentIncreasePercentage: "",
            noticePeriod: "",
            terminationPeriod: "",
            paintingCharges: "",
            usePurpose: "RESIDENTIAL PURPOSE",
            propertyAddress: "",
            bhkConfig: "",
            bedroomCount: "",
            hallCount: "",
            kitchenCount: "",
            toiletCount: "",
            additionaldetails: "",
            fixtures: [{ item: "", quantity: "" }],
            agreeTerms: false,
            firstParty: "",
            secondParty: "",
            stampDutyPayer: "",
          };
    } catch {
      return {
        formId: "DM-RFD-18",
        agreementDate: "",
        agreementStartDate: "",
        agreementEndDate: "",
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
        rentDueDate: "5",
        depositAmount: "",
        depositAmountWords: "",
        rentIncreasePercentage: "",
        noticePeriod: "",
        terminationPeriod: "",
        paintingCharges: "",
        usePurpose: "RESIDENTIAL PURPOSE",
        propertyAddress: "",
        bhkConfig: "",
        bedroomCount: "",
        hallCount: "",
        kitchenCount: "",
        toiletCount: "",
        additionaldetails: "",
        fixtures: [{ item: "", quantity: "" }],
        agreeTerms: false,
        firstParty: "",
        secondParty: "",
      };
    }
  };

  const [formData, setFormData] = useState(getSavedData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [documentDetails, setDocumentDetails] = useState(null);
  const [userName, setUserName] = useState();
  const [validationError, setValidationError] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);

  // Save formData to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (showErrorNotification) {
      setShowErrorNotification(false);
      setValidationError("");
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addLessor = () => {
    setFormData((prev) => ({
      ...prev,
      lessors: [
        ...prev.lessors,
        {
          name: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          pinCode: "",
        },
      ],
    }));
  };

  const removeLessor = (index) => {
    setFormData((prev) => ({
      ...prev,
      lessors: prev.lessors.filter((_, i) => i !== index),
    }));
  };

  const addLessee = () => {
    setFormData((prev) => ({
      ...prev,
      lessees: [
        ...prev.lessees,
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
    }));
  };

  const removeLessee = (index) => {
    setFormData((prev) => ({
      ...prev,
      lessees: prev.lessees.filter((_, i) => i !== index),
    }));
  };

  const handleLessorChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      lessors: prev.lessors.map((lessor, i) =>
        i === index ? { ...lessor, [name]: value } : lessor
      ),
    }));
  };

  const handleLesseeChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      lessees: prev.lessees.map((lessee, i) =>
        i === index ? { ...lessee, [name]: value } : lessee
      ),
    }));
  };

  const handleFixtureChange = (index, field, value) => {
    if (showErrorNotification) {
      setShowErrorNotification(false);
      setValidationError("");
    }
    const updatedFixtures = [...formData.fixtures];
    updatedFixtures[index] = { ...updatedFixtures[index], [field]: value };
    setFormData((prev) => ({ ...prev, fixtures: updatedFixtures }));
  };

  const addFixture = () =>
    setFormData((prev) => ({
      ...prev,
      fixtures: [...prev.fixtures, { item: "", quantity: "" }],
    }));
  const removeFixture = (index) =>
    setFormData((prev) => ({
      ...prev,
      fixtures: prev.fixtures.filter((_, i) => i !== index),
    }));

  // Comprehensive validation function
  const validateForm = () => {
    // Agreement Details validation
    if (!formData.agreementDate.trim()) {
      setValidationError("Please enter the agreement date");
      return false;
    }
    if (!formData.agreementStartDate.trim()) {
      setValidationError("Please enter the agreement start date");
      return false;
    }

    // Lessor validation
    if (!formData.lessors[0].name.trim()) {
      setValidationError("Please enter lessor name");
      return false;
    }
    if (!formData.lessors[0].city.trim()) {
      setValidationError("Please enter lessor city");
      return false;
    }
    if (!formData.lessors[0].state.trim()) {
      setValidationError("Please enter lessor state");
      return false;
    }
    if (!formData.lessors[0].pinCode.trim()) {
      setValidationError("Please enter lessor pin code");
      return false;
    }
    if (!formData.lessors[0].addressLine1.trim()) {
      setValidationError("Please enter lessor address");
      return false;
    }
    if (!formData.stampDutyPayer) {
      setValidationError("Please select who will pay the stamp duty");
      return false;
    }

    // Lessee validation
    if (!formData.lessees[0].name.trim()) {
      setValidationError("Please enter lessee name");
      return false;
    }
    if (!formData.lessees[0].aadhaar.trim()) {
      setValidationError("Please enter lessee Aadhaar number");
      return false;
    }
    if (!/^\d{12}$/.test(formData.lessees[0].aadhaar)) {
      setValidationError("Please enter a valid 12-digit Aadhaar number");
      return false;
    }
    if (!formData.lessees[0].permanentCity.trim()) {
      setValidationError("Please enter lessee city");
      return false;
    }
    if (!formData.lessees[0].permanentState.trim()) {
      setValidationError("Please enter lessee state");
      return false;
    }
    if (!formData.lessees[0].permanentPinCode.trim()) {
      setValidationError("Please enter lessee pin code");
      return false;
    }
    if (!formData.lessees[0].permanentAddressLine1.trim()) {
      setValidationError("Please enter lessee permanent address");
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

    // Rent & Financial validation
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
    if (!formData.noticePeriod.trim()) {
      setValidationError("Please enter notice period");
      return false;
    }

    // Property Details validation
    if (!formData.propertyAddress.trim()) {
      setValidationError("Please enter the property address");
      return false;
    }
    if (!formData.bhkConfig.trim()) {
      setValidationError("Please enter BHK configuration");
      return false;
    }
    if (
      !formData.bedroomCount.trim() ||
      isNaN(formData.bedroomCount) ||
      parseInt(formData.bedroomCount) < 0
    ) {
      setValidationError("Please enter a valid bedroom count");
      return false;
    }
    if (
      !formData.hallCount.trim() ||
      isNaN(formData.hallCount) ||
      parseInt(formData.hallCount) < 0
    ) {
      setValidationError("Please enter a valid hall count");
      return false;
    }
    if (
      !formData.toiletCount.trim() ||
      isNaN(formData.toiletCount) ||
      parseInt(formData.toiletCount) < 0
    ) {
      setValidationError("Please enter a valid toilet count");
      return false;
    }

    // Terms validation
    if (!formData.agreeTerms) {
      setValidationError("Please agree to the terms and conditions");
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
      setTimeout(() => setShowErrorNotification(false), 5000);
    }
  };

  const handleMobileSubmit = async () => {
    if (!mobileNumber.trim() || !/^[0-9]{10}$/.test(mobileNumber)) {
      setMobileError("Please enter a valid 10-digit mobile number");
      return;
    }
    setMobileError("");
    setShowMobileModal(false);
    setIsSubmitting(true);
    setSubmissionError("");

    try {
      const dataWithMobile = { ...formData, mobileNumber, userName };
      const response = await sendRecidentailData(dataWithMobile);
      const responseData = response.data;
      setBookingId(responseData.bookingId || "");
      setDocumentDetails(responseData.documentDetails || null);
      navigate("/documents/payment-page", {
        state: {
          bookingId: responseData.bookingId,
          documentDetails: responseData.documentDetails,
          mobileNumber,
          userName,
          formId: "DM-RFD-18",
        },
      });
    } catch (error) {
      setSubmissionError(
        error.message || "An error occurred while submitting your form"
      );
      setIsSubmitting(false);
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

      <div className="flex flex-col md:flex-row gap-6 md:items-start">
        <div className="w-full">
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
