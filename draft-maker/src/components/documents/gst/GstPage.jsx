import { useState } from "react";
import GstForm from "./GstForm";
import GstPreview from "./GstPreview";

export default function GstPage() {
  const [formData, setFormData] = useState({
    ownerName: "",
    aadhaarNo: "",
    ownerAddress: "",
    premisesAddress: "",
    tenantName: "",
    companyName: "",
    officeAddress: "",
    place: "",
    day: "",
    month: "",
    year: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container-fluid mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        GST No Objection Certificate
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left column: Form */}
        <div className="print:hidden">
          <GstForm formData={formData} handleChange={handleChange} />
        </div>

        {/* Right column: Preview */}
        <div>

          <GstPreview formData={formData} />
        </div>
      </div>
    </div>
  );
}
