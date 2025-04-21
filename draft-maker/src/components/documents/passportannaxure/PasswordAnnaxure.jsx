import { useState } from "react";
import PassportAnnaxureForm from "./PassportAnnaxureForm";
import PassportAnnaxurePreview from "./PassportAnnaxurePreview";

export default function PasswordAnnaxure() {
  // Initialize state with default values
  const [formData, setFormData] = useState({
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
    residences: [
      { country: "", periodFrom: "", periodTo: "", pageNos: "" },
      { country: "", periodFrom: "", periodTo: "", pageNos: "" },
      { country: "", periodFrom: "", periodTo: "", pageNos: "" },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDetailChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleResidenceChange = (index, field, value) => {
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


  return (
    <div className="container-fluid mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Annexure F - Passport Declaration Form
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left column: Form */}
        <div className="print:hidden">
          <PassportAnnaxureForm
            formData={formData}
            handleChange={handleChange}
            handleDetailChange={handleDetailChange}
            handleResidenceChange={handleResidenceChange}
            handleSignatureCheck={handleSignatureCheck}
          />
        </div>

        {/* Right column: Preview */}
        <div>
          <PassportAnnaxurePreview formData={formData} />
        </div>
      </div>
    </div>
  );
}
