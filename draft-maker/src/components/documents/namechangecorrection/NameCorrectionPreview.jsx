import React from "react";
import { getDayWithSuffix } from "../../../utils/dateFormat";

const NameCorrectionPreview = ({ formData }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 border border-gray-300 rounded-md shadow-md font-serif">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold border-b-2 border-black pb-2 inline-block">
          AFFIDAVIT
        </h1>
        <p className="text-xs mt-1 text-gray-600">(For Change of Name)</p>
      </div>

      {/* Introduction */}
      <div className="mb-6 leading-relaxed">
        <p className="mb-3">
          I, <span className="font-semibold">{formData.fullName}</span>,{" "}
          {formData.relation} of{" "}
          <span className="font-semibold">{formData.relationName}</span>, aged{" "}
          <span className="font-semibold">{formData.age}</span> years,
        </p>

        <p className="mb-3">
          Permanent Resident of:{" "}
          <span className="font-semibold">{formData.permanentAddress}</span>
        </p>

        <p className="mb-5">
          Aadhaar No:{" "}
          <span className="font-semibold">{formData.aadhaarNo}</span>
        </p>

        <p className="font-semibold mb-5">
          Do hereby solemnly affirm and declare as under:
        </p>
      </div>

      {/* Declaration Points */}
      <div className="mb-8">
        <div className="mb-8 space-y-4">
          <p>1. That I am a citizen of India.</p>
          <p>
            2. That my name has been recorded as{" "}
            <span className="font-semibold">{formData.oldName}</span> (old name)
            in my official documents.
          </p>
          <p>
            3. That now I have changed my name permanently to{" "}
            <span className="font-semibold">{formData.newName}</span> (new name)
            in place of my previous name i.e., <span>{formData.oldName}</span>{" "}
            (old name).
          </p>
          <p>
            4. That in future I will be known by my new name i.e.,{" "}
            <span className="font-semibold">{formData.newName}</span> for all
            purposes.
          </p>
          <p>
            5. That I further declare that both the names mentioned hereinabove
            belong to one and the same person i.e., "myself".
          </p>
          <p>
            6. That my statement is true and correct to the best of my knowledge
            and belief.
          </p>
        </div>
      </div>

      {/* Verification */}
      <div className="mb-12 mt-8">
        <p className="leading-relaxed">
          Verified at <span className="font-semibold">{formData.place}</span> on
          this <span className="font-semibold">{getDayWithSuffix(formData.day)}</span> {" "}
          <span className="font-semibold">{formData.month}</span>,{" "}
          <span className="font-semibold">{formData.year}</span> that the
          contents of the above said affidavit are true and correct to the best
          of my knowledge and belief.
        </p>
      </div>

      {/* Signature */}
      <div className="flex justify-between items-end mt-16">
        <div>
          <p className="font-bold"></p>
          <div className="mt-8 border-black pt-1 w-40"></div>
          <div className="mt-8  border-black pt-1 w-40"></div>
        </div>

        <div className="text-center">
          <div className="h-16"></div>
          <div className="border-t border-black pt-1">
            <p className="font-semibold">Deponent</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameCorrectionPreview;
