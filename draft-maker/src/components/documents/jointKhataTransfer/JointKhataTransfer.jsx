import React, { useState } from "react";
import JoinKhataTransferForm from "./JoinKhataTransferForm";
import JoinKhataTransferPreview from "./JoinKhataTransferPreview";

const JointKhataTransfer = () => {
  const [formData, setFormData] = useState({
    // First applicant
    name1: "",
    relation1: "",
    age1: "",
    address1: "",
    aadhaar1: "",

    // Second applicant
    name2: "",
    relation2: "",
    age2: "",
    address2: "",
    aadhaar2: "",

    // Property details
    propertyAddress: "",
    wardNumber: "",
    zone: "",
    authority: "BBMP",
    khataNo: "",
    sasNumber: "",

    // Authorization
    authorizedPerson: "",

    // Verification
    place: "",
    day: "",
    month: "",
    year: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container-fluid mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Joint Khata Transfer Application
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left column: Form */}
        <div className="print:hidden">
          <JoinKhataTransferForm
            formData={formData}
            handleChange={handleChange}
          />
        </div>

        {/* Right column: Preview */}
        <div>
     
          <JoinKhataTransferPreview formData={formData} />
        </div>
      </div>
    </div>
  );
};
export default JointKhataTransfer;
