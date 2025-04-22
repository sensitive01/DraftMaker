import React, { useState } from "react";
import BirthCertificateParentNameCorrectionForm from "./BirthCertificateParentNameCorrectionForm";
import BirtCertificateParentNameCorrectionPreview from "./BirtCertificateParentNameCorrectionPreview";

// Main Page Component containing both form and preview
export default function BirthCertificateParentNameCorrectionPage() {
  const [formData, setFormData] = useState({
    fatherTitle: "Mr.",
    fatherName: "",
    motherTitle: "Mrs.",
    motherName: "",
    address: "",
    fatherAadhaar: "",
    motherAadhaar: "",
    childRelation: "Daughter",
    childName: "",
    certificateNumber: "",
    incorrectFatherName: "",
    incorrectMotherName: "",
    correctFatherName: "",
    correctMotherName: "",
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
        Birth Certificate Parents' Name Correction
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left column: Form */}
        <div className="print:hidden">
          <BirthCertificateParentNameCorrectionForm
            formData={formData}
            handleChange={handleChange}
          />
        </div>

        {/* Right column: Preview */}
        <div>
          <BirtCertificateParentNameCorrectionPreview formData={formData} />
        </div>
      </div>
    </div>
  );
}
