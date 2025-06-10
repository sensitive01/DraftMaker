import React from "react";
import { getDayWithSuffix } from "../../../utils/dateFormat";

const DobCorrectionPreview = ({ formData }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-");
  };
  return (
    <div className="bg-white p-6 border border-gray-300 rounded shadow">
      <h1 className="text-xl font-bold text-center underline mb-6">
        AFFIDAVIT
      </h1>

      <p className="mb-4">
        I, {formData.fullName} {formData.relation} {formData.relationName},
        Aged: {formData.age} Years,
      </p>

      <p className="mb-4">Permanent Address {formData.permanentAddress}</p>

      <p className="mb-4">My Aadhaar No: {formData.aadhaarNo}</p>

      <p className="mb-4">Do hereby solemnly affirm and declare as under:</p>

      <div className="space-y-4 pl-2">
        <p>1. That I am the citizen of India.</p>
        <p>
          2. That my DOB has been recorded as {formatDate(formData.dob1)},{" "}
          {formData.document1}, {formData.documentNo1}
        </p>
        <p>
          3. That my DOB has been recorded as {formatDate(formData.dob2)},{" "}
          {formData.document2}, {formData.documentNo2}
        </p>
        <p>
          4. That I further declare that both the DOB mentioned hereinabove
          belongs to one and the same person i.e. "myself".
        </p>
        <p>5. That my statement is true and correct.</p>
      </div>

      <p className="mt-6">
        Verified at <strong>{formData.place}</strong> on this{" "}
        {getDayWithSuffix(formData.day)} {formData.month}, {formData.year} that
        the contents of the above said affidavit are true and correct to the
        best of my knowledge and belief.
      </p>

      <div className="mt-10 text-right">
        <p>(Signature of the Deponent)</p>
        <p className="mt-1">{formData.fullName}</p>
      </div>
    </div>
  );
};

export default DobCorrectionPreview;
