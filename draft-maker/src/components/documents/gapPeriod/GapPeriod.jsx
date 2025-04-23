import { useState } from "react";
import GapPeriodForm from "./GapPeriodForm";
import AffidavitDisplay from "./GapPeriodPreview"; // Make sure this import matches your actual file name

export default function GapPeriod() {
  const [formData, setFormData] = useState({
    name: "",
    relation: "S/o",
    relationName: "",
    age: "",
    address: "",
    aadhaarNo: "",
    authority: "",
    place: "",
    day: "",
    month: "",
    year: "",
    gapPeriods: [{ from: "", to: "", reason: "" }],
  });

  const [showPreview, setShowPreview] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGapPeriodChange = (index, field, value) => {
    const updatedGapPeriods = [...formData.gapPeriods];
    updatedGapPeriods[index][field] = value;
    setFormData({ ...formData, gapPeriods: updatedGapPeriods });
  };

  const addGapPeriod = () => {
    setFormData({
      ...formData,
      gapPeriods: [...formData.gapPeriods, { from: "", to: "", reason: "" }],
    });
  };

  const removeGapPeriod = (index) => {
    if (formData.gapPeriods.length > 1) {
      const updatedGapPeriods = formData.gapPeriods.filter(
        (_, i) => i !== index
      );
      setFormData({ ...formData, gapPeriods: updatedGapPeriods });
    }
  };

  const handleEdit = () => {
    setShowPreview(false);
  };

  return (
    <div className="container-fluid mx-auto py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left column: Form */}
        <div className="print:hidden">
          <GapPeriodForm
            formData={formData}
            handleGapPeriodChange={handleGapPeriodChange}
            handleChange={handleChange}
            addGapPeriod={addGapPeriod}
            removeGapPeriod={removeGapPeriod}
          />
        </div>

        {/* Right column: Preview */}
        <div>
          <AffidavitDisplay
            data={formData} // Changed from formData to data to match your AffidavitDisplay component
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
}
