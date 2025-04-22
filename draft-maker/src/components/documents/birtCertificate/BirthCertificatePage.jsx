import React, { useState } from "react";
import BirtCertificatePreview from "./BirtCertificatePreview";
import BirtCertificateForm from "./BirtCertificateForm";

// Main Page Component containing both form and preview
export default function BirthCertificatePage() {
  const [formData, setFormData] = useState({
    parentTitle: "Mr.",
    parentName: "",
    spouseTitle: "Mrs.",
    spouseName: "",
    address: "",
    parentAadhaar: "",
    spouseAadhaar: "",
    childRelation: "Daughter",
    childName: "",
    certificateNumber: "",
    incorrectName: "",
    correctName: "",
    place: "",
    day: "",
    month: "April",
    year: "2024",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container-fluid mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Birth Certificate Name Correction
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left column: Form */}
        <div className="print:hidden">
          <BirtCertificateForm
            formData={formData}
            handleChange={handleChange}
          />
        </div>

        {/* Right column: Preview */}
        <div>
          <BirtCertificatePreview formData={formData} />
        </div>
      </div>
    </div>
  );
}
