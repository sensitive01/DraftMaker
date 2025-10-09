import { useEffect, useState } from "react";
import RentalForm from "./RentalForm";
import RentalPreview from "./RentalPreview";
import { useNavigate, useParams } from "react-router-dom";

import SuccessNotification from "../../serviceNotification/SuccessNotification";
import {
  getDocumentPrviewPage,
  updateAggrementData,
} from "../../../../api/service/axiosService";
import ErrorNoification from "../../serviceNotification/ErrorNoification";

export default function PreviewRentalAgreement() {
  const navigate = useNavigate();
  const { bookingId } = useParams();

  const [formData, setFormData] = useState({
    formId: "DM-RFD-18",
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
    lessorAddressLine1: "",
    lessorAddressLine2: "",
    lessorCity: "",
    lessorState: "",
    lessorPinCode: "",
    lesseeAadhaar: "",
    lesseePermanentAddressLine1: "",
    lesseePermanentAddressLine2: "",
    lesseePermanentCity: "",
    lesseePermanentState: "",
    lesseePermanentPinCode: "",
    rentAmount: "",
    rentAmountWords: "",
    rentDueDate: "5",
    depositAmount: "",
    depositAmountWords: "",
    agreementStartDate: "",
    agreementEndDate: "",
    rentIncreasePercentage: "",
    noticePeriod: "",
    terminationPeriod: "",
    paintingCharges: "",
    usePurpose: "RESIDENTIAL PURPOSE",
    bhkConfig: "",
    bedroomCount: "",
    hallCount: "",
    kitchenCount: "",
    toiletCount: "",
    additionaldetails: "",
    fixtures: [{ item: "", quantity: "" }],
    firstParty: "",
    secondParty: "",
    stampDutyPayer: "",
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

    if (showErrorNotification) {
      setShowErrorNotification(false);
      setValidationError("");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
  const getAllParties = () => {
    const parties = [];

    formData.lessors.forEach((lessor, index) => {
      if (lessor.name.trim()) {
        parties.push({
          value: lessor.name, // Store the actual name
          label: `Lessor: ${lessor.name}`,
          type: "lessor",
          index: index,
        });
      }
    });

    formData.lessees.forEach((lessee, index) => {
      if (lessee.name.trim()) {
        parties.push({
          value: lessee.name, // Store the actual name
          label: `Lessee: ${lessee.name}`,
          type: "lessee",
          index: index,
        });
      }
    });

    return parties;
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
    setFormData((prev) => ({
      ...prev,
      fixtures: updatedFixtures,
    }));
  };

  const addFixture = () => {
    setFormData((prev) => ({
      ...prev,
      fixtures: [...prev.fixtures, { item: "", quantity: "" }],
    }));
  };

  const removeFixture = (index) => {
    const updatedFixtures = formData.fixtures.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      fixtures: updatedFixtures,
    }));
  };

  // Add form validation function
  const validateForm = () => {
    if (!formData.agreementDate.trim()) {
      setValidationError("Please enter the agreement date");
      return false;
    }

    if (!formData.rentAmount.trim()) {
      setValidationError("Please enter rent amount");
      return false;
    } else if (
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

    if (!formData.depositAmount.trim()) {
      setValidationError("Please enter deposit amount");
      return false;
    } else if (
      isNaN(formData.depositAmount) ||
      parseFloat(formData.depositAmount) <= 0
    ) {
      setValidationError("Please enter a valid deposit amount");
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
    if (!formData.stampDutyPayer) {
      setValidationError("Please select who will pay the stamp duty");
      return false;
    }

    if (!formData.depositAmountWords.trim()) {
      setValidationError("Please enter deposit amount in words");
      return false;
    }
    if (!formData.firstParty) {
      setValidationError("Please select who will pay the stamp duty");
      return false;
    }

    if (!formData.noticePeriod.trim()) {
      setValidationError("Please enter notice period");
      return false;
    }

    if (!formData.bhkConfig.trim()) {
      setValidationError("Please enter BHK configuration");
      return false;
    }

    if (!formData.bedroomCount.trim()) {
      setValidationError("Please enter bedroom count");
      return false;
    } else if (
      isNaN(formData.bedroomCount) ||
      parseInt(formData.bedroomCount) < 0
    ) {
      setValidationError("Please enter a valid bedroom count");
      return false;
    }

    if (!formData.hallCount.trim()) {
      setValidationError("Please enter hall count");
      return false;
    } else if (isNaN(formData.hallCount) || parseInt(formData.hallCount) < 0) {
      setValidationError("Please enter a valid hall count");
      return false;
    }

    if (!formData.toiletCount.trim()) {
      setValidationError("Please enter toilet count");
      return false;
    } else if (
      isNaN(formData.toiletCount) ||
      parseInt(formData.toiletCount) < 0
    ) {
      setValidationError("Please enter a valid toilet count");
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

      <div className="flex flex-col md:flex-row gap-6 md:items-start">
        <div className="w-full md:w-1/2">
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
            getAllParties={getAllParties}
          />
          {submissionError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              {submissionError}
            </div>
          )}
        </div>
        <div
          className="w-full md:w-1/2 bg-white shadow-lg rounded-lg"
          style={{ height: "2300px", overflowY: "scroll" }}
        >
          <RentalPreview formData={formData} />
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
