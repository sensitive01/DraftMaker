import React from "react";
import { getDayWithSuffix } from "../../../../utils/dateFormat";

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
    <>
      <div className="bg-white p-3 sm:p-4 md:p-6 lg:p-8 border border-gray-300 rounded shadow relative mx-2 sm:mx-4 lg:mx-0 overflow-hidden">
        {/* Watermark */}
        <div className="watermark">INTERNAL PURPOSE ONLY</div>

        <div className="relative z-20 font-serif">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center underline mb-4 sm:mb-6 md:mb-8 tracking-wider">
            AFFIDAVIT
          </h1>

          <div className="space-y-3 sm:space-y-4 md:space-y-5 text-sm sm:text-base md:text-lg leading-relaxed">
            <p className="text-justify">
              I, <strong>{formData.fullName}</strong>{" "}
              <strong>{formData.relation}</strong>{" "}
              <strong>{formData.relationName}</strong>, Aged:{" "}
              <strong>{formData.age}</strong> Years,
            </p>

            <p className="text-justify">
              Permanent Address <strong>{formData.permanentAddress}</strong>
            </p>

            <p className="text-justify">
              My Aadhaar No: <strong>{formData.aadhaarNo}</strong>
            </p>

            <p className="text-justify font-medium">
              Do hereby solemnly affirm and declare as under:
            </p>

            <div className="space-y-3 sm:space-y-4 md:space-y-5 pl-2 sm:pl-4 md:pl-6 mt-6 sm:mt-8">
              <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                <span className="font-bold text-base sm:text-lg md:text-xl w-6 sm:w-8 md:w-10 flex-shrink-0 mt-0.5">
                  1.
                </span>
                <p className="text-justify">That I am the citizen of India.</p>
              </div>

              <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                <span className="font-bold text-base sm:text-lg md:text-xl w-6 sm:w-8 md:w-10 flex-shrink-0 mt-0.5">
                  2.
                </span>
                <p className="text-justify">
                  That my DOB has been recorded as{" "}
                  <strong>{formatDate(formData.dob1)}</strong>, in{" "}
                  <strong>{formData.document1}</strong>, Document No:{" "}
                  <strong>{formData.documentNo1}</strong>
                </p>
              </div>

              <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                <span className="font-bold text-base sm:text-lg md:text-xl w-6 sm:w-8 md:w-10 flex-shrink-0 mt-0.5">
                  3.
                </span>
                <p className="text-justify">
                  That my DOB has been recorded as{" "}
                  <strong>{formatDate(formData.dob2)}</strong>, in{" "}
                  <strong>{formData.document2}</strong>, Document No:{" "}
                  <strong>{formData.documentNo2}</strong>
                </p>
              </div>

              <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                <span className="font-bold text-base sm:text-lg md:text-xl w-6 sm:w-8 md:w-10 flex-shrink-0 mt-0.5">
                  4.
                </span>
                <p className="text-justify">
                  That I further declare that both the DOB mentioned hereinabove
                  belongs to one and the same person i.e.{" "}
                  <strong>"myself"</strong>.
                </p>
              </div>

              <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                <span className="font-bold text-base sm:text-lg md:text-xl w-6 sm:w-8 md:w-10 flex-shrink-0 mt-0.5">
                  5.
                </span>
                <p className="text-justify">
                  That my statement is true and correct.
                </p>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 md:mt-12 text-justify">
              <p>
                Verified at <strong>{formData.place}</strong> on this{" "}
                <strong>{getDayWithSuffix(formData.day)}</strong> day of{" "}
                <strong>{formData.month}</strong>,{" "}
                <strong>{formData.year}</strong> that the contents of the above
                said affidavit are true and correct to the best of my knowledge
                and belief.
              </p>
            </div>

            <div className="mt-12 sm:mt-16 md:mt-20 text-right">
              <div className="inline-block">
                <p className="text-sm sm:text-base md:text-lg">
                  (Signature of the Deponent)
                </p>
                <p className="mt-2 sm:mt-3 font-semibold text-sm sm:text-base md:text-lg">
                  {formData.fullName}
                </p>
              </div>
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
          font-size: clamp(1.5rem, 4vw, 3rem);
          font-weight: bold;
          color: rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
          letter-spacing: 0.2em;
          pointer-events: none;
          z-index: 1;
          white-space: nowrap;
          user-select: none;
        }

        @media (max-width: 640px) {
          .watermark {
            font-size: 1.5rem;
            letter-spacing: 0.1em;
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .watermark {
            font-size: 2rem;
            letter-spacing: 0.15em;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .watermark {
            font-size: 2.5rem;
            letter-spacing: 0.2em;
          }
        }

        @media (min-width: 1025px) {
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

export default DobCorrectionPreview;
