import { useState } from "react";
import RentalForm from "./RentalForm";
import RentalPreview from "./RentalPreview";
import { useParams } from "react-router-dom";

export default function RentalAgreementForm() {
  const {type} = useParams()
  console.log("Type",type)
  const [formData, setFormData] = useState({
    agreementDate: "",
    lessorName: "",
    lessorAddressLine1: "",
    lessorAddressLine2: "",
    lessorCity: "",
    lessorState: "",
    lessorPinCode: "",
    lesseeName: "",
    lesseeAadhaar: "",
    lesseePermanentAddressLine1: "",
    lesseePermanentAddressLine2: "",
    lesseePermanentCity: "",
    lesseePermanentState: "",
    lesseePermanentPinCode: "",
    rentAmount: "",
    rentAmountWords: "",
    rentDueDate: "5", // Default is 5th of every month
    depositAmount: "",
    depositAmountWords: "",
    paymentMode: "", // Cash/Online
    agreementStartDate: "",
    agreementEndDate: "", // Optional: can calculate or allow user input
    rentIncreasePercentage: "",
    noticePeriod: "",
    terminationPeriod: "", // Termination if rent not paid for X months
    paintingCharges: "",
    usePurpose: "RESIDENTIAL PURPOSE",
    bhkConfig: "",
    bedroomCount: "",
    hallCount: "",
    kitchenCount: "",
    toiletCount: "",
    fixtures: [{ item: "", quantity: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFixtureChange = (index, field, value) => {
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

  return (
    <div className="container-fluid mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <RentalForm
            formData={formData}
            handleChange={handleChange}
            handleFixtureChange={handleFixtureChange}
            addFixture={addFixture}
            removeFixture={removeFixture}
          />
        </div>
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg">
          <RentalPreview formData={formData} />
        </div>
      </div>
    </div>
  );
}