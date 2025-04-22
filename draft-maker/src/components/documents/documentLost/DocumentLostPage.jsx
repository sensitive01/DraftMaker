import React, { useState } from "react";
import DocumentLostForm from "./DocumentLostForm";
import DocumentLostPreview from "./DocumentLostPreview";

// Main Page Component containing both form and preview
export default function DocumentLostPage() {
  const [formData, setFormData] = useState({
    personTitle: "Mr.",
    personName: "",
    relationType: "S/o",
    relationName: "",
    age: "",
    address: "",
    aadhaarNumber: "",
    documentType: "",
    documentNumber: "",
    firNumber: "",
    firDay: "",
    firMonth: "",
    firYear: "",
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
      <h1 className="text-2xl font-bold text-center mb-6">
        Document Loss Affidavit
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left column: Form */}
        <div className="print:hidden">
          <DocumentLostForm formData={formData} handleChange={handleChange} />
        </div>

        {/* Right column: Preview */}
        <div>
          <DocumentLostPreview formData={formData} />
        </div>
      </div>
    </div>
  );
}
