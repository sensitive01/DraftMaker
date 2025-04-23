import { useState } from "react";
import DobCorrectionForm from "./DobCorrectionForm";
import DobCorrectionPreview from "./DobCorrectionPreview";

export default function DobCorrectionPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    relation: "S/o", // Default relation
    relationName: "",
    age: "",
    permanentAddress: "",
    aadhaarNo: "",
    dob1: "",
    document1: "",
    documentNo1: "",
    dob2: "",
    document2: "",
    documentNo2: "",
    place: "",
    day: "",
    month: "",
    year: "2024",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container-fluid mx-auto py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left column: Form */}
        <div className="print:hidden">
          <DobCorrectionForm formData={formData} handleChange={handleChange} />
        </div>

        {/* Right column: Preview */}
        <div>
          <DobCorrectionPreview formData={formData} />
        </div>
      </div>
    </div>
  );
}
