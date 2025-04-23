import { useState } from "react";
import NameCorrectionForm from "./NameCorrectionForm";
import NameCorrectionPreview from "./NameCorrectionPreview";

export default function NameCorrectionChange() {
  const [formData, setFormData] = useState({
    fullName: "",
    relation: "S/o", // Default relation
    relationName: "",
    age: "",
    permanentAddress: "",
    aadhaarNo: "",
    oldName: "",
    newName: "",
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
          <NameCorrectionForm
            formData={formData}
            handleChange={handleChange}
     
          />
        </div>

        {/* Right column: Preview */}
        <div>
          <NameCorrectionPreview
            formData={formData}
          />
        </div>
      </div>
    </div>
  );
}
