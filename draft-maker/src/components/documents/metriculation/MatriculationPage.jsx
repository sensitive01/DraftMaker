import React, { useState } from "react";
import MetriculationForm from "./MetriculationForm";
import MetriculationPreview from "./MetriculationPreview";

const MatriculationPage = () => {
  const [formData, setFormData] = useState({
    // Personal details
    name: "",
    relation: "",
    age: "",
    address: "",
    aadhaar: "",

    // Document details
    year: "",
    semester: "",
    program: "",
    authority: "",
    collegeName: "",
    batch: "",
    regNumber: "",
    documentName: "Matriculation Certificate",

    // Verification
    place: "",
    day: "",
    month: "",
    year_verification: "",
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
        Matriculation Certificate Lost Affidavit
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left column: Form */}
        <div className="print:hidden">
          <MetriculationForm formData={formData} handleChange={handleChange} />
        </div>

        {/* Right column: Preview */}
        <div>
          <MetriculationPreview formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default MatriculationPage;
