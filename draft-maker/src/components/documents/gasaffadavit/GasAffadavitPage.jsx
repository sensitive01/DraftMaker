import { useState } from "react";
import GasAffadavitForm from "./GasAffadavitForm";
import GasAffadavitPreview from "./GasAffadavitPreview";

export default function GasAffidavitForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    relation: "S/o", // Default relation
    age: "",
    permanentAddress: "",
    aadhaarNo: "",
    gasCompanyName: "",
    serviceAddress: "",
    connectionDate: "",
    consumerNumber: "",
    subscriptionVoucher: "",
    cylinderCount: "1",
    regulatorCount: "1",
    depositAmount: "",
    previousAddress: "",
    reason: "shifting", // Default reason: shifting or terminate
    lostItem: "subscription", // Default lost item: subscription or termination
    place: "",
    day: "",
    month: "",
    year: "",
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
          <GasAffadavitForm formData={formData} handleChange={handleChange} />
        </div>

        {/* Right column: Preview */}
        <div>
          <GasAffadavitPreview formData={formData} />
        </div>
      </div>
    </div>
  );
}
