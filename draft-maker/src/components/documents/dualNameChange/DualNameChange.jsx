import { useState, useRef } from "react";
import DualNameChangePreview from "./DualNameChangePreview";
import DualNameChangeForm from "./DualNameChangeForm";
import html2pdf from "html2pdf.js";

export default function DualNameChange() {
  const [formData, setFormData] = useState({
    fullName: "",
    relation: "S/o", // Default relation
    relationName: "",
    age: "",
    permanentAddress: "",
    aadhaarNo: "",
    name1: "",
    document1: "",
    documentNo1: "",
    name2: "",
    document2: "",
    documentNo2: "",
    place: "",
    day: "",
    month: "",
    year: "2024",
  });

  const [isPrinting, setIsPrinting] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const previewRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const downloadAsPDF = () => {
    if (!previewRef.current) return;

    setIsPrinting(true);

    // Configure html2pdf options for A4 size
    const opt = {
      margin: 0,
      filename: `Dual_Name_Affidavit_${formData.fullName || "Document"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    // Generate PDF
    html2pdf()
      .from(previewRef.current)
      .set(opt)
      .save()
      .then(() => {
        setIsPrinting(false);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        alert("Failed to generate PDF. Please try again.");
        setIsPrinting(false);
      });
  };

  return (
    <div className="container-fluid mx-auto py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left column: Form */}
        <div className="print:hidden">
          <DualNameChangeForm formData={formData} handleChange={handleChange} />
        </div>

        {/* Right column: Preview */}
        <div>
          <DualNameChangePreview formData={formData} />
        </div>
      </div>
    </div>
  );
}
