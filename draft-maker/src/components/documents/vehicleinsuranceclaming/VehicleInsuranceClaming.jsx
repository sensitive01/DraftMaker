import { useState } from "react";
import VehicleInsuranceClamingForm from "./VehicleInsuranceClamingForm";
import VehicleInsuranceClamingPreview from "./VehicleInsuranceClamingPreview";

const VehicleInsuranceClaming = () => {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    relation: "",
    age: "",
    address: "",
    aadhaarNo: "",
    vehicleNo: "",
    vehicleModel: "",
    engineNo: "",
    chassisNo: "",
    insurer: "",
    policyNo: "",
    policyStart: "",
    policyEnd: "",
    driverName: "",
    accidentDetails: "",
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
    <div className="container-fluid mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Vehicle Insurance Form
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left column: Form */}
        <div className="print:hidden">
          <VehicleInsuranceClamingForm
            formData={formData}
            handleChange={handleChange}
          />
        </div>

        {/* Right column: Preview */}
        <div>
          <VehicleInsuranceClamingPreview formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default VehicleInsuranceClaming;
