import React from "react";

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

      <ol className="list-decimal pl-6 space-y-4">
        <li>That I am the citizen of India.</li>

        <li>
          That my DOB has been recorded as {formatDate(formData.dob1)},{" "}
          {formData.document1}, {formData.documentNo1}
        </li>

        <li>
          That my DOB has been recorded as {formatDate(formData.dob2)},{" "}
          {formData.document2}, {formData.documentNo2}
        </li>

        <li>
          That I further declare that both the DOB mentioned hereinabove belongs
          to one and the same person i.e. "myself".
        </li>

        <li>That my statement is true and correct.</li>
      </ol>

      <p className="mt-6">
        Verified at <strong>{formData.place}</strong> on this {formData.day} day
        of {formData.month}, {formData.year} that the contents of the above said
        affidavit are true and correct to the best of my knowledge and belief.
      </p>

      <div className="mt-10 text-right">
        <p>(Signature of the Deponent)</p>
        <p className="mt-1">{formData.fullName}</p>
      </div>
    </div>
  );
};

export default DobCorrectionPreview;
