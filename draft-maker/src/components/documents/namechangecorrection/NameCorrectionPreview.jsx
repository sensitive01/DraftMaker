import React from "react";
import { getDayWithSuffix } from "../../../utils/dateFormat";

const NameCorrectionPreview = ({ formData }) => {
  return (
    <>
      <div className="w-full max-w-4xl mx-auto bg-white p-4 sm:p-6 md:p-8 border border-gray-300 rounded-md shadow-md font-serif relative">
        {/* Watermark */}
        <div className="watermark">INTERNAL PURPOSE ONLY</div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-xl sm:text-2xl font-bold border-b-2 border-black pb-2 inline-block">
            AFFIDAVIT
          </h1>
          <p className="text-xs mt-1 text-gray-600">(For Change of Name)</p>
        </div>

        {/* Introduction */}
        <div className="mb-8 leading-relaxed text-sm sm:text-base">
          <p className="mb-4">
            I,{" "}
            <span className="font-semibold break-words">
              {formData.fullName}
            </span>
            , {formData.relation} of{" "}
            <span className="font-semibold break-words">
              {formData.relationName}
            </span>
            , aged <span className="font-semibold">{formData.age}</span> years,
          </p>

          <p className="mb-4">
            Permanent Resident of:{" "}
            <span className="font-semibold break-words">
              {formData.permanentAddress}
            </span>
          </p>

          <p className="mb-6">
            Aadhaar No:{" "}
            <span className="font-semibold break-words">
              {formData.aadhaarNo}
            </span>
          </p>

          <p className="font-semibold mb-6">
            Do hereby solemnly affirm and declare as under:
          </p>
        </div>

        {/* Declaration Points */}
        <div className="mb-10">
          <div className="mb-10 space-y-6 text-sm sm:text-base">
            <p>1. That I am a citizen of India.</p>
            <p>
              2. That my name has been recorded as{" "}
              <span className="font-semibold break-words">
                {formData.oldName}
              </span>{" "}
              (old name) in my official documents.
            </p>
            <p>
              3. That now I have changed my name permanently to{" "}
              <span className="font-semibold break-words">
                {formData.newName}
              </span>{" "}
              (new name) in place of my previous name i.e.,{" "}
              <span className="break-words">{formData.oldName}</span> (old
              name).
            </p>
            <p>
              4. That in future I will be known by my new name i.e.,{" "}
              <span className="font-semibold break-words">
                {formData.newName}
              </span>{" "}
              for all purposes.
            </p>
            <p>
              5. That I further declare that both the names mentioned
              hereinabove belong to one and the same person i.e., "myself".
            </p>
            <p>
              6. That my statement is true and correct to the best of my
              knowledge and belief.
            </p>
          </div>
        </div>

        {/* Verification */}
        <div className="mb-16 mt-10">
          <p className="leading-relaxed text-sm sm:text-base">
            Verified at{" "}
            <span className="font-semibold break-words">{formData.place}</span>{" "}
            on this{" "}
            <span className="font-semibold">
              {getDayWithSuffix(formData.day)}
            </span>{" "}
            <span className="font-semibold">{formData.month}</span>,{" "}
            <span className="font-semibold">{formData.year}</span> that the
            contents of the above said affidavit are true and correct to the
            best of my knowledge and belief.
          </p>
        </div>

        {/* Signature */}
        <div className="flex justify-between items-end mt-20">
          <div>
            <p className="font-bold"></p>
            <div className="mt-10 border-black pt-1 w-32 sm:w-40"></div>
            <div className="mt-10 border-black pt-1 w-32 sm:w-40"></div>
          </div>

          <div className="text-center">
            <div className="h-20"></div>
            <div className="border-t border-black pt-1">
              <p className="font-semibold">Deponent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Watermark styles */}
      <style jsx>{`
        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 1.5rem;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
          letter-spacing: 0.1em;
          pointer-events: none;
          z-index: 1;
          white-space: nowrap;
          user-select: none;
        }

        @media (min-width: 640px) {
          .watermark {
            font-size: 2rem;
            letter-spacing: 0.15em;
          }
        }

        @media (min-width: 768px) {
          .watermark {
            font-size: 2.5rem;
            letter-spacing: 0.2em;
          }
        }

        @media (min-width: 1024px) {
          .watermark {
            font-size: 3rem;
            letter-spacing: 0.2em;
          }
        }

        @media print {
          .watermark {
            font-size: 4rem;
            color: rgba(0, 0, 0, 0.08);
          }
        }
      `}</style>
    </>
  );
};

export default NameCorrectionPreview;
